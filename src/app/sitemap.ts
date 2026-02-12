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

const webtraderPages = [
  "webtrader-mt4",
  "webtrader-mt4-demo",
  "webtrader-mt5",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


  const baseUrl = "https://afterprime.com";
  const wpBaseUrl = "https://wordpress-1264747-4900526.cloudwaysapps.com";

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
  pages?.filter((page) => page.slug !== "home-page").map((page) => ({
    url: escapeXml(
      page.link
        .replace(wpBaseUrl, baseUrl)
        .replace(/\/$/, "") // optional: remove trailing slash
    ),
    lastModified: page.modified
      ? new Date(page.modified)
      : new Date(),
    priority: 0.8,
    changeFrequency: "weekly" as const,
  })) ?? [];

  // Webtrader route
  const webtraderRoutes: MetadataRoute.Sitemap = webtraderPages.map(
  (slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: "weekly" as const,
  })
);

  return [...staticRoutes, ...dynamicRoutes, ...webtraderRoutes];
}
