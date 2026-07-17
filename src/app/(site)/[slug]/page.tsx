import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { getWpPagedata } from "@/utils/getWpPagedata";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";

//Revalidate every 60s (ISR)
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

// ✅ Pre-generate slugs for better performance
export async function generateStaticParams() {
  const perPage = 100;
  let page = 1;
  const allPages: WPPage[] = [];

  while (true) {
    const batch = await wpFetch<WPPage[]>(
      `/pages?_fields=id,slug&per_page=${perPage}&page=${page}`
    );
    if (!Array.isArray(batch) || batch.length === 0) break;

    allPages.push(...batch);
    if (batch.length < perPage) break;
    page++;
  }

  return allPages.map((p) => ({ slug: p.slug }));
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
