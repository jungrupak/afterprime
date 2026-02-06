import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";
import FaqSchema from "@/lib/schema/faqSchema";
//####
export const revalidate = 60;

interface PageProps {
  params?: { slug?: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const frontPageSlug =
    params?.slug ?? process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  const seoData = await CustomMetadata(frontPageSlug);
  return seoData;
}

// ✅ Home page component
export default async function HomePage({ params }: PageProps) {
  const frontPageSlug =
    params?.slug ?? process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";

  // Fetch front page from WordPress
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${frontPageSlug}`);
  const pageData = pages?.[0];

  if (!pageData) return <p>Home page not found</p>;

  return (
    <>
      <FaqSchema pageSlug={frontPageSlug} />
      <PageRenderer pageData={pageData} />
    </>
  );
}
