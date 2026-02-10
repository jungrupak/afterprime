"use client";

import { useState, useEffect } from "react";
import styles from "./SwapCalculator.module.scss";
import { useQuery } from "@tanstack/react-query";

/* =======================
   TYPES
======================= */

type SwapRates = {
  [key: string]: {
    long: number;
    short: number;
  };
};

type InstrumentApiResponse = {
  symbol: string;
  swapLong: number;
  swapShort: number;
};

interface CalculationResult {
  totalSwap: number;
  dailySwap: number;
  weeklySwap: number;
  monthlySwap: number;
  annualRate: number;
  isCredit: boolean;
}

/* =======================
   CONSTANTS
======================= */

const PIP_VALUES: { [key: string]: number } = {
  "EUR/USD": 10,
  "GBP/USD": 10,
  "USD/JPY": 6.7,
  "USD/CHF": 10.6,
  "USD/CAD": 7.3,
  "AUD/USD": 10,
  "NZD/USD": 10,
  "EUR/GBP": 12.5,
  "EUR/JPY": 6.7,
  "GBP/JPY": 6.7,
  "XAU/USD": 1,
  USOIL: 10,
  US30: 1,
  SPX500: 1,
  NAS100: 1,
  BTCUSD: 1,
  ETHUSD: 1,
};

/* =======================
   HELPERS
======================= */

function formatSymbol(symbol: string): string {
  // EURUSD → EUR/USD
  if (symbol.length === 6 && /^[A-Z]{6}$/.test(symbol)) {
    return `${symbol.slice(0, 3)}/${symbol.slice(3)}`;
  }
  return symbol;
}

/* =======================
   COMPONENT
======================= */

export default function SwapCalculator() {
  const [swapRates, setSwapRates] = useState<SwapRates>({});
  const [loadingRates, setLoadingRates] = useState(true);

  const [instrument, setInstrument] = useState("EUR/USD");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [positionSize, setPositionSize] = useState(1.0);
  const [lotType, setLotType] = useState("standard");
  const [daysHeld, setDaysHeld] = useState(1);
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const [result, setResult] = useState<CalculationResult | null>(null);

  /* =======================
     FETCH SWAP RATES
  ======================= */

  useEffect(() => {
    const fetchSwapRates = async () => {
      try {
        const res = await fetch("/api/instruments");
        const data: InstrumentApiResponse[] = await res.json();

        const mapped: SwapRates = {};
        data.forEach((item) => {
          const symbol = formatSymbol(item.symbol);
          mapped[symbol] = {
            long: item.swapLong,
            short: item.swapShort,
          };
        });

        setSwapRates(mapped);
      } catch (err) {
        console.error("Failed to load swap rates", err);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchSwapRates();
  }, []);

  /* =======================
     CALCULATION (UNCHANGED)
  ======================= */

  const calculate = () => {
    let standardLots = positionSize;
    if (lotType === "mini") standardLots = positionSize / 10;
    if (lotType === "micro") standardLots = positionSize / 100;

    const rates = swapRates[instrument] || { long: 0, short: 0 };
    const swapRate = direction === "long" ? rates.long : rates.short;

    const pipValue = PIP_VALUES[instrument] || 10;

    const dailySwap = ((swapRate * pipValue) / 10) * standardLots;

    const weeks = Math.floor(daysHeld / 7);
    const totalSwapDays = daysHeld + weeks * 2;

    const totalSwap = dailySwap * totalSwapDays;
    const weeklySwap = dailySwap * 7;
    const monthlySwap = dailySwap * 30;

    const annualSwap = dailySwap * 365;
    const positionValue = standardLots * 100000;
    const annualRate =
      positionValue > 0 ? (annualSwap / positionValue) * 100 : 0;

    const isCredit = totalSwap > 0;

    setResult({
      totalSwap,
      dailySwap,
      weeklySwap,
      monthlySwap,
      annualRate,
      isCredit,
    });
  };

  useEffect(() => {
    if (!loadingRates) {
      calculate();
    }
  }, [
    instrument,
    direction,
    positionSize,
    lotType,
    daysHeld,
    accountCurrency,
    loadingRates,
  ]);

  const formatSwap = (value: number): string => {
    const isPositive = value > 0;
    return (isPositive ? "+" : "-") + "$" + Math.abs(value).toFixed(2);
  };

  const handleQuickDays = (days: number) => {
    setDaysHeld(days);
  };

  if (loadingRates || !result) {
    return <p>Loading calculator..</p>;
  }

  const rates = swapRates[instrument] || { long: 0, short: 0 };

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="swc-instrument">Instrument</label>
            <select
              id="swc-instrument"
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
              <optgroup label="Crypto">
                <option value="BTCUSD">BTCUSD (Bitcoin)</option>
                <option value="ETHUSD">ETHUSD (Ethereum)</option>
              </optgroup>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="swc-direction">Position Direction</label>
            <div className={styles.directionToggle}>
              <button
                type="button"
                className={`${styles.dirBtn} ${direction === "long" ? styles.active : ""}`}
                data-direction="long"
                onClick={() => setDirection("long")}
              >
                <span className={styles.dirIcon}>↑</span> Long (Buy)
              </button>
              <button
                type="button"
                className={`${styles.dirBtn} ${direction === "short" ? styles.active : ""}`}
                data-direction="short"
                onClick={() => setDirection("short")}
              >
                <span className={styles.dirIcon}>↓</span> Short (Sell)
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="swc-position-size">Position Size</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="swc-position-size"
                value={positionSize}
                onChange={(e) =>
                  setPositionSize(parseFloat(e.target.value) || 0)
                }
                min="0.01"
                step="0.01"
              />
              <select
                id="swc-lot-type"
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
            <label htmlFor="swc-days-held">Days Held</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="swc-days-held"
                value={daysHeld}
                onChange={(e) => setDaysHeld(parseInt(e.target.value) || 1)}
                min="1"
                max="365"
                step="1"
              />
              <span className={styles.suffix}>nights</span>
            </div>
            <div className={styles.quickDays}>
              {[1, 5, 7, 30, 90].map((days) => (
                <button
                  key={days}
                  className={styles.dayBtn}
                  onClick={() => handleQuickDays(days)}
                >
                  {days}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="swc-account-currency">Account Currency</label>
            <select
              id="swc-account-currency"
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
          <div
            className={`${styles.resultPrimary} ${result.isCredit ? styles.credit : ""}`}
          >
            <span className={styles.resultType}>
              {result.isCredit ? "Swap Credit" : "Swap Cost"}
            </span>
            <span className={styles.resultValue}>
              {result.isCredit ? "+" : "-"}$
              {Math.abs(result.totalSwap).toFixed(2)}
            </span>
            <span className={styles.resultPeriod}>
              for {daysHeld} night{daysHeld > 1 ? "s" : ""}
            </span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Daily Swap</span>
              <span className={styles.statValue}>
                {formatSwap(result.dailySwap)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Weekly Swap</span>
              <span className={styles.statValue}>
                {formatSwap(result.weeklySwap)}
              </span>
              <span className={styles.statNote}>includes triple Wednesday</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Monthly Swap</span>
              <span className={styles.statValue}>
                {formatSwap(result.monthlySwap)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Annual Rate</span>
              <span className={styles.statValue}>
                {result.annualRate >= 0 ? "+" : ""}
                {result.annualRate.toFixed(2)}%
              </span>
              <span className={styles.statNote}>of position value</span>
            </div>
          </div>

          <div className={styles.ratesSection}>
            <h3 className={styles.sectionTitle}>Current Swap Rates</h3>
            <p className={styles.ratesNote}>
              Points per standard lot per night (indicative)
            </p>
            <div className={styles.ratesRow}>
              <div className={`${styles.rateItem} ${styles.rateLong}`}>
                <span className={styles.rateLabel}>Long Swap</span>
                <span
                  className={styles.rateValue}
                  style={{ color: rates.long >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {rates.long >= 0 ? "+" : ""}
                  {rates.long.toFixed(2)}
                </span>
              </div>
              <div className={`${styles.rateItem} ${styles.rateShort}`}>
                <span className={styles.rateLabel}>Short Swap</span>
                <span
                  className={styles.rateValue}
                  style={{ color: rates.short >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {rates.short >= 0 ? "+" : ""}
                  {rates.short.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.infoSection} mt-5`}>
        <h3 className={styles.sectionTitle}>Understanding Swaps</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📅</span>
            <div className={styles.infoContent}>
              <strong>Triple Wednesday</strong>
              <p>
                Swaps are charged 3x on Wednesday to account for weekend
                settlement.
              </p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>⏰</span>
            <div className={styles.infoContent}>
              <strong>Rollover Time</strong>
              <p>
                Swaps are typically charged at 5 PM New York time (server
                rollover).
              </p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>💱</span>
            <div className={styles.infoContent}>
              <strong>Interest Rate Differential</strong>
              <p>
                Swaps reflect the difference between the two currencies&apos;
                interest rates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.disclaimer} mt-5`}>
        <p>
          ⚠️ Swap rates are indicative and vary by broker. Actual rates depend
          on your broker&apos;s liquidity providers and may change daily. Always
          verify with your broker before holding positions overnight.
        </p>
      </div>
    </div>
  );
}
