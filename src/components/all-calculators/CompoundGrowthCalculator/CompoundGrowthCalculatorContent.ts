// Plain English content object for CompoundGrowthCalculator, translated via
// Weglot in a Server Component ancestor (getTranslatedStatic("compound-growth-calculator",
// locale, compoundGrowthCalculatorContent)) and passed down as the `content` prop.
// CompoundGrowthCalculator itself is a Client Component and cannot call the
// translation pipeline directly — see CLAUDE.md pattern (headerContent.ts).
//
// Notes:
// - `periodType` state ("month" | "week" | "day") drives calculation branching
//   via `===` checks and is NEVER put in this content object — only the
//   *visible* option labels (periodMonthOption etc.) are translatable here.
// - Dynamic strings that embed a live numeric value are stored as template
//   strings with `{token}` placeholders and interpolated with `.replace()`
//   after translation (the translator only walks plain string values, it
//   can't see inside a template literal or function).
export const compoundGrowthCalculatorContent = {
  // Inputs
  startingBalanceLabel: "Starting Balance",
  winRateLabel: "Win Rate (%)",
  riskRewardLabel: "Risk : Reward Ratio",
  rrPrefix: "1 :",
  riskPerTradeLabel: "Risk Per Trade (%)",
  numTradesLabel: "Number of Trades",
  tradesPerLabel: "Trades Per",
  periodMonthOption: "/ Month",
  periodWeekOption: "/ Week",
  periodDayOption: "/ Day",

  // Results
  expectedFinalBalanceLabel: "Expected Final Balance",
  expectancyLabel: "Expectancy",
  expectancyNote: "per trade (avg)",
  profitFactorLabel: "Profit Factor",
  profitFactorNote: "gross profit / loss",
  expectedWinsLabel: "Expected Wins",
  expectedWinsOfWord: "of",
  expectedWinsTradesWord: "trades",
  timeToGoalLabel: "Time to Goal",
  timeToGoalNote: "to double account",

  // Trading edge indicator
  tradingEdgeLabel: "Trading Edge",
  edgeStrongPositive:
    "Strong positive edge. This system should grow your account over time.",
  edgePositive:
    "Positive edge detected. Consistent execution should yield profits.",
  edgeBreakEven:
    "Break-even edge. You need to improve win rate or R:R to profit.",
  edgeSlightNegative:
    "Slight negative edge. This system will slowly lose money over time.",
  edgeSignificantNegative:
    "Significant negative edge. This system will lose money. Improve parameters.",

  // Section titles
  growthProjectionTitle: "Growth Projection",
  accountMilestonesTitle: "Account Milestones",

  // Time-unit templates (embedded numeric value interpolated via .replace())
  monthsTemplate: "{n} months",
  weeksTemplate: "{n} weeks",
  daysTemplate: "{n} days",
  yearsTemplate: "{n} years",
  moTemplate: "{n}mo",
  yrTemplate: "{n}yr",
  wkTemplate: "{n}wk",
  dTemplate: "{n}d",

  // Milestone row: "{trades} trades ({time})"
  milestoneTradesTemplate: "{trades} trades ({time})",

  // Canvas-drawn chart axis label: "{n} trades"
  canvasTradesTemplate: "{n} trades",
};

export type CompoundGrowthCalculatorContent =
  typeof compoundGrowthCalculatorContent;
