"use client";
import styles from "./BottomCtaBoosted.module.scss";
import { boostedContent } from "./boostedContent";
import { useInView } from "./useInView";
import Button from "@/components/ui/Button";

export default function BottomCtaBoosted() {
  const { bottomCta, footerNote } = boostedContent;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.panel}>
          <div className={styles.copy}>
            <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
              {bottomCta.heading}
            </h2>
            <p className={styles.body}>{bottomCta.body}</p>
          </div>
          {/* TODO: wire to TradeCore signup flow */}
          <Button varient="secondary" size="regular" className={styles.cta}>
            {bottomCta.cta}
          </Button>
        </div>
        <p className={styles.footer_note}>{footerNote}</p>
      </div>
    </section>
  );
}
