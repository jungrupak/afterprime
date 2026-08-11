import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import InnerBannerGeneric from "@/components/InnerBannerGeneric/InnerBannerGeneric";
import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { CtaBlock } from "@/components/acfFieldGroups/cta-block/CtaBlock";
import GlossaryVideo from "@/components/GlossaryVideo/GlossaryVideo";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getTranslatedMetadata } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";
import { glossaryTermContent } from "./glossaryTermContent";
import Card from "@/components/ui/Card";

const GLOSSARY_PARENT_ID = 4100;

interface PageSlug {
  params: Promise<{
    terms: string;
  }>;
}

type GlossaryTermJson = {
  parent?: number;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    inner_banner?: { hero_paragraph?: string };
  };
};

export async function generateMetadata({
  params,
}: PageSlug): Promise<Metadata> {
  const { terms } = await params;
  const locale = await getRequestLocale();

  // Guard: confirm this slug actually belongs to the glossary section.
  const guard = await wpFetch<WPPage[]>(
    `/pages?slug=${terms}&parent=${GLOSSARY_PARENT_ID}&_fields=id`,
  );
  if (!guard?.length) return {};

  return getTranslatedMetadata(terms, locale, `/glossary/${terms}`);
}

export default async function page({ params }: PageSlug) {
  const { terms } = await params;
  const locale = await getRequestLocale();

  // Guard: confirm this slug actually belongs to the glossary section.
  const guard = await wpFetch<WPPage[]>(
    `/pages?slug=${terms}&parent=${GLOSSARY_PARENT_ID}&_fields=id`,
  );
  if (!guard?.length) return notFound();

  const pageData = await getTranslatedPage<GlossaryTermJson>(terms, locale);
  if (!pageData) return notFound();

  const banner = {
    heading: pageData?.title?.rendered ?? "",
    paragraph: pageData?.acf?.inner_banner?.hero_paragraph ?? "",
  };

  const contents = pageData?.content?.rendered ?? "";

  const glossaryTermT = await getTranslatedStatic(
    `glossary-term-${terms}`,
    locale,
    glossaryTermContent,
  );

  return (
    <main>
      <InnerBannerGeneric content={banner} />

      <GlossaryVideo term={terms} />

      <section className="compact-section">
        <div className="ap_container_small">
          <div className={`cmsTextEditorContent`}>
            <div dangerouslySetInnerHTML={{ __html: contents ?? "" }} />
          </div>
          <div className={`mt-5 md:mt-15`}>
            <h3
              className={`font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold`}
            >
              {glossaryTermT.relatedToolsHeading}
            </h3>
            <p className={`reading-text-md opacity-60 mb-8 md:mb-12`}>
              {glossaryTermT.relatedToolsIntro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card
                cardSize="compact"
                alignItems="left"
                title={glossaryTermT.pipValueCalculator}
                paragraph={glossaryTermT.pipValueDescription}
                cardCtaLabel={glossaryTermT.pipValueCalculator}
                cardCtaLink={localizeHref(
                  "/calculators/pip-value-calculator",
                  locale,
                )}
              />
              <Card
                cardSize="compact"
                alignItems="left"
                title={glossaryTermT.positionSizeCalculator}
                paragraph={glossaryTermT.positionSizeDescription}
                cardCtaLabel={glossaryTermT.positionSizeCalculator}
                cardCtaLink={localizeHref(
                  "/calculators/position-size-calculator",
                  locale,
                )}
              />
              <Card
                cardSize="compact"
                alignItems="left"
                title={glossaryTermT.drawdownCalculator}
                paragraph={glossaryTermT.drawdownDescription}
                cardCtaLabel={glossaryTermT.drawdownCalculator}
                cardCtaLink={localizeHref(
                  "/calculators/drawdown-calculator",
                  locale,
                )}
              />
              <Card
                cardSize="compact"
                alignItems="left"
                title={glossaryTermT.compareCosts}
                paragraph={glossaryTermT.compareCostsDescription}
                cardCtaLabel={glossaryTermT.compareCosts}
                cardCtaLink={localizeHref("/vs", locale)}
              />
              <Card
                cardSize="compact"
                alignItems="left"
                title={glossaryTermT.liveSpreads}
                paragraph={glossaryTermT.liveSpreadsDescription}
                cardCtaLabel={glossaryTermT.liveSpreads}
                cardCtaLink={localizeHref("/live-spreads", locale)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="compact-section">
        <div className="ap_container_small">
          <CtaBlock />
        </div>
      </section>
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
