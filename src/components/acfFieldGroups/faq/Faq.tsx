import styles from "./style.module.scss";
import type { PageFieldGroups } from "@/types/blocks";
import Accordion from "@/utils/accordion/Accordion";

type FaqProps = PageFieldGroups["faq_section"];

export default function Faq(props: FaqProps) {
  // map nested faq_item into flat structure

  const { ssection_title, q_and_a } = props || {};
  const safeQandA = q_and_a ?? []; // replaces null/undefined with []
  const accordionItems = safeQandA.map((item) => ({
    question: item?.question || "No question provided",
    answer: item?.answer || "No answer provided",
  }));

  return (
    <section className={`${styles.faq_section}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`${styles.faq_block}`}>
          <h2 className="text-[34px] font-[700] mb-10">{ssection_title}</h2>
          <Accordion faqObjects={accordionItems} />
        </div>
      </div>
    </section>
  );
}
