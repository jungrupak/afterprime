import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { getWpPagedata } from "@/utils/getWpPagedata";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";
import FaqSchema from "@/lib/schema/faqSchema";

//Revalidate every 60s (ISR)
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

// ✅ Pre-generate slugs for better performance
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);
  if (!pages) return [];

  const parents = pages.filter((p) => p.parent === 0);
  const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

  return pages
    .filter((p) => p.parent !== 0 && parentMap[p.parent])
    .map((p) => ({
      slug: parentMap[p.parent],
      inst: p.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: pageSlug } = await params;
  const seoData = await CustomMetadata(pageSlug);
  return seoData;
}

export default async function DynamicPage({ params }: Props) {
  const { slug: pageSlug } = await params; //renamed variable slug to custm name
  const pageData = await getWpPagedata(pageSlug);
  return (
    <>
      <PageRenderer pageData={pageData} />
    </>
  );
}
