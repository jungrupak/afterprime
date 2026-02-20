import styles from "./style.module.scss";
import type { PageFieldGroups } from "@/types/blocks";
import Accordion from "@/utils/accordion/Accordion";

type FaqProps = PageFieldGroups["faq_section"];

export default function Faq(props: FaqProps) {
  // map nested faq_item into flat structure

  const { ssection_title, q_and_a } = props || {};
  const safeQandA = Array.isArray(q_and_a) ? q_and_a : q_and_a ? [q_and_a] : []; // replaces null/undefined with []
  const accordionItems = safeQandA.map((item) => ({
    question: item?.question || "No question provided",
    answer: item?.answer || "No answer provided",
  }));

  const stripHtml = (html?: string | null): string => {
    if (!html) return "";
    return html
      .replace(/<\/(p|div|li)>/gi, "\n") // replace closing block tags with newline
      .replace(/<[^>]+>/g, "") // remove remaining tags
      .replace(/\n+/g, "\n") // collapse multiple newlines
      .trim();
  };
  // ### FAQ Schema Read
  const FAQ_SCHEMA =
    accordionItems && accordionItems.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: accordionItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // ### FAQ Schema Read Ends

  return (
    <>
      {ssection_title && (
        <section className={`${styles.faq_section} compact-section`}>
          {/* grain bg effect */}
          <div className="grainy_bg"></div>
          {/* grain bg effect */}
          <div className="ap_container_small">
            <div className={`${styles.faq_block}`}>
              <h2 className="text-[34px] font-[700] mb-10">{ssection_title}</h2>
              <Accordion faqObjects={accordionItems} />
            </div>
          </div>
        </section>
      )}
      {/*  */}
      {FAQ_SCHEMA && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(FAQ_SCHEMA),
          }}
        />
      )}
    </>
  );
}
