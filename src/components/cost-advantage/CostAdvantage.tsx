"use client";
import styles from "./CostAdvantage.module.scss";
import Button from "../ui/Button";

import { useEffect, useMemo, useRef, useState } from "react";
import Chart, {
  ChartType,
  ChartData,
  ChartOptions,
  Plugin,
  ChartDataset,
  ScriptableContext,
  PointElement,
} from "chart.js/auto";

type BrokerKey = keyof typeof COST_MAP;

const COST_MAP = {
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
} as const;

const BROKER_COLORS: Record<string, string> = {
  Afterprime: "#22c55e",
  "Industry Average": "#94a3b8",
};

const BROKER_PICK_COLORS = ["#38bdf8", "#a78bfa", "#f59e0b"];

const USD = (v: number) =>
  v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function buildBrokerList() {
  const all = Object.keys(COST_MAP) as BrokerKey[];
  const rest = all
    .filter(
      (k) => k !== "Industry Average" && k !== "Top 10" && k !== "Afterprime"
    )
    .sort();
  return [
    "Industry Average",
    "Top 10",
    "—DIVIDER—",
    "Afterprime",
    ...rest,
  ] as const;
}

export default function CostAdvantage() {
  const [start, setStart] = useState(100_000);
  const [lots, setLots] = useState(100);
  const [retPct, setRetPct] = useState(2);
  const [months, setMonths] = useState(60);
  const [b1, setB1] = useState<BrokerKey>("Industry Average");
  const [b2, setB2] = useState<BrokerKey>("Tickmill UK (Raw)");
  const [b3, setB3] = useState<BrokerKey>("FXCM");

  const [apEnd, setApEnd] = useState(0);
  const [apRet, setApRet] = useState(0);
  const [b1End, setB1End] = useState(0);
  const [b1Ret, setB1Ret] = useState(0);
  const [advAbs, setAdvAbs] = useState(0);
  const [advPct, setAdvPct] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"line", number[], string> | null>(null);

  const optionsList = useMemo(buildBrokerList, []);

  // Plugin typed correctly
  const RightLabels = useMemo<Plugin<"line">>(
    () => ({
      id: "RightLabels",
      afterDatasetsDraw(chart) {
        const { ctx, chartArea, data } = chart;
        if (!chartArea) return;

        const x = chartArea.right + 10;
        const top = chartArea.top;
        const bottom = chartArea.bottom;
        const h = 30;
        const step = 6;

        const used: Array<[number, number]> = [];
        ctx.save();
        ctx.font = "12px sans-serif";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#cbd5e1";

        data.datasets.forEach((ds, i) => {
          const meta = chart.getDatasetMeta(i);
          if (!meta || !meta.data || !meta.data.length) return;
          const pt = meta.data[meta.data.length - 1] as PointElement;

          const vEnd = ds.data[ds.data.length - 1] as number;
          const vStart = ds.data[0] as number;
          const pct = ((vEnd - vStart) / vStart) * 100;

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

          ctx.fillText(ds.label ?? "", x, y);
          ctx.fillText(`${USD(vEnd)} (${pct.toFixed(1)}%)`, x, y + 16);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      },
    }),
    []
  );

  function computeSeries() {
    const r = retPct / 100;
    const picks = [b1, b2, b3] as BrokerKey[];
    // Always include Afterprime and Industry Average; then add distinct broker picks (skip None-like or duplicates)
    const seriesDefs: Array<{ label: string; color: string; c: number }> = [
      {
        label: "Afterprime",
        color: BROKER_COLORS["Afterprime"],
        c: COST_MAP["Afterprime"],
      },
      {
        label: "Industry Average",
        color: BROKER_COLORS["Industry Average"],
        c: COST_MAP["Industry Average"],
      },
    ];

    picks.forEach((bk, idx) => {
      if (!bk || bk === ("—DIVIDER—" as unknown)) return;
      if (bk === "Afterprime") return; // already included
      if (seriesDefs.some((s) => s.label === bk)) return;
      const c = COST_MAP[bk];
      if (typeof c !== "number") return;
      seriesDefs.push({
        label: bk,
        color: BROKER_PICK_COLORS[idx] ?? "#ef4444",
        c,
      });
    });

    const labels = Array.from({ length: months + 1 }, (_, i) => i);
    const series = seriesDefs.map((d) => {
      let eq = start;
      const data = [eq];
      for (let m = 1; m <= months; m++) {
        eq = eq * (1 + r) - d.c * lots;
        data.push(eq);
      }
      return { def: d, data };
    });

    return { labels, series };
  }

  function drawChart() {
    const calc = computeSeries();
    // KPIs
    const ap = calc.series
      .find((s) => s.def.label === "Afterprime")!
      .data.at(-1)!;
    const ind = calc.series
      .find((s) => s.def.label === "Industry Average")!
      .data.at(-1)!;
    const b1Series = calc.series.find((s) => s.def.label === b1);
    const b1Val = b1Series ? b1Series.data.at(-1)! : ind;

    setApEnd(ap);
    setApRet(((ap - start) / start) * 100);
    setB1End(b1Val);
    setB1Ret(((b1Val - start) / start) * 100);
    setAdvAbs(Math.max(0, ap - b1Val));
    setAdvPct(((ap - b1Val) / Math.abs(start)) * 100);

    // Chart datasets
    const datasets = calc.series.map((s) => ({
      label: s.def.label,
      data: s.data,
      borderColor: s.def.color,
      pointBackgroundColor: s.def.color,
      borderWidth: 2,
      tension: 0.2,
      fill: false,
    }));

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: { labels: calc.labels, datasets },
        plugins: [RightLabels],
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
          elements: { point: { radius: 0, hitRadius: 10 } },
          scales: {
            x: {
              title: { display: true, text: "Months", color: "#94a3b8" },
              ticks: { color: "#cbd5e1" },
              grid: { color: "rgba(148,163,184,.15)" },
            },
            y: {
              ticks: {
                color: "#cbd5e1",
                callback: (v: unknown) => `$${Number(v).toLocaleString()}`,
              },
              grid: { color: "rgba(148,163,184,.15)" },
            },
          },
        },
      });
    }
  }

  // Redraw when inputs change
  useEffect(() => {
    drawChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, lots, retPct, months, b1, b2, b3]);

  // Cleanup
  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  const reset = () => {
    setStart(100000);
    setB1("Industry Average" as BrokerKey);
    setB2("Tickmill UK (Raw)" as BrokerKey);
    setB3("FXCM" as BrokerKey);
    setMonths(60);
    setLots(100);
    setRetPct(2);
  };

  return (
    <div className={`${styles.costAdvantageSection}`}>
      <h2 className="h2-size font-semibold" style={{ fontWeight: "600" }}>
        See Your Cost
        <br /> Advantage
      </h2>

      <div className="flex items-end justify-between">
        <p className="paragraph max-w-[800px]">
          Adjust balance, months, lots, and monthly return. Broker costs use
          ForexBenchmark 7-day averages (spread+commission).
        </p>
        <Button varient="secondary" size="small" onclick={reset}>
          Reset
        </Button>
      </div>

      {/* Inputs */}
      <div className="mt-20 ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-6 md:mt-18 mb-15 max-md:mb-10">
        <div className="lg:col-span-3 space-y-1">
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

        <BrokerSelect
          label="Broker 1 (primary)"
          value={b1}
          onChange={(v) => setB1(v as BrokerKey)}
          options={optionsList}
        />
        <BrokerSelect
          label="Broker 2"
          value={b2}
          onChange={(v) => setB2(v as BrokerKey)}
          options={optionsList}
          allowNone
        />
        <BrokerSelect
          label="Broker 3"
          value={b3}
          onChange={(v) => setB3(v as BrokerKey)}
          options={optionsList}
          allowNone
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[20px] mt-[20px]">
        <RangeWithNumber
          className="lg:col-span-4"
          label="Lots per month (1–1000)"
          min={1}
          max={1000}
          step={1}
          value={lots}
          onChange={setLots}
        />
        <RangeWithNumber
          className="lg:col-span-4"
          label="Monthly return (%)"
          min={-10}
          max={10}
          step={0.1}
          value={retPct}
          onChange={setRetPct}
        />
        <RangeWithNumber
          className="lg:col-span-4"
          label="Months"
          min={1}
          max={60}
          step={1}
          value={months}
          onChange={setMonths}
        />
      </div>

      {/* KPIs (order per request) */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-[20px] gap-[20px]">
        <KpiCard
          title={
            <>
              <span className="text-slate-300 text-xs">
                Afterprime
                <br />
                Ending Equity
              </span>
            </>
          }
        >
          <div className="text-3xl font-semibold mt-1">{USD(apEnd)}</div>
          <div className="text-xs text-slate-400 mt-1">
            {apRet.toFixed(1)}% / {months}m
          </div>
        </KpiCard>

        <KpiCard
          title={
            <>
              <span className="text-slate-300 text-xs">
                {b1}
                <br />
                Ending Equity
              </span>
            </>
          }
        >
          <div className="text-3xl font-semibold mt-1">{USD(b1End)}</div>
          <div className="text-xs text-slate-400 mt-1">
            {b1Ret.toFixed(1)}% / {months}m
          </div>
        </KpiCard>

        <KpiCard
          title={
            <>
              <span className="text-slate-300 text-xs">
                Afterprime Advantage
                <br />
                Vs {b1}
              </span>
            </>
          }
        >
          <div className="text-3xl font-semibold mt-1">
            {USD(Math.max(0, advAbs))}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {advPct.toFixed(1)}%
          </div>
        </KpiCard>
      </div>

      {/* Chart */}
      <div className={`${styles.card} p-4 mt-[20px] chart-pad`}>
        <div id="chartWrap" className="relative" style={{ height: 420 }}>
          <canvas ref={canvasRef} />
        </div>
        <div className="text-[11px] text-slate-400 mt-2">
          Source: ForexBenchmark. Day session 04:00–22:00. Past averages don’t
          guarantee future outcomes.
        </div>
      </div>

      {/* component-scoped styles to mirror your HTML */}
    </div>
  );
}

/* ---------- Reusable bits ---------- */

function BrokerSelect({
  label,
  value,
  onChange,
  options,
  allowNone = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allowNone?: boolean;
}) {
  return (
    <div className="lg:col-span-3 space-y-1">
      <div className="label">{label}</div>
      <select
        className="field w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {allowNone && <option value="">None</option>}
        {options.map((o, i) =>
          o === "—DIVIDER—" ? (
            <option key={`div-${i}`} disabled className="divider">
              ────────
            </option>
          ) : (
            <option key={o} value={o}>
              {o}
            </option>
          )
        )}
      </select>
    </div>
  );
}

function RangeWithNumber({
  className = "",
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  className?: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className={`${className} ${styles.card} p-4 space-y-2`}>
      <div className="label">{label}</div>
      <div className="flex items-center gap-3">
        <input
          className="slider w-full"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <input
          className="field w-24"
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const raw = Number(e.target.value);
            if (Number.isFinite(raw)) {
              const clamped = Math.min(Math.max(raw, min), max);
              // round to step precision
              const decimals = (step.toString().split(".")[1] || "").length;
              const rounded = Math.round(clamped / step) * step;
              onChange(Number(rounded.toFixed(decimals)));
            } else {
              onChange(min);
            }
          }}
        />
      </div>
    </div>
  );
}

function KpiCard({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.card} p-5`}>
      <div className="text-slate-300 text-xs">{title}</div>
      {children}
    </div>
  );
}
