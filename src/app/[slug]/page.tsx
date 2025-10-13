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
  const pageData = pages?.[0];
  const seoData = pageData?.acf?.seo_block;
  // const seoBlock = pageData?.acf.seo_block;

  return {
    title: seoData?.title || "Get Paid To Trade",
    description:
      seoData?.description ||
      "#1 Lowest Costs—Verified. Aligned A-Book+. Flow Rewards Built In.",
    openGraph: {
      title: seoData?.opengraph?.title || "",
      description: seoData?.opengraph?.description || "",
      url: `https://afterprime.com/${slug}`,
      siteName: "Afterprime",
      images: [
        {
          url:
            seoData?.opengraph?.og_image?.url ||
            "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
          width: 1200,
          height: 630,
          alt: seoData?.opengraph?.og_image?.alt || "Get Paid To Trade",
        },
      ],
    },
    alternates: {
      canonical: `https://afterprime.com/${slug}`,
    },
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
