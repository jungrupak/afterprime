"use client";

import { useState, useEffect } from "react";
import styles from "./DrawdownCalculator.module.scss";
import {
  drawdonCalculatorContent,
  type DrawdonCalculatorContent,
} from "./DrawdonCalculatorContent";

interface DrawdownResults {
  riskOfRuin: number;
  expectedMaxDD: number;
  streakProbs: { [key: number]: number };
  streakDDs: { [key: number]: number };
  var95: number;
  var99: number;
  expectancyR: number;
}

export default function DrawdownCalculator({
  content = drawdonCalculatorContent,
}: {
  content?: DrawdonCalculatorContent;
}) {
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPerTrade, setRiskPerTrade] = useState(2);
  const [winRate, setWinRate] = useState(50);
  const [riskReward, setRiskReward] = useState(2);
  const [maxDrawdownLimit, setMaxDrawdownLimit] = useState(30);
  const [numTrades, setNumTrades] = useState(100);

  const [results, setResults] = useState<DrawdownResults | null>(null);

  const estimateMaxDrawdown = (
    riskPercent: number,
    winRate: number,
    riskReward: number,
    numTrades: number,
  ): number => {
    const lossRate = 1 - winRate;
    const expectedLongestStreak = Math.ceil(
      Math.log(numTrades) / Math.log(1 / lossRate),
    );
    const maxDDFromStreak =
      1 - Math.pow(1 - riskPercent, expectedLongestStreak);
    return Math.min(maxDDFromStreak * 1.5, 0.99);
  };

  const calculateVaR = (
    confidence: number,
    riskPercent: number,
    winRate: number,
    riskReward: number,
    numTrades: number,
  ): number => {
    const lossRate = 1 - winRate;
    const avgLossPerTrade =
      lossRate * riskPercent - winRate * riskPercent * riskReward;
    const stdDev = Math.sqrt(numTrades) * riskPercent * 0.5;
    const zScore = confidence === 0.95 ? 1.645 : 2.326;
    const expectedReturn = numTrades * avgLossPerTrade;
    const var_value = Math.abs(expectedReturn) + zScore * stdDev;
    return Math.min(var_value, 0.99);
  };

  const calculate = () => {
    const riskPercent = riskPerTrade / 100;
    const winRateDecimal = winRate / 100;
    const maxDDLimitDecimal = maxDrawdownLimit / 100;
    const lossRate = 1 - winRateDecimal;

    // Calculate expectancy
    const expectancyR = winRateDecimal * riskReward - lossRate * 1;

    // Calculate risk of ruin
    const capitalUnits = Math.floor(maxDDLimitDecimal / riskPercent);
    let riskOfRuin = 0;

    if (expectancyR > 0) {
      const edge = expectancyR * riskPercent;
      const q = 1 - edge;
      const p = 1 + edge;
      if (p > 0 && q > 0) {
        riskOfRuin = Math.pow(q / p, capitalUnits);
      }
    } else {
      riskOfRuin = 1;
    }

    // Calculate expected max drawdown
    const expectedMaxDD = estimateMaxDrawdown(
      riskPercent,
      winRateDecimal,
      riskReward,
      numTrades,
    );

    // Calculate losing streak probabilities
    const streakProbs: { [key: number]: number } = {};
    const streakDDs: { [key: number]: number } = {};
    [5, 7, 10, 15].forEach((n) => {
      const singleStreakProb = Math.pow(lossRate, n);
      const attempts = numTrades / n;
      streakProbs[n] = 1 - Math.pow(1 - singleStreakProb, attempts);
      streakDDs[n] = 1 - Math.pow(1 - riskPercent, n);
    });

    // Calculate VaR
    const var95 =
      accountSize *
      calculateVaR(0.95, riskPercent, winRateDecimal, riskReward, numTrades);
    const var99 =
      accountSize *
      calculateVaR(0.99, riskPercent, winRateDecimal, riskReward, numTrades);

    setResults({
      riskOfRuin,
      expectedMaxDD,
      streakProbs,
      streakDDs,
      var95,
      var99,
      expectancyR,
    });
  };

  useEffect(() => {
    calculate();
  }, [
    accountSize,
    riskPerTrade,
    winRate,
    riskReward,
    maxDrawdownLimit,
    numTrades,
  ]);

  const getRecoveryData = () => {
    if (!results) return [];

    const drawdowns = [0.1, 0.2, 0.3, 0.5, 0.75];
    const riskPercent = riskPerTrade / 100;

    return drawdowns.map((dd) => {
      const accountValue = accountSize * (1 - dd);
      const gainToRecover = 1 / (1 - dd) - 1;

      let tradesToRecover: string | number = content.infinitySymbol;
      if (results.expectancyR > 0) {
        const avgGainPerTrade = results.expectancyR * riskPercent;
        const n = Math.log(1 + gainToRecover) / Math.log(1 + avgGainPerTrade);
        tradesToRecover = Math.ceil(n);
      }

      return {
        drawdown: dd,
        accountValue,
        gainToRecover,
        tradesToRecover,
      };
    });
  };

  const getRiskAssessment = () => {
    if (!results) return null;

    const maxDDLimitDecimal = maxDrawdownLimit / 100;
    const riskPercent = riskPerTrade / 100;

    let level: "safe" | "caution" | "danger";
    let icon: string;
    let title: string;
    let message: string;
    let tips: string[];

    if (results.expectancyR <= 0) {
      level = "danger";
      icon = "⚠️";
      title = content.dangerZeroTitle;
      message = content.dangerZeroMessage;
      tips = content.dangerZeroTips;
    } else if (results.riskOfRuin > 0.2) {
      level = "danger";
      icon = "⚠️";
      title = content.dangerHighRuinTitle;
      message = content.dangerHighRuinMessageTemplate.replace(
        "{percent}",
        (results.riskOfRuin * 100).toFixed(0),
      );
      tips = content.dangerHighRuinTips;
    } else if (
      results.riskOfRuin > 0.05 ||
      results.expectedMaxDD > maxDDLimitDecimal * 0.8
    ) {
      level = "caution";
      icon = "⚡";
      title = content.cautionTitle;
      message = content.cautionMessageTemplate
        .replace("{ruin}", (results.riskOfRuin * 100).toFixed(1))
        .replace("{maxdd}", (results.expectedMaxDD * 100).toFixed(0));
      tips = content.cautionTips;
    } else {
      level = "safe";
      icon = "✓";
      title = content.safeTitle;
      message = content.safeMessageTemplate.replace(
        "{ruin}",
        (results.riskOfRuin * 100).toFixed(2),
      );
      tips = content.safeTips;
    }

    return { level, icon, title, message, tips };
  };

  if (!results) return null;

  const assessment = getRiskAssessment();
  const recoveryData = getRecoveryData();

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="ddc-account-size">
              {content.accountSizeLabel}
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="number"
                id="ddc-account-size"
                value={accountSize}
                onChange={(e) =>
                  setAccountSize(parseFloat(e.target.value) || 0)
                }
                min="100"
                step="100"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ddc-risk-per-trade">
              {content.riskPerTradeLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="ddc-risk-per-trade"
                value={riskPerTrade}
                onChange={(e) =>
                  setRiskPerTrade(parseFloat(e.target.value) || 0)
                }
                min="0.5"
                max="20"
                step="0.5"
              />
              <span className={styles.suffix}>%</span>
            </div>
            <input
              type="range"
              id="ddc-risk-slider"
              min="0.5"
              max="10"
              step="0.5"
              value={riskPerTrade}
              onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ddc-win-rate">{content.winRateLabel}</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="ddc-win-rate"
                value={winRate}
                onChange={(e) => setWinRate(parseFloat(e.target.value) || 0)}
                min="1"
                max="99"
                step="1"
              />
              <span className={styles.suffix}>%</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ddc-risk-reward">{content.riskRewardLabel}</label>
            <div className={styles.rrInputs}>
              <span className={styles.rrLabel}>{content.rrPrefix}</span>
              <input
                type="number"
                id="ddc-risk-reward"
                value={riskReward}
                onChange={(e) => setRiskReward(parseFloat(e.target.value) || 0)}
                min="0.5"
                max="10"
                step="0.1"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ddc-max-drawdown-limit">
              {content.maxDrawdownLimitLabel}
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="ddc-max-drawdown-limit"
                value={maxDrawdownLimit}
                onChange={(e) =>
                  setMaxDrawdownLimit(parseFloat(e.target.value) || 0)
                }
                min="5"
                max="100"
                step="5"
              />
              <span className={styles.suffix}>%</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ddc-num-trades">{content.numTradesLabel}</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="ddc-num-trades"
                value={numTrades}
                onChange={(e) => setNumTrades(parseInt(e.target.value) || 0)}
                min="10"
                max="500"
                step="10"
              />
            </div>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultRow}>
            <div className={`${styles.resultCard} ${styles.riskCard}`}>
              <span className={styles.resultIcon}>⚠️</span>
              <div className={styles.resultContent}>
                <span className={styles.resultLabel}>
                  {content.riskOfRuinLabel}
                </span>
                <span className={styles.resultValue}>
                  {(results.riskOfRuin * 100).toFixed(1)}%
                </span>
                <span className={styles.resultNote}>
                  {content.riskOfRuinNote}
                </span>
              </div>
            </div>

            <div className={`${styles.resultCard} ${styles.drawdownCard}`}>
              <span className={styles.resultIcon}>📉</span>
              <div className={styles.resultContent}>
                <span className={styles.resultLabel}>
                  {content.expectedMaxDrawdownLabel}
                </span>
                <span className={styles.resultValue}>
                  -{(results.expectedMaxDD * 100).toFixed(1)}%
                </span>
                <span className={styles.resultNote}>
                  {content.expectedMaxDrawdownNote}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.losingStreak}>
            <h3 className={styles.sectionTitle}>
              {content.losingStreakTitle}
            </h3>
            <div className={styles.streakGrid}>
              {[5, 7, 10, 15].map((n) => (
                <div key={n} className={styles.streakItem}>
                  <span className={styles.streakNum}>{n}</span>
                  <span className={styles.streakLabel}>
                    {content.streakLossesInARow}
                  </span>
                  <span className={styles.streakProb}>
                    {(results.streakProbs[n] * 100).toFixed(1)}%
                  </span>
                  <span className={styles.streakDd}>
                    -{(results.streakDDs[n] * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.varSection}>
            <h3 className={styles.sectionTitle}>{content.varTitle}</h3>
            <p className={styles.varDescription}>{content.varDescription}</p>
            <div className={styles.varGrid}>
              <div className={styles.varItem}>
                <span className={styles.varConf}>95%</span>
                <span className={styles.varValue}>
                  -$
                  {results.var95.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className={styles.varItem}>
                <span className={styles.varConf}>99%</span>
                <span className={styles.varValue}>
                  -$
                  {results.var99.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={`${styles.recovery} mt-5 md:mt-8`}>
        <h3 className={styles.sectionTitle}>{content.recoveryTitle}</h3>
        <table className={styles.recoveryTable}>
          <thead>
            <tr>
              <th>{content.recoveryDrawdownHeader}</th>
              <th>{content.recoveryAccountValueHeader}</th>
              <th>{content.recoveryGainToRecoverHeader}</th>
              <th>{content.recoveryTradesToRecoverHeader}</th>
            </tr>
          </thead>
          <tbody>
            {recoveryData.map((row, idx) => (
              <tr key={idx}>
                <td>-{(row.drawdown * 100).toFixed(0)}%</td>
                <td>
                  $
                  {row.accountValue.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td>+{(row.gainToRecover * 100).toFixed(1)}%</td>
                <td>{row.tradesToRecover}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.recoveryNote}>{content.recoveryNote}</p>
      </div>

      {assessment && (
        <div
          className={`${styles.riskAssessment} ${styles[assessment.level]} mt-5 md:mt-8`}
        >
          <div className={styles.assessmentHeader}>
            <span className={styles.assessmentIcon}>{assessment.icon}</span>
            <span className={styles.assessmentTitle}>{assessment.title}</span>
          </div>
          <p className={styles.assessmentMessage}>{assessment.message}</p>
          <ul className={styles.assessmentTips}>
            {assessment.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {/*  */}
      <div className={styles.formula}>
        <details>
          <summary>{content.viewFormulasSummary}</summary>
          <div className={styles.formulaContent}>
            <p>
              <strong>{content.formulaRiskOfRuinLabel}</strong>{" "}
              {content.formulaRiskOfRuinText}
            </p>
            <p>
              <strong>{content.formulaDrawdownLabel}</strong>{" "}
              {content.formulaDrawdownText}
            </p>
            <p>
              <strong>{content.formulaStreakLabel}</strong>{" "}
              {content.formulaStreakText}
            </p>
            <p>
              <strong>{content.formulaRecoveryLabel}</strong>{" "}
              {content.formulaRecoveryText}
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
