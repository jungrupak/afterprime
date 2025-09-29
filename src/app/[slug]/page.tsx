import { notFound } from "next/navigation";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";

type Props = { params: { slug: string } };

export default async function DynamicPage({ params }: Props) {
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${params.slug}`);
  const pageData = pages?.[0];

  if (!pageData) {
    notFound();
  }

  return <PageRenderer pageData={pageData} />;
}

export async function generateStaticParams() {
  const pages = (await wpFetch<WPPage[]>(`/pages?_fields=slug`)) ?? [];

  return pages.map((p) => ({ slug: p.slug }));
}
