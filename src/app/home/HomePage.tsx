import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import PageRenderer from "@/components/PageRender";

export default async function HomePage() {
  const frontPageSlug = process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${frontPageSlug}`);
  const pageData = pages?.[0];

  if (!pageData) return <p>Home page not found</p>;

  return <PageRenderer pageData={pageData} />;
}
