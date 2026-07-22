// SwapCalculatorInline is a Client Component ('use client'), so it can't
// call the Weglot translation pipeline itself — this content is translated
// once in a Server Component ancestor via
// getTranslatedStatic("swap-calculator-inline", locale, swapCalculatorInlineContent)
// and passed down as the `content` prop. Strings that embed a live value
// (symbol, rate, currency, direction) use {token} placeholders, interpolated
// with .replace() at render time in SwapCalculatorInline.tsx — never a
// template literal here, since this object is translated as-is before any
// live values exist.
export const swapCalculatorInlineContent = {
  heading: "Swap Cost Calculator",
  introText:
    "Model the current overnight carry for {symbol} using the live long and short swap values.",
  detailedCalculatorPrefix: "Use the detailed",
  detailedCalculatorLinkText: "Swap Calculator",
  detailedCalculatorSuffix: "if you prefer.",
  lotSizeLabel: "Lot size",
  tradeDirectionLabel: "Trade Direction",
  longLabel: "Long",
  shortLabel: "Short",
  nightsHeldLabel: "Nights held",
  swapCostLabel: "{direction} swap cost =",
  positiveRateHelper:
    "You earn +{rate} {currency} per lot per night at current rates.",
  negativeRateHelper:
    "Current overnight holding cost is {rate} {currency} per lot per night.",
  annualisedNote: "{rate}% annualised",
  positiveCarryEyebrow: "Positive carry",
  positiveCarryTitleLong: "Holding a buy position",
  positiveCarryTitleShort: "Holding a sell position",
  positiveCarryTitleSuffix:
    "on {symbol} overnight earns you +{rate} {currency} per standard lot per night at current rates.",
  positiveCarryBody:
    "This is a carry trade opportunity. Your position generates income rather than incurring a cost while rates remain at these levels.",
};

export type SwapCalculatorInlineContent = typeof swapCalculatorInlineContent;
