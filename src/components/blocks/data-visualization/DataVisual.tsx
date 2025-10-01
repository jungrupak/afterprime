"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart, { ChartData, ChartOptions, Plugin } from "chart.js";

type BrokerKey =
  | "Afterprime"
  | "FusionMarkets"
  | "IC Markets (cTrader)"
  | "IC Markets (Raw)"
  | "Vantage FX (RAW ECN)"
  | "Interactive Brokers"
  | "FXPIG"
  | "Industry Average"
  | "Top 10"
  | string;

interface BrokerCost {
  broker: BrokerKey;
  costPerLot: number;
}

interface DatasetDef {
  label: string;
  color: string;
  c: number;
}

const USD = (v: number) =>
  v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const DEFAULT_COST: Record<BrokerKey, number> = {
  Afterprime: 4.2,
  FusionMarkets: 7.5,
  "IC Markets (cTrader)": 9.7,
  "IC Markets (Raw)": 9.7,
  "Vantage FX (RAW ECN)": 9.7,
  "Interactive Brokers": 10.4,
  FXPIG: 11.5,
  "Industry Average": 18.4,
  "Top 10": 10.2,
};

const SELECT_ORDER: BrokerKey[] = (() => {
  const keys = Object.keys(DEFAULT_COST).filter(
    (k) => k !== "Industry Average" && k !== "Top 10"
  );
  return ["Industry Average", "Top 10", ...keys];
})();

const RIGHT_LABELS_PLUGIN: Plugin<"line"> = {
  id: "RightLabels",
  afterDatasetsDraw(chart) {
    try {
      const ca = chart.chartArea;
      if (!ca) return;
      const x = ca.right + 10;
      const top = ca.top;
      const bottom = ca.bottom;
      const h = 30;
      const step = 6;
      const used: Array<[number, number]> = [];
      const ctx = chart.ctx;
      ctx.save();
      ctx.font = "12px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#cbd5e1";
      const startBase: number = (window as any).__calcStart || 1;

      chart.data.datasets.forEach((ds, idx) => {
        const meta = chart.getDatasetMeta(idx);
        if (!meta || !meta.data.length) return;
        const pt = meta.data[meta.data.length - 1];
        const vEnd = (ds.data as number[])[ds.data.length - 1];
        const pct = startBase ? (vEnd / startBase) * 100 : 0;
        let y = pt.y - 14;
        let tries = 0;
        const clash = (a: number, b: number) => !(y + h < a || y > b);
        while (tries < 200 && used.some(([a, b]) => clash(a, b))) {
          const dir = tries % 2 === 0 ? 1 : -1;
          y += dir * step * Math.ceil((tries + 1) / 2);
          y = Math.max(top, Math.min(y, bottom - h));
          tries++;
        }
        used.push([y, y + h]);
        ctx.fillText(ds.label, x, y);
        ctx.fillText(`${USD(vEnd)} (${pct.toFixed(1)}%)`, x, y + 16);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    } catch {}
  },
};

export default function CostAdvantageProfit() {
  const [start, setStart] = useState<number>(100_000);
  const [months, setMonths] = useState<number>(60);
  const [lots, setLots] = useState<number>(100);
  const [retPct, setRetPct] = useState<number>(2);

  const [b1, setB1] = useState<BrokerKey>("Industry Average");
  const [b2, setB2] = useState<BrokerKey | "None">("Tickmill UK (Raw)");
  const [b3, setB3] = useState<BrokerKey | "None">("FXCM");

  const [costs, setCosts] = useState<Record<BrokerKey, number>>(DEFAULT_COST);

  const chartRef = useRef<Chart<"line", number[], number> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    async function fetchBrokerCosts() {
      try {
        const res = await fetch(
          "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=24h&commission=true"
        );
        const json: { brokers: BrokerCost[] } = await res.json();

        const updatedCosts: Record<BrokerKey, number> = { ...DEFAULT_COST };
        json.brokers.forEach((item) => {
          updatedCosts[item.broker] = item.costPerLot;
        });

        setCosts(updatedCosts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBrokerCosts();
  }, []);

  const defs = useMemo<DatasetDef[]>(() => {
    const chosen: DatasetDef[] = [
      { label: "Afterprime", color: "#22c55e", c: costs["Afterprime"] },
      {
        label: "Industry Average",
        color: "#94a3b8",
        c: costs["Industry Average"],
      },
    ];

    const selected = [b1, b2, b3].filter(Boolean) as string[];
    const palette = ["#38bdf8", "#a78bfa", "#f59e0b"];

    selected.forEach((name, idx) => {
      if (name === "None" || name === "Afterprime") return;
      if (chosen.some((x) => x.label === name)) return;
      const c = costs[name as BrokerKey];
      if (c == null) return;
      chosen.push({ label: name, color: palette[idx] ?? "#ef4444", c });
    });

    return chosen;
  }, [b1, b2, b3, costs]);

  const calc = useMemo(() => {
    const r = retPct / 100;
    const labels = Array.from({ length: months + 1 }, (_, i) => i);

    const series = defs.map((d) => {
      let eq = start;
      const data: number[] = [0];
      for (let m = 1; m <= months; m++) {
        eq = eq * (1 + r) - d.c * lots;
        eq = Math.max(0, eq);
        data.push(eq - start);
      }
      return { d, data };
    });

    return { labels, series, start };
  }, [defs, months, start, lots, retPct]);

  const kpi = useMemo(() => {
    const ap = calc.series.find((s) => s.d.label === "Afterprime");
    const ind = calc.series.find((s) => s.d.label === "Industry Average");
    const b1Ser = calc.series.find((s) => s.d.label === b1);

    const apProfit = ap ? ap.data[ap.data.length - 1] : 0;
    const b1Profit = b1Ser
      ? b1Ser.data[b1Ser.data.length - 1]
      : ind
      ? ind.data[ind.data.length - 1]
      : 0;

    return {
      apProfit,
      b1Profit,
      apRet: (apProfit / calc.start) * 100,
      b1Ret: (b1Profit / calc.start) * 100,
      adv: Math.max(0, apProfit - b1Profit),
      advPct: ((apProfit - b1Profit) / Math.abs(calc.start)) * 100,
      months: calc.labels.length - 1,
    };
  }, [calc, b1]);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!Chart.registry.plugins.get("RightLabels"))
      Chart.register(RIGHT_LABELS_PLUGIN);

    (window as any).__calcStart = calc.start;

    const datasets = calc.series.map((s) => ({
      label: s.d.label,
      data: s.data,
      borderColor: s.d.color,
      pointBackgroundColor: s.d.color,
      borderWidth: 2,
      tension: 0.2,
      fill: false,
      pointRadius: 0,
      pointHitRadius: 10,
    }));

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: { labels: calc.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: { padding: { right: 200 } },
        plugins: {
          legend: {
            labels: {
              color: "#cbd5e1",
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: "line",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { color: "rgba(148,163,184,.15)" },
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#cbd5e1" },
            grid: { color: "rgba(148,163,184,.15)" },
          },
        },
      } as ChartOptions<"line">,
    });

    return () => chartRef.current?.destroy();
  }, [calc]);

  const reset = () => {
    setStart(100_000);
    setB1("Industry Average");
    setB2("Tickmill UK (Raw)");
    setB3("FXCM");
    setMonths(60);
    setLots(100);
    setRetPct(2);
  };

  return <section>{/* JSX remains unchanged */}</section>;
}
