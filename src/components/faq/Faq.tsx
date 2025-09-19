import styles from "./style.module.scss";
import Accordion from "@/utils/accordion/Accordion";

type faqContents = {
  faqSubject?: string;
  faqObjectsToReceive: {
    question?: string;
    answer?: string;
  }[];
};

export default function Faq({ faqSubject, faqObjectsToReceive }: faqContents) {
  return (
    <section className={`${styles.faq_section}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`${styles.faq_block}`}>
          <h2 className="text-[34px] font-[700] mb-10">{faqSubject}</h2>
          <Accordion faqObjects={faqObjectsToReceive} />
        </div>
      </div>
    </section>
  );
}
