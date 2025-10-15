import axios from "axios";

export async function fetchSeoFieldData(slug: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`
    );

    // Ensure there’s at least one result
    const page = res.data && res.data.length > 0 ? res.data[0] : null;

    if (!page) {
      console.warn(`No page found for slug: ${slug}`);
      return null;
    }

    const seoFields = page.acf?.seo_block || null;
    return seoFields;
  } catch (err) {
    console.error("SEO fetch error:", err);
    return null;
  }
}
