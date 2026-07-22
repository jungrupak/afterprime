// Hardcoded Position Size Calculator copy — extracted here so it can be run
// through getTranslatedStatic (same Weglot pipeline as WordPress content) by
// a Server Component ancestor. PositionSizeCalculator.tsx is a Client
// Component and cannot call the translation pipeline itself, so it accepts
// this shape as an optional `content` prop and falls back to this (English)
// object by default.
//
// NOTE: option `value=` attributes / state-comparison keys used for
// calculation branching (e.g. "CUSTOM", "pips", "points") are NOT part of
// this object — only their rendered/visible text is. See
// PositionSizeCalculator.tsx for how each is kept decoupled.
export const positionSizeCalculatorContent = {
  loading: "Loading instruments...",
  error: "Unable to load instruments, please refresh.",
  labels: {
    accountSize: "Account Size",
    riskPerTrade: "Risk Per Trade (%)",
    stopLossDistance: "Stop-Loss Distance",
    instrument: "Instrument",
    customPipValue: "Pip Value (per standard lot)",
  },
  riskSlider: {
    low: "Conservative",
    high: "Aggressive",
  },
  slUnit: {
    pips: "Pips",
    points: "Points",
  },
  results: {
    recommendedPositionSize: "Recommended Position Size",
    standardLots: "Standard Lots",
    dollarRisk: "Dollar Risk",
    units: "Units",
    miniLots: "Mini Lots",
    microLots: "Micro Lots",
  },
  riskMessages: {
    veryConservative: "Risk level: Very Conservative (Low risk, slower growth)",
    conservative: "Risk level: Conservative (Recommended for most traders)",
    moderate: "Risk level: Moderate (Suitable for experienced traders)",
    aggressive: "Risk level: Aggressive (Higher drawdown potential)",
    veryAggressive: "Risk level: Very Aggressive (High risk of significant losses)",
  },
  formula: {
    summary: "View Formula",
    positionSizeLabel: "Position Size (lots)",
    positionSizeFormula: "= (Account Size × Risk %) ÷ (Stop-Loss × Pip Value)",
    dollarRiskLabel: "Dollar Risk",
    dollarRiskFormula: "= Account Size × Risk %",
    unitsLabel: "Units",
    unitsFormula: "= Position Size × 100,000",
  },
};

export type PositionSizeCalculatorContent = typeof positionSizeCalculatorContent;
