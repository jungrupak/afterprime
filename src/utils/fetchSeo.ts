import axios from "axios";

export async function fetchSeo(pageId: number | undefined | null) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/custom/v1/seo/${pageId}`
    );
    return res.data;
  } catch (err) {
    console.error("SEO fetch error:", err);
    return null;
  }
}
