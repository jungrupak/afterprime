import type { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedMetadata } from "@/lib/seo/metadata";

//Revalidate every 60s (ISR)
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: pageSlug } = await params;
  const locale = await getRequestLocale();
  return getTranslatedMetadata(pageSlug, locale);
}

export default async function DynamicPage({ params }: Props) {
  const { slug: pageSlug } = await params;
  const locale = await getRequestLocale();
  const pageData = await getTranslatedPage<WPPage>(pageSlug, locale);
  if (!pageData) notFound();
  return (
    <>
      <PageRenderer pageData={pageData} />
    </>
  );
}
