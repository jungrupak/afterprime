"use client";

import { useState, useEffect } from "react";
import styles from "./ProfitLossCalculator.module.scss";

// Pip positions (decimal places for pip calculation)
const INSTRUMENT_CONFIG: {
  [key: string]: {
    pipDecimal: number;
    pipSize: number;
    pipValuePerLot: number;
    pointValue?: number;
    isIndex?: boolean;
    quote: string;
  };
} = {
  "EUR/USD": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 10,
    quote: "USD",
  },
  "GBP/USD": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 10,
    quote: "USD",
  },
  "AUD/USD": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 10,
    quote: "USD",
  },
  "NZD/USD": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 10,
    quote: "USD",
  },
  "USD/JPY": {
    pipDecimal: 2,
    pipSize: 0.01,
    pipValuePerLot: 6.7,
    quote: "JPY",
  },
  "USD/CHF": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 10.6,
    quote: "CHF",
  },
  "USD/CAD": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 7.3,
    quote: "CAD",
  },
  "EUR/GBP": {
    pipDecimal: 4,
    pipSize: 0.0001,
    pipValuePerLot: 12.5,
    quote: "GBP",
  },
  "EUR/JPY": {
    pipDecimal: 2,
    pipSize: 0.01,
    pipValuePerLot: 6.7,
    quote: "JPY",
  },
  "GBP/JPY": {
    pipDecimal: 2,
    pipSize: 0.01,
    pipValuePerLot: 6.7,
    quote: "JPY",
  },
  "XAU/USD": {
    pipDecimal: 2,
    pipSize: 0.01,
    pipValuePerLot: 1,
    pointValue: 100,
    quote: "USD",
  },
  XAUUSD: {
    pipDecimal: 2,
    pipSize: 0.01,
    pipValuePerLot: 1,
    pointValue: 100,
    quote: "USD",
  },
  US30: {
    pipDecimal: 0,
    pipSize: 1,
    pipValuePerLot: 1,
    isIndex: true,
    quote: "USD",
  },
  SPX500: {
    pipDecimal: 1,
    pipSize: 0.1,
    pipValuePerLot: 1,
    isIndex: true,
    quote: "USD",
  },
  NAS100: {
    pipDecimal: 1,
    pipSize: 0.1,
    pipValuePerLot: 1,
    isIndex: true,
    quote: "USD",
  },
  USOIL: { pipDecimal: 2, pipSize: 0.01, pipValuePerLot: 10, quote: "USD" },
};

interface CalculationResult {
  potentialProfit: number;
  potentialLoss: number;
  pipsTP: number;
  pipsSL: number;
  rrRatio: number;
  breakEven: number;
  units: number;
  pipValue: number;
  notionalValue: number;
  standardLots: number;
}

interface ExchangeRates {
  [key: string]: number;
}

export default function ProfitLossCalculator() {
  const [instrument, setInstrument] = useState("EUR/USD");
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const [entryPrice, setEntryPrice] = useState(1.085);
  const [stopLoss, setStopLoss] = useState(1.08);
  const [takeProfit, setTakeProfit] = useState(1.095);
  const [positionSize, setPositionSize] = useState(1.0);
  const [lotType, setLotType] = useState("standard");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState<CalculationResult | null>(null);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://scoreboard.argamon.com:8443/api/rebates/exchange-rates?base_currency=USD",
        );
        const data = await response.json();
        setExchangeRates(data);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Set default rates as fallback
        setExchangeRates({
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
          AUD: 1.52,
          JPY: 149.5,
          CHF: 0.88,
          CAD: 1.36,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getExchangeRate = (
    fromCurrency: string,
    toCurrency: string,
  ): number => {
    if (fromCurrency === toCurrency) return 1;

    // All rates are based on USD
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;

    // Convert: from -> USD -> to
    return toRate / fromRate;
  };

  const calculate = () => {
    if (Object.keys(exchangeRates).length === 0) return;

    const config =
      INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["EUR/USD"];

    // Convert position size to standard lots
    let standardLots = positionSize;
    let units = positionSize;

    switch (lotType) {
      case "mini":
        standardLots = positionSize / 10;
        units = positionSize * 10000;
        break;
      case "micro":
        standardLots = positionSize / 100;
        units = positionSize * 1000;
        break;
      case "units":
        standardLots = positionSize / 100000;
        units = positionSize;
        break;
      default: // standard
        units = positionSize * 100000;
    }

    // Calculate pips to SL and TP
    let pipsSL: number, pipsTP: number;

    if (direction === "buy") {
      pipsSL = (entryPrice - stopLoss) / config.pipSize;
      pipsTP = (takeProfit - entryPrice) / config.pipSize;
    } else {
      pipsSL = (stopLoss - entryPrice) / config.pipSize;
      pipsTP = (entryPrice - takeProfit) / config.pipSize;
    }

    // Calculate pip value per standard lot
    let pipValuePerLot = config.pipValuePerLot;
    if (config.pointValue) {
      pipValuePerLot = config.pointValue * config.pipSize;
    }

    // Convert pip value from quote currency to account currency
    if (config.quote !== accountCurrency) {
      const conversionRate = getExchangeRate(config.quote, accountCurrency);
      pipValuePerLot = pipValuePerLot * conversionRate;
    }

    // Calculate profit and loss
    const potentialLoss = Math.abs(pipsSL) * pipValuePerLot * standardLots;
    const potentialProfit = Math.abs(pipsTP) * pipValuePerLot * standardLots;

    // Calculate R:R ratio
    let rrRatio = 0;
    if (Math.abs(pipsSL) > 0) {
      rrRatio = Math.abs(pipsTP) / Math.abs(pipsSL);
    }

    // Calculate break-even win rate
    let breakEven = 0;
    if (rrRatio > 0) {
      breakEven = (1 / (1 + rrRatio)) * 100;
    }

    // Calculate notional value
    const notionalValue = entryPrice * units;
    const pipValue = pipValuePerLot * standardLots;

    setResult({
      potentialProfit,
      potentialLoss,
      pipsTP,
      pipsSL,
      rrRatio,
      breakEven,
      units,
      pipValue,
      notionalValue,
      standardLots,
    });
  };

  useEffect(() => {
    calculate();
  }, [
    instrument,
    direction,
    entryPrice,
    stopLoss,
    takeProfit,
    positionSize,
    lotType,
    accountCurrency,
    exchangeRates,
  ]);

  if (loading) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>Loading exchange rates...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const config = INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["EUR/USD"];
  const pipLabel = config.isIndex ? "points" : "pips";
  const totalRR = 1 + result.rrRatio;
  const riskWidth = (1 / totalRR) * 100;
  const rewardWidth = (result.rrRatio / totalRR) * 100;

  // Get currency symbol
  const currencySymbol =
    accountCurrency === "EUR"
      ? "€"
      : accountCurrency === "GBP"
        ? "£"
        : accountCurrency === "AUD"
          ? "A$"
          : "$";

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="plc-instrument">Instrument</label>
              <select
                id="plc-instrument"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
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
              <label htmlFor="plc-direction">Direction</label>
              <div className={styles.directionToggle}>
                <button
                  type="button"
                  className={`${styles.directionBtn} ${direction === "buy" ? styles.active : ""}`}
                  data-direction="buy"
                  onClick={() => setDirection("buy")}
                >
                  <span className={styles.directionIcon}>↑</span> Buy/Long
                </button>
                <button
                  type="button"
                  className={`${styles.directionBtn} ${direction === "sell" ? styles.active : ""}`}
                  data-direction="sell"
                  onClick={() => setDirection("sell")}
                >
                  <span className={styles.directionIcon}>↓</span> Sell/Short
                </button>
              </div>
            </div>
          </div>

          <div className={`${styles.inputRow} ${styles.prices}`}>
            <div className={styles.inputGroup}>
              <label htmlFor="plc-entry-price">Entry Price</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  id="plc-entry-price"
                  value={entryPrice}
                  onChange={(e) =>
                    setEntryPrice(parseFloat(e.target.value) || 0)
                  }
                  step={config.pipSize}
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${styles.slGroup}`}>
              <label htmlFor="plc-stop-loss">Stop-Loss Price</label>
              <div className={`${styles.inputWrapper} ${styles.slWrapper}`}>
                <input
                  type="number"
                  id="plc-stop-loss"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                  step={config.pipSize}
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${styles.tpGroup}`}>
              <label htmlFor="plc-take-profit">Take-Profit Price</label>
              <div className={`${styles.inputWrapper} ${styles.tpWrapper}`}>
                <input
                  type="number"
                  id="plc-take-profit"
                  value={takeProfit}
                  onChange={(e) =>
                    setTakeProfit(parseFloat(e.target.value) || 0)
                  }
                  step={config.pipSize}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="plc-position-size">Position Size</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  id="plc-position-size"
                  value={positionSize}
                  onChange={(e) =>
                    setPositionSize(parseFloat(e.target.value) || 0)
                  }
                  min="0.01"
                  step="0.01"
                />
                <select
                  id="plc-lot-type"
                  value={lotType}
                  onChange={(e) => setLotType(e.target.value)}
                >
                  <option value="standard">Standard Lots</option>
                  <option value="mini">Mini Lots</option>
                  <option value="micro">Micro Lots</option>
                  <option value="units">Units</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="plc-account-currency">Account Currency</label>
              <select
                id="plc-account-currency"
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
        </div>

        <div className={styles.results}>
          <div className={styles.resultRow}>
            <div className={`${styles.resultCard} ${styles.profitCard}`}>
              <span className={styles.resultIcon}>▲</span>
              <div className={styles.resultContent}>
                <span className={styles.resultLabel}>Potential Profit</span>
                <span className={styles.resultValue}>
                  {currencySymbol}
                  {result.potentialProfit.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className={styles.resultPips}>
                  {Math.abs(result.pipsTP).toFixed(1)} {pipLabel}
                </span>
              </div>
            </div>

            <div className={`${styles.resultCard} ${styles.lossCard}`}>
              <span className={styles.resultIcon}>▼</span>
              <div className={styles.resultContent}>
                <span className={styles.resultLabel}>Potential Loss</span>
                <span className={styles.resultValue}>
                  -{currencySymbol}
                  {result.potentialLoss.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className={styles.resultPips}>
                  {Math.abs(result.pipsSL).toFixed(1)} {pipLabel}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.rrSection}>
            <div className={styles.rrHeader}>
              <span className={styles.rrLabel}>Risk : Reward Ratio</span>
              <span className={styles.rrValue}>
                1 : {result.rrRatio.toFixed(2)}
              </span>
            </div>
            <div className={styles.rrBar}>
              <div
                className={styles.rrRisk}
                style={{ width: `${riskWidth}%` }}
              ></div>
              <div
                className={styles.rrReward}
                style={{ width: `${rewardWidth}%` }}
              ></div>
            </div>
            <div className={styles.rrLabels}>
              <span className={styles.rrRiskLabel}>Risk</span>
              <span className={styles.rrRewardLabel}>Reward</span>
            </div>
          </div>

          <div className={styles.breakeven}>
            <span className={styles.breakevenLabel}>
              Win Rate Needed to Break Even:
            </span>
            <span className={styles.breakevenValue}>
              {result.breakEven.toFixed(1)}%
            </span>
          </div>

          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <span className={styles.itemLabel}>Entry Price</span>
              <span className={styles.itemValue}>
                {entryPrice.toFixed(config.pipDecimal + 1)}
              </span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.itemLabel}>Position (Units)</span>
              <span className={styles.itemValue}>
                {Math.round(result.units).toLocaleString("en-US")}
              </span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.itemLabel}>Pip Value</span>
              <span className={styles.itemValue}>
                {currencySymbol}
                {result.pipValue.toFixed(2)}
              </span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.itemLabel}>Notional Value</span>
              <span className={styles.itemValue}>
                {currencySymbol}
                {result.notionalValue.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formula}>
        <details>
          <summary>View Formulas</summary>
          <div className={styles.formulaContent}>
            <p>
              <strong>Profit/Loss</strong> = Pips × Pip Value × Position Size
              (in standard lots)
            </p>
            <p>
              <strong>Pips</strong> = |Entry Price - Exit Price| ÷ Pip Size
            </p>
            <p>
              <strong>Risk:Reward</strong> = (TP - Entry) ÷ (Entry - SL) for
              long positions
            </p>
            <p>
              <strong>Break-Even Win Rate</strong> = 1 ÷ (1 + R:R ratio)
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
