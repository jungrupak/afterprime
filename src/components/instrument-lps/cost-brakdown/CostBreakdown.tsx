"use client";
import CostBreakdownTable from "./CostBreakdownTable";

interface Breakdown {
  instrument?: string;
}

export default function CostBreakdown({ instrument }: Breakdown) {
  if (!instrument) return null;

  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          {instrument.toUpperCase()} All-In-Cost
        </h2>
        <CostBreakdownTable instrument={instrument} />
        <div className={`text-[14px] w-full text-center mt-10 opacity-65`}>
          Flow Rewards<sup>TM</sup> are credited per traded lot (round turn) and
          recorded as a separate PnL line.
        </div>
      </div>
    </section>
  );
}
