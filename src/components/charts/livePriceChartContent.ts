// LivePriceChart is a Client Component ('use client'), so it can't call the
// Weglot translation pipeline itself — this content is translated once in
// each Server Component caller via
// getTranslatedStatic("live-price-chart", locale, livePriceChartContent)
// and passed down as a `content` prop.
export const livePriceChartContent = {
  livePriceLabel: "Live Price",
  swapRateLabel: "Swap Rate",
  tradingHoursLabel: "Trading Hours",
  // Bare "Ask:" has no context that this is the bid/ask price label —
  // Weglot's MT reads it as the verb ("Pregunte:" = "Ask [a question]:").
  // "Ask Price:" translates correctly as "Precio de venta:", the actual
  // Spanish trading term for the ask/sell price.
  askLabel: "Ask Price:",
  spreadLabel: "Spread:",
};

export type LivePriceChartContent = typeof livePriceChartContent;
