"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
// Chart.js (auto registers elements)
import Chart from "chart.js/auto";

type BrokerKey = string;

const USD = (v: number) =>
  v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

// USD per standard lot (spread + commission)
const COST: Record<BrokerKey, number> = {
  Afterprime: 4.2,
  FusionMarkets: 7.5,
  "IC Markets (cTrader)": 9.7,
  "IC Markets (Raw)": 9.7,
  "Vantage FX (RAW ECN)": 9.7,
  "Interactive Brokers": 10.4,
  "FXOpen (TickTrader)": 10.8,
  "Global Prime": 11.3,
  FXPIG: 11.5,
  "Tickmill UK (Raw)": 11.6,
  "Yadix (Scalper)": 11.9,
  TopFX: 12.1,
  "ATFX (.ins)": 12.2,
  FXCM: 12.3,
  CFH: 13.0,
  "FXOpen UK (ECN)": 13.6,
  "Advanced Markets (.a)": 13.7,
  "Axiory (MT5)": 13.9,
  "TaurexUK (.fi)": 14.0,
  "Pepperstone UK (.r)": 14.2,
  Axiory: 14.3,
  "RannForex (ECN)": 14.5,
  Swissquote: 14.5,
  "Tradersway (ECN)": 14.6,
  "9x Markets": 14.7,
  "FXCM (FT)": 14.8,
  "FTD Limited (.i)": 15.1,
  "Mt.Cook (ECN2)": 15.4,
  "Direct Trading Tech": 15.5,
  "FXPIG (cTrader)": 15.5,
  "Axiory (Zero)": 15.6,
  Darwinex: 15.7,
  "BlackBull Markets (ECN Prime)": 15.9,
  "Doo Prime (.uk)": 16.8,
  "BlackBull Markets (i)": 16.9,
  "Cara Markets (.c)": 17.1,
  "Equiti (.p)": 17.5,
  "Scope Markets": 17.6,
  AAAFX: 18.1,
  "CPTMarketsUK (c)": 18.4,
  "GO Markets (cTrader)": 18.4,
  Tier1FX: 18.6,
  "VARIANSE (x)": 19.1,
  "CPTMarketsUK (t)": 19.4,
  "Honor Capital Markets": 19.4,
  "VARIANSE (cTrader)": 19.4,
  "Pacific Financial Derivatives": 20.0,
  "Traders Trust": 20.2,
  "BidX Markets": 20.5,
  "Skilling (cTrader)": 20.5,
  "FIBO Group (.I)": 21.9,
  "Admiral Markets UK (Prime)": 22.8,
  Skilling: 23.1,
  Dukascopy: 24.6,
  OctaFX: 25.5,
  "Rakuten Australia": 25.9,
  "Bernstein Bank": 27.5,
  "GKFX (Professional)": 29.0,
  "Markets.com": 32.1,
  "FXChoice (Pro)": 35.3,
  "VARIANSE (ECNpro)": 36.2,
  "Amana Capital (Classic)": 40.0,
  "BlackBull Markets (cTrader)": 59.0,
  "Top 10": 10.2,
  "Industry Average": 18.4,
};

const SELECT_ORDER = (() => {
  const keys = Object.keys(COST)
    .filter((k) => k !== "Industry Average" && k !== "Top 10")
    .sort();
  return ["Industry Average", "Top 10", ...keys];
})();

const RIGHT_LABELS_PLUGIN = {
  id: "RightLabels",
  afterDatasetsDraw(chart: any) {
    try {
      const ca = chart.chartArea;
      if (!ca) return;
      const x = ca.right + 10;
      const top = ca.top;
      const bottom = ca.bottom;
      const h = 30;
      const step = 6;
      const used: Array<[number, number]> = [];
      const g = chart.ctx;
      g.save();
      g.font = "12px sans-serif";
      g.textBaseline = "top";
      g.fillStyle = "#cbd5e1";
      const startBase: number = (window as any).__calcStart || 1;

      chart.data.datasets.forEach((ds: any, i: number) => {
        const meta = chart.getDatasetMeta(i);
        if (!meta || !meta.data || !meta.data.length) return;
        const pt = meta.data[meta.data.length - 1];
        const vEnd = ds.data[ds.data.length - 1];
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
        g.fillText(ds.label, x, y);
        g.fillText(`${USD(vEnd)} (${pct.toFixed(1)}%)`, x, y + 16);
        g.beginPath();
        g.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        g.fill();
      });
      g.restore();
    } catch {}
  },
};

export default function CostAdvantageProfit() {
  // Defaults per your spec
  const [start, setStart] = useState<number>(100_000);
  const [months, setMonths] = useState<number>(60);
  const [lots, setLots] = useState<number>(100);
  const [retPct, setRetPct] = useState<number>(2);

  const [b1, setB1] = useState<BrokerKey>("Industry Average"); // primary
  const [b2, setB2] = useState<BrokerKey | "None">("Tickmill UK (Raw)");
  const [b3, setB3] = useState<BrokerKey | "None">("FXCM");

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Build dataset defs based on selections
  const defs = useMemo(() => {
    const chosen: Array<{ label: string; color: string; c: number }> = [
      { label: "Afterprime", color: "#22c55e", c: COST["Afterprime"] },
      {
        label: "Industry Average",
        color: "#94a3b8",
        c: COST["Industry Average"],
      },
    ];

    const selected = [b1, b2, b3].filter(Boolean) as string[];

    const palette = ["#38bdf8", "#a78bfa", "#f59e0b"]; // b1, b2, b3
    selected.forEach((name, idx) => {
      if (name === "None" || name === "Afterprime") return;
      if (chosen.some((x) => x.label === name)) return;
      const c = COST[name as BrokerKey];
      if (c == null) return;
      chosen.push({ label: name, color: palette[idx] ?? "#ef4444", c });
    });

    return chosen;
  }, [b1, b2, b3]);

  // Compute profit series with equity floor at $0
  const calc = useMemo(() => {
    const r = retPct / 100;
    const labels = Array.from({ length: months + 1 }, (_, i) => i);

    const series = defs.map((d) => {
      let eq = start;
      const data: number[] = [0]; // profit starts at 0
      for (let m = 1; m <= months; m++) {
        eq = eq * (1 + r) - d.c * lots;
        eq = Math.max(0, eq); // floor equity at $0 (max loss = starting balance)
        data.push(eq - start); // profit
      }
      return { d, data };
    });

    return { labels, series, start };
  }, [defs, months, start, lots, retPct]);

  // KPIs (based on primary b1 vs Afterprime)
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

    const apRet = (apProfit / calc.start) * 100;
    const b1Ret = (b1Profit / calc.start) * 100;

    return {
      apProfit,
      b1Profit,
      apRet,
      b1Ret,
      adv: Math.max(0, apProfit - b1Profit),
      advPct: ((apProfit - b1Profit) / Math.abs(calc.start)) * 100,
      months: calc.labels.length - 1,
    };
  }, [calc, b1]);

  // Draw / Update chart
  useEffect(() => {
    if (!canvasRef.current) return;

    // Register plugin once
    const existing = (Chart as any).registry.plugins.get("RightLabels");
    if (!existing) {
      Chart.register(RIGHT_LABELS_PLUGIN as any);
    }

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

    if (chartRef.current) {
      chartRef.current.destroy();
    }

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
            title: { display: true, text: "Months", color: "#94a3b8" },
            ticks: { color: "#cbd5e1" },
            grid: { color: "rgba(148,163,184,.15)" },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Profit (USD)", color: "#94a3b8" },
            ticks: {
              color: "#cbd5e1",
              callback: (v) => `$${Number(v).toLocaleString()}`,
            },
            grid: { color: "rgba(148,163,184,.15)" },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
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

  const brokerOptions = SELECT_ORDER;

  return (
    <section>
      <div>
        <div
          className="max-w-6xl mx-auto p-6 md:p-8 space-y-5"
          style={{ color: "var(--text)" }}
        >
          {/* Local theme (optional — can be removed if you have global CSS vars) */}
          <style>{`
        :root{--bg:#0b0f14;--card:#0f141b;--muted:#8aa0b6;--text:#e8f1fb;--gap:14px}
      `}</style>

          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              See Your Cost Advantage — Profit
            </h1>
            <button
              onClick={reset}
              className="px-3 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/15"
            >
              Reset
            </button>
          </div>

          <p className="text-sm text-slate-400">
            Adjust balance, months, lots, and monthly return. Broker costs use
            ForexBenchmark 7-day averages (spread+commission). Equity is floored
            at $0 (max loss = starting balance).
          </p>

          {/* Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
            <div className="lg:col-span-3 space-y-1">
              <div className="text-[12px] text-slate-400">
                Starting balance (USD)
              </div>
              <input
                className="h-[38px] field w-full"
                style={{
                  background: "#0b1117",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  color: "var(--text)",
                  padding: "6px 10px",
                  fontSize: 14,
                }}
                type="number"
                min={100}
                step={100}
                value={start}
                onChange={(e) => setStart(Number(e.target.value))}
              />
            </div>

            <div className="lg:col-span-3 space-y-1">
              <div className="text-[12px] text-slate-400">
                Broker 1 (primary)
              </div>
              <select
                className="h-[38px] field w-full"
                style={{
                  background: "#0b1117",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  color: "var(--text)",
                  padding: "6px 10px",
                  fontSize: 14,
                }}
                value={b1}
                onChange={(e) => setB1(e.target.value)}
              >
                {brokerOptions.map((name) => (
                  <option
                    key={`b1-${name}`}
                    value={name}
                    disabled={name === "────────"}
                  >
                    {name}
                  </option>
                ))}
                {/* divider after Top 10 */}
                <option disabled className="font-bold text-slate-400">
                  ────────
                </option>
              </select>
            </div>

            <div className="lg:col-span-3 space-y-1">
              <div className="text-[12px] text-slate-400">Broker 2</div>
              <select
                className="h-[38px] field w-full"
                style={{
                  background: "#0b1117",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  color: "var(--text)",
                  padding: "6px 10px",
                  fontSize: 14,
                }}
                value={b2}
                onChange={(e) => setB2(e.target.value as BrokerKey)}
              >
                <option value="None">None</option>
                {brokerOptions.map((name) => (
                  <option key={`b2-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3 space-y-1">
              <div className="text-[12px] text-slate-400">Broker 3</div>
              <select
                className="h-[38px] field w-full"
                style={{
                  background: "#0b1117",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10,
                  color: "var(--text)",
                  padding: "6px 10px",
                  fontSize: 14,
                }}
                value={b3}
                onChange={(e) => setB3(e.target.value as BrokerKey)}
              >
                <option value="None">None</option>
                {brokerOptions.map((name) => (
                  <option key={`b3-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
            <div
              className="lg:col-span-4 card p-4 space-y-2"
              style={{
                background: "#0f141b",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 14,
              }}
            >
              <div className="text-[12px] text-slate-400">
                Lots per month (1–1000)
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="slider w-full"
                  type="range"
                  min={1}
                  max={1000}
                  step={1}
                  value={lots}
                  onChange={(e) =>
                    setLots(clamp(Number(e.target.value), 1, 1000))
                  }
                  style={{ height: 6, borderRadius: 999 }}
                />
                <input
                  className="field w-24"
                  type="number"
                  min={1}
                  max={1000}
                  step={1}
                  value={lots}
                  onChange={(e) =>
                    setLots(clamp(Number(e.target.value), 1, 1000))
                  }
                  style={{
                    background: "#0b1117",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 10,
                    color: "var(--text)",
                    height: 38,
                    padding: "6px 10px",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>

            <div
              className="lg:col-span-4 card p-4 space-y-2"
              style={{
                background: "#0f141b",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 14,
              }}
            >
              <div className="text-[12px] text-slate-400">
                Monthly return (%)
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="slider w-full"
                  type="range"
                  min={-10}
                  max={10}
                  step={0.1}
                  value={retPct}
                  onChange={(e) => setRetPct(Number(e.target.value))}
                  style={{ height: 6, borderRadius: 999 }}
                />
                <input
                  className="field w-24"
                  type="number"
                  min={-10}
                  max={10}
                  step={0.1}
                  value={retPct}
                  onChange={(e) => setRetPct(Number(e.target.value))}
                  style={{
                    background: "#0b1117",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 10,
                    color: "var(--text)",
                    height: 38,
                    padding: "6px 10px",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>

            <div
              className="lg:col-span-4 card p-4 space-y-2"
              style={{
                background: "#0f141b",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 14,
              }}
            >
              <div className="text-[12px] text-slate-400">Months</div>
              <div className="flex items-center gap-3">
                <input
                  className="slider w-full"
                  type="range"
                  min={1}
                  max={60}
                  step={1}
                  value={months}
                  onChange={(e) =>
                    setMonths(clamp(Number(e.target.value), 1, 60))
                  }
                  style={{ height: 6, borderRadius: 999 }}
                />
                <input
                  className="field w-24"
                  type="number"
                  min={1}
                  max={60}
                  step={1}
                  value={months}
                  onChange={(e) =>
                    setMonths(clamp(Number(e.target.value), 1, 60))
                  }
                  style={{
                    background: "#0b1117",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 10,
                    color: "var(--text)",
                    height: 38,
                    padding: "6px 10px",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap)]">
            <div
              className="card p-5"
              style={{
                background: "#0f141b",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 14,
              }}
            >
              <div className="text-slate-300 text-xs">
                Afterprime
                <br />
                Profit
              </div>
              <div className="text-3xl font-semibold mt-1">
                {USD(kpi.apProfit)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {kpi.apRet.toFixed(1)}% / {kpi.months}m
              </div>
            </div>

            <div
              className="card p-5"
              style={{
                background: "#0f141b",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 14,
              }}
            >
              <div className="text-slate-300 text-xs">
                <span>{b1}</span>
                <br />
                Profit
              </div>
              <div className="text-3xl font-semibold mt-1">
                {USD(kpi.b1Profit)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {kpi.b1Ret.toFixed(1)}% / {kpi.months}m
              </div>
            </div>

            <div
              className="card p-5"
              style={{
                background: "#0f141b",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 14,
              }}
            >
              <div className="text-slate-300 text-xs">
                Afterprime Advantage
                <br />
                Vs <span>{b1}</span>
              </div>
              <div className="text-3xl font-semibold mt-1">{USD(kpi.adv)}</div>
              <div className="text-xs text-slate-400 mt-1">
                {kpi.advPct.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Chart */}
          <div
            className="card p-4"
            style={{
              background: "#0f141b",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 14,
              paddingRight: 220,
            }}
          >
            <div id="chartWrap" className="relative" style={{ height: 420 }}>
              <canvas ref={canvasRef} />
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Source: ForexBenchmark. Day session 04:00–22:00. Past averages
              don’t guarantee future outcomes. Equity floored at $0.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
