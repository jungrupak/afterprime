import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";

// ✅ ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const frontPageSlug = process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";

  // Fetch front page from WordPress
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${frontPageSlug}`);
  const pageData = pages?.[0];
  const pageID = pages?.[0].id;

  // If no page found, fallback message
  if (!pageData) return <p>Home page not found</p>;

  return (
    <>
      <PageRenderer pageData={pageData} />
    </>
  );
}
