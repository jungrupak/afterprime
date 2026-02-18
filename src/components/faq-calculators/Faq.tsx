import styles from "./style.module.scss";
import Accordion from "@/utils/accordion/Accordion";
import type { AccordionObjectsKeys } from "@/utils/accordion/Accordion";

interface FAQItem {
  question?: string;
  answer?: string;
}

type faqContents = {
  faqSubject?: string;
  data: FAQItem[];
};

export default function FaqCalc({ data, faqSubject }: faqContents) {
  // map nested faq_item into flat structure
  const safeData = Array.isArray(data) ? data : [];
  const faqObjects: AccordionObjectsKeys[] = safeData.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  // ### FAQ Schema Read
  const FAQ_SCHEMA =
    faqObjects && faqObjects.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqObjects.map((item) => ({
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
      <section className={`${styles.faq_section} compact-section`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small">
          <div className={`${styles.faq_block} mb-0!`}>
            <h2 className="text-[34px] font-[700] mb-10">{faqSubject}</h2>
            <Accordion faqObjects={faqObjects} />
          </div>
        </div>
      </section>
      {/*  */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA),
        }}
      />
    </>
  );
}
