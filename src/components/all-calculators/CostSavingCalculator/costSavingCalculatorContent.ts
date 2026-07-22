// Hardcoded copy shared by the three Cost Saving Calculator variants
// (CostSavingCalculator, CostSavingCalculatorPerInstrument, and the
// /vs/cost-calculator broker page) plus ResultSendToEmail — extracted here
// so a single getTranslatedStatic("cost-saving-calculator", locale, ...)
// call upstream can translate all of them in one Weglot round-trip.
//
// IMPORTANT: messages containing a live numeric/dynamic value use a
// `{token}` placeholder instead of a JS template literal, so the
// translation walker (which only sees plain string values) can translate
// the surrounding text. Components interpolate the real values back in
// with `.replace(...)` after translation.
//
// NOT included here on purpose: broker/benchmark labels such as
// "Afterprime", "Industry Avg", "Top 10 Avg", "Second Best", "Darwinex".
// Those strings are also used as comparison keys against the live
// feed.afterprime.com API response (Set membership, array `.includes()`,
// `===` checks) inside each component. Moving them into translated content
// would silently desync the display value from the API's English broker
// names and break cost lookups with zero errors — the exact class of bug
// this refactor is required to avoid. They stay as literal English strings
// in each component, same as today.
export const costSavingCalculatorContent = {
  loading: "Loading data...",
  errorPrefix: "Unable to load broker data: ",
  retry: "Retry",

  badge: "ForexBenchmark verified",
  lotsPerMonthLabel: "Lots per month (1–1000)",
  lotsPerMonthAriaLabel: "Lots per month",
  lotsPerMonthNumberAriaLabel: "Lots per month (number input)",
  compareLabel: "Compare your savings vs broker",
  previousBroker: "Previous broker",
  nextBroker: "Next broker",
  selectBrokerAriaLabel: "Select broker for comparison",
  benchmarksGroupLabel: "Benchmarks",
  brokersGroupLabel: "Brokers",
  statLabelMonthly: "Savings per month vs broker",
  statLabelAnnual: "Total savings over 12 months",
  chartTitle: "Monthly Total Cost",
  reset: "Reset",
  sourcePrefix: "Source: ",
  sourceLinkText: "ForexBenchmark",
  sublineTemplate: "${totSaveAnnual} annually. Graph shows monthly total cost.",

  main: {
    calcTitle: "Your Savings Calculator",
    chartSubtitle:
      "Bars show total trading cost for your selected lots per month.",
    headlineTemplate:
      "Trading {lots} lots / month saves ${moSave} monthly vs {broker}.",
    footnoteSuffix:
      "- Previous 7 Days Range | All Pairs | Incl. Commissions + Spreads",
  },

  perInstrument: {
    calcTitleTemplate: "{instrument} Savings Calculator",
    flowRewardsHeadingTemplate: "{instrument} Flow Rewards",
    headlineTemplate:
      "{instrument} {lots} {lotWord}/month saves ${moSave} monthly vs {broker}.",
    chartSubtitleTemplate:
      "Bars show total cost trading {instrument} {lots} {lotWord}/per month.",
    footnoteSuffixTemplate:
      "- Previous 7 Days Range | {instrument} Pair | Incl. Commissions + Spreads",
    lotSingular: "lot",
    lotPlural: "lots",
  },

  legal: {
    part1:
      "Afterprime net cost figures include Flow Rewards™, applicable to eligible client accounts on qualifying instruments. Flow Rewards™ rates may vary. See ",
    linkText: "Flow Rewards",
    part2: " for full eligibility criteria.",
    part3:
      "Cost comparisons are based on third-party data and are for informational purposes only. Trading involves significant risk of loss. Individual trading costs will vary based on account type, instrument, and market conditions.",
  },

  resultSendToEmail: {
    heading: "Save This Report",
    description:
      "Get your cost comparison emailed. No signup required - just your savings data and next steps.",
    emailPlaceholder: "example@email.com",
    submitButton: "Send My Savings Report",
    validationRequired: "Email address is required.",
    validationInvalid: "Please enter a valid email address.",
    sendingMessage: "Sending your cost saving data...",
    successMessage: "Your cost saving data has been sent successfully.",
    errorMessage: "We couldn’t send the data right now. Please try again.",
  },
};

export type CostSavingCalculatorContent = typeof costSavingCalculatorContent;
