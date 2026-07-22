import { defaultTableHeaders } from "./livePricingContent";

export const livePricingMetalsContent = {
  headingBefore: "",
  headingHighlight: "Live",
  headingAfter: " Metals Pricing",
  description:
    "Raw spreads. Zero commissions. A-Book execution across all precious metals.",
  tableHeaders: { ...defaultTableHeaders },
};

export type LivePricingMetalsContent = typeof livePricingMetalsContent;
