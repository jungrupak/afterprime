import { defaultTableHeaders } from "./livePricingContent";

export const livePricingTradingHoursContent = {
  headingBefore: "Beyond Zero-Commission, ",
  headingHighlight: "Get Paid to Trade.",
  headingAfter: "",
  description: "Get updated on Instruments Trading Hours.",
  tableHeaders: {
    symbol: "Symbol",
    bid: "Bid Price",
    ask: "Ask Price",
    spread: "Spread (Pips)",
    marketHours: "Market Hours",
    tradingHoursLink: "Trading Hours",
  },
  caption:
    "Beyond Zero-Commission, Get Paid to Trade. Popular Instruments, Forex, Crypto, Commodities, Metals, Indices",
  readyToCompare:
    "Ready to compare? Calculate your trading costs across your typical trading volume to see the total savings.",
  readyToCompareLinkText: "Calculate your trading costs",
};

export type LivePricingTradingHoursContent =
  typeof livePricingTradingHoursContent;
