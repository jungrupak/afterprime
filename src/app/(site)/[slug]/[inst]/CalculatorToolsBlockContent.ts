// CalculatorToolsBlock is a Client Component ('use client'), so it can't
// call the Weglot translation pipeline itself — this content is translated
// once in a Server Component ancestor via
// getTranslatedStatic("calculator-tools-block", locale, calculatorToolsBlockContent)
// and passed down as the `content` prop. The description embeds a live
// {instrument} value — interpolated with .replace() at render time in
// CalculatorToolsBlock.tsx. calCardData's href/pageUrl values are untouched
// here; only the display names below are wired into content.x in the
// component.
export const calculatorToolsBlockContent = {
  calculatorNames: {
    positionSize: "Position Size & Risk Calculator",
    tradingCost: "Trading Cost Calculator",
    marginLeverage: "Margin & Leverage Calculator",
    swapOvernight: "Swap / Overnight Cost Calculator",
    pipLotValue: "Pip / Lot Value Calculator",
  },
  heading: "Run the Numbers Yourself",
  descriptionPrefix:
    "Use Afterprime’s professional",
  calculatorsLinkText: "trading calculators",
  description:
    "to model position sizing, margin requirements, swap impact, and true trading cost for {instrument}.",
  availableCalculators: "Available Calculators",
  footnote: "Calculators default to Afterprime trading specifications.",
};

export type CalculatorToolsBlockContent = typeof calculatorToolsBlockContent;
