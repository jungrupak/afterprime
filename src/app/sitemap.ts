import type { MetadataRoute } from "next";
import { WPPage } from "@/types/blocks";

export const revalidate = 86400;

type WPPageExtended = WPPage & {
  modified?: string;
};

const SITEMAP_PAGE_FIELDS = ["slug", "link", "modified"].join(",");
const WEBTRADER_PAGES = [
  "webtrader-mt4",
  "webtrader-mt4-demo",
  "webtrader-mt5",
] as const;

function getWordPressApiBase() {
  const restEndpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (restEndpoint) {
    return restEndpoint.endsWith("/") ? restEndpoint.slice(0, -1) : restEndpoint;
  }

  const publicBaseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;
  if (!publicBaseUrl) {
    return null;
  }

  const normalizedBaseUrl = publicBaseUrl.endsWith("/")
    ? publicBaseUrl.slice(0, -1)
    : publicBaseUrl;

  return `${normalizedBaseUrl}/wp-json/wp/v2`;
}

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function parseDate(value?: string) {
  if (!value) {
    return new Date();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function mapWordPressUrlToSiteUrl(pageUrl: string, siteBaseUrl: string) {
  try {
    const parsedSiteUrl = new URL(siteBaseUrl);
    const parsedPageUrl = pageUrl.startsWith("http")
      ? new URL(pageUrl)
      : new URL(pageUrl, siteBaseUrl);

    parsedPageUrl.protocol = parsedSiteUrl.protocol;
    parsedPageUrl.host = parsedSiteUrl.host;

    return parsedPageUrl.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

async function fetchPublishedPages(): Promise<WPPageExtended[]> {
  const apiBase = getWordPressApiBase();
  if (!apiBase) {
    console.error("Missing WordPress API base URL.");
    return [];
  }

  const allPages: WPPageExtended[] = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const url =
      `${apiBase}/pages?per_page=100&page=${currentPage}` +
      `&status=publish&_fields=${SITEMAP_PAGE_FIELDS}`;

    try {
      const response = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          Accept: "application/json",
          "User-Agent": "Next.js Server Fetch",
        },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch ${url}:`,
          response.status,
          response.statusText,
        );
        break;
      }

      const pageBatch = (await response.json()) as WPPageExtended[];
      allPages.push(...pageBatch);

      const headerTotalPages = Number(response.headers.get("X-WP-TotalPages"));
      if (Number.isFinite(headerTotalPages) && headerTotalPages > 0) {
        totalPages = headerTotalPages;
      } else if (pageBatch.length < 100) {
        totalPages = currentPage;
      } else {
        totalPages = currentPage + 1;
      }

      currentPage += 1;
    } catch (error) {
      console.error("sitemap fetch error:", error);
      break;
    }
  }

  return allPages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normalizeBaseUrl("https://afterprime.com");
  const pages = await fetchPublishedPages();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "always",
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = pages.reduce<MetadataRoute.Sitemap>(
    (routes, page) => {
      if (page.slug === "home-page" || !page.link) {
        return routes;
      }

      const mappedUrl = mapWordPressUrlToSiteUrl(page.link, baseUrl);
      if (!mappedUrl) {
        return routes;
      }

      routes.push({
        url: mappedUrl,
        lastModified: parseDate(page.modified),
        priority: 0.8,
        changeFrequency: "weekly",
      });

      return routes;
    },
    [],
  );

  const webtraderRoutes: MetadataRoute.Sitemap = WEBTRADER_PAGES.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: "weekly",
  }));

  return [...staticRoutes, ...dynamicRoutes, ...webtraderRoutes];
}
