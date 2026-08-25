"use client";
import styles from "./DifferenceComparison.module.scss";
import { boostedContent } from "./boostedContent";
import { useInView } from "./useInView";
import CheckIcon from "@/components/ui/icons/CheckIcon";
import CrossIcon from "@/components/ui/icons/CrossIcon";

export default function DifferenceComparison() {
  const { difference } = boostedContent;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.heading_block}>
          <p className={styles.eyebrow}>{difference.eyebrow}</p>
          <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
            {difference.heading}
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.card_label}>{difference.typical.label}</p>
            <ul className={styles.list}>
              {difference.typical.points.map((point) => (
                <li key={point}>
                  <CrossIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.card} ${styles.card_highlight}`}>
            <p className={`${styles.card_label} ${styles.card_label_accent}`}>
              {difference.boosted.label}
            </p>
            <ul className={styles.list}>
              {difference.boosted.points.map((point) => (
                <li key={point}>
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
