"use client";
import styles from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import DollarSavingsCalculator from "@/components/all-calculators/CostSavingCalculator/CostSavingCalculator";

type SectionProps = Blocks["section-datavisualization"];

export default function DataVisual(props: SectionProps) {
  const {
    data_visialization_section_section_title,
    data_visialization_section_paragraph,
  } = props;

  return (
    <section className={`${styles.section_earning_flow} compact-section`}>
      <div className="grainy_bg"></div>
      <div className="ap_container_small">
        <div className={`${styles.costAdvantageSection} `}>
          <div
            className="h2-size font-semibold"
            dangerouslySetInnerHTML={{
              __html: data_visialization_section_section_title || "&nbsp;",
            }}
          />
          <div className="flex items-end justify-between mb-5 md:mb-10">
            <p className="paragraph max-w-[800px]">
              {data_visialization_section_paragraph}
            </p>
          </div>
          <DollarSavingsCalculator />
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
          ),
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
