"use client";

import { useState, useEffect } from "react";
import styles from "./MarginCalculator.module.scss";

// Default prices and contract sizes for instruments
const INSTRUMENTS: {
  [key: string]: {
    price: number;
    contractSize: number;
    marginCurrency: string;
    isGold?: boolean;
  };
} = {
  "EUR/USD": { price: 1.085, contractSize: 100000, marginCurrency: "EUR" },
  "GBP/USD": { price: 1.265, contractSize: 100000, marginCurrency: "GBP" },
  "USD/JPY": { price: 149.5, contractSize: 100000, marginCurrency: "USD" },
  "USD/CHF": { price: 0.885, contractSize: 100000, marginCurrency: "USD" },
  "USD/CAD": { price: 1.365, contractSize: 100000, marginCurrency: "USD" },
  "AUD/USD": { price: 0.655, contractSize: 100000, marginCurrency: "AUD" },
  "NZD/USD": { price: 0.61, contractSize: 100000, marginCurrency: "NZD" },
  "EUR/GBP": { price: 0.858, contractSize: 100000, marginCurrency: "EUR" },
  "EUR/JPY": { price: 162.2, contractSize: 100000, marginCurrency: "EUR" },
  "GBP/JPY": { price: 189.1, contractSize: 100000, marginCurrency: "GBP" },
  "XAU/USD": {
    price: 2350.0,
    contractSize: 100,
    marginCurrency: "XAU",
    isGold: true,
  },
  USOIL: { price: 78.5, contractSize: 1000, marginCurrency: "USD" },
  US30: { price: 39500, contractSize: 1, marginCurrency: "USD" },
  SPX500: { price: 5200, contractSize: 1, marginCurrency: "USD" },
  NAS100: { price: 18200, contractSize: 1, marginCurrency: "USD" },
};

// Currency conversion rates to USD (approximate)
const CURRENCY_RATES: { [key: string]: number } = {
  USD: 1,
  EUR: 1.085,
  GBP: 1.265,
  AUD: 0.655,
  NZD: 0.61,
  CAD: 0.733,
  CHF: 1.13,
  JPY: 0.0067,
  XAU: 2350,
};

interface CalculationResult {
  marginRequired: number;
  notionalValueUSD: number;
  freeMargin: number;
  marginLevel: number;
  effectiveLeverage: number;
  marginUsedPercent: number;
  currencySymbol: string;
  notionalInAccountCurrency: number;
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

export default function MarginCalculator() {
  const [instrument, setInstrument] = useState("EUR/USD");
  const [price, setPrice] = useState(1.085);
  const [tradeSize, setTradeSize] = useState(1.0);
  const [lotType, setLotType] = useState("standard");
  const [leverage, setLeverage] = useState(100);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null,
  );
  const [marginCallLevels, setMarginCallLevels] = useState<MarginCallLevels>({
    move100: "—",
    move50: "—",
  });

  const handleInstrumentChange = (newInstrument: string) => {
    setInstrument(newInstrument);
    const instrumentData = INSTRUMENTS[newInstrument];
    if (instrumentData) {
      setPrice(instrumentData.price);
    }
  };

  const calculate = () => {
    const instrumentData = INSTRUMENTS[instrument] || INSTRUMENTS["EUR/USD"];

    // Convert trade size to standard lots
    let standardLots = tradeSize;
    if (lotType === "mini") standardLots = tradeSize / 10;
    if (lotType === "micro") standardLots = tradeSize / 100;

    // Calculate notional value in base currency
    let notionalValueBase = instrumentData.contractSize * standardLots * price;

    // Convert to USD
    let notionalValueUSD = notionalValueBase;
    if (instrumentData.marginCurrency !== "USD") {
      const rate = CURRENCY_RATES[instrumentData.marginCurrency] || 1;
      notionalValueUSD = notionalValueBase * rate;
    }

    // Calculate margin required
    const marginRequiredUSD = notionalValueUSD / leverage;

    // Convert to account currency
    let marginRequired = marginRequiredUSD;
    let currencySymbol = "$";
    if (accountCurrency !== "USD") {
      const rate = CURRENCY_RATES[accountCurrency] || 1;
      marginRequired = marginRequiredUSD / rate;
      currencySymbol =
        accountCurrency === "EUR" ? "€" : accountCurrency === "GBP" ? "£" : "$";
    }

    // Calculate free margin
    const freeMargin = accountBalance - marginRequired;

    // Calculate margin level
    const marginLevel =
      marginRequired > 0 ? (accountBalance / marginRequired) * 100 : 0;

    // Calculate effective leverage
    let notionalInAccountCurrency = notionalValueUSD;
    if (accountCurrency !== "USD") {
      const rate = CURRENCY_RATES[accountCurrency] || 1;
      notionalInAccountCurrency = notionalValueUSD / rate;
    }
    const effectiveLeverage =
      accountBalance > 0 ? notionalInAccountCurrency / accountBalance : 0;

    // Calculate margin used percent
    const marginUsedPercent =
      accountBalance > 0 ? (marginRequired / accountBalance) * 100 : 0;

    setResult({
      marginRequired,
      notionalValueUSD,
      freeMargin,
      marginLevel,
      effectiveLeverage,
      marginUsedPercent,
      currencySymbol,
      notionalInAccountCurrency,
    });

    // Update risk assessment
    updateRiskAssessment(effectiveLeverage, marginLevel, marginUsedPercent);

    // Calculate margin call levels
    calculateMarginCallLevels(standardLots, instrumentData, notionalValueUSD);
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

  const calculateMarginCallLevels = (
    lots: number,
    instrumentData: any,
    notionalValue: number,
  ) => {
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
  ]);

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
              onChange={(e) => handleInstrumentChange(e.target.value)}
            >
              <optgroup label="Major Pairs">
                <option value="EUR/USD">EUR/USD</option>
                <option value="GBP/USD">GBP/USD</option>
                <option value="USD/JPY">USD/JPY</option>
                <option value="USD/CHF">USD/CHF</option>
                <option value="USD/CAD">USD/CAD</option>
                <option value="AUD/USD">AUD/USD</option>
                <option value="NZD/USD">NZD/USD</option>
              </optgroup>
              <optgroup label="Crosses">
                <option value="EUR/GBP">EUR/GBP</option>
                <option value="EUR/JPY">EUR/JPY</option>
                <option value="GBP/JPY">GBP/JPY</option>
              </optgroup>
              <optgroup label="Commodities">
                <option value="XAU/USD">XAU/USD (Gold)</option>
                <option value="USOIL">USOIL (Crude Oil)</option>
              </optgroup>
              <optgroup label="Indices">
                <option value="US30">US30 (Dow Jones)</option>
                <option value="SPX500">SPX500 (S&P 500)</option>
                <option value="NAS100">NAS100 (Nasdaq)</option>
              </optgroup>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-price">Current Price</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="mgc-price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                step="0.0001"
              />
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
              <option value="500">1:500</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mgc-account-balance">Account Balance</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
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
                $
                {result.notionalValueUSD.toLocaleString("en-US", {
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
