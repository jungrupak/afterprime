"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CompountGrowthCalculator.module.scss";

interface BalanceHistory {
  balanceHistory: number[];
  finalBalance: number;
  totalGrowthPercent: number;
  expectancyDollars: number;
  profitFactor: number;
  expectedWins: number;
  expectancyR: number;
  tradesToDouble: string;
}

export default function CompoundGrowthCalculator() {
  const [startingBalance, setStartingBalance] = useState(10000);
  const [winRate, setWinRate] = useState(50);
  const [riskReward, setRiskReward] = useState(2);
  const [riskPerTrade, setRiskPerTrade] = useState(2);
  const [numTrades, setNumTrades] = useState(100);
  const [tradesPerPeriod, setTradesPerPeriod] = useState(20);
  const [periodType, setPeriodType] = useState("month");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [results, setResults] = useState<BalanceHistory | null>(null);

  const calculate = () => {
    const winRateDecimal = winRate / 100;
    const riskPerTradeDecimal = riskPerTrade / 100;
    const lossRate = 1 - winRateDecimal;

    const expectancyR = winRateDecimal * riskReward - lossRate * 1;
    const expectedGrowthPerTrade = riskPerTradeDecimal * expectancyR;

    let balance = startingBalance;
    const balanceHistory = [startingBalance];

    for (let i = 0; i < numTrades; i++) {
      balance = balance * (1 + expectedGrowthPerTrade);
      balanceHistory.push(balance);
    }

    const finalBalance = balance;
    const totalGrowthPercent =
      ((finalBalance - startingBalance) / startingBalance) * 100;

    const profitFactor =
      winRateDecimal > 0 && lossRate > 0
        ? (winRateDecimal * riskReward) / (lossRate * 1)
        : 0;

    const riskAmount = startingBalance * riskPerTradeDecimal;
    const expectancyDollars = riskAmount * expectancyR;
    const expectedWins = Math.round(numTrades * winRateDecimal);

    let tradesToDouble = "—";
    if (expectedGrowthPerTrade > 0) {
      const n = Math.log(2) / Math.log(1 + expectedGrowthPerTrade);
      const periods = n / tradesPerPeriod;
      if (periodType === "month") {
        tradesToDouble =
          periods < 12
            ? `${periods.toFixed(1)} months`
            : `${(periods / 12).toFixed(1)} years`;
      } else if (periodType === "week") {
        tradesToDouble =
          periods < 52
            ? `${periods.toFixed(1)} weeks`
            : `${(periods / 52).toFixed(1)} years`;
      } else {
        tradesToDouble =
          periods < 365
            ? `${periods.toFixed(0)} days`
            : `${(periods / 365).toFixed(1)} years`;
      }
    }

    setResults({
      balanceHistory,
      finalBalance,
      totalGrowthPercent,
      expectancyDollars,
      profitFactor,
      expectedWins,
      expectancyR,
      tradesToDouble,
    });
  };

  useEffect(() => {
    calculate();
  }, [
    startingBalance,
    winRate,
    riskReward,
    riskPerTrade,
    numTrades,
    tradesPerPeriod,
    periodType,
  ]);

  useEffect(() => {
    if (results && canvasRef.current) {
      updateChart(results.balanceHistory, numTrades);
    }
  }, [results, numTrades]);

  const updateChart = (balanceHistory: number[], numTrades: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const container = canvas.parentElement;
    if (!container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const minBalance = Math.min(...balanceHistory);
    const maxBalance = Math.max(...balanceHistory);
    const balanceRange = maxBalance - minBalance || 1;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = "#64ffda";
    ctx.lineWidth = 2;

    balanceHistory.forEach((balance, i) => {
      const x = padding + (i / numTrades) * width;
      const y =
        padding + height - ((balance - minBalance) / balanceRange) * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    ctx.lineTo(padding + width, padding + height);
    ctx.lineTo(padding, padding + height);
    ctx.closePath();
    ctx.fillStyle = "rgba(100, 255, 218, 0.1)";
    ctx.fill();

    ctx.fillStyle = "#64748b";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= 4; i++) {
      const value = minBalance + (balanceRange / 4) * (4 - i);
      const y = padding + (height / 4) * i;
      ctx.fillText(
        "$" + Math.round(value).toLocaleString(),
        padding - 5,
        y + 4,
      );
    }

    ctx.textAlign = "center";
    ctx.fillText("0", padding, canvas.height - 10);
    ctx.fillText(
      numTrades + " trades",
      canvas.width - padding,
      canvas.height - 10,
    );
  };

  const getEdgeMessage = (expectancyR: number) => {
    if (expectancyR > 0.2) {
      return "Strong positive edge. This system should grow your account over time.";
    } else if (expectancyR > 0) {
      return "Positive edge detected. Consistent execution should yield profits.";
    } else if (expectancyR === 0) {
      return "Break-even edge. You need to improve win rate or R:R to profit.";
    } else if (expectancyR > -0.2) {
      return "Slight negative edge. This system will slowly lose money over time.";
    } else {
      return "Significant negative edge. This system will lose money. Improve parameters.";
    }
  };

  const getMilestones = () => {
    const milestones = [1.5, 2, 3, 5];
    const expectancyR = results?.expectancyR || 0;
    const expectedGrowthPerTrade = (riskPerTrade / 100) * expectancyR;

    return milestones.map((mult) => {
      const targetBalance = startingBalance * mult;
      let tradesToTarget = "—";
      let timeToTarget = "—";

      if (expectedGrowthPerTrade > 0) {
        const n = Math.log(mult) / Math.log(1 + expectedGrowthPerTrade);
        tradesToTarget = Math.round(n).toString();
        const periods = n / tradesPerPeriod;

        if (periodType === "month") {
          timeToTarget =
            periods < 12
              ? `${periods.toFixed(1)}mo`
              : `${(periods / 12).toFixed(1)}yr`;
        } else if (periodType === "week") {
          timeToTarget =
            periods < 52
              ? `${periods.toFixed(1)}wk`
              : `${(periods / 52).toFixed(1)}yr`;
        } else {
          timeToTarget =
            periods < 365
              ? `${periods.toFixed(0)}d`
              : `${(periods / 365).toFixed(1)}yr`;
        }
      }

      return { mult, targetBalance, tradesToTarget, timeToTarget };
    });
  };

  if (!results) return null;

  const edgePercent = results.expectancyR * 100;
  const markerPosition = Math.max(
    0,
    Math.min(100, (results.expectancyR + 0.5) * 100),
  );

  return (
    <div className={styles.calculator}>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label htmlFor="cgc-starting-balance">Starting Balance</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="number"
                id="cgc-starting-balance"
                value={startingBalance}
                onChange={(e) =>
                  setStartingBalance(parseFloat(e.target.value) || 0)
                }
                min="100"
                step="100"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cgc-win-rate">Win Rate (%)</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="cgc-win-rate"
                value={winRate}
                onChange={(e) => setWinRate(parseFloat(e.target.value) || 0)}
                min="1"
                max="99"
                step="1"
              />
              <span className={styles.suffix}>%</span>
            </div>
            <input
              type="range"
              id="cgc-win-rate-slider"
              min="20"
              max="80"
              value={winRate}
              onChange={(e) => setWinRate(parseFloat(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cgc-risk-reward">Risk : Reward Ratio</label>
            <div className={styles.rrInputs}>
              <span className={styles.rrLabel}>1 :</span>
              <input
                type="number"
                id="cgc-risk-reward"
                value={riskReward}
                onChange={(e) => setRiskReward(parseFloat(e.target.value) || 0)}
                min="0.5"
                max="10"
                step="0.1"
              />
            </div>
            <input
              type="range"
              id="cgc-rr-slider"
              min="0.5"
              max="5"
              step="0.1"
              value={riskReward}
              onChange={(e) => setRiskReward(parseFloat(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cgc-risk-per-trade">Risk Per Trade (%)</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="cgc-risk-per-trade"
                value={riskPerTrade}
                onChange={(e) =>
                  setRiskPerTrade(parseFloat(e.target.value) || 0)
                }
                min="0.5"
                max="10"
                step="0.5"
              />
              <span className={styles.suffix}>%</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cgc-num-trades">Number of Trades</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="cgc-num-trades"
                value={numTrades}
                onChange={(e) => setNumTrades(parseInt(e.target.value) || 0)}
                min="10"
                max="1000"
                step="10"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cgc-trades-per-period">Trades Per</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="cgc-trades-per-period"
                value={tradesPerPeriod}
                onChange={(e) =>
                  setTradesPerPeriod(parseInt(e.target.value) || 0)
                }
                min="1"
                max="100"
                step="1"
              />
              <select
                id="cgc-period-type"
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value)}
              >
                <option value="month">/ Month</option>
                <option value="week">/ Week</option>
                <option value="day">/ Day</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.resultRow}>
            <div className={`${styles.resultCard} ${styles.resultPrimary}`}>
              <span className={styles.resultLabel}>Expected Final Balance</span>
              <span className={styles.resultValue}>
                $
                {results.finalBalance.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span
                className={`${styles.resultChange} ${results.totalGrowthPercent < 0 ? styles.negative : ""}`}
              >
                {results.totalGrowthPercent >= 0 ? "+" : ""}
                {results.totalGrowthPercent.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Expectancy</span>
              <span className={styles.statValue}>
                ${results.expectancyDollars.toFixed(2)}
              </span>
              <span className={styles.statNote}>per trade (avg)</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Profit Factor</span>
              <span className={styles.statValue}>
                {results.profitFactor.toFixed(2)}
              </span>
              <span className={styles.statNote}>gross profit / loss</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Expected Wins</span>
              <span className={styles.statValue}>{results.expectedWins}</span>
              <span className={styles.statNote}>
                of <span>{numTrades}</span> trades
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Time to Goal</span>
              <span className={styles.statValue}>{results.tradesToDouble}</span>
              <span className={styles.statNote}>to double account</span>
            </div>
          </div>

          <div className={styles.edgeIndicator}>
            <div className={styles.edgeHeader}>
              <span className={styles.edgeLabel}>Trading Edge</span>
              <span
                className={`${styles.edgeValue} ${edgePercent < 0 ? styles.negative : ""}`}
              >
                {edgePercent >= 0 ? "+" : ""}
                {edgePercent.toFixed(2)}%
              </span>
            </div>
            <div className={styles.edgeBar}>
              <div className={styles.edgeNegative}></div>
              <div className={styles.edgeCenter}></div>
              <div className={styles.edgePositive}></div>
              <div
                className={styles.edgeMarker}
                style={{ left: `${markerPosition}%` }}
              ></div>
            </div>
            <p className={styles.edgeMessage}>
              {getEdgeMessage(results.expectancyR)}
            </p>
          </div>

          <div className={styles.chartSection}>
            <h3 className={styles.sectionTitle}>Growth Projection</h3>
            <div className={styles.chartContainer}>
              <canvas ref={canvasRef} id="cgc-growth-chart"></canvas>
            </div>
          </div>

          <div className={styles.milestones}>
            <h3 className={styles.sectionTitle}>Account Milestones</h3>
            <div className={styles.milestoneGrid}>
              {getMilestones().map((milestone, idx) => (
                <div key={idx} className={styles.milestone}>
                  <span className={styles.milestoneTarget}>
                    ${milestone.targetBalance.toLocaleString()}
                  </span>
                  <span className={styles.milestoneTrades}>
                    {milestone.tradesToTarget} trades ({milestone.timeToTarget})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
