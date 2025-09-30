"use client";
import styles from "./CostAdvantage.module.scss";
import Button from "../ui/Button";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

type BrokerData = {
  broker: string;
  symbol: string;
  cost: number;
  costPerLot: number;
  savingPercentage: number;
};

export default function CostAdvantage() {
  const [data, setData] = useState<BrokerData[]>([]);
  const [start, setStart] = useState(100_000);
  const [lots, setLots] = useState(100);
  const [retPct, setRetPct] = useState(2);
  const [months, setMonths] = useState(60);

  const [apEnd, setApEnd] = useState(0);
  const [apRet, setApRet] = useState(0);
  const [topEnd, setTopEnd] = useState(0);
  const [topRet, setTopRet] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"line", number[], number> | null>(null);

  const endpoint =
    "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=24h&commission=true";

  // Fetch live broker data
  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setData(res.brokers || []);
      })
      .catch(console.error);
  }, []);

  function computeSeries() {
    if (!data.length) return { labels: [], series: [] };

    const picks = ["Afterprime", "Industry Average"] as string[];

    const series = picks
      .map((broker) => {
        const brokerData = data.find((d) => d.broker === broker);
        if (!brokerData) return null;
        let eq = start;
        const chartData = [eq];
        for (let m = 1; m <= months; m++) {
          eq = eq * (1 + retPct / 100) - brokerData.costPerLot * lots;
          chartData.push(eq);
        }
        return { label: broker, data: chartData };
      })
      .filter(Boolean) as { label: string; data: number[] }[];

    const labels = Array.from({ length: months + 1 }, (_, i) => i);

    return { labels, series };
  }

  function drawChart() {
    const calc = computeSeries();

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (canvasRef.current && calc.series.length) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: calc.labels,
          datasets: calc.series.map((s, idx) => ({
            label: s.label,
            data: s.data,
            borderColor: idx === 0 ? "#22c55e" : "#94a3b8",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.2,
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: "#cbd5e1" },
            },
          },
          scales: {
            x: {
              ticks: { color: "#cbd5e1" },
              title: { display: true, text: "Months", color: "#94a3b8" },
            },
            y: {
              ticks: {
                color: "#cbd5e1",
                callback: (v) => `$${Number(v).toLocaleString()}`,
              },
            },
          },
        },
      });

      // Compute KPI values
      const apSeries = calc.series.find((s) => s.label === "Afterprime");
      const topSeries = calc.series.find((s) => s.label === "Industry Average");
      if (apSeries && topSeries) {
        const apFinal = apSeries.data.at(-1)!;
        const topFinal = topSeries.data.at(-1)!;

        setApEnd(apFinal);
        setTopEnd(topFinal);
        setApRet(((apFinal - start) / start) * 100);
        setTopRet(((topFinal - start) / start) * 100);
      }
    }
  }

  useEffect(() => {
    drawChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, start, lots, retPct, months]);

  const reset = () => {
    setStart(100_000);
    setLots(100);
    setRetPct(2);
    setMonths(60);
  };

  const USD = (v: number) =>
    v.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className={styles.costAdvantageSection}>
      <h2 className="h2-size font-semibold">See Your Cost Advantage</h2>
      <div className="flex items-end justify-between">
        <p className="paragraph max-w-[800px]">
          Adjust balance, months, lots, and monthly return. Broker costs are
          live from API.
        </p>
        <Button varient="secondary" size="small" onclick={reset}>
          Reset
        </Button>
      </div>

      {/* Inputs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="label">Starting balance (USD)</div>
          <input
            className="field w-full"
            type="number"
            min={100}
            step={100}
            value={start}
            onChange={(e) =>
              setStart(Math.max(100, Number(e.target.value || 0)))
            }
          />
        </div>
        <div className="space-y-1">
          <div className="label">Lots per month</div>
          <input
            className="field w-full"
            type="number"
            min={1}
            max={1000}
            value={lots}
            onChange={(e) => setLots(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <div className="label">Monthly return (%)</div>
          <input
            className="field w-full"
            type="number"
            value={retPct}
            onChange={(e) => setRetPct(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1">
          <div className="label">Months</div>
          <input
            className="field w-full"
            type="number"
            min={1}
            max={60}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Chart */}
      <div className={`${styles.card} p-4 mt-6`} style={{ height: 420 }}>
        <canvas ref={canvasRef} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className={styles.card + " p-4"}>
          <div className="text-slate-300 text-xs">Afterprime Ending Equity</div>
          <div className="text-2xl font-semibold mt-1">{USD(apEnd)}</div>
          <div className="text-xs text-slate-400">{apRet.toFixed(1)}%</div>
        </div>
        <div className={styles.card + " p-4"}>
          <div className="text-slate-300 text-xs">
            Industry Average Ending Equity
          </div>
          <div className="text-2xl font-semibold mt-1">{USD(topEnd)}</div>
          <div className="text-xs text-slate-400">{topRet.toFixed(1)}%</div>
        </div>
        <div className={styles.card + " p-4"}>
          <div className="text-slate-300 text-xs">Afterprime Advantage</div>
          <div className="text-2xl font-semibold mt-1">
            {USD(Math.max(0, apEnd - topEnd))}
          </div>
          <div className="text-xs text-slate-400">
            {(((apEnd - topEnd) / start) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
