export const brokerPageContent = {
  compareYourCost: "Compare Your Cost",
  totalTradingCostHeading: "Total Trading Cost Breakdown",
  tradingCostByMajorHeading: "Trading Cost by Forex Major",
  breadcrumbHome: "Home",
  breadcrumbBrokerComparisons: "Broker Comparisons",

  editorialSpreadHeading: "Spreads - The Invisible Variable",
  editorialSpreadIntro:
    'The spread is the primary cost of entry for any trader, but it is rarely static. Most brokers quote "typical" spreads that fluctuate wildly during high volatility or low liquidity periods (like the New York/London crossover or market open).',
  editorialRawRealityTitle: 'The "Raw" Reality',
  editorialRawRealityDesc:
    'Many brokers claim "$0.0 spreads," but the frequency of those spreads actually being available to fill your order is the true metric of quality.',
  editorialAfterprimeEdgeTitle: "The Afterprime Edge",
  editorialAfterprimeEdgeDesc:
    'We focus on spread stability. By curating our flow, we reduce the "noise" and "gapping" that often occurs with retail-heavy brokers, ensuring that the price you see is the price you get, under normal market conditions.',

  editorialCostPerLotHeading: "Cost Per Lot Impact - More Than Just Commission",
  editorialCostPerLotIntro:
    "Traders often make the mistake of looking at commission in isolation. A low commission is meaningless if it's paired with wide spreads or poor execution (slippage).",
  editorialCostPerLotFormula:
    "The Total Cost Per Lot formula is:",
  editorialCostPerLotFormulaSuffix:
    "(Spread in Pips x Pip Value) + Round Turn Commission = Total Cost",
  editorialSlippageTitle: "The Slippage Factor",
  editorialSlippageDesc:
    "If a broker has \"cheap\" costs but slips your entry by 0.2 pips, that is an extra $2.00 per lot added to your cost that doesn't show up on their pricing page. This is an industry-wide dynamic and does not constitute a specific claim regarding {brokerName}'s execution quality.",
  editorialCumulativeTitle: "Cumulative Friction",
  editorialCumulativeDesc:
    "For a high-frequency trader or someone moving 1,000 lots a month, a mere $2.00 difference in total cost per lot is the difference between a $2,000 profit and a $2,000 loss.",

  editorialHowAffectsHeading: "How it Affects Total Cost Calculation",
  editorialHowAffectsIntro:
    "When we calculate the comparison between Afterprime and other brokers, we don't just look at a snapshot. We aggregate data across different market sessions to provide a \"Net Cost\" profile.",
  editorialVolumeWeightingTitle: "Volume Weighting",
  editorialVolumeWeightingDesc:
    'We analyze how costs scale. As your volume increases, the impact of "Flow Rewards™ becomes the deciding factor. While other brokers keep your commission static regardless of your contribution to the ecosystem, we believe in rewarding "clean" flow.',
  editorialFlowRewardsTitle: 'The Logic of "Flow Rewards™"',
  editorialFlowRewardsDesc:
    'Unlike traditional "cashback" models which are often just rebates of marked-up spreads, Flow Rewards™ are a direct reflection of the value your trading flow brings to our liquidity providers.',
  editorialInsightTitle: "Insight",
  editorialInsightDesc:
    'By reducing the "toxic" flow (latency arbitrage, etc.) through our invite-only model, our Liquidity Providers (LPs) can offer us tighter pricing. We simply pass those savings directly back to you.',

  videoFallback: "Your browser does not support video playback.",
} as const;

export type BrokerPageContent = typeof brokerPageContent;
