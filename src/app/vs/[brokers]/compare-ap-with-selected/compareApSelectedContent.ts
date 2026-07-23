export const compareApSelectedContent = {
  brokerLabel: "Broker",
  pairsLabel: "Pairs",
  pairsAll: "All",
  costPerLotLabel: "Cost Per Lot",
  costPerLotSub: "(Including Commission)",
  savingsLabel: "% Savings",
  savingsSub: "(vs Afterprime)",
  dataLabelBroker: "Broker",
  dataLabelPairs: "Pairs",
  dataLabelCost: "Cost/Lot (Inc. Comm.)",
  dataLabelSavings: "Savings",
  sourcePrefix: "Source:",
  sourceName: "ForexBenchmark",
  sourceNote: "- Previous 7 Days Range | All Pairs | Incl. Commissions + Spreads.",
  lastUpdatedPrefix: "(Last Updated:",
  lastUpdatedSuffix: ")",
  costDescription:
    "{brokerName} costs reflect spread including commission on standard lot. Afterprime costs include zero commission with Flow Rewards™ applied at standard eligible rates. Comparisons are on a like-for-like account basis.",
} as const;

export type CompareApSelectedContent = typeof compareApSelectedContent;
