import { getGlossaryPageSlug } from "@/lib/getGlossaryPageData";
import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import InnerBannerGeneric from "@/components/InnerBannerGeneric/InnerBannerGeneric";
import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { CtaBlock } from "@/components/acfFieldGroups/cta-block/CtaBlock";

interface PageSlug {
  params: Promise<{
    terms: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageSlug): Promise<Metadata> {
  const { terms } = await params;
  const pageData = await getGlossaryPageSlug(terms);
  const pageTitle = pageData?.title?.rendered ?? "";
  // 🚫 If no page OR wrong parent → no metadata
  if (!pageData || pageData.parent !== 4100) {
    return {};
  }
  return {
    title: `${pageTitle} | Forex Glossary | Afterprime`,
    description: `Learn what ${pageTitle} means in forex trading. Clear, concise definitions for serious traders, part of the Afterprime forex glossary.`,
    alternates: {
      canonical: `https://afterprime.com/glossary/${terms}`,
    },
  };
}

export default async function page({ params }: PageSlug) {
  const { terms } = await params;
  const pageData = await getGlossaryPageSlug(terms);
  // 🚫 If no page OR wrong parent → page not found
  if (!pageData || pageData.parent !== 4100) {
    return notFound();
  }

  //Banner Content
  const banner = {
    heading: pageData?.title?.rendered ?? "",
    paragraph: pageData?.acf?.inner_banner?.hero_paragraph ?? "",
  };

  //Reading Content
  const contents = pageData?.content?.rendered ?? "";

  return (
    <main>
      {/*  */}
      <InnerBannerGeneric content={banner} />
      {/*  */}

      {/*  */}
      <section className="compact-section">
        <div className="ap_container_small">
          {/* Cards */}
          <div className={`${styles.pageEditorContent}`}>
            <div dangerouslySetInnerHTML={{ __html: contents ?? "" }} />
          </div>
          {/* Cards Ends */}
        </div>
      </section>
      {/*  */}

      {/* CTA */}
      <section className="compact-section">
        <div className="ap_container_small">
          <CtaBlock />
        </div>
      </section>

      {/* CTA ends */}
    </main>
  );
}

// 🔹 Pre-build all static params for ISR
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?parent=4100&_fields=slug`);
  if (!Array.isArray(pages)) return [];
  return pages.map((p) => ({
    terms: p.slug,
  }));
}
