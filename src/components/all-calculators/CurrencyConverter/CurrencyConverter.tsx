"use client";

import { useState, useEffect } from "react";
import styles from "./CurrencyConverter.module.scss";

const CURRENCY_INFO: {
  [key: string]: {
    name: string;
    symbol: string;
    flag: string;
  };
} = {
  USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
  GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
  JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  CHF: { name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  CAD: { name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  AUD: { name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  NZD: { name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  CNY: { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  HKD: { name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  SGD: { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  INR: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  MXN: { name: "Mexican Peso", symbol: "MX$", flag: "🇲🇽" },
  ZAR: { name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  BTC: { name: "Bitcoin", symbol: "₿", flag: "🪙" },
  XAU: { name: "Gold (oz)", symbol: "XAU", flag: "🥇" },
  XAG: { name: "Silver (oz)", symbol: "XAG", flag: "🥈" },
};

interface ConversionResult {
  converted: number;
  rate: number;
  inverseRate: number;
  decimals: number;
}

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1000);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/exchange-rates");
        const data = await response.json();
        setExchangeRates(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Set default rates as fallback
        setExchangeRates({
          USD: 1.0,
          EUR: 0.92,
          GBP: 0.79,
          JPY: 149.5,
          CHF: 0.88,
          CAD: 1.36,
          AUD: 1.52,
          NZD: 1.63,
          CNY: 7.24,
          HKD: 7.81,
          SGD: 1.34,
          INR: 83.12,
          MXN: 17.15,
          ZAR: 18.65,
          BTC: 0.0000148,
          XAU: 0.000425,
          XAG: 0.0351,
        });
        setLastUpdated(new Date());
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;

    // All rates are based on USD
    const fromRate = exchangeRates[from] || 1;
    const toRate = exchangeRates[to] || 1;

    // Convert: from -> USD -> to
    return toRate / fromRate;
  };

  const calculate = () => {
    if (Object.keys(exchangeRates).length === 0) return;

    const rate = getExchangeRate(fromCurrency, toCurrency);
    const converted = amount * rate;
    const decimals = ["JPY", "KRW"].includes(toCurrency)
      ? 0
      : ["BTC"].includes(toCurrency)
        ? 8
        : 2;

    setResult({
      converted,
      rate,
      inverseRate: 1 / rate,
      decimals,
    });
  };

  useEffect(() => {
    calculate();
  }, [fromCurrency, toCurrency, amount, exchangeRates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount);
  };

  const handleRefreshRates = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/exchange-rates");
      const data = await response.json();
      setExchangeRates(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to refresh exchange rates:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && Object.keys(exchangeRates).length === 0) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>Loading exchange rates...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.converter}>
          <div className={styles.inputSection}>
            <label>From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code} - {info.name}
                </option>
              ))}
            </select>
            <div className={styles.amountInput}>
              <span className={styles.symbol}>
                {CURRENCY_INFO[fromCurrency].symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="0"
                step="any"
              />
            </div>
          </div>

          <button type="button" className={styles.swapBtn} onClick={handleSwap}>
            ⇄
          </button>

          <div className={styles.inputSection}>
            <label>To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code} - {info.name}
                </option>
              ))}
            </select>
            <div className={`${styles.amountInput} ${styles.result}`}>
              <span className={styles.symbol}>
                {CURRENCY_INFO[toCurrency].symbol}
              </span>
              <span className={styles.converted}>
                {result.converted.toLocaleString("en-US", {
                  minimumFractionDigits: result.decimals,
                  maximumFractionDigits: result.decimals,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rates}>
          <div className={styles.rate}>
            <span className={styles.rateLabel}>Rate:</span>{" "}
            <span>
              1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
            </span>
          </div>
          <div className={styles.rate}>
            <span className={styles.rateLabel}>Inverse:</span>{" "}
            <span>
              1 {toCurrency} = {result.inverseRate.toFixed(4)} {fromCurrency}
            </span>
          </div>
          {lastUpdated && (
            <div className={styles.rate}>
              <span className={styles.rateLabel}>Updated:</span>{" "}
              <span>
                {lastUpdated.toLocaleTimeString()}
                <button
                  type="button"
                  onClick={handleRefreshRates}
                  disabled={loading}
                  style={{
                    marginLeft: "8px",
                    padding: "2px 6px",
                    fontSize: "12px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? "..." : "↻"}
                </button>
              </span>
            </div>
          )}
        </div>

        <div className={styles.quick}>
          <span>Quick:</span>
          <button onClick={() => handleQuickAmount(100)}>100</button>
          <button onClick={() => handleQuickAmount(500)}>500</button>
          <button onClick={() => handleQuickAmount(1000)}>1K</button>
          <button onClick={() => handleQuickAmount(10000)}>10K</button>
        </div>
      </div>

      <p className={styles.disclaimer}>
        ⚠️ Rates are indicative only. For demonstration purposes.
      </p>
    </div>
  );
}
