// SwapCalculator is a Client Component ('use client'), so it can't call the
// Weglot translation pipeline itself. This content is translated once by a
// Server Component ancestor (via getTranslatedStatic) and passed down as the
// `content` prop. Keep every value a plain string — the translator walker
// only touches plain string values, never template literals or functions.
// Messages with an embedded live value use `{token}` placeholders,
// interpolated in the component via `.replace()`.
//
// NOTE: direction state values ("long" | "short"), lotType state values
// ("standard" | "mini" | "micro"), and currency codes (USD/EUR/GBP/AUD) used
// in `value=`/`data-direction` attributes or `===` comparisons are NOT part
// of this object — they stay as stable, untranslated literals in the
// component. Only the rendered/visible label text lives here.
export const swapCalculatorContent = {
  loadingCalculator: "Loading calculator..",
  instrumentsError: "Unable to load instruments, please refresh.",
  instrumentLabel: "Instrument",
  positionDirectionLabel: "Position Direction",
  directionLong: "Long (Buy)",
  directionShort: "Short (Sell)",
  positionSizeLabel: "Position Size",
  unitStandardLots: "Standard Lots",
  unitMiniLots: "Mini Lots",
  unitMicroLots: "Micro Lots",
  daysHeldLabel: "Days Held",
  nightsSuffix: "nights",
  accountCurrencyLabel: "Account Currency",
  swapCredit: "Swap Credit",
  swapCost: "Swap Cost",
  swapPeriodTemplate: "for {days} night{plural}",
  dailySwapLabel: "Daily Swap",
  weeklySwapLabel: "Weekly Swap",
  weeklySwapNote: "includes triple Wednesday",
  monthlySwapLabel: "Monthly Swap",
  annualRateLabel: "Annual Rate",
  annualRateNote: "of position value",
  currentSwapRatesTitle: "Current Swap Rates",
  ratesNote: "Points per standard lot per night (indicative)",
  longSwapLabel: "Long Swap",
  shortSwapLabel: "Short Swap",
  understandingSwapsTitle: "Understanding Swaps",
  tripleWednesdayTitle: "Triple Wednesday",
  tripleWednesdayText:
    "Swaps are charged 3x on Wednesday to account for weekend settlement.",
  rolloverTimeTitle: "Rollover Time",
  rolloverTimeText:
    "Swaps are typically charged at 5 PM New York time (server rollover).",
  interestRateDifferentialTitle: "Interest Rate Differential",
  interestRateDifferentialText:
    "Swaps reflect the difference between the two currencies' interest rates.",
  disclaimerText:
    "Swap rates are indicative and vary by broker. Actual rates depend on your broker's liquidity providers and may change daily. Always verify with your broker before holding positions overnight.",
};

export type SwapCalculatorContent = typeof swapCalculatorContent;
