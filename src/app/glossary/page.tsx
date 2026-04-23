import InnerBannerGeneric from "@/components/InnerBannerGeneric/InnerBannerGeneric";
import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import styles from "./Page.module.scss";
import FaqCalc from "@/components/faq-calculators/Faq";
import FaqSchema from "@/lib/schema/faqSchema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forex Trading Glossary | Afterprime",
  description:
    "Master forex trading terminology with Afterprime's complete glossary. Definitions for spreads, leverage, pips, margin, and more — built for serious traders.",
  alternates: {
    canonical: "https://afterprime.com/glossary",
  },
};

export default async function page() {
  const pageData = await getPageDataBySlug("glossary");
  if (!pageData) return null;
  //Banner Content
  const Banner_CONTENT = {
    heading: pageData?.acf?.inner_banner?.hero_title,
    paragraph: pageData?.acf?.inner_banner?.hero_paragraph,
  };

  //Content
  const contents = pageData?.acf?.reading_text_content;

  //FAQ Data
  const faqDataTitle = pageData?.acf?.faq_section?.ssection_title;
  const faqData = pageData?.acf?.faq_section?.q_and_a;

  return (
    <main>
      {/* Banner Section */}
      <InnerBannerGeneric content={Banner_CONTENT} />
      {/* Banner Section Ends */}

      {/* How to use Cards */}
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
          {/* Cards */}
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
          {/* Cards Ends */}
        </div>
      </section>
      {/* How to use Cards ends */}

      {/* ## */}
      {/* INtro sectio */}
      <section className="compact-section">
        <div className="ap_container_small">
          {/* Cards */}
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
          {/* Cards Ends */}
        </div>
      </section>
      {/* INtro sectio Ends */}
      {/* ## Ends */}

      {/* FAQ  */}
      <FaqCalc faqSubject={faqDataTitle} data={faqData} />
      <FaqSchema pageSlug="glossary" />
      {/* FAQ Ends */}
    </main>
  );
}
