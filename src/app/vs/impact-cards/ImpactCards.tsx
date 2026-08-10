import styles from "./Styles.module.scss";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { impactCardsContent } from "./impactCardsContent";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

export default async function ImpactCards() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "vs-impact-cards",
    locale,
    impactCardsContent,
  );

  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
    >
      <div className="ap_container_small">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <h2 className="font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold">
              {t.heading} <span>{t.headingSpan}</span>.
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-left mt-4 md:mt-6">
          <div className={`${styles.cardItem} ${styles.cardLarge}`}>
            <h3 className={`ml-0!`}>
              <span className={`font-size-heading-lg font-[300] block`}>
                50
              </span>
              <span
                className={`text-[length:var(--font-size-note)] opacity-60 block`}
              >
                {t.lotsPerMonth}
              </span>
            </h3>
            <p
              className={`opacity-65 text-[length:var(--reading-text-xs)]! mb-8!`}
            >
              <b>{t.idealFor}</b>
              <br />
              {t.tier1Desc}
            </p>
            <div className={`${styles.cardCta} ml-0! mt-auto!`}>
              <span className={`opacity-80`}>{t.monthlySavings}</span>
              <br />{" "}
              <b>
                <span className={`reading-text-lg font-[300] block`}>
                  $115–$450
                </span>
                <span className={`font-[300] block opacity-60`}>
                  {t.vsMajorBrokers}
                </span>
              </b>
            </div>
          </div>

          <div className={`${styles.cardItem} ${styles.cardLarge}`}>
            <h3 className={`ml-0!`}>
              <span className={`font-size-heading-lg font-[300] block`}>
                200
              </span>
              <span
                className={`text-[length:var(--font-size-note)] opacity-60 block`}
              >
                {t.lotsPerMonth}
              </span>
            </h3>
            <p
              className={`opacity-65 text-[length:var(--reading-text-xs)]! mb-8!`}
            >
              <b>{t.idealFor}</b>
              <br />
              {t.tier2Desc}
            </p>
            <div className={`${styles.cardCta} ml-0! mt-auto!`}>
              <span className={`opacity-80`}>{t.monthlySavings}</span>
              <br />{" "}
              <b>
                <span className={`reading-text-lg font-[300] block`}>
                  $460–$1,800
                </span>
                <span className={`font-[300] block opacity-60`}>
                  {t.vsMajorBrokers}
                </span>
              </b>
            </div>
          </div>

          <div className={`${styles.cardItem} ${styles.cardLarge}`}>
            <h3 className={`ml-0!`}>
              <span className={`font-size-heading-lg font-[300] block`}>
                1000
              </span>
              <span
                className={`text-[length:var(--font-size-note)] opacity-60 block`}
              >
                {t.lotsPerMonth}
              </span>
            </h3>
            <p
              className={`opacity-65 text-[length:var(--reading-text-xs)]! mb-8!`}
            >
              <b>{t.idealFor}</b>
              <br />
              {t.tier3Desc}
            </p>
            <div className={`${styles.cardCta} ml-0! mt-auto!`}>
              <span className={`opacity-80`}>{t.monthlySavings}</span>
              <br />{" "}
              <b>
                <span className={`reading-text-lg font-[300] block`}>
                  $2,300–$9,000
                </span>
                <span className={`font-[300] block opacity-60`}>
                  {t.vsMajorBrokers}
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
