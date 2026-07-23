// TradePage (Server Component) translates this once via
// getTranslatedStatic("trade-page", locale, tradePageContent) and passes the
// translated pieces down as props/JSX — Lists is a Client Component and
// can't call the Weglot translation pipeline itself.
export const tradePageContent = {
  heroHeading: "Trade Forex With Verifiable Lowest All-In Costs",
  // Split around the <sup>TM</sup> mark so JSX can keep it un-translated
  // (it's a trademark glyph, not prose) while both text halves translate.
  heroParagraphBefore:
    "Trade major, minor, and exotic FX pairs with transparent pricing, zero commission, and Flow Rewards",
  heroParagraphAfter:
    " credited per lot. Afterprime publishes real all-in costs so you can model execution before deploying capital. No spread games. No hidden charges.",
  pricingHeading: "Why Afterprime Forex Pricing Is Different",
  listItems: [
    `<b>Lowest total cost, not headline spreads</b><br/>
Spreads alone are misleading. Afterprime publishes all-in net cost per lot so you can compare brokers on real economics.
`,
    `<b>Flow Rewards<sup>TM</sup> reduce realized cost</b></br>
Flow Rewards<sup>TM</sup> are credited per traded lot and recorded separately in PnL. This offsets a consistent portion of spread cost and narrows the gap between modeled and realized execution.
`,
    `<b>Execution built for consistency</b></br>
Low latency sensitivity, controlled slippage distribution, and stable fills during fast markets. Execution quality is treated as an engineering problem with financial consequences.`,
  ],
  pairsHeading: "FX Pairs You Can Trade",
  // Currency pair tickers (EURUSD, GBPUSD, ...) stay untranslated identifiers
  // in STATIC_PAIRS — only the group label rendered above each list needs
  // translation. Spelled out as "X Pairs" rather than the bare FX-jargon
  // word ("Minors", "Exotics") — Weglot's MT has no FX context for a lone
  // word and mistranslates them literally (es: "Minors" -> "menores de edad"
  // [underage children], "Exotics" -> "animales exóticos" [exotic animals]).
  categoryLabels: {
    majors: "Major Pairs",
    minors: "Minor Pairs",
    exotics: "Exotic Pairs",
  },
  compareHeading: "How To Compare Forex Trading Costs",
  compareIntro: "Spreads show potential cost. All in cost shows actual cost.",
  publishesLabel: "Afterprime publishes",
  bottomLists: [
    "Cost per lot (including commission)",
    "All-In Cost (round turn)",
    "Flow Rewards<sup>TM</sup> per lot",
    "Net Cost per lot",
    "Savings vs Afterprime",
  ],
  compareOutro:
    "These inputs allow traders to model costs across volume assumptions before trading.",
};

export type TradePageContent = typeof tradePageContent;
