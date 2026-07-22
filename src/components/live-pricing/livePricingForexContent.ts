import { defaultTableHeaders } from "./livePricingContent";

export const livePricingForexContent = {
  headingBefore: "Lowest ",
  headingHighlight: "Verified Forex",
  headingAfter: " Pricing",
  description:
    "Raw spreads. Zero commissions. A-Book execution across all precious metals. Plus Flow Rewards™. We pay you on your volume.",
  tableHeaders: { ...defaultTableHeaders },
  cta1BeforeEurusd: "Explore detailed pricing for ",
  eurusdLinkText: "EUR/USD with zero commissions",
  cta1Comma1: ", ",
  gbpusdLinkText: "GBP/USD trading conditions",
  cta1And: ", and ",
  audusdLinkText: "AUD/USD low-cost execution",
  cta1Or: " or ",
  liveSpreadsLinkText: "live forex spreads",
  cta1Suffix: " and other instruments.",
  readyToComparePrefix: "Ready to compare? ",
  calculatorLinkText: "Calculate your trading costs",
  readyToCompareMiddle:
    " across your typical trading volume to see the total savings or ",
  compareLinkText: "compare broker costs",
  readyToCompareSuffix: " across 10+ brokers.",
};

export type LivePricingForexContent = typeof livePricingForexContent;
