import { MetadataRoute } from "next";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";

// Extend WPPage type locally to include modified date
type WPPageExtended = WPPage & {
  slug: string;
  modified?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://afterprime.com";

  // ✅ Fetch all published WordPress pages
  const pages = await wpFetch<WPPageExtended[] | null>(
    "/pages?per_page=100&status=publish"
  );

  // ✅ Static routes
  const staticRoutes = ["", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // ✅ Handle possible null + safely read modified date
  const dynamicRoutes =
    pages?.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.modified || new Date().toISOString(),
    })) ?? [];

  // ✅ Combine and return
  return [...staticRoutes, ...dynamicRoutes];
}
