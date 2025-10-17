"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Chart, { Plugin, PointElement } from "chart.js/auto";
import styles from "./style.module.scss";
import Button from "@/components/ui/Button";
import { Blocks } from "@/types/blocks";

type SectionProps = Blocks["section-datavisualization"];

type BrokerApiData = {
  broker: string;
  symbol: string;
  cost: number;
  costPerLot: number;
  savingPercentage: number;
};

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

export default function DataVisual(props: SectionProps) {
  const {
    data_visialization_section_section_title,
    data_visialization_section_paragraph,
  } = props;

  // Inputs
  const [start, setStart] = useState(100_000);
  const [lots, setLots] = useState(100);
  const [retPct, setRetPct] = useState(2);
  const [months, setMonths] = useState(60);
  const [b1, setB1] = useState("Industry Average");
  const [b2, setB2] = useState("Tickmill UK (Raw)");
  const [b3, setB3] = useState("FXCM");

  // KPI values
  const [apEnd, setApEnd] = useState(0);
  const [apRet, setApRet] = useState(0);
  const [b1End, setB1End] = useState(0);
  const [b1Ret, setB1Ret] = useState(0);
  const [advAbs, setAdvAbs] = useState(0);
  const [advPct, setAdvPct] = useState(0);

  const [brokerData, setBrokerData] = useState<Record<string, BrokerApiData>>(
    {}
  );
  const [COSTS, setCOSTS] = useState<Record<string, number>>({}); // dynamic costs

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"line", number[], number> | null>(null);

  // Fetch broker costs dynamically and generate COSTS
  useEffect(() => {
    fetch(
      "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true"
    )
      .then((res) => res.json())
      .then((res) => {
        const dynamicCosts: Record<string, number> = {};
        const map: Record<string, BrokerApiData> = {};

        res.brokers.forEach((b: BrokerApiData) => {
          let label = b.broker;
          if (label === "Top 10 Avg") label = "Top 10";
          if (label === "Industry Avg") label = "Industry Average";

          dynamicCosts[label] = b.costPerLot;
          map[label] = b;
        });

        // Add Afterprime if not in API
        if (!dynamicCosts["Afterprime"]) dynamicCosts["Afterprime"] = 4.2;

        setCOSTS(dynamicCosts);
        setBrokerData(map);
      })
      .catch(console.error);
  }, []);

  // Generate options for dropdowns, filter duplicates
  const optionsList = useMemo(() => {
    const allBrokers = Object.keys(COSTS)
      .filter((b) => b !== "Industry Average" && b !== "Top 10") // remove duplicates
      .sort();

    return [
      "Industry Average",
      "Top 10",
      "—DIVIDER—",
      "Afterprime",
      ...allBrokers,
    ];
  }, [COSTS]);

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

        data.datasets.forEach((ds) => {
          const meta = chart.getDatasetMeta(data.datasets.indexOf(ds));
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
    const picks = [b1, b2, b3];

    const seriesDefs: Array<{ label: string; color: string; c: number }> = [];

    ["Afterprime", "Industry Average"].forEach((label) => {
      const cost = COSTS[label] ?? 0;
      seriesDefs.push({
        label,
        color: BROKER_COLORS[label] ?? "#ef4444",
        c: cost,
      });
    });

    picks.forEach((bk, idx) => {
      if (!bk || bk === "—DIVIDER—") return;
      if (seriesDefs.some((s) => s.label === bk)) return;
      const cost = COSTS[bk];
      if (typeof cost !== "number") return;
      seriesDefs.push({
        label: bk,
        color: BROKER_PICK_COLORS[idx] ?? "#ef4444",
        c: cost,
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
    if (!Object.keys(COSTS).length) return; // wait for API
    const calc = computeSeries();

    const ap =
      calc.series.find((s) => s.def.label === "Afterprime")?.data.at(-1) ?? 0;
    const ind =
      calc.series
        .find((s) => s.def.label === "Industry Average")
        ?.data.at(-1) ?? 0;
    const b1Series = calc.series.find((s) => s.def.label === b1);
    const b1Val = b1Series?.data.at(-1) ?? ind;

    setApEnd(ap);
    setApRet(((ap - start) / start) * 100);
    setB1End(b1Val);
    setB1Ret(((b1Val - start) / start) * 100);
    setAdvAbs(Math.max(0, ap - b1Val));
    setAdvPct(((ap - b1Val) / Math.abs(start)) * 100);

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
          layout: { padding: { right: 100 } },
          plugins: {
            legend: {
              labels: {
                color: "#cbd5e1",
                boxWidth: 10,
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
                callback: (v) => `$${Number(v).toLocaleString()}`,
              },
              grid: { color: "rgba(148,163,184,.15)" },
            },
          },
        },
      });
    }
  }

  useEffect(() => {
    drawChart();
  }, [COSTS, start, lots, retPct, months, b1, b2, b3]);
  useEffect(() => () => chartRef.current?.destroy(), []);

  const reset = () => {
    setStart(100_000);
    setB1("Industry Average");
    setB2("Tickmill UK (Raw)");
    setB3("FXCM");
    setMonths(60);
    setLots(100);
    setRetPct(2);
  };

  return (
    <section className={styles.section_earning_flow}>
      <div className="grainy_bg"></div>
      <div className="ap_container">
        <div className={styles.costAdvantageSection}>
          <h2 className="h2-size font-semibold">
            {data_visialization_section_section_title}
          </h2>
          <div className="flex items-end justify-between">
            <p className="paragraph max-w-[800px]">
              {data_visialization_section_paragraph}
            </p>
            <Button varient="secondary" size="small" onclick={reset}>
              Reset
            </Button>
          </div>

          {/* Inputs */}
          <div className="mt-20 ap_cards_wrapper grid max-md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-6 md:mt-18 mb-15 max-md:mb-10">
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
              onChange={setB1}
              options={optionsList}
            />
            <BrokerSelect
              label="Broker 2"
              value={b2}
              onChange={setB2}
              options={optionsList}
              allowNone
            />
            <BrokerSelect
              label="Broker 3"
              value={b3}
              onChange={setB3}
              options={optionsList}
              allowNone
            />
          </div>

          {/* Range sliders */}
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

          {/* Chart */}
          <div
            className={`{styles.card} p-4 mt-[20px]`}
            style={{ height: 420 }}
          >
            <canvas ref={canvasRef} />
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-[20px] gap-[20px]">
            <KpiCard title="Afterprime Ending Equity">
              {USD(apEnd)}
              <br />
              <small>
                {apRet.toFixed(1)}% / {months}m
              </small>
            </KpiCard>
            <KpiCard title={`${b1} Ending Equity`}>
              {USD(b1End)}
              <br />
              <small>
                {b1Ret.toFixed(1)}% / {months}m
              </small>
            </KpiCard>
            <KpiCard title={`Afterprime Advantage Vs ${b1}`}>
              {USD(Math.max(0, advAbs))}
              <br />
              <small>{advPct.toFixed(1)}%</small>
            </KpiCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */
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
            <option key={`${o}-${i}`} value={o}>
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
              const decimals = (step.toString().split(".")[1] || "").length;
              onChange(Number(clamped.toFixed(decimals)));
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
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.card + " p-4 space-y-2"}>
      <div className="text-slate-300 text-xs">{title}</div>
      <div className="text-3xl font-semibold mt-1">{children}</div>
    </div>
  );
}
