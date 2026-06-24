"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./PositionSizeCalculator.module.scss";
import { useInstrument } from "@/hooks/useInstruments";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import {
  buildInstrumentMap,
  groupInstruments,
  getExchangeRate,
} from "@/lib/instruments";

// Lot size definitions
const LOT_SIZES = {
  standard: 100000,
  mini: 10000,
  micro: 1000,
  nano: 100,
};

interface CalculationResult {
  positionLots: number;
  dollarRisk: number;
  units: number;
  miniLots: number;
  microLots: number;
}

interface RiskIndicator {
  fillWidth: number;
  color: string;
  message: string;
}

export default function PositionSizeCalculator() {
  const {
    allIsntruments,
    loading: instrumentsLoading,
    error: instrumentsError,
  } = useInstrument();
  const { rates: exchangeRates, loading: loadingRates } = useExchangeRates();

  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [stopLoss, setStopLoss] = useState(50);
  const [slUnit, setSlUnit] = useState("pips");
  const [instrument, setInstrument] = useState("EURUSD");
  const [customPipValue, setCustomPipValue] = useState(10);

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [riskIndicator, setRiskIndicator] = useState<RiskIndicator | null>(
    null,
  );

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
    if (instrument === "CUSTOM") return;
    if (Object.keys(instrumentMap).length === 0) return;
    if (!instrumentMap[instrument]) {
      const firstSymbol = Object.keys(instrumentMap)[0];
      if (firstSymbol) setInstrument(firstSymbol);
    }
  }, [instrumentMap, instrument]);

  const calculate = () => {
    // Get pip value, in USD (account currency for this calculator)
    let pipValue = customPipValue;
    if (instrument !== "CUSTOM") {
      const config = instrumentMap[instrument];
      if (!config) return;
      pipValue = config.pipValuePerLot;
      if (config.quote !== "USD") {
        const conversionRate = getExchangeRate(exchangeRates, config.quote, "USD");
        pipValue = pipValue * conversionRate;
      }
    }

    // Calculate dollar risk
    const dollarRisk = accountSize * (riskPercent / 100);

    // Calculate position size in standard lots
    let positionLots = 0;
    if (stopLoss > 0 && pipValue > 0) {
      positionLots = dollarRisk / (stopLoss * pipValue);
    }

    // Calculate units
    const units = positionLots * LOT_SIZES.standard;

    // Calculate mini and micro lots
    const miniLots = positionLots * 10;
    const microLots = positionLots * 100;

    setResult({
      positionLots,
      dollarRisk,
      units,
      miniLots,
      microLots,
    });

    // Update risk indicator
    updateRiskIndicator(riskPercent);
  };

  const updateRiskIndicator = (risk: number) => {
    // Calculate fill width (0.5% = 5%, 10% = 100%)
    const fillWidth = Math.min((risk / 10) * 100, 100);

    let color: string;
    let message: string;

    if (risk <= 1) {
      color = "linear-gradient(90deg, #00ff88, #00ff88)";
      message = "Risk level: Very Conservative (Low risk, slower growth)";
    } else if (risk <= 2) {
      color = "linear-gradient(90deg, #00ff88, #00d9ff)";
      message = "Risk level: Conservative (Recommended for most traders)";
    } else if (risk <= 3) {
      color = "linear-gradient(90deg, #00d9ff, #ffcc00)";
      message = "Risk level: Moderate (Suitable for experienced traders)";
    } else if (risk <= 5) {
      color = "linear-gradient(90deg, #ffcc00, #ff8800)";
      message = "Risk level: Aggressive (Higher drawdown potential)";
    } else {
      color = "linear-gradient(90deg, #ff8800, #ff4444)";
      message = "Risk level: Very Aggressive (High risk of significant losses)";
    }

    setRiskIndicator({ fillWidth, color, message });
  };

  useEffect(() => {
    if (loadingRates || instrumentsLoading) return;
    calculate();
  }, [
    accountSize,
    riskPercent,
    stopLoss,
    slUnit,
    instrument,
    customPipValue,
    instrumentMap,
    exchangeRates,
    loadingRates,
    instrumentsLoading,
  ]);

  if (loadingRates || instrumentsLoading) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>Loading instruments...</p>
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

  if (!result || !riskIndicator) return null;

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="psc-account-size">Account Size</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="number"
                id="psc-account-size"
                value={accountSize}
                onChange={(e) =>
                  setAccountSize(parseFloat(e.target.value) || 0)
                }
                min="0"
                step="100"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="psc-risk-percent">Risk Per Trade (%)</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="psc-risk-percent"
                value={riskPercent}
                onChange={(e) =>
                  setRiskPercent(parseFloat(e.target.value) || 0)
                }
                min="0.1"
                max="100"
                step="0.1"
              />
              <span className={styles.suffix}>%</span>
            </div>
            <div className={styles.riskSlider}>
              <input
                type="range"
                id="psc-risk-slider"
                min="0.5"
                max="10"
                step="0.5"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
              />
              <div className={styles.riskLabels}>
                <span className={styles.riskLow}>Conservative</span>
                <span className={styles.riskHigh}>Aggressive</span>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="psc-stop-loss">Stop-Loss Distance</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="psc-stop-loss"
                value={stopLoss}
                onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                min="1"
                step="1"
              />
              <select
                id="psc-sl-unit"
                value={slUnit}
                onChange={(e) => setSlUnit(e.target.value)}
              >
                <option value="pips">Pips</option>
                <option value="points">Points</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="psc-instrument">Instrument</label>
            <select
              id="psc-instrument"
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

          {instrument === "CUSTOM" && (
            <div className={`${styles.inputGroup} ${styles.customPip}`}>
              <label htmlFor="psc-custom-pip-value">
                Pip Value (per standard lot)
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.currencySymbol}>$</span>
                <input
                  type="number"
                  id="psc-custom-pip-value"
                  value={customPipValue}
                  onChange={(e) =>
                    setCustomPipValue(parseFloat(e.target.value) || 10)
                  }
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.results}>
          <div className={`${styles.resultCard} ${styles.resultPrimary}`}>
            <span className={styles.resultLabel}>
              Recommended Position Size
            </span>
            <span className={styles.resultValue}>
              {result.positionLots.toFixed(2)}
            </span>
            <span className={styles.resultUnit}>Standard Lots</span>
          </div>

          <div className={styles.resultGrid}>
            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Dollar Risk</span>
              <span className={styles.resultValue}>
                $
                {result.dollarRisk.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Units</span>
              <span className={styles.resultValue}>
                {Math.round(result.units).toLocaleString("en-US")}
              </span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Mini Lots</span>
              <span className={styles.resultValue}>
                {result.miniLots.toFixed(2)}
              </span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Micro Lots</span>
              <span className={styles.resultValue}>
                {result.microLots.toFixed(2)}
              </span>
            </div>
          </div>

          <div className={styles.riskIndicator}>
            <div className={styles.riskBar}>
              <div
                className={styles.riskFill}
                style={{
                  width: `${riskIndicator.fillWidth}%`,
                  background: riskIndicator.color,
                }}
              ></div>
            </div>
            <p className={styles.riskMessage}>{riskIndicator.message}</p>
          </div>
        </div>
      </div>

      <div className={styles.formula}>
        <details>
          <summary>View Formula</summary>
          <div className={styles.formulaContent}>
            <p>
              <strong>Position Size (lots)</strong> = (Account Size × Risk %) ÷
              (Stop-Loss × Pip Value)
            </p>
            <p>
              <strong>Dollar Risk</strong> = Account Size × Risk %
            </p>
            <p>
              <strong>Units</strong> = Position Size × 100,000
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
