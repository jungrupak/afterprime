"use client";
import styles from "./DifferenceComparison.module.scss";
import {
  boostedContent,
  type BoostedDifferenceContent,
} from "./boostedContent";
import { useInView } from "./useInView";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import Button from "@/components/ui/Button";
import BulletTickBlue from "@/components/ui/BulletTickBlue";
import BulletGrey from "@/components/ui/BulletGrey";

interface DifferenceComparisonProps {
  content?: BoostedDifferenceContent;
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
        <BoxedBlock isBoxed={false} vAlign="Middle">
          {/* Left */}
          <div>
            <div className="max-md:text-center xl:pr-25 xl:rtl:pr-0">
              <p className={styles.eyebrow}>{difference.eyebrow}</p>
              <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
                {difference.heading}
              </h2>
              <p className="reading-text-md mb-8 md:mb-12">
                {difference.paragraph}
              </p>
              <div>
                {/* TODO: wire to TradeCore signup flow */}
                <Button
                  varient="primary-ghost"
                  size="regular"
                  isArrowVisible
                  onclick={() =>
                    document
                      .getElementById("account-mechanics")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {difference.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
          {/* Left Ends */}

          {/* Right */}
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

            <div className={`${styles.card} ${styles.card_highlight}`}>
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
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
