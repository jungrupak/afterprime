// src/utils/wpFetch.ts

export async function wpFetch<T>(endpoint: string): Promise<T | null> {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_WP_BASE_URL ||
    process.env.WORDPRESS_REST_ENDPOINT;

  if (!rawBaseUrl) {
    console.error("❌ Missing WordPress API base URL.");
    return null;
  }

  const cleanBaseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
  const apiBaseUrl = cleanBaseUrl.includes("/wp-json/")
    ? cleanBaseUrl
    : `${cleanBaseUrl}/wp-json/wp/v2`;
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${apiBaseUrl}${normalizedEndpoint}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Next.js Server Fetch",
      },
    });

    if (!res.ok) {
      console.error(`❌ Failed to fetch ${url}:`, res.status, res.statusText);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("❌ wpFetch error:", error);
    return null;
  }
}
