import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES } from "@/config/locales";
import { buildSitemapEntries, isSitemapLocale } from "@/lib/seo/sitemapEntries";

// Public URL is /sitemap-{locale}.xml — next.config.ts rewrites that
// pattern onto this route (folder names can't mix a literal prefix with a
// dynamic segment, e.g. `sitemap-[locale].xml` isn't valid). See
// docs/multilangual-architecture/13-Sitemap-Localization.md.
export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isSitemapLocale(locale)) {
    notFound();
  }

  const entries = await buildSitemapEntries(locale);

  const body = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
