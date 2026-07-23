export const vsSymbolVerdictsContent = {
  scalpersLabel: "Scalpers / High Frequency",
  scalpersTitle: "Afterprime wins on cost",
  scalpersDesc:
    "At {savingPct}% lower cost per lot, Afterprime is materially cheaper for scalpers trading {sym} at volume. On 500 lots/month the cost difference is ${saving500Lots}.",
  swingLabel: "Swing Traders",
  swingTitle: "Overnight cost matters too",
  swingDescPrefix:
    "For traders holding positions overnight, swap rates are the secondary cost factor. Check",
  swingDescLinkText: "{sym} swap rates",
  swingDescSuffix: "for a direct overnight cost comparison.",
  algoLabel: "Algo / EA Traders",
  algoTitle: "Sub-50ms, zero commission",
  algoDesc:
    "Sub-50ms execution and zero commissions make Afterprime a stronger choice for automated trading than {brokerName}.",
};

export type VsSymbolVerdictsContent = typeof vsSymbolVerdictsContent;
