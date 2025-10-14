import axios from "axios";

export async function fetchSeoFieldData(slug: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`
    );
    const seoFields = res.data?.[0].acf?.seo_block;
    return seoFields;
  } catch (err) {
    console.error("SEO fetch error:", err);
    return null;
  }
}
