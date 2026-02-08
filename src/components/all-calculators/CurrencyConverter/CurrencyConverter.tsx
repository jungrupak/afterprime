"use client";

import { useState, useEffect } from "react";
import styles from "./CurrencyConverter.module.scss";

const EXCHANGE_RATES: { [key: string]: number } = {
  USD: 1.0,
  EUR: 0.9217,
  GBP: 0.7906,
  JPY: 149.5,
  CHF: 0.885,
  CAD: 1.365,
  AUD: 1.5267,
  NZD: 1.6393,
  CNY: 7.245,
  HKD: 7.81,
  SGD: 1.342,
  INR: 83.12,
  MXN: 17.15,
  ZAR: 18.65,
  BTC: 0.0000148,
  ETH: 0.00029,
  XAU: 0.000425,
  XAG: 0.0351,
};

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
  ETH: { name: "Ethereum", symbol: "Ξ", flag: "🪙" },
  XAU: { name: "Gold (oz)", symbol: "XAU", flag: "🥇" },
  XAG: { name: "Silver (oz)", symbol: "XAG", flag: "🥈" },
};

interface ConversionResult {
  converted: number;
  rate: number;
  inverseRate: number;
  decimals: number;
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1000);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const calculate = () => {
    const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];
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
  }, [fromCurrency, toCurrency, amount]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount);
  };

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
