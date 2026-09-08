export const learnPageContent = {
  heroTitle: "CFD Trading Guides: Strategies, Risk Management & Markets",
  heroIntro:
    "Everything you need to trade CFDs with a clear understanding of how they work, organized from the fundamentals through to specific strategies, risk management, and how CFDs compare to other ways of trading.",
  // Keyed by the untranslated LearnCategory value (used for grouping/lookup,
  // never translated itself) — only the display label value is translated.
  categoryLabels: {
    "Getting Started": "Getting Started",
    "Trading Strategies": "Trading Strategies",
    "Risk & Portfolio Management": "Risk & Portfolio Management",
    "CFD vs Other Products": "CFD vs Other Products",
    Markets: "Markets",
  } as Record<string, string>,
};

export const learnPageMetaContent = {
  metaTitle: "CFD Trading Guides: Strategies, Risk Management & Markets",
  metaDescription:
    "Browse Afterprime's CFD trading guides: how CFDs work, trading strategies, risk management, product comparisons, and market-specific guides.",
};

export type LearnPageContent = typeof learnPageContent;
