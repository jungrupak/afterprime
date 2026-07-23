// Accordion is a Client Component ('use client'), so it can't call the
// Weglot translation pipeline itself — this content is translated once in
// VsSymbolPage (Server Component) via getTranslatedStatic("vs-symbol-faq",
// locale, vsSymbolFaqContent) and passed down as translated templates.
// Live values (broker name, costs, symbol, savings) are interpolated with
// .replace() at render time, after translation.
export const vsSymbolFaqContent = {
  q1: "Is Afterprime cheaper than {brokerName} for {symbol}?",
  a1Cheaper:
    "Yes. Based on current live data, Afterprime's all-in {symbol} cost is {apCost}/lot versus {brokerName}'s {compCost}/lot, a {savingPct}% difference. On 100 lots that's {saving100} in your favour.",
  a1NotCheaper:
    "No. Based on current live data, Afterprime's all-in {symbol} cost is {apCost}/lot versus {brokerName}'s {compCost}/lot",
  q2: "Does {brokerName} charge commission on {symbol}?",
  a2: "{brokerName}'s all-in cost includes spread and any applicable commission depending on account type. Afterprime charges $0 commission on all trades cost is entirely spread-based.",
  q3: "What is Afterprime's Flow Rewards and how does it affect the comparison?",
  a3Prefix:
    "Flow Rewards is a structural rebate of up to $3/lot paid back to active traders. ",
  a3RebateAvailable:
    "The current {symbol} rate is {rebate}/lot, bringing Afterprime's net cost to {apNetCost}/lot.",
  a3RebateUnavailable: "Flow Rewards is not available for {symbol}",
  q4: "How often is this data updated?",
  a4: "Spread and cost data is sourced from Forexbenchmark.com's feed and reflects current market conditions. Data is refreshed approximately every 12 hours.",
};

export type VsSymbolFaqContent = typeof vsSymbolFaqContent;
