"use client";
import styles from "./AccountMechanics.module.scss";
import { boostedContent } from "./boostedContent";
import { useInView } from "./useInView";

export default function AccountMechanics() {
  const { mechanics } = boostedContent;
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
          <p className={styles.eyebrow}>{mechanics.eyebrow}</p>
          <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
            {mechanics.heading}
          </h2>
        </div>

        <div className={styles.panel}>
          <div className={styles.grid}>
            {mechanics.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <p
                  className={`${styles.stat_label} ${
                    stat.accent ? styles.stat_label_accent : ""
                  }`}
                >
                  {stat.label}
                </p>
                <p className={styles.stat_value}>{stat.value}</p>
                <p className={styles.stat_caption}>{stat.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
