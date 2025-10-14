import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { getWpPagedata } from "@/utils/getWpPagedata";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";

// ✅ Allow runtime slugs
export const dynamicParams = true;

// ✅ Revalidate every 60s (ISR)
export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: pageSlug } = await params;
  const seoData = await CustomMetadata(pageSlug);
  return seoData;
}

export function generateViewport() {
  return {
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
      minimumScale: 1,
    },
    themeColor: "#0c0c0d",
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug: pageSlug } = await params; //renamed variable slug to custm name
  const pageData = await getWpPagedata(pageSlug);
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
