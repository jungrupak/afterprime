import {fetchSeoFieldData} from "@/utils/fetchSeoFieldData";

export async function CustomMetadata(slug: string) {
  const seoData = await fetchSeoFieldData(slug);

  const canonicalUrl =
    slug === "home-page"
      ? "https://afterprime.com/"
      : `https://afterprime.com/${slug}`;

  return {
    title: seoData?.title || "Afterprime",

    description:
      seoData?.description ||
      "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",

    keywords:
      seoData?.keywords ||
      "Get Paid to Trade, Forex broker with lowest costs, A-Book forex broker",

    authors: [{ name: "Afterprime", url: "https://afterprime.com" }],

    creator: "Afterprime",
    publisher: "Afterprime",

    openGraph: {
      title: seoData?.["og:title"] ?? "Afterprime",

      description:
        seoData?.["og:description"]??
        "Forex broker with lowest costs, A-Book forex broker, Get paid to trade",

      url: canonicalUrl,
      siteName: seoData?.["og:site_name"] ?? "afterprime.com",
      type: seoData?.["og:type"] ?? "website",
      images: [
        {
          url:
            seoData?.["og:image"] ??
            "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
          width: 1200,
          height: 630,
          alt:
            seoData?.["og:title"] ??
            seoData?.["og:description"] ??
            "Afterprime",
        },
      ],
    },

    twitter: {
      card: seoData?.["twitter:card"] ?? "summary_large_image",
      title: seoData?.["twitter:title"] ?? "Afterprime",
      description:
        seoData?.["twitter:description"] ??
        "Forex broker with Flow Rewards program, Forex broker with institutional-grade execution",

      images: [
        seoData?.["twitter:image"] ??
          "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
      ],
      creator: seoData?.["twitter:creator"] ?? "@afterprime_com",
      site: seoData?.["twitter:site"] ?? "@afterprime_com",
    },

    alternates: {
      canonical: canonicalUrl,
    },

    icons: {
      icon: "/favicon.ico",
      apple: [
        { url: "/AppIcon57x57.png", sizes: "57x57" },
        { url: "/AppIcon57x57@2x.png", sizes: "114x114" },
        { url: "/AppIcon57x57@2x.png", sizes: "120x120" },
        { url: "/AppIcon72x72.png", sizes: "72x72" },
        { url: "/AppIcon72x72@2x.png", sizes: "144x144" },
        { url: "/AppIcon72x72@2x.png", sizes: "152x152" },
      ],
    },

    robots: {
      index: true,
      follow: true,
      maxImagePreview: "large",
    },
  };
}