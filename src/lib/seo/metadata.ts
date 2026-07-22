import { Metadata } from "next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/config/locales";
import { localizeHref } from "@/lib/locale/localizeHref";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";

const SITE_ORIGIN = "https://afterprime.com";

type SeoJson = Record<string, string> | null | undefined;

// og:type / twitter:card are technical enums, skipped by the Object Walker
// denylist — cast rather than widen to `string`.
type OgType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";
type TwitterCard = "summary" | "summary_large_image" | "player" | "app";

function canonicalPathFor(slug: string): string {
  return slug === "home-page" ? "/" : `/${slug}`;
}

function absoluteUrl(path: string, locale: string): string {
  if (path === "/") {
    return locale === DEFAULT_LOCALE ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/${locale}`;
  }
  return `${SITE_ORIGIN}${localizeHref(path, locale)}`;
}

export function toOgLocale(locale: string): string {
  if (locale === "en") return "en_US";
  return `${locale}_${locale.toUpperCase()}`;
}

// docs/multilangual-architecture/09-SEO-Strategy.md §9.3 — every locale
// variant plus "x-default" (the unprefixed English URL) as the fallback.
export function buildHreflangMap(slug: string): Record<string, string> {
  const path = canonicalPathFor(slug);
  const map: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    map[locale] = absoluteUrl(path, locale);
  }
  map["x-default"] = absoluteUrl(path, DEFAULT_LOCALE);
  return map;
}

// Locale-aware generateMetadata for the home page — routes through the same
// getTranslatedPage pipeline used for body content, so title/description/OG
// text is translated exactly like everything else (§9.2). Each locale is
// self-canonical (§9.7): the Spanish page canonicals to the Spanish URL.
export async function getTranslatedHomeMetadata(
  slug: string,
  locale: string
): Promise<Metadata> {
  const pageData = await getTranslatedPage<{ aioseo_head_json?: SeoJson }>(
    slug,
    locale
  );
  const seoData = pageData?.aioseo_head_json;
  const canonicalUrl = absoluteUrl(canonicalPathFor(slug), locale);

  return {
    title: seoData?.title || "Afterprime",
    description:
      seoData?.description ||
      "Lowest costs, transparent execution, shared rewards.",
    keywords: seoData?.keywords || "Get Paid to Trade",
    authors: [{ name: "Afterprime", url: SITE_ORIGIN }],
    creator: "Afterprime",
    publisher: "Afterprime",
    openGraph: {
      title: seoData?.["og:title"] ?? "Afterprime",
      description: seoData?.["og:description"] ?? "",
      url: canonicalUrl,
      siteName: seoData?.["og:site_name"] ?? "afterprime.com",
      type: (seoData?.["og:type"] as OgType) ?? "website",
      locale: toOgLocale(locale),
      images: [
        {
          url:
            seoData?.["og:image:secure_url"] ??
            "/img/og-images/default-og-afterprime-home.jpg",
          width: 1200,
          height: 630,
          alt:
            seoData?.["og:title"] ?? seoData?.["og:description"] ?? "Afterprime",
        },
      ],
    },
    twitter: {
      card: (seoData?.["twitter:card"] as TwitterCard) ?? "summary_large_image",
      title: seoData?.["twitter:title"] ?? "Afterprime",
      description: seoData?.["twitter:description"] ?? "",
      images: [
        seoData?.["og:image:secure_url"] ??
          "/img/og-images/default-og-afterprime-home.jpg",
      ],
      creator: seoData?.["twitter:creator"] ?? "@afterprime_com",
      site: seoData?.["twitter:site"] ?? "@afterprime_com",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap(slug),
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}
