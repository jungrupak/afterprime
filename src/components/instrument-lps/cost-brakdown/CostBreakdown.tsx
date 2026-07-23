"use client";
import CostBreakdownTable from "./CostBreakdownTable";
import type { CostBreakdownTableContent } from "./costBreakdownTableContent";

interface Breakdown {
  instrument?: string;
  content?: CostBreakdownTableContent;
}

export default function CostBreakdown({ instrument, content }: Breakdown) {
  if (!instrument) return null;

  return <CostBreakdownTable instrument={instrument} content={content} />;
}
