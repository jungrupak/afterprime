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
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <div className={`${styles.faq_block}`}>
          <h2 className="text-[34px] font-[700] mb-10">{faqSubject}</h2>
          <Accordion faqObjects={faqObjects} />
        </div>
      </div>
    </section>
  );
}
