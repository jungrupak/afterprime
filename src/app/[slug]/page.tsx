import { notFound } from "next/navigation";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";

type Props = { params: { slug: string } };

// Mark this async because we await inside
export default async function DynamicPage({ params }: Props) {
  // ✅ params is synchronous here, just use it
  const slug = params.slug;

  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const pageData = pages?.[0];

  if (!pageData) {
    notFound();
  }

  return <PageRenderer pageData={pageData} />;
}

// generateStaticParams is for SSG, Next.js expects an array of { slug }
export async function generateStaticParams() {
  const pages = (await wpFetch<WPPage[]>(`/pages?_fields=slug`)) ?? [];

  return pages.map((p) => ({
    slug: p.slug,
  }));
}
