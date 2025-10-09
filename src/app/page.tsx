import type { Metadata } from "next";
import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";

export const revalidate = 60;
export const dynamic = "force-dynamic";

interface PageProps {
  params?: { slug?: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const page = pages?.[0];

  return {
    title: page?.aioseo?.title || "Afterprime",
    description:
      page?.aioseo?.description ||
      "#1 Lowest Costs—Verified. Aligned A-Book+. Flow Rewards Built In.",
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
