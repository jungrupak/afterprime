import { fetchSeoFieldData } from "@/utils/fetchSeoFieldData";




export async function CustomMetadata(slug:string) {
  const seoData = await fetchSeoFieldData(slug);

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
      title: seoData?.opengraph?.title || "Afterprime",
      description:
        seoData?.opengraph?.description ||
        "Forex broker with lowest costs, A-Book forex broker, Get paid to trade",
      url: `https://afterprime.com/${slug}`,
      siteName: `${seoData?.opengraph?.sitename || "Afterprime"} ${slug}`,
      images: [
        {
          url:
           seoData?.opengraph?.og_image_url ||
            "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
          width: 1200,
          height: 630,
          alt: seoData?.opengraph?.og_image?.alt || "Afterprime",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData?.title || "Afterprime",
      description:
        seoData?.description ||
        "Forex broker with Flow Rewards program, Forex broker with institutional-grade execution",
      images: ["https://afterprime.com/image.jpg"],
      creator: "@afterprime_com",
      site: "https://x.com/afterprime_com",
    },
    alternates: {
      canonical: `https://afterprime.com/${slug}`,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
    },

    // metadataBase: new URL("https://afterprime.com"), // it is like base path for above links just like basepath/img/img.jpg// will render as https://afterprime.com/img/im.jpg##
  };
}
