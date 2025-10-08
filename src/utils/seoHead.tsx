import { fetchSeo } from "@/utils/fetchSeo";

type PageID = {
  getPageID: number | undefined | null;
};

export async function SeoHead({ getPageID }: PageID) {
  const seo = await fetchSeo(getPageID);
  return (
    <head>
      <title>{seo?.title || "Afterprime"}</title>
      <meta
        name="description"
        content={seo?.description || "Get Paid To Trade"}
      />
      {seo?.keywords?.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      )}
      {seo?.robots && <meta name="robots" content={seo.robots} />}
      {seo?.canonical && <link rel="canonical" href={seo.canonical} />}

      {/* Open Graph */}
      {seo?.opengraph?.title && (
        <meta property="og:title" content={seo.opengraph.title} />
      )}
      {seo?.opengraph?.description && (
        <meta property="og:description" content={seo.opengraph.description} />
      )}
      {seo?.opengraph?.image && (
        <meta property="og:image" content={seo.opengraph.image} />
      )}
      {seo?.opengraph?.type && (
        <meta property="og:type" content={seo.opengraph.type} />
      )}
      {seo?.opengraph?.url && (
        <meta property="og:url" content={seo.opengraph.url} />
      )}

      {/* Twitter */}
      {seo?.twitter?.title && (
        <meta name="twitter:title" content={seo.twitter.title} />
      )}
      {seo?.twitter?.description && (
        <meta name="twitter:description" content={seo.twitter.description} />
      )}
      {seo?.twitter?.image && (
        <meta name="twitter:image" content={seo.twitter.image} />
      )}
      {seo?.twitter?.card && (
        <meta name="twitter:card" content={seo.twitter.card} />
      )}

      {/* JSON-LD / Schema */}
      {seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.schema }}
        />
      )}
    </head>
  );
}
