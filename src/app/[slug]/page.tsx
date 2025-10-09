import { notFound } from "next/navigation";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { SeoHead } from "@/utils/seoHead";

type Props = { params: { slug: string } };

// ✅ Allow runtime slugs
export const dynamicParams = true;

// ✅ Revalidate every 60s (ISR)
export const revalidate = 60;

// Helper: fetch page data
async function getPageData(slug: string) {
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const pageData = pages?.[0];
  if (!pageData) notFound();
  return pageData;
}

// ✅ Dynamic metadata
export async function generateMetadata({ params }: Props) {
  const pageData = await getPageData(params.slug);
  return SeoHead({ getPageID: pageData.id });
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = params; // ✅ works now
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const pageData = pages?.[0];
  if (!pageData) notFound();
  return <PageRenderer pageData={pageData} />;
}

// ✅ Pre-generate slugs for better performance
export async function generateStaticParams() {
  try {
    const pages = (await wpFetch<WPPage[]>(`/pages?_fields=slug`)) ?? [];
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    // If fetch fails at build → still allow runtime rendering
    return [];
  }
}
