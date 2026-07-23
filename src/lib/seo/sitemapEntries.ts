import type { WPPage } from "@/types/blocks";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "@/config/locales";

// Shared by app/sitemap.xml/route.ts (index) and app/sitemap/[locale]/route.ts
// (per-locale urlset). Same route tree serves every locale via proxy.ts
// (locale prefix -> x-locale header, no separate page tree per language) —
// so a sitemap entry for one locale is just the English path with
// /{locale} prepended (English itself gets no prefix). Route list itself
// (WP pages, instrument symbols, vs/broker combos, etc.) is locale-agnostic.

export const SITE_BASE_URL = "https://afterprime.com";

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

type WPPageExtended = WPPage & {
  modified?: string;
};

const INSTRUMENTS_API = "https://scoreboard.argamon.com:8443/api/instruments/";

// Matches BROKER_SLUG_MAP keys in vs/[brokers]/[symbol]/page.tsx — keep in sync
const VS_BROKER_SLUGS = [
  "tickmill",
  "fxcm",
  "ic-markets",
  "pepperstone",
  "fxopen",
  "dukascopy",
  "darwinex",
  "global-prime",
  "markets-dot-com",
  "swissquote",
  "top-10-avg",
  "industry-avg",
] as const;

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

// English (default locale) gets no prefix. Every other locale gets the same
// path prepended with /{locale} — matches proxy.ts's rewrite scheme, so the
// URL is guaranteed to resolve (see docs/multilangual-architecture/08-NextJS-Integration.md §8.2).
function withLocale(absoluteUrl: string, locale: SupportedLocale): string {
  if (locale === DEFAULT_LOCALE) {
    return absoluteUrl;
  }

  const suffix = absoluteUrl.startsWith(SITE_BASE_URL)
    ? absoluteUrl.slice(SITE_BASE_URL.length)
    : absoluteUrl;

  return `${SITE_BASE_URL}/${locale}${suffix}`;
}

async function fetchAllInstrumentSymbols(): Promise<Array<{ symbol: string; path: string }>> {
  try {
    const res = await fetch(INSTRUMENTS_API, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return [];
    const data: Array<{ symbol: string; path: string }> = await res.json();
    return data
      .filter((item) => {
        const sym = item.symbol.toLowerCase();
        return !sym.endsWith(".agg") && !sym.endsWith(".prem");
      })
      .map((item) => ({ symbol: item.symbol.toLowerCase(), path: item.path ?? "" }));
  } catch {
    return [];
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

export function isSitemapLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export async function buildSitemapEntries(locale: SupportedLocale): Promise<SitemapEntry[]> {
  const [pages, instruments] = await Promise.all([
    fetchPublishedPages(),
    fetchAllInstrumentSymbols(),
  ]);

  const symbols = instruments.map((i) => i.symbol);
  const forexSymbols = instruments
    .filter((i) => i.path.split("\\")[0] === "Forex")
    .map((i) => i.symbol);

  const staticRoutes: SitemapEntry[] = [
    {
      url: withLocale(SITE_BASE_URL, locale),
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
    },
  ];

  const dynamicRoutes: SitemapEntry[] = pages.reduce<SitemapEntry[]>((routes, page) => {
    if (page.slug === "home-page" || !page.link) {
      return routes;
    }

    const mappedUrl = mapWordPressUrlToSiteUrl(page.link, SITE_BASE_URL);
    if (!mappedUrl) {
      return routes;
    }

    routes.push({
      url: withLocale(mappedUrl, locale),
      lastModified: parseDate(page.modified),
      priority: 0.8,
      changeFrequency: "daily",
    });

    return routes;
  }, []);

  const webtraderRoutes: SitemapEntry[] = WEBTRADER_PAGES.map((slug) => ({
    url: withLocale(`${SITE_BASE_URL}/${slug}`, locale),
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: "weekly",
  }));

  const swapRoutes: SitemapEntry[] = symbols.map((symbol) => ({
    url: withLocale(`${SITE_BASE_URL}/swaps/${symbol}`, locale),
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "daily",
  }));

  const vsSymbolRoutes: SitemapEntry[] = VS_BROKER_SLUGS.flatMap((broker) =>
    forexSymbols.map((symbol) => ({
      url: withLocale(`${SITE_BASE_URL}/vs/${broker}/${symbol}`, locale),
      lastModified: new Date(),
      priority: 0.75,
      changeFrequency: "daily" as const,
    })),
  );

  const thSymbolRoutes: SitemapEntry[] = symbols.map((symbol) => ({
    url: withLocale(`${SITE_BASE_URL}/trading-hours/${symbol}`, locale),
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "daily",
  }));

  return [
    ...staticRoutes,
    ...dynamicRoutes,
    ...webtraderRoutes,
    ...swapRoutes,
    ...vsSymbolRoutes,
    ...thSymbolRoutes,
  ];
}
