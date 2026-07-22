import { defaultTableHeaders } from "./livePricingContent";

export const livePricingCryptoContent = {
  headingBefore: "Lowest ",
  headingHighlight: "Crypto Costs.",
  headingAfter: "",
  description:
    "Stop losing your margin to exchange fees. Trade on Crypto CFDs. We offer raw spreads with zero commissions - plus, earn up to $3/lot back via Flow Rewards™ on Bitcoin.",
  tableHeaders: { ...defaultTableHeaders },
};

export type LivePricingCryptoContent = typeof livePricingCryptoContent;
