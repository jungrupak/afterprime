export async function fetchSeoFieldData(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 800 }, // 🔥 important
      }
    );

    const data = await res.json();
    const page = data?.[0] ?? null;

    if (!page) return null;

    return page.acf?.seo_block ?? null;
  } catch (err) {
    console.error("SEO fetch error:", err);
    return null;
  }
}
