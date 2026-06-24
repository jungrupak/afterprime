"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./MarginCalculator.module.scss";
import { useInstrument } from "@/hooks/useInstruments";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import {
  buildInstrumentMap,
  groupInstruments,
  getExchangeRate,
  currencySymbol as currencySymbolFor,
} from "@/lib/instruments";

interface CalculationResult {
  marginRequired: number;
  notionalValue: number;
  freeMargin: number;
  marginLevel: number;
  effectiveLeverage: number;
  marginUsedPercent: number;
  currencySymbol: string;
}

interface RiskAssessment {
  level: "low-risk" | "moderate-risk" | "high-risk" | "extreme-risk";
  message: string;
  fillPosition: number;
}

interface MarginCallLevels {
  move100: string;
  move50: string;
}

interface MarketPrice {
  symbol: string;
  bestBid: number;
  bestAsk: number;
  spread: number;
  market: string;
  group: string;
}

export default function MarginCalculator() {
  const {
    allIsntruments,
    loading: instrumentsLoading,
    error: instrumentsError,
  } = useInstrument();
  const { rates: exchangeRates, loading: loadingRates } = useExchangeRates();

  const [instrument, setInstrument] = useState("EURUSD");
  const [price, setPrice] = useState(0);
  const [tradeSize, setTradeSize] = useState(1.0);
  const [lotType, setLotType] = useState("standard");
  const [leverage, setLeverage] = useState(100);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [marketPrices, setMarketPrices] = useState<{
    [key: string]: MarketPrice;
  }>({});
  const [loadingPrices, setLoadingPrices] = useState(true);

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null,
  );
  const [marginCallLevels, setMarginCallLevels] = useState<MarginCallLevels>({
    move100: "—",
    move50: "—",
  });

  const instrumentMap = useMemo(
    () => buildInstrumentMap(allIsntruments),
    [allIsntruments],
  );
  const groupedInstruments = useMemo(
    () => groupInstruments(instrumentMap),
    [instrumentMap],
  );

  // If the default/current instrument isn't in the live map (e.g. API
  // dropped it), fall back to the first available symbol once data loads.
  useEffect(() => {
    if (Object.keys(instrumentMap).length === 0) return;
    if (!instrumentMap[instrument]) {
      const firstSymbol = Object.keys(instrumentMap)[0];
      if (firstSymbol) setInstrument(firstSymbol);
    }
  }, [instrumentMap, instrument]);

  // Fetch market prices on mount
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoadingPrices(true);
        const response = await fetch(
          "https://marketprice.afterprime.io:5000/MarketPrice",
        );
        const data = await response.json();

        // Convert array to object with symbol as key
        const pricesMap: { [key: string]: MarketPrice } = {};
        data.forEach((item: MarketPrice) => {
          pricesMap[item.symbol] = item;
        });

        setMarketPrices(pricesMap);
      } catch (error) {
        console.error("Failed to fetch market prices:", error);
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPrices();
  }, []);

  // Update price whenever instrument changes OR when market prices are loaded
  useEffect(() => {
    const marketData = marketPrices[instrument];
    if (marketData && marketData.bestBid && marketData.bestBid > 0) {
      setPrice(marketData.bestBid);
    }
  }, [instrument, marketPrices]);

  const handleRefreshPrice = async () => {
    try {
      setLoadingPrices(true);
      const response = await fetch(
        "https://marketprice.afterprime.io:5000/MarketPrice",
      );
      const data = await response.json();

      // Convert array to object with symbol as key
      const pricesMap: { [key: string]: MarketPrice } = {};
      data.forEach((item: MarketPrice) => {
        pricesMap[item.symbol] = item;
      });

      setMarketPrices(pricesMap);

      // Update current instrument price
      const marketData = pricesMap[instrument];
      if (marketData && marketData.bestBid > 0) {
        setPrice(marketData.bestBid);
      }
    } catch (error) {
      console.error("Failed to refresh market prices:", error);
    } finally {
      setLoadingPrices(false);
    }
  };

  const calculate = () => {
    if (Object.keys(exchangeRates).length === 0 || price <= 0) return;

    const config = instrumentMap[instrument];
    if (!config) return;

    // Convert trade size to standard lots
    let standardLots = tradeSize;
    if (lotType === "mini") standardLots = tradeSize / 10;
    if (lotType === "micro") standardLots = tradeSize / 100;

    // Notional value in the instrument's quote currency
    // (Contract Size x Lots = base-currency units; x Price converts to quote currency)
    const notionalValueQuote = config.contractSize * standardLots * price;

    // Convert notional + margin to account currency
    let notionalValue = notionalValueQuote;
    if (config.quote !== accountCurrency) {
      const rate = getExchangeRate(exchangeRates, config.quote, accountCurrency);
      notionalValue = notionalValueQuote * rate;
    }
    const currencySymbol = currencySymbolFor(accountCurrency);

    const marginRequired = notionalValue / leverage;

    // Calculate free margin
    const freeMargin = accountBalance - marginRequired;

    // Calculate margin level
    const marginLevel =
      marginRequired > 0 ? (accountBalance / marginRequired) * 100 : 0;

    // Calculate effective leverage
    const effectiveLeverage =
      accountBalance > 0 ? notionalValue / accountBalance : 0;

    // Calculate margin used percent
    const marginUsedPercent =
      accountBalance > 0 ? (marginRequired / accountBalance) * 100 : 0;

    setResult({
      marginRequired,
      notionalValue,
      freeMargin,
      marginLevel,
      effectiveLeverage,
      marginUsedPercent,
      currencySymbol,
    });

    // Update risk assessment
    updateRiskAssessment(effectiveLeverage, marginLevel, marginUsedPercent);

    // Calculate margin call levels (in account currency, matching accountBalance)
    calculateMarginCallLevels(notionalValue);
  };

  const updateRiskAssessment = (
    effectiveLeverage: number,
    marginLevel: number,
    marginUsedPercent: number,
  ) => {
    let level: "low-risk" | "moderate-risk" | "high-risk" | "extreme-risk";
    let message: string;
    let fillPosition: number;

    if (effectiveLeverage <= 5 && marginUsedPercent < 20) {
      level = "low-risk";
      message = `Your effective leverage of 1:${effectiveLeverage.toFixed(1)} is conservative. You're using ${marginUsedPercent.toFixed(1)}% of your account as margin, leaving substantial buffer for price movement.`;
      fillPosition = 10;
    } else if (effectiveLeverage <= 10 && marginUsedPercent < 40) {
      level = "moderate-risk";
      message = `Your effective leverage of 1:${effectiveLeverage.toFixed(1)} is moderate. Using ${marginUsedPercent.toFixed(1)}% of account as margin. A ${(100 / effectiveLeverage).toFixed(1)}% move against you would lose your entire account.`;
      fillPosition = 35;
    } else if (effectiveLeverage <= 20 || marginUsedPercent < 60) {
      level = "high-risk";
      message = `Warning: Effective leverage of 1:${effectiveLeverage.toFixed(1)} is high. Using ${marginUsedPercent.toFixed(1)}% margin. Only ${(100 / effectiveLeverage).toFixed(1)}% adverse move would wipe your account. Consider reducing position size.`;
      fillPosition = 65;
    } else {
      level = "extreme-risk";
      message = `Extreme Risk: With 1:${effectiveLeverage.toFixed(1)} effective leverage and ${marginUsedPercent.toFixed(1)}% margin used, you're highly exposed to margin call. A mere ${(100 / effectiveLeverage).toFixed(1)}% move could liquidate your position.`;
      fillPosition = 90;
    }

    setRiskAssessment({ level, message, fillPosition });
  };

  const calculateMarginCallLevels = (notionalValue: number) => {
    const usedMargin = notionalValue / leverage;

    const loss100 = accountBalance - usedMargin;
    const loss50 = accountBalance - 0.5 * usedMargin;

    const move100Percent =
      notionalValue > 0 ? (loss100 / notionalValue) * 100 : 0;
    const move50Percent =
      notionalValue > 0 ? (loss50 / notionalValue) * 100 : 0;

    setMarginCallLevels({
      move100:
        move100Percent > 0
          ? `${move100Percent.toFixed(2)}% move`
          : "Already below",
      move50:
        move50Percent > 0
          ? `${move50Percent.toFixed(2)}% move`
          : "Already below",
    });
  };

  useEffect(() => {
    calculate();
  }, [
    instrument,
    price,
    tradeSize,
    lotType,
    leverage,
    accountBalance,
    accountCurrency,
    exchangeRates,
    marketPrices,
  ]);

  if (
    loadingRates ||
    instrumentsLoading ||
    (loadingPrices && price === 0)
  ) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>Loading market data...</p>
        </div>
      </div>
    );
  }

  if (instrumentsError || Object.keys(instrumentMap).length === 0) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>Unable to load instruments, please refresh.</p>
        </div>
      </div>
    );
  }

  if (!result || !riskAssessment) return null;

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="mgc-instrument">Instrument</label>
            <select
              id="mgc-instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
            >
              {groupedInstruments.map(
                ({ group, displayName, instruments }) => (
                  <optgroup key={group} label={displayName}>
                    {instruments.map((inst) => (
                      <option key={inst.symbol} value={inst.symbol}>
                        {inst.label}
                      </option>
                    ))}
                  </optgroup>
                ),
              )}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-price">
              Current Price {loadingPrices && "(Updating...)"}
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="mgc-price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                step="0.0001"
              />
              <button
                type="button"
                onClick={handleRefreshPrice}
                disabled={loadingPrices}
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: loadingPrices ? "not-allowed" : "pointer",
                  opacity: loadingPrices ? 0.5 : 1,
                }}
              >
                {loadingPrices ? "..." : "↻"}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-trade-size">Trade Size</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="mgc-trade-size"
                value={tradeSize}
                onChange={(e) => setTradeSize(parseFloat(e.target.value) || 0)}
                min="0.01"
                step="0.01"
              />
              <select
                id="mgc-lot-type"
                value={lotType}
                onChange={(e) => setLotType(e.target.value)}
              >
                <option value="standard">Standard Lots</option>
                <option value="mini">Mini Lots</option>
                <option value="micro">Micro Lots</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-leverage">Leverage</label>
            <select
              id="mgc-leverage"
              value={leverage}
              onChange={(e) => setLeverage(parseInt(e.target.value))}
            >
              <option value="10">1:10</option>
              <option value="20">1:20</option>
              <option value="30">1:30</option>
              <option value="50">1:50</option>
              <option value="100">1:100</option>
              <option value="200">1:200</option>
              <option value="400">1:400</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-account-balance">Account Balance</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>
                {accountCurrency === "EUR"
                  ? "€"
                  : accountCurrency === "GBP"
                    ? "£"
                    : accountCurrency === "AUD"
                      ? "A$"
                      : "$"}
              </span>
              <input
                type="number"
                id="mgc-account-balance"
                value={accountBalance}
                onChange={(e) =>
                  setAccountBalance(parseFloat(e.target.value) || 0)
                }
                min="0"
                step="100"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-account-currency">Account Currency</label>
            <select
              id="mgc-account-currency"
              value={accountCurrency}
              onChange={(e) => setAccountCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultPrimary}>
            <span className={styles.resultLabel}>Margin Required</span>
            <span className={styles.resultValue}>
              {result.currencySymbol}
              {result.marginRequired.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className={styles.resultNote}>
              of {result.currencySymbol}
              {accountBalance.toLocaleString("en-US")} account balance
            </span>
          </div>

          <div className={styles.resultGrid}>
            <div className={styles.resultCard}>
              <span className={styles.cardLabel}>Notional Value</span>
              <span className={styles.cardValue}>
                {result.currencySymbol}
                {result.notionalValue.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className={styles.cardNote}>Total position size</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.cardLabel}>Free Margin</span>
              <span className={styles.cardValue}>
                {result.currencySymbol}
                {result.freeMargin.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className={styles.cardNote}>Available for new trades</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.cardLabel}>Margin Level</span>
              <span className={styles.cardValue}>
                {result.marginLevel.toFixed(0)}%
              </span>
              <span className={styles.cardNote}>Equity / Used Margin</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.cardLabel}>Effective Leverage</span>
              <span className={styles.cardValue}>
                1:{result.effectiveLeverage.toFixed(1)}
              </span>
              <span className={styles.cardNote}>Position / Account</span>
            </div>
          </div>

          <div
            className={`${styles.warningSection} ${styles[riskAssessment.level]}`}
          >
            <div className={styles.warningHeader}>
              <span className={styles.warningIcon}>⚠️</span>
              <span className={styles.warningTitle}>
                Leverage Risk Assessment
              </span>
            </div>
            <div className={styles.warningContent}>
              <p>{riskAssessment.message}</p>
              <div className={styles.riskMeter}>
                <div className={styles.riskTrack}>
                  <div
                    className={styles.riskFill}
                    style={{
                      left: `calc(${riskAssessment.fillPosition}% - 8px)`,
                    }}
                  ></div>
                </div>
                <div className={styles.riskLabels}>
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Extreme</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.marginCall}>
            <div className={styles.mcHeader}>
              <span className={styles.mcLabel}>
                Margin Call / Stop-Out Levels
              </span>
            </div>
            <div className={styles.mcGrid}>
              <div className={styles.mcItem}>
                <span className={styles.mcLevel}>100%</span>
                <span className={styles.mcDesc}>Margin Call Level</span>
                <span className={styles.mcValue}>
                  {marginCallLevels.move100}
                </span>
              </div>
              <div className={styles.mcItem}>
                <span className={styles.mcLevel}>50%</span>
                <span className={styles.mcDesc}>Stop-Out Level</span>
                <span className={styles.mcValue}>
                  {marginCallLevels.move50}
                </span>
              </div>
            </div>
            <p className={styles.mcNote}>
              Price movement against position that triggers these levels
              (approximate)
            </p>
          </div>
        </div>
      </div>

      <div className={styles.formula}>
        <details>
          <summary>View Formulas</summary>
          <div className={styles.formulaContent}>
            <p>
              <strong>Margin Required</strong> = (Notional Value ÷ Leverage)
              converted to account currency
            </p>
            <p>
              <strong>Notional Value</strong> = Contract Size × Lots × Price
            </p>
            <p>
              <strong>Margin Level %</strong> = (Equity ÷ Used Margin) × 100
            </p>
            <p>
              <strong>Effective Leverage</strong> = Notional Value ÷ Account
              Balance
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
