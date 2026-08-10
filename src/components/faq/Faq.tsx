import styles from "./style.module.scss";
import Accordion from "@/utils/accordion/Accordion";
import type { AccordionObjectsKeys } from "@/utils/accordion/Accordion";

interface FAQItem {
  faq_item: {
    question: string;
    answer: string;
  };
}

type faqContents = {
  faqSubject?: string;
  data: FAQItem[];
};

export default function Faq({ data, faqSubject }: faqContents) {
  // map nested faq_item into flat structure
  const faqObjects: AccordionObjectsKeys[] = data.map((item) => ({
    question: item.faq_item.question,
    answer: item.faq_item.answer,
  }));

  return (
    <section className={`${styles.faq_section} compact-section`}>
      <div className="ap_container_small">
        <div className={`${styles.faq_block}`}>
          <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
            {faqSubject}
          </h2>
          <Accordion faqObjects={faqObjects} />
        </div>
      </div>
    </section>
  );
}
