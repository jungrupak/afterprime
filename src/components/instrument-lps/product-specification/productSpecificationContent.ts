// ProductSpecification is a Client Component ('use client'), so it can't
// call the Weglot translation pipeline itself — this content is translated
// once in the Server Component caller (trade/[slug]/page.tsx) via
// getTranslatedStatic("product-specification", locale,
// productSpecificationContent) and passed down as a `content` prop.
// `{sym}` is interpolated with .replace() at render time, after
// translation — not `{instrument}`: Weglot's MT treats "instrument" as a
// real word and translates it too, silently breaking the placeholder (see
// 12-Weglot-Dashboard-Fixes.md). The shared paragraph is split into pieces
// around the two embedded links and the <sup>TM</sup> mark so those stay
// outside the translated strings.
export const productSpecificationContent = {
  paragraphPart1: "Afterprime's trading environment gives you complete cost transparency. Every {sym} quote displays ",
  realTimeSpreadLinkText: "real-time spread pricing",
  paragraphPart2:
    ", no hidden markups, no commission surprises. Use the integrated calculator to ",
  calculateCostsLinkText: "calculate trading costs",
  paragraphPart3:
    " for any position size before you trade. This clarity matters: when spreads are genuinely lower and you're earning Flow Rewards",
  paragraphPart4:
    " on every lot, the savings accelerate. {sym}'s deep liquidity and our structural cost advantage make it the natural choice for both scalpers and position traders. You can ",
  paragraphPart5: " with institutional-grade execution or alternatively the ",
  paragraphSuffix: ".",
  metals: {
    // "Trade connected metals" (bare "Trade" + noun phrase) mistranslates
    // as the noun "Comercio" again, same trap as the LPBanner heading —
    // reworded to keep MT in verb-phrase territory.
    heading: "Explore Related Metals",
    exploreLinkText: "explore all metals",
    positionSizingLinkText: "position sizing for this instrument",
    tradingHoursCta: "{sym} trading hours",
  },
  forex: {
    heading: "Explore Related FX Pairs",
    exploreLinkText: "explore all forex pairs",
    positionSizingLinkText: "position sizing for this pair",
    specificationCta: "{sym} Specification",
    tradingHoursCta: "{sym} trading hours",
  },
};

export type ProductSpecificationContent = typeof productSpecificationContent;
