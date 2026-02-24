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
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-left mt-5 md:mt-10">
          <div className={`${styles.cardItem} ${styles.cardLarge}`}>
            <h3 className={`ml-0!`}>
              <span className={`text-[clamp(30px,5vw,48px)] font-[300] block`}>
                50
              </span>
              <span className={`text-[16px] opacity-60 block`}>Lots/Month</span>
            </h3>
            <p className={`opacity-65 text-[16px]! mb-8!`}>
              <b>Ideal For</b><br/>Active day traders & small systematic strategies.
            </p>
            <div className={`${styles.cardCta} ml-0! mt-auto!`}>
              <span className={`opacity-80`}>Monthly savings:</span>
              <br />{" "}
              <b>
                <span
                  className={`text-[clamp(18px,5vw,28px)] font-[300] block`}
                >
                  $115–$450
                </span>
                <span className={`font-[300] block opacity-60`}>
                  vs Major Brokers
                </span>
              </b>
            </div>
          </div>

          <div className={`${styles.cardItem} ${styles.cardLarge}`}>
            <h3 className={`ml-0!`}>
              <span className={`text-[clamp(30px,5vw,48px)] font-[300] block`}>
                200
              </span>
              <span className={`text-[16px] opacity-60 block`}>Lots/Month</span>
            </h3>
            <p className={`opacity-65 text-[16px]! mb-8!`}>
              <b>Ideal For</b><br/>Full-time retail traders and small prop accounts.
            </p>
            <div className={`${styles.cardCta} ml-0! mt-auto!`}>
              <span className={`opacity-80`}>Monthly savings:</span>
              <br />{" "}
              <b>
                <span
                  className={`text-[clamp(18px,5vw,28px)] font-[300] block`}
                >
                  $460–$1,800
                </span>
                <span className={`font-[300] block opacity-60`}>
                  vs Major Brokers
                </span>
              </b>
            </div>
          </div>

          <div className={`${styles.cardItem} ${styles.cardLarge}`}>
            <h3 className={`ml-0!`}>
              <span className={`text-[clamp(30px,5vw,48px)] font-[300] block`}>
                1000
              </span>
              <span className={`text-[16px] opacity-60 block`}>Lots/Month</span>
            </h3>
            <p className={`opacity-65 text-[16px]! mb-8!`}>
              <b>Ideal For</b><br/>Professional traders, fund managers, and high-frequency accounts.
            </p>
            <div className={`${styles.cardCta} ml-0! mt-auto!`}>
              <span className={`opacity-80`}>Monthly savings:</span>
              <br />{" "}
              <b>
                <span
                  className={`text-[clamp(18px,5vw,28px)] font-[300] block`}
                >
                  $2,300–$9,000
                </span>
                <span className={`font-[300] block opacity-60`}>
                  vs Major Brokers
                </span>
              </b>
            </div>
          </div>
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
