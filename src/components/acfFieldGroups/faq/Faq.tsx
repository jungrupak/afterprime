import styles from "./style.module.scss";
import Accordion from "@/utils/accordion/Accordion";

export default function Faq() {
  // map nested faq_item into flat structure

  return (
    <section className={`${styles.faq_section}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`${styles.faq_block}`}>
          <h2 className="text-[34px] font-[700] mb-10">FAQ</h2>
          {/* <Accordion faqObjects={faqObjects} /> */}
        </div>
      </div>
    </section>
  );
}
