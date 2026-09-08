export type LearnArticleSchemaInput = {
  headline: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
};

// Rounds "now" down to the nearest 4-day boundary at 08:00 UTC — same
// pseudo-publish-date idea as the existing Author component, computed
// directly here since this is a Server Component (no client-side
// useEffect needed to avoid a hydration mismatch).
function pseudoPublishDate(): string {
  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const roundedDays = Math.floor(daysSinceEpoch / 4) * 4;
  const date = new Date(roundedDays * 24 * 60 * 60 * 1000);
  date.setUTCHours(8, 0, 0, 0);
  return date.toISOString();
}

export function buildLearnArticleSchema({
  headline,
  description,
  canonicalUrl,
  image,
  datePublished,
  dateModified,
}: LearnArticleSchemaInput) {
  const fallbackDate = pseudoPublishDate();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image:
      image || "https://afterprime.com/img/og-images/default-og-afterprime-home.jpg",
    author: {
      "@type": "Organization",
      name: "Afterprime",
      url: "https://afterprime.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Afterprime",
      logo: {
        "@type": "ImageObject",
        url: "https://afterprime.com/img/logo-main.svg",
      },
    },
    datePublished: datePublished || fallbackDate,
    dateModified: dateModified || fallbackDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };
}
