import styles from "./Page.module.scss";
import Lists from "@/utils/lists/Lists";
import Card from "@/components/ui/Card";
import Image from "next/image";
import FaqCalc from "@/components/faq-calculators/Faq";
import { calculatorSchema } from "@/lib/schema/calculatorsPageSchema";
import { CustomMetadata } from "@/utils/CustomMetadata";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { calculatorsPageContent } from "./pageContent";
import { localizeHref } from "@/lib/locale/localizeHref";

export async function generateMetadata() {
  const seoData = await CustomMetadata("calculators");
  return seoData;
}

type CalculatorsLandingJson = {
  acf?: {
    faq_section?: {
      ssection_title?: string;
      q_and_a?: { question?: string; answer?: string }[];
    };
  };
};

//Export Dynamic Page Title Tags Ends####

//####
export default async function Page() {
  const locale = await getRequestLocale();
  const pageData = await getTranslatedPage<CalculatorsLandingJson>(
    "calculators",
    locale,
  );
  const t = await getTranslatedStatic(
    "calculators-landing",
    locale,
    calculatorsPageContent,
  );

  if (!pageData) {
    return <div>{t.unavailable}</div>;
  }
  const faqSection = pageData?.acf?.faq_section;

  const sectionTitle = faqSection?.ssection_title;
  const faqData = faqSection?.q_and_a;

  const cards = t.cards;
  const listItems = t.listItems;
  const listBeforeTrade = t.listBeforeTrade;
  const listStrategyPlanning = t.listStrategyPlanning;

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent text-center">
            <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold ">
              <span className="font-[600]">{t.heroTitle}</span>
            </h1>
            <div className="reading-text-lg mt-5 md:mt-10 opacity-60 font-light">
              {t.heroParagraphPre}{" "}
              <a href={localizeHref("/vs", locale)}>
                <u>{t.heroCompareLinkText}</u>
              </a>{" "}
              {t.heroParagraphPost}
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* INtro sectio */}
      <section className="compact-section">
        <div className="ap_container_small">
          {/* Cards */}
          <div
            className="ap_cards_wrapper grid flex flex-col md:grid-cols-[repeat(auto-fit_,minmax(600px,1fr))] text-left! gap-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {cards.length > 0 &&
              cards.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  paragraph={card.paragraph}
                  cardCtaLabel={card.title}
                  cardCtaLink={localizeHref(card.button_url, locale)}
                  cardSize={"large"} //compact|large|regular|small|
                  alignItems="left"
                />
              ))}
          </div>
          {/* Cards Ends */}
        </div>
      </section>
      {/* INtro sectio Ends */}

      {/* section */}
      <section className="compact-section">
        <div className="ap_container_small">
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:gap-25 gap-10">
            <div className="col-span-2 md:col-span-1 order-2 h-full">
              <Image
                src={"/a-lone-trader-on-a-subway-ghost-in-the-studio.webp"}
                width={600}
                height={700}
                alt={t.imageAlt}
                className="aspect-auto"
              />
            </div>
            <div className="col-span-2 md:col-span-1 contetPart order-1">
              <h2
                className={`font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold`}
              >
                {t.whyUseHeading}
              </h2>
              <Lists bulletStyle="arrow_blue" items={listItems} />
            </div>
          </div>
        </div>
      </section>
      {/* section Ends */}

      {/* When to use calculator */}
      <section className="compact-section">
        <div className="ap_container_small">
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-5">
            <div
              className={`card-bg-bottomfade p-[var(--space-md)] md:p-[var(--space-xl)]`}
            >
              <h3 className={`cardTitle`}>{t.beforeTheTradeHeading}</h3>
              <Lists bulletStyle="arrow" items={listBeforeTrade} size="Small" />
            </div>
            <div
              className={`card-bg-bottomfade p-[var(--space-md)] md:p-[var(--space-xl)]`}
            >
              <h3 className={`cardTitle`}>{t.strategyPlanningHeading}</h3>
              <Lists
                bulletStyle="arrow"
                items={listStrategyPlanning}
                size="Small"
              />
            </div>
            <div
              className={`card-bg-bottomfade p-[var(--space-md)] md:p-[var(--space-xl)]`}
            >
              <h3 className={`cardTitle`}>{t.accountManagementHeading}</h3>
              <Lists bulletStyle="arrow" items={listBeforeTrade} size="Small" />
            </div>
          </div>
        </div>
      </section>
      {/* When to use calculator */}

      <FaqCalc faqSubject={sectionTitle} data={faqData ?? []} />

      {/* //render data comparison schema */}
      {calculatorSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(calculatorSchema),
          }}
        />
      )}
    </>
  );
}
