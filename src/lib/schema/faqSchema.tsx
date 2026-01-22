import Script from "next/script";

interface FaqSchemaProp {
  pageSlug: string;
}

export default async function FaqSchema({ pageSlug }: FaqSchemaProp) {
  const res = await fetch(
    `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${pageSlug}`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to load data");
  }

  const data = await res.json();

  const dataFaqSchema = data[0]?.acf?.schema_block?.faqs;

  const parseDataFaqSchema = JSON.parse(dataFaqSchema);

  //console.log("cripydata", parseDataFaqSchema);

  if (!parseDataFaqSchema) return null;

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(parseDataFaqSchema),
      }}
    />
  );
}
