// PipValueCalculator is a Client Component ('use client'), so it can't call
// the Weglot translation pipeline itself. This content is translated once
// by a Server Component ancestor (via getTranslatedStatic) and passed down
// as the `content` prop. Keep every value a plain string — the translator
// walker only touches plain string values, never template literals or
// functions. Any string with an embedded live value uses a `{token}`
// placeholder, interpolated in the component via `.replace()`.
//
// NOTE: lotType state values ("standard" | "mini" | "micro") and the
// currency codes (USD/EUR/GBP/AUD) used in `value=` attributes / `===`
// comparisons are NOT part of this object — they stay as stable, untranslated
// literals in the component. Only the rendered label text for the lot-type
// options lives here.
export const pipValueCalculatorContent = {
  loadingRates: "Loading exchange rates...",
  instrumentsError: "Unable to load instruments, please refresh.",
  instrumentLabel: "Instrument",
  positionSizeLabel: "Position Size",
  unitStandardLots: "Standard Lots",
  unitMiniLots: "Mini Lots",
  unitMicroLots: "Micro Lots",
  accountCurrencyLabel: "Account Currency",
  pipValueLabel: "Pip Value",
  pipMovementNote: "per {pipSize} movement",
  standardLotName: "Standard Lot",
  standardLotUnits: "100,000 units",
  miniLotName: "Mini Lot",
  miniLotUnits: "10,000 units",
  microLotName: "Micro Lot",
  microLotUnits: "1,000 units",
  pipMovementImpactTitle: "Pip Movement Impact",
  tableHeaderPips: "Pips",
  tableHeaderYourPosition: "Your Position",
  tableHeaderStandardLot: "Standard Lot",
};

export type PipValueCalculatorContent = typeof pipValueCalculatorContent;
