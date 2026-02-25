import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import InnerBannerGeneric from "@/components/InnerBannerGeneric/InnerBannerGeneric";
import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";

interface PageSlug {
  params: Promise<{
    terms: string;
  }>;
}

export default async function page({ params }: PageSlug) {
  const { terms } = await params;
  const pageData = await getPageDataBySlug(terms);
  if (!pageData) {
    notFound();
  }

  //Banner Content
  const banner = {
    heading: pageData?.title?.rendered,
    paragraph: pageData?.acf?.inner_banner?.hero_paragraph ?? "",
  };
  //Reading Content
  const contents = pageData?.acf?.reading_text_content;

  console.log("Page Slug", terms);

  return (
    <main>
      {/*  */}
      <InnerBannerGeneric content={banner} />
      {/*  */}

      {/*  */}
      <section className="compact-section">
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          {/* Cards */}
          <div className={`${styles.pageEditorContent}`}>
            <div dangerouslySetInnerHTML={{ __html: contents ?? "" }} />
          </div>
          {/* Cards Ends */}
        </div>
      </section>
      {/*  */}
    </main>
  );
}

// 🔹 Pre-build all static params for ISR
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);
  if (!pages) return [];

  const parents = pages.filter((p) => p.parent === 0);
  const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

  return pages
    .filter((p) => p.parent !== 0 && parentMap[p.parent])
    .map((p) => ({
      slug: parentMap[p.parent],
      inst: p.slug,
    }));
}
