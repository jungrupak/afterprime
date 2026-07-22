// Hardcoded Margin Calculator copy — extracted here so it can be run through
// getTranslatedStatic (same Weglot pipeline as header/footer content).
//
// IMPORTANT: messages containing a live numeric value use a `{token}`
// placeholder instead of a JS template literal, so the translation walker
// (which only sees plain string values) can translate the surrounding text.
// The component interpolates the real values back in with `.replace(...)`
// after translation.
export const marginCalculatorContent = {
  loadingMarketData: "Loading market data...",
  unableToLoadInstruments: "Unable to load instruments, please refresh.",

  instrumentLabel: "Instrument",
  currentPriceLabel: "Current Price",
  updatingLabel: "(Updating...)",
  tradeSizeLabel: "Trade Size",
  unitStandardLots: "Standard Lots",
  unitMiniLots: "Mini Lots",
  unitMicroLots: "Micro Lots",
  leverageLabel: "Leverage",
  accountBalanceLabel: "Account Balance",
  accountCurrencyLabel: "Account Currency",

  resultMarginRequiredLabel: "Margin Required",
  resultOfAccountBalance: "of {amount} account balance",
  resultNotionalValueLabel: "Notional Value",
  resultNotionalValueNote: "Total position size",
  resultFreeMarginLabel: "Free Margin",
  resultFreeMarginNote: "Available for new trades",
  resultMarginLevelLabel: "Margin Level",
  resultMarginLevelNote: "Equity / Used Margin",
  resultEffectiveLeverageLabel: "Effective Leverage",
  resultEffectiveLeverageNote: "Position / Account",

  warningTitle: "Leverage Risk Assessment",
  riskLowMessage:
    "Your effective leverage of 1:{leverage} is conservative. You're using {marginUsed}% of your account as margin, leaving substantial buffer for price movement.",
  riskModerateMessage:
    "Your effective leverage of 1:{leverage} is moderate. Using {marginUsed}% of account as margin. A {move}% move against you would lose your entire account.",
  riskHighMessage:
    "Warning: Effective leverage of 1:{leverage} is high. Using {marginUsed}% margin. Only {move}% adverse move would wipe your account. Consider reducing position size.",
  riskExtremeMessage:
    "Extreme Risk: With 1:{leverage} effective leverage and {marginUsed}% margin used, you're highly exposed to margin call. A mere {move}% move could liquidate your position.",
  riskLabelLow: "Low",
  riskLabelModerate: "Moderate",
  riskLabelHigh: "High",
  riskLabelExtreme: "Extreme",

  marginCallTitle: "Margin Call / Stop-Out Levels",
  marginCallLevelDesc: "Margin Call Level",
  stopOutLevelDesc: "Stop-Out Level",
  mcMovePercent: "{percent}% move",
  mcAlreadyBelow: "Already below",
  mcNote:
    "Price movement against position that triggers these levels (approximate)",

  viewFormulasSummary: "View Formulas",
  formulaMarginRequiredLabel: "Margin Required",
  formulaMarginRequiredText:
    "= (Notional Value ÷ Leverage) converted to account currency",
  formulaNotionalValueLabel: "Notional Value",
  formulaNotionalValueText: "= Contract Size × Lots × Price",
  formulaMarginLevelLabel: "Margin Level %",
  formulaMarginLevelText: "= (Equity ÷ Used Margin) × 100",
  formulaEffectiveLeverageLabel: "Effective Leverage",
  formulaEffectiveLeverageText: "= Notional Value ÷ Account Balance",
};

export type MarginCalculatorContent = typeof marginCalculatorContent;
