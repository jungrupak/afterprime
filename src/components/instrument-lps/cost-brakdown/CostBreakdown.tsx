"use client";
import CostBreakdownTable from "./CostBreakdownTable";

interface Breakdown {
  instrument?: string;
}

export default function CostBreakdown({ instrument }: Breakdown) {
  if (!instrument) return null;

  return (
    <div className={`opacity-65`}>
      {data.instrument_name} Flow Rewards<sup>TM</sup>
    </div>
    <div className="my-8 md:my-20">
      <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
        {instrument.toUpperCase()} All-In-Cost
      </h2>
      <CostBreakdownTable instrument={instrument} />
      <div className={`text-[14px] w-full text-center mt-10 opacity-65`}>
        Flow Rewards<sup>TM</sup> are credited per traded lot (round turn) and
        recorded as a separate PnL line.
      </div>
    </div>
  );
}
