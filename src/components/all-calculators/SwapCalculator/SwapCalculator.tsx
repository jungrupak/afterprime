"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./SwapCalculator.module.scss";
import { useInstrument } from "@/hooks/useInstruments";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import {
  buildInstrumentMap,
  groupInstruments,
  getExchangeRate,
  currencySymbol as currencySymbolFor,
} from "@/lib/instruments";
import {
  swapCalculatorContent,
  type SwapCalculatorContent,
} from "./SwapCalculatorContent";

/* =======================
   TYPES
======================= */

interface CalculationResult {
  totalSwap: number;
  dailySwap: number;
  weeklySwap: number;
  monthlySwap: number;
  annualRate: number;
  isCredit: boolean;
}

/* =======================
   COMPONENT
======================= */

interface SwapCalculatorProps {
  content?: SwapCalculatorContent;
}

export default function SwapCalculator({
  content = swapCalculatorContent,
}: SwapCalculatorProps) {
  const {
    allIsntruments,
    loading: instrumentsLoading,
    error: instrumentsError,
  } = useInstrument();
  const { rates: exchangeRates, loading: loadingRates } = useExchangeRates();

  const [instrument, setInstrument] = useState("EURUSD");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [positionSize, setPositionSize] = useState(1.0);
  const [lotType, setLotType] = useState("standard");
  const [daysHeld, setDaysHeld] = useState(1);
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const [result, setResult] = useState<CalculationResult | null>(null);

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

  /* =======================
     CALCULATION
  ======================= */

  const calculate = () => {
    const config = instrumentMap[instrument];
    if (!config) return;

    let standardLots = positionSize;
    if (lotType === "mini") standardLots = positionSize / 10;
    if (lotType === "micro") standardLots = positionSize / 100;

    const swapRate = direction === "long" ? config.swapLong : config.swapShort;

    // Swap points are quoted in the instrument's quote currency.
    // dailySwap (quote currency) = swapPoints * point * contractSize
    //                            = swapPoints * (pipSize / 10) * contractSize
    //                            = swapPoints * pipValuePerLot / 10
    let dailySwap = ((swapRate * config.pipValuePerLot) / 10) * standardLots;

    if (config.quote !== accountCurrency) {
      const conversionRate = getExchangeRate(
        exchangeRates,
        config.quote,
        accountCurrency,
      );
      dailySwap = dailySwap * conversionRate;
    }

    const weeks = Math.floor(daysHeld / 7);
    const totalSwapDays = daysHeld + weeks * 2;

    const totalSwap = dailySwap * totalSwapDays;
    const weeklySwap = dailySwap * 7;
    const monthlySwap = dailySwap * 30;

    const annualSwap = dailySwap * 365;
    const positionValue = standardLots * config.contractSize;
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
    if (!loadingRates && !instrumentsLoading) {
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
    instrumentsLoading,
    instrumentMap,
    exchangeRates,
  ]);

  const currencySymbol = currencySymbolFor(accountCurrency);

  const formatSwap = (value: number): string => {
    const isPositive = value > 0;
    return (isPositive ? "+" : "-") + currencySymbol + Math.abs(value).toFixed(2);
  };

  const handleQuickDays = (days: number) => {
    setDaysHeld(days);
  };

  if (loadingRates || instrumentsLoading || !result) {
    return <p>{content.loadingCalculator}</p>;
  }

  if (instrumentsError || Object.keys(instrumentMap).length === 0) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>{content.instrumentsError}</p>
        </div>
      </div>
    );
  }

  const config = instrumentMap[instrument];
  if (!config) return null;

  const rates = { long: config.swapLong, short: config.swapShort };

  const swapPeriodText = content.swapPeriodTemplate
    .replace("{days}", String(daysHeld))
    .replace("{plural}", daysHeld > 1 ? "s" : "");

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="swc-instrument">{content.instrumentLabel}</label>
            <select
              id="swc-instrument"
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
            <label htmlFor="swc-direction">
              {content.positionDirectionLabel}
            </label>
            <div className={styles.directionToggle}>
              <button
                type="button"
                className={`${styles.dirBtn} ${direction === "long" ? styles.active : ""}`}
                data-direction="long"
                onClick={() => setDirection("long")}
              >
                <span className={styles.dirIcon}>↑</span> {content.directionLong}
              </button>
              <button
                type="button"
                className={`${styles.dirBtn} ${direction === "short" ? styles.active : ""}`}
                data-direction="short"
                onClick={() => setDirection("short")}
              >
                <span className={styles.dirIcon}>↓</span> {content.directionShort}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="swc-position-size">
              {content.positionSizeLabel}
            </label>
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
                <option value="standard">{content.unitStandardLots}</option>
                <option value="mini">{content.unitMiniLots}</option>
                <option value="micro">{content.unitMicroLots}</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="swc-days-held">{content.daysHeldLabel}</label>
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
              <span className={styles.suffix}>{content.nightsSuffix}</span>
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
            <label htmlFor="swc-account-currency">
              {content.accountCurrencyLabel}
            </label>
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
              {result.isCredit ? content.swapCredit : content.swapCost}
            </span>
            <span className={styles.resultValue}>
              {result.isCredit ? "+" : "-"}$
              {Math.abs(result.totalSwap).toFixed(2)}
            </span>
            <span className={styles.resultPeriod}>{swapPeriodText}</span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>
                {content.dailySwapLabel}
              </span>
              <span className={styles.statValue}>
                {formatSwap(result.dailySwap)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>
                {content.weeklySwapLabel}
              </span>
              <span className={styles.statValue}>
                {formatSwap(result.weeklySwap)}
              </span>
              <span className={styles.statNote}>
                {content.weeklySwapNote}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>
                {content.monthlySwapLabel}
              </span>
              <span className={styles.statValue}>
                {formatSwap(result.monthlySwap)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>
                {content.annualRateLabel}
              </span>
              <span className={styles.statValue}>
                {result.annualRate >= 0 ? "+" : ""}
                {result.annualRate.toFixed(2)}%
              </span>
              <span className={styles.statNote}>{content.annualRateNote}</span>
            </div>
          </div>

          <div className={styles.ratesSection}>
            <h3 className={styles.sectionTitle}>
              {content.currentSwapRatesTitle}
            </h3>
            <p className={styles.ratesNote}>{content.ratesNote}</p>
            <div className={styles.ratesRow}>
              <div className={`${styles.rateItem} ${styles.rateLong}`}>
                <span className={styles.rateLabel}>
                  {content.longSwapLabel}
                </span>
                <span
                  className={styles.rateValue}
                  style={{ color: rates.long >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {rates.long >= 0 ? "+" : ""}
                  {rates.long.toFixed(2)}
                </span>
              </div>
              <div className={`${styles.rateItem} ${styles.rateShort}`}>
                <span className={styles.rateLabel}>
                  {content.shortSwapLabel}
                </span>
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
        <h3 className={styles.sectionTitle}>
          {content.understandingSwapsTitle}
        </h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📅</span>
            <div className={styles.infoContent}>
              <strong>{content.tripleWednesdayTitle}</strong>
              <p>{content.tripleWednesdayText}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>⏰</span>
            <div className={styles.infoContent}>
              <strong>{content.rolloverTimeTitle}</strong>
              <p>{content.rolloverTimeText}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>💱</span>
            <div className={styles.infoContent}>
              <strong>{content.interestRateDifferentialTitle}</strong>
              <p>{content.interestRateDifferentialText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.disclaimer} mt-5`}>
        <p>⚠️ {content.disclaimerText}</p>
      </div>
    </div>
  );
}
