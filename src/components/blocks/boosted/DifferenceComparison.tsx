"use client";
import styles from "./DifferenceComparison.module.scss";
import {
  boostedContent,
  type BoostedDifferenceContent,
} from "./boostedContent";
import { useInView } from "./useInView";
import Button from "@/components/ui/Button";
import BulletTickBlue from "@/components/ui/BulletTickBlue";
import BulletGrey from "@/components/ui/BulletGrey";

interface DifferenceComparisonProps {
  content?: BoostedDifferenceContent;
}

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l7.1-1.01L12 2z"
        fill="#F4F4FA"
      />
    </svg>
  );
}

export default function DifferenceComparison({
  content = boostedContent.difference,
}: DifferenceComparisonProps) {
  const difference = content;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        {/* Title */}
        <p className={styles.eyebrow}>{difference.eyebrow}</p>
        <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
          {difference.heading}
        </h2>

        {/* Description */}
        <p className="reading-text-md mb-8 md:mb-12">{difference.paragraph}</p>

        {/* Comparison table */}
        <div className={styles.table}>
          <div className={styles.highlightBand} />
          <div className={styles.divider} />
          <div className={styles.starBadge}>
            <StarIcon />
          </div>

          <div className={styles.headerRow}>
            <div className={styles.headerCell}>{difference.typical.label}</div>
            <div className={`${styles.headerCell} ${styles.headerCellBoosted}`}>
              {difference.boosted.label}
            </div>
          </div>

          <div className={styles.rows}>
            {difference.typical.points.map((point, i) => (
              <div className={styles.row} key={point}>
                <div className={`${styles.cell} ${styles.cellTypical}`}>
                  <BulletGrey />
                  <span className={styles.textCons}>{point}</span>
                </div>
                <div className={`${styles.cell} ${styles.cellBoosted}`}>
                  <BulletTickBlue />
                  <span className={styles.textPros}>
                    {difference.boosted.points[i]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <div />
            <div className={styles.ctaCellBoosted}>
              {/* TODO: wire to TradeCore signup flow */}
              <Button varient="primary" size="regular">
                {difference.ctaLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: two stacked cards instead of the row-paired matrix */}
        <div className={styles.mobileCards}>
          <div className={styles.mobileCard}>
            <div className={styles.mobileCardHeader}>
              {difference.typical.label}
            </div>
            <div className={styles.mobileCardList}>
              {difference.typical.points.map((point) => (
                <div className={styles.mobileCardItem} key={point}>
                  <BulletGrey />
                  <span className={styles.textCons}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.mobileCard} ${styles.mobileCardBoosted}`}>
            <div className={styles.starBadge}>
              <StarIcon />
            </div>
            <div
              className={`${styles.mobileCardHeader} ${styles.mobileCardHeaderBoosted}`}
            >
              {difference.boosted.label}
            </div>
            <div className={styles.mobileCardList}>
              {difference.boosted.points.map((point) => (
                <div className={styles.mobileCardItem} key={point}>
                  <BulletTickBlue />
                  <span className={styles.textPros}>{point}</span>
                </div>
              ))}
            </div>
            <div className={styles.mobileCta}>
              {/* TODO: wire to TradeCore signup flow */}
              <Button varient="primary" size="regular">
                {difference.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
