"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./PipValueCalculator.module.scss";
import { useInstrument } from "@/hooks/useInstruments";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import {
  buildInstrumentMap,
  groupInstruments,
  getExchangeRate,
  currencySymbol as currencySymbolFor,
} from "@/lib/instruments";
import {
  pipValueCalculatorContent,
  type PipValueCalculatorContent,
} from "./PipValueCalculatorContent";

interface CalculationResult {
  pipValue: number;
  stdPipValue: number;
  miniPipValue: number;
  microPipValue: number;
  pipSize: number;
  currencySymbol: string;
}

interface PipValueCalculatorProps {
  content?: PipValueCalculatorContent;
}

export default function PipValueCalculator({
  content = pipValueCalculatorContent,
}: PipValueCalculatorProps) {
  const {
    allIsntruments,
    loading: instrumentsLoading,
    error: instrumentsError,
  } = useInstrument();
  const { rates: exchangeRates, loading } = useExchangeRates();

  const [instrument, setInstrument] = useState("EURUSD");
  const [size, setSize] = useState(1);
  const [lotType, setLotType] = useState("standard");
  const [currency, setCurrency] = useState("USD");

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

  const calculate = () => {
    if (Object.keys(exchangeRates).length === 0) return;

    const config = instrumentMap[instrument];
    if (!config) return;

    let stdPipValue = config.pipValuePerLot;

    // Convert pip value from quote currency to account currency
    if (config.quote !== currency) {
      const conversionRate = getExchangeRate(
        exchangeRates,
        config.quote,
        currency,
      );
      stdPipValue = stdPipValue * conversionRate;
    }

    // Convert lot type to standard lots
    let lots = size;
    if (lotType === "mini") lots = size / 10;
    if (lotType === "micro") lots = size / 100;

    const pipValue = stdPipValue * lots;

    setResult({
      pipValue,
      stdPipValue,
      miniPipValue: stdPipValue / 10,
      microPipValue: stdPipValue / 100,
      pipSize: config.pipSize,
      currencySymbol: currencySymbolFor(currency),
    });
  };

  useEffect(() => {
    calculate();
  }, [instrument, size, lotType, currency, exchangeRates, instrumentMap]);

  if (loading || instrumentsLoading) {
    return (
      <div className={styles.calculator}>
        <div className={styles.body}>
          <p>{content.loadingRates}</p>
        </div>
      </div>
    );
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

  if (!result) return null;

  const [pipMovementNotePre, pipMovementNotePost] =
    content.pipMovementNote.split("{pipSize}");

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
            <label>{content.instrumentLabel}</label>
            <select
              id="pvc-instrument"
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

          <div className={styles.group}>
            <label>{content.positionSizeLabel}</label>
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
                <option value="standard">{content.unitStandardLots}</option>
                <option value="mini">{content.unitMiniLots}</option>
                <option value="micro">{content.unitMicroLots}</option>
              </select>
            </div>
          </div>

          <div className={styles.group}>
            <label>{content.accountCurrencyLabel}</label>
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
            <span className={styles.label}>{content.pipValueLabel}</span>
            <span className={styles.value}>
              {result.currencySymbol}
              {result.pipValue.toFixed(2)}
            </span>
            <span className={styles.note}>
              {pipMovementNotePre}
              <span>{result.pipSize}</span>
              {pipMovementNotePost}
            </span>
          </div>

          <div className={styles.lotGrid}>
            <div className={styles.lotCard}>
              <span className={styles.lotName}>{content.standardLotName}</span>
              <span className={styles.lotUnits}>
                {content.standardLotUnits}
              </span>
              <span className={styles.lotValue}>
                {result.currencySymbol}
                {result.stdPipValue.toFixed(2)}
              </span>
            </div>
            <div className={styles.lotCard}>
              <span className={styles.lotName}>{content.miniLotName}</span>
              <span className={styles.lotUnits}>{content.miniLotUnits}</span>
              <span className={styles.lotValue}>
                {result.currencySymbol}
                {result.miniPipValue.toFixed(2)}
              </span>
            </div>
            <div className={styles.lotCard}>
              <span className={styles.lotName}>{content.microLotName}</span>
              <span className={styles.lotUnits}>{content.microLotUnits}</span>
              <span className={styles.lotValue}>
                {result.currencySymbol}
                {result.microPipValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.pipTable}>
          <h3>{content.pipMovementImpactTitle}</h3>
          <table>
            <thead>
              <tr>
                <th>{content.tableHeaderPips}</th>
                <th>{content.tableHeaderYourPosition}</th>
                <th>{content.tableHeaderStandardLot}</th>
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
