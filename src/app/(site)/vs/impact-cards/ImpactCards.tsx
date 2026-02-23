import styles from "./Styles.module.scss";

export default function ImpactCards() {
  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
    >
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <h2 className="h2-size mb-6 text-center md:text-left">
              Cost Impact at <br />
              <span>Different Volumes</span>.
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center mt-5 md:mt-10">
          <div className={`${styles.cardItem} ${styles.cardSmall}`}>
            <h3>50 Lots/Month</h3>
            <p className={`opacity-65`}>
              Entry point for Flow Rewards<sup>TM</sup>. Typical for active day
              traders and small systematic strategies.
            </p>
            <div className={`${styles.cardCta}`}>
              <span className={`opacity-65`}>Monthly savings range:</span>
              <br /> <b>$115–$450 vs major competitors</b>
            </div>
          </div>
          <div className={`${styles.cardItem} ${styles.cardSmall}`}>
            <h3>200 Lots/Month</h3>
            <p className={`opacity-65`}>
              Standard volume for full-time retail traders and small prop
              accounts.
            </p>
            <div className={`${styles.cardCta}`}>
              <span className={`opacity-65`}>Monthly savings range:</span>
              <br /> <b>$460–$1,800 vs major competitors</b>
            </div>
          </div>
          <div
            className={`${styles.cardItem} ${styles.cardSmall} ${styles.activeCard}`}
          >
            <h3>1,000 Lots/Month</h3>
            <p>
              Professional trader and fund threshold. Flow Rewards create
              negative net costs.
            </p>
            <div className={`${styles.cardCta}`}>
              <span>Monthly savings range:</span>
              <br /> <b>$2,300–$9,000 vs major competitors</b>
            </div>
          </div>
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
