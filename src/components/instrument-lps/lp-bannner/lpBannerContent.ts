// LPBanner is a Client Component ('use client'), so it can't call the
// Weglot translation pipeline itself — this content is translated once in
// the Server Component caller (src/app/(trade)/trade/[slug]/page.tsx) via
// getTranslatedStatic("lp-banner", locale, lpBannerContent) and passed down
// as a `content` prop.
export const lpBannerContent = {
  // Merged into one templated string rather than a "Trade " prefix +
  // separate ticker — a bare "Trade " with no object mistranslates as the
  // noun "Comercio" (commerce) instead of the imperative verb. "Trade
  // {sym}" together gives Weglot's MT enough context to produce "Operar con
  // {sym}" correctly (verified live; matches the xauusd heading below,
  // which already reads "Operar con oro").
  tradeHeading: "Trade {sym}",
  xauusd: {
    heading: "Trade Gold (XAU/USD)",
    subheading: "Institutional Access. Zero Commission.",
    bullet1: "Spot gold exposure with sub-50ms execution",
    bullet2: "Zero commission on every lot, every session",
    bullet3: "23-hour market access across all platforms",
  },
  default: {
    subtitleSuffix: "% Lower Cost vs Industry Avg",
    netCostLabel: "Net Cost /lot",
    flowRewardsLabel: "/lot in Flow Rewards",
    bullet3: "Savings Compound With Volume",
  },
  dataZero: {
    subtitle: "With Flow Rewards",
    getPaidPrefix: "Get paid $",
    getPaidLabel: "/lot with Flow Rewards",
    bullet2: "Your rewards build with every trade",
    bullet3: "More volume means lower effective costs",
  },
  rebateNull: {
    zeroRewardsPrefix: "Flow Rewards",
    zeroRewardsSuffix: "are currently $0.00 /lot",
    bullet2: "Trading costs are not reduced by rewards",
    bullet3: "Pricing remains unchanged as volume increases",
  },
  inviteOnlyNote: "Invite only access for approved trading profiles.",
  dataVerifiedNote: "*Data Verified by ForexBenchmark",
};

export type LpBannerContent = typeof lpBannerContent;
