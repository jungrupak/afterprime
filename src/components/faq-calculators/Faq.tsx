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

  return (
    <section className={`${styles.faq_section}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`${styles.faq_block}`}>
          <h2 className="text-[34px] font-[700] mb-10">{faqSubject}</h2>
          <Accordion faqObjects={faqObjects} />
        </div>
      </div>
    </section>
  );
}
