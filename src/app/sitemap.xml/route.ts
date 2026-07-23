import { SUPPORTED_LOCALES } from "@/config/locales";
import { SITE_BASE_URL } from "@/lib/seo/sitemapEntries";

// Sitemap INDEX — root /sitemap.xml. Replaces the old metadata-convention
// sitemap.ts (which could only emit a single <urlset>, never a
// <sitemapindex>). One <sitemap> entry per SUPPORTED_LOCALES entry — adding
// a language there is the only step needed for it to show up here too. See
// docs/multilangual-architecture/13-Sitemap-Localization.md.
export const revalidate = 86400;

export async function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = SUPPORTED_LOCALES.map(
    (locale) => `  <sitemap>
    <loc>${SITE_BASE_URL}/sitemap-${locale}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
