// CostComparison is an async Server Component, so it can call
// getTranslatedStatic itself (no separate content-prop plumbing needed,
// same pattern as InnerBanner/DataVisual). `{sym}` is interpolated with
// .replace() at render time, after translation — not `{instrument}`: Weglot's
// MT treats "instrument" as a real word and translates it too, silently
// breaking the placeholder (see 12-Weglot-Dashboard-Fixes.md).
//
// NOT included here on purpose: broker names ("Afterprime", "IC Markets
// (Raw)", etc). Those are compared with strict `===`/`.includes()` against
// the live feed.afterprime.com API response and used as lookup keys
// (brokerSlugMap, commissionByBroker) — translating them would desync the
// display from the API data and break those lookups with no visible error.
// They stay as literal English strings read straight from the API/component,
// never routed through this content object.
//
// Also NOT included: schemaData (the Dataset JSON-LD script). Every other
// structured-data block in this codebase (breadcrumbs, FAQPage, Organization)
// is left untranslated by deliberate convention — kept consistent here too.
export const costComparisonContent = {
  heading: "Compare {sym} Broker Costs",
  tableHeaders: {
    spreadLine1: "Spread",
    spreadLine2: "(Incl. Commission)",
    allInCostLine1: "All-In Cost",
    allInCostLine2: "(Lot Round Turn)",
    flowRewardsLine1: "Flow Rewards",
    flowRewardsLine2: "(Lot Round Turn)",
    netCostLine1: "Net Cost",
    netCostLine2: "(Lot Round Turn)",
    savingsLine1: "Savings",
    savingsLine2: "(vs Afterprime)",
  },
  dataLabels: {
    broker: "Broker",
    spread: "Spread (Incl. Commission)",
    allInCost: "All-In-Cost (Lot Round Turn)",
    flowRewards: "Flow Rewards (Lot Round Turn)",
    netCost: "Net Cost (Lot Round Turn)",
    savings: "Savings (vs Afterprime)",
  },
  savingsFootnote:
    "Savings represent how much more each broker costs per trade compared to Afterprime, after fees and rebates.",
  lowestCostPrefix: "The Lowest {sym} Cost Broker is ",
  lowestCostAtPrefix: " at $",
  lowestCostSuffix: "/lot round turn.",
  rankedPrefix: "Ranked #1 Lowest Cost Broker on ",
  rankedLinkText: "ForexBenchmark",
  rankedSuffix: ". All prices quoted in US Dollars.",
  footnoteSourcePrefix: "Source: ",
  footnoteSourceLinkText: "ForexBenchmark",
  footnoteSourceMiddle:
    " - Previous 7 Days Range | {sym} Pair | Incl. Commissions + Spreads.",
  legalPart1:
    "Afterprime net cost figures include Flow Rewards™, applicable to eligible client accounts on qualifying instruments. Flow Rewards™ rates may vary. See ",
  legalLinkText: "Flow Rewards",
  legalPart2:
    " for full eligibility criteria. Flow Rewards™ eligibility and rates are subject to account approval. Savings modelled using ForexBenchmark 7-day average spread data. Actual savings will vary with live spread conditions and applicable Flow Rewards™ rate.",
  legalRanked:
    "Ranked #1 lowest all-in net cost for {sym} among brokers tracked by ForexBenchmark.com. Rankings are subject to change as market conditions and broker pricing fluctuate.",
  legalSavingsExplain:
    "Savings represent the percentage by which each broker's all-in cost per lot exceeds Afterprime's net cost after Flow Rewards™. Competitor costs reflect their lowest-cost equivalent account type.",
  legalExecutionQuality:
    "Execution quality metrics are based on internal order data under normal market conditions. Performance may vary during periods of high volatility or low liquidity.",
  legalDisclaimer:
    "Cost comparisons are based on third-party data and are for informational purposes only. Trading involves significant risk of loss. Individual trading costs will vary based on account type, instrument, and market conditions.",
};

export type CostComparisonContent = typeof costComparisonContent;
