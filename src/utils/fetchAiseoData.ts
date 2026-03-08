export async function fetchAISEOData(slugPath: string[]) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;
    let parentId = 0;
    let page = null;

    for (const slug of slugPath) {
      const res = await fetch(
        `${baseUrl}/wp-json/wp/v2/pages?slug=${slug}&parent=${parentId}&status=publish`,
        {
          headers: { Accept: "application/json" },
          next: { revalidate: 800 },
        }
      );

      const data = await res.json();

      if (!data?.length) return null;

      page = data[0];
      parentId = page.id; // next level parent
    }

    return page?.aioseo_head_json ?? null;
  } catch (err) {
    console.error("AIOSEO fetch error:", err);
    return null;
  }
}