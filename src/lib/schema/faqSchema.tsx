interface FaqSchemaProp {
  pageSlug: string;
}

type JsonLd = Record<string, unknown>;

export default async function FaqSchema({ pageSlug }: FaqSchemaProp) {
  const res = await fetch(
    `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${pageSlug}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) return null;

  const data = await res.json();
  const rawFaqSchema = data?.[0]?.acf?.schema_block?.faqs;

  let parsedFaqSchema: JsonLd | null = null;

  if (typeof rawFaqSchema === "string" && rawFaqSchema.trim()) {
    try {
      parsedFaqSchema = JSON.parse(rawFaqSchema) as JsonLd;
    } catch (e) {
      console.error("Invalid FAQ schema JSON:", e);
      return null;
    }
  }

  if (!parsedFaqSchema || parsedFaqSchema["@type"] !== "FAQPage") {
    return null;
  }

  return (
    <script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(parsedFaqSchema),
      }}
    />
  );
}
