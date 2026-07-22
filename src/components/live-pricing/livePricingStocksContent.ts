import { defaultTableHeaders } from "./livePricingContent";

export const livePricingStocksContent = {
  headingBefore: "Keep More, ",
  headingHighlight: "Earn More.",
  headingAfter: "",
  description:
    "Lowest all-in trading costs, plus Flow Rewards™ that pay you per lot traded.",
  tableHeaders: { ...defaultTableHeaders },
};

export type LivePricingStocksContent = typeof livePricingStocksContent;
