// Plain-string content for the TradingCalculatorClient tab shell.
// Passed through getTranslatedStatic() by a Server Component ancestor for
// non-English locales; these English values are the safe default.
//
// NOTE: the underlying tab switching logic compares `activeIndex === idx`
// (a numeric index), never these label strings — so these values are safe
// to translate freely without touching any comparison/branching logic.
export const tradingCalculatorClientContent = {
  tradingCalculatorTab: "Trading Calculator",
  profitCalculatorTab: "Profit Calculator",
  tradingHeading: "Trading",
  profitHeading: "Profit",
};

export type TradingCalculatorClientContent =
  typeof tradingCalculatorClientContent;
