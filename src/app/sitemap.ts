import { MetadataRoute } from "next";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";

export const dynamic = "force-dynamic";

// Extend WPPage type locally
type WPPageExtended = WPPage & {
  modified?: string;
};

function escapeXml(url: string) {
  return url
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


  const baseUrl = "https://afterprime.com";

  const pages = await wpFetch<WPPageExtended[] | null>(
    "/pages?per_page=100&status=publish"
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: escapeXml(baseUrl),
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "always" as const,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap =
    pages?.filter((page)=>page.slug!=="home-page").map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.modified
        ? new Date(page.modified)
        : new Date(),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })) ?? [];

  return [...staticRoutes, ...dynamicRoutes];
}
