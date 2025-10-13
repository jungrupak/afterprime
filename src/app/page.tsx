import type { Metadata } from "next";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
//####
export const revalidate = 60;
//export const dynamic = "force-dynamic"; // this tells to NEXT "Always render this page on the server at request time — do not pre-render or cache it."

interface PageProps {
  params?: { slug?: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const frontPageSlug =
    params?.slug ?? process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  // Fetch front page from WordPress
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${frontPageSlug}`);
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
      url: `https://afterprime.com/${frontPageSlug}`,
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
      canonical: `https://afterprime.com/${frontPageSlug}`,
    },
  };
}

// ✅ Home page component
export default async function HomePage({ params }: PageProps) {
  const frontPageSlug =
    params?.slug ?? process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";

  // Fetch front page from WordPress
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${frontPageSlug}`);
  const pageData = pages?.[0];

  if (!pageData) return <p>Home page not found</p>;

  return <PageRenderer pageData={pageData} />;
}
