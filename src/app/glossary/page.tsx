import InnerBannerGeneric from "@/components/InnerBannerGeneric/InnerBannerGeneric";
import styles from "./Page.module.scss";
import FaqCalc from "@/components/faq-calculators/Faq";
import FaqSchema from "@/lib/schema/faqSchema";
import { Metadata } from "next";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedMetadata } from "@/lib/seo/metadata";

type GlossaryIndexJson = {
  acf?: {
    inner_banner?: { hero_title?: string; hero_paragraph?: string };
    reading_text_content?: string;
    faq_section?: {
      ssection_title?: string;
      q_and_a?: { question?: string; answer?: string }[];
    };
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return getTranslatedMetadata("glossary", locale);
}

export default async function page() {
  const locale = await getRequestLocale();
  const pageData = await getTranslatedPage<GlossaryIndexJson>("glossary", locale);
  if (!pageData) return null;

  const Banner_CONTENT = {
    heading: pageData?.acf?.inner_banner?.hero_title ?? "",
    paragraph: pageData?.acf?.inner_banner?.hero_paragraph ?? "",
  };

  const contents = pageData?.acf?.reading_text_content;
  const faqDataTitle = pageData?.acf?.faq_section?.ssection_title;
  const faqData = pageData?.acf?.faq_section?.q_and_a;

  return (
    <main>
      <InnerBannerGeneric content={Banner_CONTENT} />

      <section
        className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
      >
        <div className="ap_container_small">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            <div>
              <h2 className="h2-size mb-6 text-center md:text-left">
                How to use this glossary
              </h2>
            </div>
          </div>
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-left mt-5 md:mt-10">
            <div className={`${styles.cardItem} ${styles.cardLarge}`}>
              <h3 className={`ml-0!`}>
                <span
                  className={`text-[clamp(30px,5vw,48px)] font-[300] block`}
                >
                  1.
                </span>
              </h3>
              <p className={`opacity-80 text-[18px]! mb-0!`}>
                Use the <b>Category List</b> if you want to learn a group of
                related concepts at once such as margin or leverage.
              </p>
            </div>

            <div className={`${styles.cardItem} ${styles.cardLarge}`}>
              <h3 className={`ml-0!`}>
                <span
                  className={`text-[clamp(30px,5vw,48px)] font-[300] block`}
                >
                  2.
                </span>
              </h3>
              <p className={`opacity-80 text-[18px]! mb-0!`}>
                Use the <b>A to Z</b> section if you already know the term name
                and need a fast route to the full entry.
              </p>
            </div>

            <div className={`${styles.cardItem} ${styles.cardLarge}`}>
              <h3 className={`ml-0!`}>
                <span
                  className={`text-[clamp(30px,5vw,48px)] font-[300] block`}
                >
                  3.
                </span>
              </h3>
              <p className={`opacity-80 text-[18px]! mb-0!`}>
                On each term page read the first answer block for the quick
                definition then scan the examples table.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="compact-section">
        <div className="ap_container_small">
          <div
            className="ap_cards_wrapper grid flex flex-col md:grid-cols-[repeat(auto-fit_,minmax(600px,1fr))] text-left! gap-6"
            style={{ whiteSpace: "pre-line" }}
          >
            <div className={`${styles.cardLarge} ${styles.cardItem}`}>
              <div
                className={`${styles.pageEditorContent} ${styles.glossaryContent}`}
              >
                <div dangerouslySetInnerHTML={{ __html: contents ?? "" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqCalc faqSubject={faqDataTitle} data={faqData ?? []} />
      <FaqSchema pageSlug="glossary" />
    </main>
  );
}
