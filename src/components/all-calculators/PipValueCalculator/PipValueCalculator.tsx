"use client";

import { useState, useEffect } from "react";
import styles from "./PipValueCalculator.module.scss";

const INSTRUMENTS: {
  [key: string]: {
    pipSize: number;
    pipValueStd: number;
    quote: string;
    contract?: number;
    type?: string;
  };
} = {
  "EUR/USD": { pipSize: 0.0001, pipValueStd: 10, quote: "USD" },
  "GBP/USD": { pipSize: 0.0001, pipValueStd: 10, quote: "USD" },
  "AUD/USD": { pipSize: 0.0001, pipValueStd: 10, quote: "USD" },
  "NZD/USD": { pipSize: 0.0001, pipValueStd: 10, quote: "USD" },
  "USD/JPY": { pipSize: 0.01, pipValueStd: 6.7, quote: "JPY" },
  "USD/CHF": { pipSize: 0.0001, pipValueStd: 11.3, quote: "CHF" },
  "USD/CAD": { pipSize: 0.0001, pipValueStd: 7.3, quote: "CAD" },
  "EUR/GBP": { pipSize: 0.0001, pipValueStd: 12.65, quote: "GBP" },
  "EUR/JPY": { pipSize: 0.01, pipValueStd: 6.7, quote: "JPY" },
  "GBP/JPY": { pipSize: 0.01, pipValueStd: 6.7, quote: "JPY" },
  "XAU/USD": { pipSize: 0.01, pipValueStd: 1.0, quote: "USD", contract: 100 },
  USOIL: { pipSize: 0.01, pipValueStd: 10.0, quote: "USD", contract: 1000 },
  US30: { pipSize: 1, pipValueStd: 1.0, quote: "USD", type: "index" },
  SPX500: { pipSize: 0.1, pipValueStd: 0.1, quote: "USD", type: "index" },
  NAS100: { pipSize: 0.1, pipValueStd: 0.1, quote: "USD", type: "index" },
};

interface CalculationResult {
  pipValue: number;
  stdPipValue: number;
  miniPipValue: number;
  microPipValue: number;
  pipSize: number;
  currencySymbol: string;
}

interface ExchangeRates {
  [key: string]: number;
}

export default function PipValueCalculator() {
  const [instrument, setInstrument] = useState("EUR/USD");
  const [size, setSize] = useState(1);
  const [lotType, setLotType] = useState("standard");
  const [currency, setCurrency] = useState("USD");
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

    const config = INSTRUMENTS[instrument];
    let stdPipValue = config.pipValueStd;

    // Convert pip value from quote currency to account currency
    if (config.quote !== currency) {
      const conversionRate = getExchangeRate(config.quote, currency);
      stdPipValue = stdPipValue * conversionRate;
    }

    // Convert lot type to standard lots
    let lots = size;
    if (lotType === "mini") lots = size / 10;
    if (lotType === "micro") lots = size / 100;

    const pipValue = stdPipValue * lots;
    const currencySymbol =
      currency === "EUR"
        ? "€"
        : currency === "GBP"
          ? "£"
          : currency === "AUD"
            ? "A$"
            : "$";

    setResult({
      pipValue,
      stdPipValue,
      miniPipValue: stdPipValue / 10,
      microPipValue: stdPipValue / 100,
      pipSize: config.pipSize,
      currencySymbol,
    });
  };

  useEffect(() => {
    calculate();
  }, [instrument, size, lotType, currency, exchangeRates]);

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

  const pipMovements = [
    {
      pips: 1,
      yourPosition: result.pipValue * 1,
      standard: result.stdPipValue * 1,
    },
    {
      pips: 10,
      yourPosition: result.pipValue * 10,
      standard: result.stdPipValue * 10,
    },
    {
      pips: 50,
      yourPosition: result.pipValue * 50,
      standard: result.stdPipValue * 50,
    },
    {
      pips: 100,
      yourPosition: result.pipValue * 100,
      standard: result.stdPipValue * 100,
    },
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.group}>
            <label>Instrument</label>
            <select
              id="pvc-instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
            >
              {Object.keys(INSTRUMENTS).map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.group}>
            <label>Position Size</label>
            <div className={styles.inputRow}>
              <input
                type="number"
                id="pvc-size"
                value={size}
                onChange={(e) => setSize(parseFloat(e.target.value) || 0)}
                min="0.01"
                step="0.01"
              />
              <select
                id="pvc-lot-type"
                value={lotType}
                onChange={(e) => setLotType(e.target.value)}
              >
                <option value="standard">Standard Lots</option>
                <option value="mini">Mini Lots</option>
                <option value="micro">Micro Lots</option>
              </select>
            </div>
          </div>

          <div className={styles.group}>
            <label>Account Currency</label>
            <select
              id="pvc-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.mainResult}>
            <span className={styles.label}>Pip Value</span>
            <span className={styles.value}>
              {result.currencySymbol}
              {result.pipValue.toFixed(2)}
            </span>
            <span className={styles.note}>
              per <span>{result.pipSize}</span> movement
            </span>
          </div>

          <div className={styles.lotGrid}>
            <div className={styles.lotCard}>
              <span className={styles.lotName}>Standard Lot</span>
              <span className={styles.lotUnits}>100,000 units</span>
              <span className={styles.lotValue}>
                {result.currencySymbol}
                {result.stdPipValue.toFixed(2)}
              </span>
            </div>
            <div className={styles.lotCard}>
              <span className={styles.lotName}>Mini Lot</span>
              <span className={styles.lotUnits}>10,000 units</span>
              <span className={styles.lotValue}>
                {result.currencySymbol}
                {result.miniPipValue.toFixed(2)}
              </span>
            </div>
            <div className={styles.lotCard}>
              <span className={styles.lotName}>Micro Lot</span>
              <span className={styles.lotUnits}>1,000 units</span>
              <span className={styles.lotValue}>
                {result.currencySymbol}
                {result.microPipValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.pipTable}>
          <h3>Pip Movement Impact</h3>
          <table>
            <thead>
              <tr>
                <th>Pips</th>
                <th>Your Position</th>
                <th>Standard Lot</th>
              </tr>
            </thead>
            <tbody>
              {pipMovements.map((row) => (
                <tr key={row.pips}>
                  <td>{row.pips}</td>
                  <td>
                    {result.currencySymbol}
                    {row.yourPosition.toFixed(2)}
                  </td>
                  <td>
                    {result.currencySymbol}
                    {row.standard.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
