// CostBreakdownTable is a Client Component ('use client'), so it can't call
// the Weglot translation pipeline itself — this content is translated once
// in each Server Component caller (via flexibleContentMap's renderSection
// options) and passed down as a `content` prop.
export const costBreakdownTableContent = {
  volumeLine1: "Volume",
  volumeLine2: "(Lots)",
  netCostLine1: "Net Cost",
  netCostLine2: "(Lot Round Turn)",
  flowRewardsLine1: "Flow Rewards",
  flowRewardsRateSuffix: "/lot)",
  // "Saved" alone mistranslates as "Guardado" (file-saved, not money-saved)
  // — Weglot has no context that this is a savings column. "Savings"
  // translates correctly and matches the same column's label in the
  // sibling CostComparison table.
  savedLine1: "Savings",
  savedLine2: "(vs Industry Avg.)",
};

export type CostBreakdownTableContent = typeof costBreakdownTableContent;
