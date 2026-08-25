"use client";
import styles from "./DifferenceComparison.module.scss";
import { boostedContent } from "./boostedContent";
import { useInView } from "./useInView";
import BulletTickBlue from "@/components/ui/BulletTickBlue";
import BulletGrey from "@/components/ui/BulletGrey";

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

        <div className={styles.cardsWrapper}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{difference.typical.label}</h3>
            <ul className={styles.cardList}>
              {difference.typical.points.map((point) => (
                <li key={point}>
                  <BulletGrey />
                  <span className={styles.textCons}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{difference.boosted.label}</h3>
            <ul className={styles.cardList}>
              {difference.boosted.points.map((point) => (
                <li key={point}>
                  <BulletTickBlue />
                  <span className={styles.textPros}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
