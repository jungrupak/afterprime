import { notFound } from "next/navigation";
import Link from "next/link";
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
          <div className={`${styles.pageEditorContent}`}>
            <div dangerouslySetInnerHTML={{ __html: contents ?? "" }} />
          </div>
          <div className={`mt-5 md:mt-15`}>
            <h3 className={`text-[35px] mb-3 md:mb-5`}>{glossaryTermT.relatedToolsHeading}</h3>
            <p className={`text-[18px] mb-3 md:mb-5`}>
              {glossaryTermT.relatedToolsIntro}
            </p>
            <ul className="ulli mb-0!">
              <li>
                <Link
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href={localizeHref("/calculators/pip-value-calculator", locale)}
                >
                  {glossaryTermT.pipValueCalculator}
                </Link>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  {glossaryTermT.pipValueDescription}
                </p>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href={localizeHref("/calculators/position-size-calculator", locale)}
                >
                  {glossaryTermT.positionSizeCalculator}
                </Link>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  {glossaryTermT.positionSizeDescription}
                </p>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href={localizeHref("/calculators/drawdown-calculator", locale)}
                >
                  {glossaryTermT.drawdownCalculator}
                </Link>
                <br />
                <p className={`text-[16px] opacity-65`}>{glossaryTermT.drawdownDescription}</p>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href={localizeHref("/vs", locale)}
                >
                  {glossaryTermT.compareCosts}
                </Link>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  {glossaryTermT.compareCostsDescription}
                </p>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href={localizeHref("/live-spreads", locale)}
                >
                  {glossaryTermT.liveSpreads}
                </Link>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  {glossaryTermT.liveSpreadsDescription}
                </p>
              </li>
            </ul>
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
