import { MetadataRoute } from "next";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";

export const dynamic = "force-dynamic";

type WPPageExtended = WPPage & {
  id: number;
  slug: string;
  parent: number; // WP always returns a number (0 = top level)
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



async function fetchAllPages(): Promise<WPPageExtended[]> {
  const perPage = 1400;
  let page = 1;
  let allPages: WPPageExtended[] = [];

  while (true) {
    const batch = await wpFetch<WPPageExtended[]>(
      `/pages?status=publish&per_page=${perPage}&page=${page}`
    );

    if (!batch || batch.length === 0) break;

    allPages.push(...batch);
    page++;
  }

  return allPages;
}

function buildHierarchicalPath(
  page: WPPageExtended,
  byId: Map<number, WPPageExtended>
) {
  const segments: string[] = [];
  let current: WPPageExtended | undefined = page;
  const seen = new Set<number>();

  while (current && !seen.has(current.id)) {
    seen.add(current.id);

    if (current.slug) {
      segments.push(current.slug);
    }

    if (current.parent === 0) break;

    current = byId.get(current.parent);
  }

  return segments.reverse().join("/");
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://afterprime.com";

  const pages = await fetchAllPages();

  const byId = new Map<number, WPPageExtended>();
  pages.forEach((p) => byId.set(p.id, p));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug && page.slug !== "home-page")
    .map((page) => {
      const path = buildHierarchicalPath(page, byId);

      return {
        url: `${baseUrl}/${path}`,
        lastModified: page.modified
          ? new Date(page.modified)
          : new Date(),
        priority: page.parent === 0 ? 0.8 : 0.6,
        changeFrequency: "weekly",
      };
    });

  return [...staticRoutes, ...dynamicRoutes];
}
