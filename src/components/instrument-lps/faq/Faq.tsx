import styles from "./style.module.scss";
import Accordion from "@/utils/accordion/Accordion";
import type { AccordionObjectsKeys } from "@/utils/accordion/Accordion";

interface FAQItem {
  question?: string;
  answer?: string;
}

type faqContents = {
  faqSubject?: string;
  data?: FAQItem[];
};

export default function Faq({ data, faqSubject }: faqContents) {
  // map nested faq_item into flat structure
  if (!data) return null;
  return (
    <section className={`${styles.faq_section} max-md:py-0! md:py-15!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <div className={`${styles.faq_block}`}>
          <h2 className="text-[34px] font-[700] mb-10">{faqSubject}</h2>
          <Accordion faqObjects={data} />
        </div>
      </div>
    </section>
  );
}
