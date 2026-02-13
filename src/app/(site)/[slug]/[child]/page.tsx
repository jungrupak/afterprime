import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";
import { notFound } from "next/navigation";
import { getWpPagedata } from "@/utils/getWpPagedata";

// Allow runtime slugs
export const dynamicParams = true;

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
    child: string;
  }>;
};

//
// 🔹 Metadata
//
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { child } = await params;
  return await CustomMetadata(child);
}

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { slug, child } = await params;

  // Fetch child page
  const pages = await wpFetch<WPPage[]>(
    `/pages?slug=${child}&_fields=id,slug,parent,content,title`,
  );

  const page = pages?.[0];

  if (!page) notFound();

  // Validate parent relationship
  if (!page.parent) notFound();

  const parent = await wpFetch<WPPage>(`/pages/${page.parent}?_fields=slug`);

  if (!parent || parent.slug !== slug) {
    notFound();
  }

  const pageData = await getWpPagedata(child);

  return (
    <>
      <PageRenderer pageData={pageData} />
    </>
  );
}

//
// 🔹 Static Params
//
export async function generateStaticParams() {
  try {
    const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);

    if (!pages) return [];

    const parents = pages.filter((p) => p.parent === 0);

    const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

    return pages
      .filter((p) => p.parent !== 0 && parentMap[p.parent])
      .map((p) => ({
        slug: parentMap[p.parent], // parent slug
        child: p.slug, // child slug
      }));
  } catch {
    return [];
  }
}
