// src/utils/wpFetch.ts
export async function wpFetch<T>(endpoint: string): Promise<T | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_WP_BASE_URL || process.env.WORDPRESS_REST_ENDPOINT;

  if (!baseUrl) {
    console.error("❌ Missing WordPress API base URL.");
    return null;
  }

  // Ensure baseUrl always ends with a slash
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  const url = `${cleanBaseUrl}wp-json/wp/v2${endpoint}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`❌ Failed to fetch ${url}:`, res.statusText);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("❌ wpFetch error:", error);
    return null;
  }
}
