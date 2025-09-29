import Link from "next/link";
import styles from "./SectionCardRepeater.module.scss";
import { Blocks } from "@/types/blocks";

type PropData = Blocks["platform-cards-section-static"];

export function SectionCardsBigStatic(props: PropData) {
  const { platforms_cards } = props;

  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection}`}
    >
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div className="">
            <h2 className="h2-size mb-6 text-center md:text-left">
              Pro Platforms.
              <br />
              <span>Seamless Access.</span>
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>MetaTrader 5</h3>
            <p>
              MT5&apos;s modern architecture with powerful tools for multi-asset
              traders
            </p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href="/mt5">
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
            <h3>MetaTrader 4</h3>
            <p>
              The world&apos;s most trusted FX platform — fast, familiar, and
              battle-tested
            </p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href="/mt4">
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
            <h3>TraderEvolution</h3>
            <p>
              A next-gen multi-asset platform for pro traders — across all
              devices
            </p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href="/traderevolution"
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
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>FIX API</h3>
            <p>
              Institutional-grade FIX connectivity built for speed, scale, and
              serious flow
            </p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href="/fix-api">
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
            <h3>Web/Mobile</h3>
            <p>Trade global markets with web and mobile access</p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href="/webtrader"
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
          <div className={`${styles.cardItem} ${styles.cardRegular}`}>
            <h3>MAM/PAMM</h3>
            <p>
              Full support for money managers with seamless allocation tools.
            </p>
            <div className={`${styles.cardCta}`}>
              <Link className="card_href_link hover:underline" href="#">
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
