import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import FaqCalc from "@/components/faq-calculators/Faq";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { localizeHref } from "@/lib/locale/localizeHref";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import { buildLearnArticleSchema } from "@/lib/schema/learnArticleSchema";
import { learnGuides } from "../learnGuides";
import { learnGuideBodies } from "../learnGuideBodies";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return learnGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageSlug): Promise<Metadata> {
  const { slug } = await params;
  const guide = learnGuides.find((g) => g.slug === slug);
  if (!guide) return {};
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(`learn-guide-meta-${guide.slug}`, locale, {
    title: guide.title,
    description: guide.metaDescription,
  });
  return {
    title: t.title,
    description: t.description,
  };
}

export default async function Page({ params }: PageSlug) {
  const { slug } = await params;
  const guide = learnGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const body = learnGuideBodies[guide.slug];
  if (!body) notFound();

  const locale = await getRequestLocale();

  const t = await getTranslatedStatic(`learn-guide-${guide.slug}`, locale, {
    title: guide.title,
    teaser: guide.teaser,
    learnLabel: "Learn",
    bodyHtml: body.bodyHtml,
    faqSectionTitle: body.faqSectionTitle,
    faq: body.faq,
  });

  const canonicalUrl = `https://afterprime.com${localizeHref(
    `/learn/${guide.slug}`,
    locale,
  )}`;
  const articleSchema = buildLearnArticleSchema({
    headline: t.title,
    description: t.teaser,
    canonicalUrl,
  });

  return (
    <main>
      <section className={`${styles.innerBannerSection} h-auto! innerpage-banner`}>
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent text-center">
            <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold">
              {t.title}
            </h1>
            <div className="reading-text-lg mt-5 md:mt-10 font-light">
              {t.teaser}
            </div>
          </div>
        </div>
      </section>

      <section className="compact-section">
        <div className="ap_container_small">
          <div
            className="cmsTextEditorContent"
            dangerouslySetInnerHTML={{ __html: t.bodyHtml }}
          />
        </div>
      </section>

      <FaqCalc faqSubject={t.faqSectionTitle} data={t.faq} />

      <BreadcrumbSchema
        items={[
          { name: t.learnLabel, href: localizeHref("/learn", locale) },
          {
            name: t.title,
            href: localizeHref(`/learn/${guide.slug}`, locale),
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
