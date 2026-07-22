import styles from "./MoreAlignCard.module.scss";
import Link from "next/link";
import { Blocks } from "@/types/blocks";
import { moreAlignContent } from "./moreAlignContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

type SectionProps = Blocks["section-more-value-real-alignment-static"];

export async function MoreValueRealAlignmentStatic(props: SectionProps) {
  const { more_value_alignment_ } = props;
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("more-align-cards", locale, moreAlignContent);

  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
    >
      <div className="ap_container_small">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <h2 className="h2-size mb-6 text-center md:text-left">
              {t.heading1} <br />
              <span>{t.heading2}</span>.
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          <div className={`${styles.cardItem} ${styles.cardSmall}`}>
            <h3>{t.card1.title}</h3>
            <p>{t.card1.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href={localizeHref("/lowest-cost-verified", locale)}
              >
                {t.card1.cta}
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9.58093"
                    cy="10.4996"
                    r="9.58093"
                    transform="rotate(-90 9.58093 10.4996)"
                    fill="#FDFCF7"
                  />
                  <path
                    d="M8.59319 6.69727L12.8014 10.9055L8.59319 15.1137L7.57739 14.0979L10.7698 10.9055L7.57739 7.71306L8.59319 6.69727Z"
                    fill="#0C0C0D"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div
            className={`${styles.cardItem} ${styles.cardSmall} ${styles.activeCard}`}
          >
            <h3>{t.card2.title}</h3>
            <p>{t.card2.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href={localizeHref("/get-paid-to-trade", locale)}
              >
                {t.card2.cta}
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9.58093"
                    cy="10.4996"
                    r="9.58093"
                    transform="rotate(-90 9.58093 10.4996)"
                    fill="#FDFCF7"
                  />
                  <path
                    d="M8.59319 6.69727L12.8014 10.9055L8.59319 15.1137L7.57739 14.0979L10.7698 10.9055L7.57739 7.71306L8.59319 6.69727Z"
                    fill="#0C0C0D"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className={`${styles.cardItem} ${styles.cardSmall}`}>
            <h3>{t.card3.title}</h3>
            <p>{t.card3.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href={localizeHref("/aligned-execution", locale)}
              >
                {t.card3.cta}
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9.58093"
                    cy="10.4996"
                    r="9.58093"
                    transform="rotate(-90 9.58093 10.4996)"
                    fill="#FDFCF7"
                  />
                  <path
                    d="M8.59319 6.69727L12.8014 10.9055L8.59319 15.1137L7.57739 14.0979L10.7698 10.9055L7.57739 7.71306L8.59319 6.69727Z"
                    fill="#0C0C0D"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
