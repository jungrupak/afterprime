import { defaultTableHeaders } from "./livePricingContent";

export const livePricingIndicesContent = {
  headingBefore: "The Lowest ",
  headingHighlight: "Verified Index Costs.",
  headingAfter: "",
  description:
    "Stop overpaying for your exposure. We combine raw spreads with zero commissions across our entire index suite - plus, earn up to $1/lot back via Flow Rewards™ on high-volume like the US500 and DXY.",
  tableHeaders: { ...defaultTableHeaders },
};

export type LivePricingIndicesContent = typeof livePricingIndicesContent;
