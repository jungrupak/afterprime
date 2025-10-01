import { notFound } from "next/navigation";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";

type Props = { params: { slug: string } };

// allow runtime slugs
export const dynamicParams = true;

export default async function DynamicPage({ params }: Props) {
  const slug = params.slug;
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const pageData = pages?.[0];

  if (!pageData) {
    notFound();
  }

  return <PageRenderer pageData={pageData} />;
}

// optional: pre-generate known slugs
export async function generateStaticParams() {
  const pages = (await wpFetch<WPPage[]>(`/pages?_fields=slug`)) ?? [];
  return pages.map((p) => ({ slug: p.slug }));
}
