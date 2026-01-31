import { MetadataRoute } from "next";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";

export const dynamic = "force-dynamic";

type WPPageExtended = WPPage & {
  id: number;
  slug: string;
  parent?: number;
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

function buildHierarchicalPath(
  page: WPPageExtended,
  byId: Map<number, WPPageExtended>
) {
  const segments: string[] = [];
  let current: WPPageExtended | undefined = page;

  // Safety guard against accidental loops
  const seen = new Set<number>();

  while (current) {
    if (seen.has(current.id)) break;
    seen.add(current.id);

    if (current.slug) segments.push(current.slug);

    const parentId = current.parent ?? 0;
    if (!parentId) break;

    current = byId.get(parentId);
    if (!current) break;
  }

  return segments.reverse().join("/");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://afterprime.com";

  const pages =
    (await wpFetch<WPPageExtended[] | null>(
      "/pages?per_page=1000&status=publish"
    )) ?? [];

  const byId = new Map<number, WPPageExtended>();
  for (const p of pages) byId.set(p.id, p);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: escapeXml(baseUrl),
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "always",
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug !== "home-page")
    .map((page) => {
      const path = buildHierarchicalPath(page, byId);
      return {
        url: escapeXml(`${baseUrl}/${path}`),
        lastModified: page.modified ? new Date(page.modified) : new Date(),
        priority: 0.8,
        changeFrequency: "weekly",
      };
    });

  return [...staticRoutes, ...dynamicRoutes];
}
