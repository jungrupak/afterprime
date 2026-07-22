import Link from "next/link";
import styles from "./PlatformCards.module.scss";
import { platformCardsContent } from "./platformCardsContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

export async function SectionCardsBigStatic() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "platform-cards",
    locale,
    platformCardsContent,
  );

  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
    >
      <div className="ap_container_small">
        <div className="grid max-md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 justify-center max-md:mb-8">
          <div className="">
            <h2 className="h2-size mb-6 text-center md:text-left">
              {t.heading1}
              <br />
              <span>{t.heading2}</span>
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>{t.mt5.title}</h3>
            <p>{t.mt5.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href={localizeHref("/mt5", locale)}>
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
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>{t.mt4.title}</h3>
            <p>{t.mt4.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href={localizeHref("/mt4", locale)}>
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
          
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>{t.fixApi.title}</h3>
            <p>{t.fixApi.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href={localizeHref("/fix-api", locale)}>
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
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>{t.webMobile.title}</h3>
            <p>{t.webMobile.description}</p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href={localizeHref("/webtrader", locale)}
              >
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
          {/* <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>MAM/PAMM</h3>
            <p>
              Full support for money managers with seamless allocation tools.
            </p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href={localizeHref("/mam-pamm", locale)}>
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
          </div> */}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
