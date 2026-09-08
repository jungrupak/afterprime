import { learnGuides } from "@/app/learn/learnGuides";

export function buildLearnCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CFD Trading Guides: Strategies, Risk Management & Markets",
    url: "https://afterprime.com/learn",
    description:
      "Browse Afterprime's CFD trading guides: how CFDs work, trading strategies, risk management, product comparisons, and market-specific guides.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: learnGuides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://afterprime.com/learn/${g.slug}`,
        name: g.title,
      })),
    },
  };
}
