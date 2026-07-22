import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedHomeMetadata } from "@/lib/seo/metadata";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { DEFAULT_LOCALE } from "@/config/locales";
//####
export const revalidate = 86400;

interface PageProps {
  params?: { slug?: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const frontPageSlug =
    params?.slug ?? process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  const locale = await getRequestLocale();

  if (locale === DEFAULT_LOCALE) {
    return CustomMetadata(frontPageSlug);
  }
  return getTranslatedHomeMetadata(frontPageSlug, locale);
}

// ✅ Home page component
export default async function HomePage({ params }: PageProps) {
  const frontPageSlug =
    params?.slug ?? process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  const locale = await getRequestLocale();

  // Fetch (and, for non-English locales, translate) the front page.
  // English behavior/performance is unchanged — see getTranslatedPage.
  const pageData = await getTranslatedPage<WPPage>(frontPageSlug, locale);

  if (!pageData) return <p>Home page not found</p>;

  return (
    <>
      <PageRenderer pageData={pageData} />
    </>
  );
}
