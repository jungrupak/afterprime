// Hardcoded Profit/Loss Calculator copy — extracted here so it can be run
// through getTranslatedStatic (same Weglot pipeline as header/footer content,
// see MarginCalculatorContent.ts for the sibling precedent).
//
// IMPORTANT: messages containing a live numeric value use a `{token}`
// placeholder instead of a JS template literal, so the translation walker
// (which only sees plain string values) can translate the surrounding text.
// The component interpolates the real values back in with `.replace(...)`
// after translation.
//
// NOTE: "USD"/"EUR"/"GBP"/"AUD" account-currency option labels are NOT
// included here on purpose — they're ISO currency codes, not translatable
// prose, and are left as literal JSX text in the component.
export const profitLossCalculatorContent = {
  loadingExchangeRates: "Loading exchange rates...",
  unableToLoadInstruments: "Unable to load instruments, please refresh.",

  instrumentLabel: "Instrument",
  directionLabel: "Direction",
  directionBuyLong: "Buy/Long",
  directionSellShort: "Sell/Short",

  entryPriceLabel: "Entry Price",
  stopLossPriceLabel: "Stop-Loss Price",
  takeProfitPriceLabel: "Take-Profit Price",

  positionSizeLabel: "Position Size",
  unitStandardLots: "Standard Lots",
  unitMiniLots: "Mini Lots",
  unitMicroLots: "Micro Lots",
  unitUnits: "Units",

  accountCurrencyLabel: "Account Currency",

  resultPotentialProfitLabel: "Potential Profit",
  resultPotentialLossLabel: "Potential Loss",

  rrRatioLabel: "Risk : Reward Ratio",
  rrRatioValue: "1 : {value}",
  rrRiskLabel: "Risk",
  rrRewardLabel: "Reward",

  breakevenLabel: "Win Rate Needed to Break Even:",

  resultItemEntryPriceLabel: "Entry Price",
  resultItemPositionUnitsLabel: "Position (Units)",
  resultItemPipValueLabel: "Pip Value",
  resultItemNotionalValueLabel: "Notional Value",

  viewFormulasSummary: "View Formulas",
  formulaProfitLossLabel: "Profit/Loss",
  formulaProfitLossText:
    "= Pips × Pip Value × Position Size (in standard lots)",
  formulaPipsLabel: "Pips",
  formulaPipsText: "= |Entry Price - Exit Price| ÷ Pip Size",
  formulaRiskRewardLabel: "Risk:Reward",
  formulaRiskRewardText: "= (TP - Entry) ÷ (Entry - SL) for long positions",
  formulaBreakEvenLabel: "Break-Even Win Rate",
  formulaBreakEvenText: "= 1 ÷ (1 + R:R ratio)",
};

export type ProfitLossCalculatorContent = typeof profitLossCalculatorContent;
