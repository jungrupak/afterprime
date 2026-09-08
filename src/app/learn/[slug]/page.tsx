import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import FaqCalc from "@/components/faq-calculators/Faq";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { localizeHref } from "@/lib/locale/localizeHref";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import { buildLearnArticleSchema } from "@/lib/schema/learnArticleSchema";
import { learnGuides } from "../learnGuides";
import { learnGuideBodies } from "../learnGuideBodies";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

type LearnWpFaqItem = { question?: string; answer?: string };

// Shape of a WordPress page fetched by slug for a guide. Every field is
// optional — most guides don't have a WP page yet, and even when one
// exists, editors fill in fields (body, FAQ) progressively.
type LearnWpPageJson = {
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    faq_section?: {
      ssection_title?: string;
      q_and_a?: LearnWpFaqItem[];
    };
  };
  aioseo_head_json?: {
    title?: string;
    description?: string;
    "og:image"?: string;
    "og:image:secure_url"?: string;
    "article:published_time"?: string;
    "article:modified_time"?: string;
  };
};

// WP's default page content is an HTML-comment placeholder until an editor
// fills it in — strip comments/whitespace to tell "real content" from that.
function hasRealHtml(html?: string): boolean {
  if (!html) return false;
  return html.replace(/<!--[\s\S]*?-->/g, "").trim().length > 0;
}

export function generateStaticParams() {
  return learnGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageSlug): Promise<Metadata> {
  const { slug } = await params;
  const guide = learnGuides.find((g) => g.slug === slug);
  if (!guide) return {};

  const locale = await getRequestLocale();
  const wpPage = await getTranslatedPage<LearnWpPageJson>(slug, locale);
  const seo = wpPage?.aioseo_head_json;

  const t = await getTranslatedStatic(`learn-guide-meta-${guide.slug}`, locale, {
    title: guide.title,
    description: guide.metaDescription,
  });

  return {
    title: seo?.title || t.title,
    description: seo?.description || t.description,
  };
}

export default async function Page({ params }: PageSlug) {
  const { slug } = await params;
  const guide = learnGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const staticBody = learnGuideBodies[guide.slug];
  if (!staticBody) notFound();

  const locale = await getRequestLocale();
  // getTranslatedPage already runs the fetched WP page through the same
  // translation pipeline as everything else — its fields are used as-is
  // below, never re-translated.
  const wpPage = await getTranslatedPage<LearnWpPageJson>(guide.slug, locale);

  const wpTitle = wpPage?.title?.rendered;
  const wpBodyHtml = wpPage?.content?.rendered;
  const wpFaqTitle = wpPage?.acf?.faq_section?.ssection_title;
  const wpFaq = wpPage?.acf?.faq_section?.q_and_a;
  const seo = wpPage?.aioseo_head_json;

  const t = await getTranslatedStatic(`learn-guide-${guide.slug}`, locale, {
    title: guide.title,
    teaser: guide.teaser,
    learnLabel: "Learn",
    bodyHtml: staticBody.bodyHtml,
    faqSectionTitle: staticBody.faqSectionTitle,
    faq: staticBody.faq,
  });

  const title = wpTitle || t.title;
  const bodyHtml = hasRealHtml(wpBodyHtml) ? (wpBodyHtml as string) : t.bodyHtml;
  const faqSectionTitle = wpFaqTitle || t.faqSectionTitle;
  const faq =
    wpFaq && wpFaq.length > 0
      ? wpFaq.map((item) => ({
          question: item.question ?? "",
          answer: item.answer ?? "",
        }))
      : t.faq;

  const canonicalUrl = `https://afterprime.com${localizeHref(
    `/learn/${guide.slug}`,
    locale,
  )}`;
  const articleSchema = buildLearnArticleSchema({
    headline: title,
    description: seo?.description || t.teaser,
    canonicalUrl,
    image: seo?.["og:image:secure_url"] || seo?.["og:image"],
    datePublished: seo?.["article:published_time"],
    dateModified: seo?.["article:modified_time"],
  });

  return (
    <main>
      <section className={`${styles.innerBannerSection} h-auto! innerpage-banner`}>
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent text-center">
            <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold">
              {title}
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
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
      </section>

      <FaqCalc faqSubject={faqSectionTitle} data={faq} />

      <BreadcrumbSchema
        items={[
          { name: t.learnLabel, href: localizeHref("/learn", locale) },
          {
            name: title,
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
