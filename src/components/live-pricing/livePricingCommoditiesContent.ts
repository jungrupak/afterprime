import { defaultTableHeaders } from "./livePricingContent";

export const livePricingCommoditiesContent = {
  headingBefore: "",
  headingHighlight: "Live",
  headingAfter: " Commodities Pricing",
  description:
    "Raw spreads. Zero commissions. A-Book execution across all commodity instruments.",
  tableHeaders: { ...defaultTableHeaders },
};

export type LivePricingCommoditiesContent =
  typeof livePricingCommoditiesContent;
