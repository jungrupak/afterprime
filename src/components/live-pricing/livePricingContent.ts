export interface LivePricingTableHeaders {
  symbol: string;
  bid: string;
  ask: string;
  spread: string;
  marketStatus: string;
  marketHours: string;
  tradingHoursLink: string;
  specsLink: string;
}

export const defaultTableHeaders: LivePricingTableHeaders = {
  symbol: "Symbol",
  bid: "Bid",
  ask: "Ask",
  spread: "Spread",
  marketStatus: "Status",
  marketHours: "Market Hours",
  tradingHoursLink: "Trading Hours",
  specsLink: "Specs",
};

export const livePricingContent = {
  headingBefore: "Real-Time Spreads. ",
  headingHighlight: "Get Paid to Trade.",
  headingAfter: "",
  description:
    "Live bid/ask pricing across Forex, Crypto, Commodities, Metals, and Indices, no markup, no hidden spread.",
  tableHeaders: {
    symbol: "Symbol",
    bid: "Bid Price",
    ask: "Ask Price",
    spread: "Spread",
    marketStatus: "Status",
    marketHours: "Market Hours",
    tradingHoursLink: "Trading Hours",
    specsLink: "Specs",
  },
  marketStatus: {
    open: "Open",
    break: "Break",
    closed: "Closed",
  },
  compareTradingCost: "Compare Trading Cost",
  readyToCompare:
    "Ready to compare? Calculate your trading costs across your typical trading volume to see the total savings.",
  readyToCompareLinkText: "Calculate your trading costs",
  caption:
    "Beyond Zero-Commission, Get Paid to Trade. Popular Instruments, Forex, Crypto, Commodities, Metals, Indices",
  // Tab nav display labels — order matches pricingCatLists in
  // LivePricingAll.tsx (index-based, not value-based, so translating these
  // directly can't desync the table shown per tab).
  tabLabels: ["Popular", "Forex", "Crypto", "Commodities", "Metals", "Indices"],
};

export type LivePricingContent = typeof livePricingContent;
