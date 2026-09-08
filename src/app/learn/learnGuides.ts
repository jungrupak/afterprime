export type LearnCategory =
  | "Getting Started"
  | "Trading Strategies"
  | "Risk & Portfolio Management"
  | "CFD vs Other Products"
  | "Markets";

export type LearnGuide = {
  slug: string;
  category: LearnCategory;
  title: string;
  teaser: string;
  metaDescription: string;
};

export const LEARN_CATEGORIES: LearnCategory[] = [
  "Getting Started",
  "Trading Strategies",
  "Risk & Portfolio Management",
  "CFD vs Other Products",
  "Markets",
];

export const learnGuides: LearnGuide[] = [
  // Getting Started
  {
    slug: "what-is-cfd-trading",
    category: "Getting Started",
    title: "What Is CFD Trading?",
    teaser:
      "The fundamentals: what a CFD is, how leverage and margin work, and the risks involved.",
    metaDescription:
      "Learn what a CFD is, how leverage and margin work, and the key risks before you place your first trade.",
  },
  {
    slug: "how-to-open-a-cfd-position",
    category: "Getting Started",
    title: "How to Open a CFD Position",
    teaser:
      "The mechanics every CFD trade shares: choosing a market, going long or short, sizing a position, and closing it.",
    metaDescription:
      "A step-by-step walkthrough of opening a CFD position: choosing a market, direction, position size, and how to close the trade.",
  },
  // Trading Strategies
  {
    slug: "cfd-scalping-strategy",
    category: "Trading Strategies",
    title: "CFD Scalping Strategy",
    teaser:
      "Trading small, fast price moves with CFDs — entries, exits, and the execution speed scalping demands.",
    metaDescription:
      "How CFD scalping works: short holding periods, tight spreads, and the execution requirements of a scalping strategy.",
  },
  {
    slug: "cfd-day-trading",
    category: "Trading Strategies",
    title: "CFD Day Trading",
    teaser:
      "Opening and closing CFD positions within the same session to avoid overnight exposure and swap costs.",
    metaDescription:
      "A guide to day trading CFDs: intraday setups, position sizing, and why traders close positions before the session ends.",
  },
  {
    slug: "cfd-swing-trading",
    category: "Trading Strategies",
    title: "CFD Swing Trading",
    teaser:
      "Holding CFD positions over days or weeks to capture medium-term price swings.",
    metaDescription:
      "How swing trading CFDs works, from spotting multi-day setups to managing overnight and swap costs.",
  },
  {
    slug: "trend-following-with-cfds",
    category: "Trading Strategies",
    title: "Trend Following with CFDs",
    teaser: "Identifying and riding sustained price trends using CFD positions.",
    metaDescription:
      "A guide to trend-following with CFDs: identifying direction, entry timing, and managing a trade as the trend develops.",
  },
  {
    slug: "breakout-trading-with-cfds",
    category: "Trading Strategies",
    title: "Breakout Trading with CFDs",
    teaser: "Trading CFDs as price breaks through key support and resistance levels.",
    metaDescription:
      "How breakout trading works with CFDs: spotting key levels, confirming a breakout, and managing false breaks.",
  },
  {
    slug: "mean-reversion-trading-with-cfds",
    category: "Trading Strategies",
    title: "Mean Reversion Trading with CFDs",
    teaser:
      "Trading CFDs on the assumption that price will revert back toward its average after an extreme move.",
    metaDescription:
      "A guide to mean reversion trading with CFDs: identifying overextended price moves and trading the pullback.",
  },
  {
    slug: "how-to-short-sell-cfds",
    category: "Trading Strategies",
    title: "How to Short Sell CFDs",
    teaser: "Opening a sell position to profit when a market's price falls.",
    metaDescription:
      "How short selling works with CFDs: opening a sell position, margin requirements, and the risks of a short trade.",
  },
  // Risk & Portfolio Management
  {
    slug: "risk-management-in-cfd-trading",
    category: "Risk & Portfolio Management",
    title: "Risk Management in CFD Trading",
    teaser:
      "Position sizing, stop-losses, and leverage controls that keep CFD trading risk in check.",
    metaDescription:
      "Core risk management techniques for CFD trading: position sizing, stop-losses, and controlling leverage exposure.",
  },
  {
    slug: "hedging-with-cfds",
    category: "Risk & Portfolio Management",
    title: "Hedging with CFDs",
    teaser: "Using CFD positions to offset risk in an existing trade or portfolio.",
    metaDescription:
      "How CFDs can be used to hedge existing positions or portfolio exposure, and when hedging makes sense.",
  },
  {
    slug: "cfd-trading-for-diversification",
    category: "Risk & Portfolio Management",
    title: "CFD Trading for Diversification",
    teaser: "Using CFDs to gain exposure across markets without holding the underlying asset.",
    metaDescription:
      "How CFDs let traders diversify across forex, indices, commodities, and shares from a single account.",
  },
  // CFD vs Other Products
  {
    slug: "cfd-trading-vs-forex-trading",
    category: "CFD vs Other Products",
    title: "CFD Trading vs Forex Trading",
    teaser: "How trading CFDs on currency pairs compares to spot forex trading.",
    metaDescription:
      "CFD trading vs forex trading compared: market access, leverage, costs, and which one fits your trading style.",
  },
  {
    slug: "cfd-trading-vs-spread-betting",
    category: "CFD vs Other Products",
    title: "CFD Trading vs Spread Betting",
    teaser: "Comparing CFDs and spread betting across cost, tax treatment, and market access.",
    metaDescription:
      "CFD trading vs spread betting: how the two products differ in cost structure, tax treatment, and availability.",
  },
  // Markets
  {
    slug: "gold-cfd-trading",
    category: "Markets",
    title: "Gold CFD Trading",
    teaser: "Trading gold price movements via CFDs, without holding physical gold.",
    metaDescription:
      "A guide to trading gold CFDs: how gold pricing works, position sizing, and what moves the gold market.",
  },
];
