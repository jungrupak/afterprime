"use client";
import styles from "./FaqBoosted.module.scss";
import { boostedContent, type BoostedFaqContent } from "./boostedContent";
import { useInView } from "./useInView";
import Accordion from "@/utils/accordion/Accordion";

interface FaqBoostedProps {
  content?: BoostedFaqContent;
}

export default function FaqBoosted({
  content = boostedContent.faq,
}: FaqBoostedProps) {
  const faq = content;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <div className={`${styles.heading_block} `}>
          <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
            {faq.heading}
          </h2>
        </div>

        <Accordion faqObjects={faq.items} defaultOpenIndex={-1} />
      </div>
    </section>
  );
}
