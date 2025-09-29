// src/utils/wpFetch.ts
import type { WPPage } from "@/types/blocks";

export async function wpFetch<T>(
  path: string,
  revalidateSeconds = 60
): Promise<T | null> {
  const endpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (!endpoint) {
    console.error("WORDPRESS_REST_ENDPOINT is undefined!");
    return null;
  }

  try {
    const res = await fetch(`${endpoint}${path}`, {
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
      console.error(
        `WP fetch failed for ${path}:`,
        res.status,
        await res.text()
      );
      return null;
    }
    const data: T = await res.json();
    return data;
  } catch (err) {
    console.error("WP fetch error:", err);
    return null;
  }
}
