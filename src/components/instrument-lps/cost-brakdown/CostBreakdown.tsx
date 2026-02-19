"use client";
import CostBreakdownTable from "./CostBreakdownTable";

interface Breakdown {
  instrument?: string;
}

export default function CostBreakdown({ instrument }: Breakdown) {
  if (!instrument) return null;

  return <CostBreakdownTable instrument={instrument} />;
}
