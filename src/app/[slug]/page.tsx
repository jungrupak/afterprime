import { notFound } from "next/navigation";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> }; // ⬅️ params is now async

// ✅ Allow runtime slugs
export const dynamicParams = true;

// ✅ Revalidate every 60s (ISR)
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ⬅️ FIX: await params
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const page = pages?.[0];

  return {
    title: page?.aioseo?.title || "Default Title",
    description: page?.aioseo?.description || "Default description",
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params; // ⬅️ FIX: await params

  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const pageData = pages?.[0];

  if (!pageData) {
    notFound();
  }

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
