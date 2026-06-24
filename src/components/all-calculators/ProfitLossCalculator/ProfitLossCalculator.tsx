"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./ProfitLossCalculator.module.scss";
import { useInstrument } from "@/hooks/useInstruments";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import {
  buildInstrumentMap,
  groupInstruments,
  getExchangeRate as getExchangeRateShared,
  currencySymbol as currencySymbolFor,
} from "@/lib/instruments";

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

export default function ProfitLossCalculator() {
  const [instrument, setInstrument] = useState("EURUSD");
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const [entryPrice, setEntryPrice] = useState(1.085);
  const [stopLoss, setStopLoss] = useState(1.08);
  const [takeProfit, setTakeProfit] = useState(1.095);
  const [positionSize, setPositionSize] = useState(1.0);
  const [lotType, setLotType] = useState("standard");
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const [result, setResult] = useState<CalculationResult | null>(null);

  const {
    allIsntruments,
    loading: instrumentsLoading,
    error: instrumentsError,
  } = useInstrument();
  const { rates: exchangeRates, loading } = useExchangeRates();

  // Build per-symbol calc metadata from live instrument data
  const instrumentMap = useMemo(
    () => buildInstrumentMap(allIsntruments),
    [allIsntruments],
  );

  // Group + sort instruments for the dropdown, in a fixed display order
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

  const calculate = () => {
    if (Object.keys(exchangeRates).length === 0) return;

    const config = instrumentMap[instrument];
    if (!config) return;

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

    // Convert pip value from quote currency to account currency
    if (config.quote !== accountCurrency) {
      const conversionRate = getExchangeRateShared(
        exchangeRates,
        config.quote,
        accountCurrency,
      );
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
    instrumentMap,
  ]);

  const isLoading = loading || instrumentsLoading;

  if (isLoading) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>Loading exchange rates...</p>
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

  if (!result) return null;

  const config = instrumentMap[instrument];
  if (!config) return null;

  const pipLabel = config.pipLabel;
  const totalRR = 1 + result.rrRatio;
  const riskWidth = (1 / totalRR) * 100;
  const rewardWidth = (result.rrRatio / totalRR) * 100;

  const currencySymbol = currencySymbolFor(accountCurrency);

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
