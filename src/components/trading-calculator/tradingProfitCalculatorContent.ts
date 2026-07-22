// Shared, plain-string content for TradingCalculator + ProfitCalculator.
// Passed through getTranslatedStatic() by a Server Component ancestor for
// non-English locales; these English values are the safe default.
//
// NOTE: values that embed a live/dynamic number (e.g. "Min Lot: {value}")
// use a `{value}` placeholder token — interpolate with `.replace("{value}", ...)`
// at render time. Never turn these into template literals or functions,
// since the whole object is passed through Weglot as plain strings.
export const tradingProfitCalculatorContent = {
  // Trade Settings panel
  tradeSettingsHeading: "Trade Settings :",
  tradeSettingsSubtitleTrading: "Plan your margin, spread cost, and swaps",
  tradeSettingsSubtitleProfit: "Estimate your profit",

  // Shared field labels
  accountCurrencyLabel: "Account Currency",
  instrumentLabel: "Instrument",
  leverageLabel: "Leverage",
  positionLabel: "Position",
  lotSizeLabel: "Lot Size",
  minLotLabel: "Min Lot: {value}",
  bidPriceLabel: "Bid Price",
  askPriceLabel: "Ask Price",
  openPriceLabel: "Open Price",
  closePriceLabel: "Close Price",

  // Validation messages
  lotSizeMinError:
    "Please enter a lot size greater than or equal to the minimum allowed.",
  negativeValueError: "Value cannot be negative",
  askLessThanBidError: "Value cannot be less than bidPrice",

  // Action
  calculateButton: "Calculate",

  // Results panel
  resultsHeading: "Results :",
  resultsSubtitle: "based on your selected parameters",

  // TradingCalculator result labels
  marginLongLabel: "Margin Long",
  marginShortLabel: "Margin Short",
  contractSizeLabel: "Contract Size",
  spreadsLabel: "Spreads",
  pointValueLabel: "Point Value",
  swapLongLabel: "Swap long",
  swapShortLabel: "Swap Short",
  pipsUnit: "pips",

  // ProfitCalculator result label
  profitLabel: "Profit",

  // Triple-swap disclaimer, split around the two static bold day names so
  // no JSX/markup ever lives inside a content value.
  tripleSwapNotePrefix: "Note: Triple swaps are applied on ",
  tripleSwapWednesday: "Wednesday",
  tripleSwapMid: " for FX and metals, and on ",
  tripleSwapFriday: "Friday",
  tripleSwapSuffix: " for all other instruments.",
};

export type TradingProfitCalculatorContent =
  typeof tradingProfitCalculatorContent;
