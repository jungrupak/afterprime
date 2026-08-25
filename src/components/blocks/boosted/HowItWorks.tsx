"use client";
import styles from "./HowItWorks.module.scss";
import { boostedContent } from "./boostedContent";
import { useInView } from "./useInView";

export default function HowItWorks() {
  const { howItWorks } = boostedContent;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="how-it-works" className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.heading_block}>
          <p className={styles.eyebrow}>{howItWorks.eyebrow}</p>
          <h2 className="h2-size">{howItWorks.heading}</h2>
        </div>

        <ol className={styles.steps}>
          {howItWorks.steps.map((step, index) => {
            const stepNumber = index + 1;
            const isFinal = stepNumber === howItWorks.steps.length;
            return (
              <li key={step.title} className={styles.step}>
                <span
                  className={`${styles.step_number} ${
                    isFinal ? styles.step_number_final : ""
                  }`}
                >
                  {stepNumber}
                </span>
                <h3 className={styles.step_title}>{step.title}</h3>
                <p className={styles.step_body}>{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
