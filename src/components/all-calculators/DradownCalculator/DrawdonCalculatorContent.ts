// Plain English content object for DrawdownCalculator, translated via Weglot
// in a Server Component ancestor (getTranslatedStatic("drawdown-calculator",
// locale, drawdonCalculatorContent)) and passed down as the `content` prop.
// DrawdownCalculator itself is a Client Component and cannot call the
// translation pipeline directly — see CLAUDE.md pattern (headerContent.ts).
//
// Notes:
// - `assessment.level` ("safe" | "caution" | "danger") only drives a CSS
//   class lookup (styles[assessment.level]) — it is never rendered as text
//   and is NOT part of this content object, so translating it can't break
//   anything.
// - Messages that embed a live numeric value (risk of ruin %, max drawdown
//   %) are stored as template strings with `{token}` placeholders and
//   interpolated with `.replace()` after translation.
export const drawdonCalculatorContent = {
  // Inputs
  accountSizeLabel: "Account Size",
  riskPerTradeLabel: "Risk Per Trade (%)",
  winRateLabel: "Win Rate (%)",
  riskRewardLabel: "Risk : Reward Ratio",
  rrPrefix: "1 :",
  maxDrawdownLimitLabel: "Max Acceptable Drawdown (%)",
  numTradesLabel: "Trades to Analyze",

  // Top result cards
  riskOfRuinLabel: "Risk of Ruin",
  riskOfRuinNote: "Chance of hitting max drawdown",
  expectedMaxDrawdownLabel: "Expected Max Drawdown",
  expectedMaxDrawdownNote: "Most likely worst drawdown",

  // Losing streak analysis
  losingStreakTitle: "Losing Streak Analysis",
  streakLossesInARow: "losses in a row",

  // Value at Risk
  varTitle: "Value at Risk (VaR)",
  varDescription: "Maximum expected loss at given confidence levels",

  // Recovery requirements table
  recoveryTitle: "Recovery Requirements",
  recoveryDrawdownHeader: "Drawdown",
  recoveryAccountValueHeader: "Account Value",
  recoveryGainToRecoverHeader: "Gain to Recover",
  recoveryTradesToRecoverHeader: "Trades to Recover*",
  recoveryNote: "*Based on your current expectancy",
  infinitySymbol: "∞",

  // Risk assessment: negative expectancy (danger)
  dangerZeroTitle: "Negative Expectancy - High Risk",
  dangerZeroMessage:
    "Your current parameters result in negative expectancy. This means you will lose money over time regardless of risk management.",
  dangerZeroTips: [
    "Improve win rate or risk:reward ratio",
    "Review and refine your trading strategy",
    "Do not trade live until expectancy is positive",
  ],

  // Risk assessment: high risk of ruin (danger)
  dangerHighRuinTitle: "High Risk of Ruin",
  dangerHighRuinMessageTemplate:
    "There's a {percent}% chance of hitting your maximum drawdown limit. This is unacceptably high for long-term survival.",
  dangerHighRuinTips: [
    "Reduce risk per trade",
    "Increase maximum acceptable drawdown (if emotionally possible)",
    "Aim for risk of ruin below 5%",
  ],

  // Risk assessment: moderate risk (caution)
  cautionTitle: "Moderate Risk - Use Caution",
  cautionMessageTemplate:
    "Your risk of ruin is {ruin}% and expected max drawdown is {maxdd}%. This is manageable but leaves limited margin for error.",
  cautionTips: [
    "Consider reducing risk per trade slightly",
    "Ensure you can emotionally handle the expected drawdowns",
    "Have a plan for what to do during losing streaks",
  ],

  // Risk assessment: conservative (safe)
  safeTitle: "Conservative Risk Profile",
  safeMessageTemplate:
    "Your risk of ruin is very low at {ruin}%. With positive expectancy and controlled position sizing, your account should survive typical variance.",
  safeTips: [
    "Maintain discipline during losing streaks",
    "Don't increase risk during winning streaks",
    "Review strategy periodically to ensure edge persists",
  ],

  // Formula reference (details/summary)
  viewFormulasSummary: "View Formulas",
  formulaRiskOfRuinLabel: "Risk of Ruin",
  formulaRiskOfRuinText: "≈ ((1 - Edge) / (1 + Edge))^(Capital Units)",
  formulaDrawdownLabel: "Drawdown from N losses",
  formulaDrawdownText: "= 1 - (1 - Risk%)^N",
  formulaStreakLabel: "Probability of N consecutive losses",
  formulaStreakText: "= (Loss Rate)^N × Adjustment",
  formulaRecoveryLabel: "Recovery Gain Required",
  formulaRecoveryText: "= (1 / (1 - Drawdown%)) - 1",
};

export type DrawdonCalculatorContent = typeof drawdonCalculatorContent;
