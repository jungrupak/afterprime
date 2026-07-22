export interface LivePricingTableHeaders {
  symbol: string;
  bid: string;
  ask: string;
  spread: string;
  marketHours: string;
  tradingHoursLink: string;
}

export const defaultTableHeaders: LivePricingTableHeaders = {
  symbol: "Symbol",
  bid: "Bid",
  ask: "Ask",
  spread: "Spread",
  marketHours: "Market Hours",
  tradingHoursLink: "Trading Hours",
};

export const livePricingContent = {
  headingBefore: "Beyond Zero-Commission, ",
  headingHighlight: "Get Paid to Trade.",
  headingAfter: "",
  description:
    "Most brokers hide their profit in the spread. We do the opposite. We combine the industry's tightest raw spreads with Flow Rewards™ paying you up to $3/lot back on your volume. We don't just lower your costs; we turn your execution into a revenue stream.",
  tableHeaders: {
    symbol: "Symbol",
    bid: "Bid Price",
    ask: "Ask Price",
    spread: "Spread (Pips)",
    marketHours: "Market Hours",
    tradingHoursLink: "Trading Hours",
  },
  readyToCompare:
    "Ready to compare? Calculate your trading costs across your typical trading volume to see the total savings.",
  readyToCompareLinkText: "Calculate your trading costs",
  caption:
    "Beyond Zero-Commission, Get Paid to Trade. Popular Instruments, Forex, Crypto, Commodities, Metals, Indices",
};

export type LivePricingContent = typeof livePricingContent;
