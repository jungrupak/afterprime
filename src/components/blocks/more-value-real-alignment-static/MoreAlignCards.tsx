"use client";
import styles from "./MoreAlignCard.module.scss";
import Link from "next/link";
import { Blocks } from "@/types/blocks";

type SectionProps = Blocks["section-more-value-real-alignment-static"];

export function MoreValueRealAlignmentStatic(props: SectionProps) {
  const { more_value_alignment_ } = props;

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
              More Value.
              <br />
              <span>Real Alignment.</span>
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          <div className={`${styles.cardItem} ${styles.cardSmall}`}>
            <h3>Save More.</h3>
            <p>
              The lowest all-in costs cleared through Tier-1 liquidity via PBs.
            </p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href="/lowest-cost-verified"
              >
                Read More
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
            <h3>Get Paid.</h3>
            <p>
              Earn up to $3 per lot on eligible flow, turning execution into
              extra PnL.
            </p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href="/get-paid-to-trade"
              >
                Read More
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
            <h3>Trade Aligned.</h3>
            <p>We profit on volume, not your losses — no B-book, ever.</p>
            <div className={`${styles.cardCta}`}>
              <Link
                className="card_href_link hover:underline"
                href="/aligned-execution"
              >
                Read More
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
