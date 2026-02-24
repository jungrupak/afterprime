import Link from "next/link";
import styles from "./DynamicDataText.module.scss";
import { Blocks } from "@/types/blocks";

type PropData = Blocks["platform-cards-section-static"];

export function DynamicDataTexts(props: PropData) {
  const { platforms_cards } = props;

  return (
    <>
      {/* Cards */}
      <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
        <div className={`${styles.cardItem} ${styles.cardRegular}`}>
          <h3 className={`mt-0!`}>
            IC Markets{" "}
            <span className={`block text-[16px] font-[400] opacity-65 mt-1`}>
              Commission Structure
            </span>
          </h3>
          <p>
            IC Markets charges competitor_commission_per_lot per lot. On 200
            lots monthly, that's monthly_commission_cost.
          </p>
        </div>
        <div className={`${styles.cardItem} ${styles.cardRegular}`}>
          <h3 className={`mt-0!`}>
            Afterprime{" "}
            <span className={`block text-[16px] font-[400] opacity-65 mt-1`}>
              Commission Structure
            </span>
          </h3>
          <p>
            IC Markets charges competitor_commission_per_lot per lot. On 200
            lots monthly, that's monthly_commission_cost.
          </p>
        </div>
        <div className={`${styles.cardItem} ${styles.cardRegular}`}>
          <h3>TraderEvolution</h3>
          <p>
            A next-gen multi-asset platform for pro traders — across all devices
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
      </div>
      {/* Cards Ends */}
    </>
  );
}
