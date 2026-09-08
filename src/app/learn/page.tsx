import { Metadata } from "next";
import styles from "./Page.module.scss";
import Card from "@/components/ui/Card";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { localizeHref } from "@/lib/locale/localizeHref";
import { buildHreflangMap } from "@/lib/seo/metadata";
import { learnGuides, LEARN_CATEGORIES } from "./learnGuides";
import { learnPageContent } from "./learnPageContent";
import { buildLearnCollectionSchema } from "@/lib/schema/learnCollectionSchema";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const canonicalUrl = `https://afterprime.com${localizeHref("/learn", locale)}`;
  return {
    title: "CFD Trading Guides: Strategies, Risk Management & Markets",
    description:
      "Browse Afterprime's CFD trading guides: how CFDs work, trading strategies, risk management, product comparisons, and market-specific guides.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap("learn", "/learn"),
    },
  };
}

type GuideCopy = { title: string; teaser: string };

export default async function Page() {
  const locale = await getRequestLocale();

  // Only translatable copy goes through the pipeline, keyed by slug —
  // slug/category themselves are never translated (they're used for
  // routing/lookup, and translating a value used in a comparison breaks
  // it silently).
  const guideCopySource: Record<string, GuideCopy> = Object.fromEntries(
    learnGuides.map((g): [string, GuideCopy] => [
      g.slug,
      { title: g.title, teaser: g.teaser },
    ]),
  );

  const t = await getTranslatedStatic("learn-page", locale, {
    ...learnPageContent,
    guideCopy: guideCopySource,
  });

  const schema = buildLearnCollectionSchema();

  return (
    <main>
      <section className={`${styles.innerBannerSection} h-auto! innerpage-banner`}>
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent text-center">
            <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold">
              {t.heroTitle}
            </h1>
            <div className="reading-text-lg mt-5 md:mt-10 font-light">
              {t.heroIntro}
            </div>
          </div>
        </div>
      </section>

      {LEARN_CATEGORIES.map((category) => {
        const guidesInCategory = learnGuides.filter((g) => g.category === category);
        return (
          <section className="compact-section" key={category}>
            <div className="ap_container_small">
              <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
                {category}
              </h2>
              <div className="ap_cards_wrapper grid flex flex-col md:grid-cols-[repeat(auto-fit_,minmax(335px,1fr))] text-left! gap-6">
                {guidesInCategory.map((guide) => {
                  const copy = t.guideCopy[guide.slug];
                  return (
                    <Card
                      key={guide.slug}
                      title={copy?.title ?? guide.title}
                      paragraph={copy?.teaser ?? guide.teaser}
                      cardCtaLabel={copy?.title ?? guide.title}
                      cardCtaLink={localizeHref(`/learn/${guide.slug}`, locale)}
                      cardSize="large"
                      alignItems="left"
                    />
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
