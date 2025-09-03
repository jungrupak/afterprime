import DOMPurify from "isomorphic-dompurify";
import Lists from "@/utils/lists/Lists";
import styles from "./HomeSections.module.scss";
import Link from "next/link";
import Button from "../button/Button";

//
export function LowCostRanking({
  cardOneHeading,
  cardOneSubheading,
  cardOneParagraph,
  cardTwoHeading,
  cardTwoSubheading,
  cardTwoParagraph,
  cardThreeHeading,
  cardThreeSubheading,
  cardThreeParagraph,
  forexBenchUrl,
}: {
  cardOneHeading?: string;
  cardOneSubheading?: string;
  cardOneParagraph?: string;
  cardTwoHeading?: string;
  cardTwoSubheading?: string;
  cardTwoParagraph?: string;
  cardThreeHeading?: string;
  cardThreeSubheading?: string;
  cardThreeParagraph?: string;
  forexBenchUrl?: string;
}) {
  const sectionTitle = `Independently <span>ranked # 1</span><br/> for all-in cost across 64 brokers.`;
  const sectionParagraph = `Backed by data. Verified by ForexBenchmark.`;
  const cleanHTML = sectionTitle ? DOMPurify.sanitize(sectionTitle) : "";
  return (
    <>
      <section className={`${styles.section_ranking} text-center`}>
        <div className="ap_container">
          <h2
            className="h2-size mb-6 max-w-[700px] mx-auto"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          ></h2>
          <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
            {sectionParagraph}
          </p>
          <div
            className={`${styles.rank_cards} ap_cards_wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6`}
          >
            <div className="card_item max-md:order-2">
              <h3>{cardOneHeading}</h3>
              <h5>{cardOneSubheading}</h5>
              <p>{cardOneParagraph}</p>
            </div>
            <div className="card_item max-md:order-1">
              <h3>{cardTwoHeading}</h3>
              <h5>{cardTwoSubheading}</h5>
              <Link
                href={forexBenchUrl ?? "#"}
                className="card_href_link hover:underline"
                target="_blank"
              >
                {cardTwoParagraph}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10.0809"
                    cy="10.0808"
                    r="9.58093"
                    transform="rotate(-90 10.0809 10.0808)"
                    fill="#fff"
                  />
                  <mask id="path-2-inside-1_0_1" fill="white">
                    <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                  </mask>
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                  <path
                    d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                    fill="#3C76FF"
                    mask="url(#path-2-inside-1_0_1)"
                  />
                </svg>
              </Link>
            </div>
            <div className="card_item max-md:order-3">
              <h3>{cardThreeHeading}</h3>
              <h5>{cardThreeSubheading}</h5>
              <p>{cardThreeParagraph}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
//

//
export function EarningFlow({
  listItems = [],
  buttonText,
  btnUrl,
}: {
  listItems?: string[];
  buttonText?: string;
  btnUrl?: string;
}) {
  return (
    <section className={`${styles.section_earning_flow}`}>
      <div className="ap_container">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="w-full md:w-1/2">
            <h2 className="h2-size mb-6 text-center md:text-left">
              Earn up to <span>$3 r/t</span> per Lot
              <br /> on your flow
            </h2>
            <div className="mt-12">
              <Lists
                items={listItems}
                bulletStyle="arrow_blue"
                customClass=""
              />
            </div>
            <div className="mt-16 text-center md:text-left">
              <Button
                btnText={buttonText}
                btnArrow={true}
                linkTo={btnUrl || "#"}
                btnSize="large"
                btnColor="primary"
                btnType="primary-ghost"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h4 className="text-[20px] font-[700] opacity-80">
              Calculate Flow Earnings :
            </h4>
            <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-8">
              <div className="">
                <label>Lots Traded per month:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="150"
                  className="w-full mt-5"
                />
              </div>
              <div className="">
                <label>Symbol Traded:</label>

                <select className="block mt-5 w-full">
                  <option value="option1">AUDCHF</option>
                  <option value="option2">AUDUSD</option>
                  <option value="option3">USDJPY</option>
                </select>
              </div>
              <div className="self-end">
                <Button
                  linkTo="#"
                  btnText="Calculate"
                  btnArrow={false}
                  btnSize="small"
                  btnColor="secondary"
                />
              </div>
            </div>
            <div className="mt-8 text-[18px] font-[600]">
              In 5 years, your Flow Earnings could be worth:{" "}
              <span className="inline-block ml-15 text-[24px]">$ 27,000</span>
            </div>
            <div className="mt-8 text-[18px] font-[600]">
              In 5 years, you saved this much commission:{" "}
              <span className="inline-block ml-15 text-[24px]">$ 156,000</span>
            </div>

            <div className="bg-white py-5 px-10 note_box text-center mt-10">
              Afterprime 2.0 smart execution can capture up to $3 saved per lot
              traded and compound into thousands in additional earnings over
              time.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
//

//
export function GenericCardSectionOne() {
  return (
    <section
      className={[styles.section_generic_cards_content, " mt-0"]
        .filter(Boolean)
        .join(" ")} //way to fix undefined class name in frontend
    >
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div className="">
            <h2 className="h2-size mb-6 text-center md:text-left">
              More Value <br /> <span>Real Alignment. </span>
            </h2>
          </div>
          <div className="">
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              Our all-in trading cost is calculated using ForexBenchmark’s
              independent data, which aggregates the spread plus commission.
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center md:mt-18">
          <div
            className={[styles.generic_card, " card_item"]
              .filter(Boolean)
              .join(" ")}
          >
            <h3>Get Saved.</h3>
            <p>
              The lowest all-in costs cleared through Tier-1 liquidity via PBs.
            </p>
            <Link
              href=""
              className="card_href_link hover:underline"
              target="_blank"
            >
              Read More
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.0809"
                  cy="10.0808"
                  r="9.58093"
                  transform="rotate(-90 10.0809 10.0808)"
                  fill="#fff"
                />
                <mask id="path-2-inside-1_0_1" fill="white">
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                </mask>
                <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                <path
                  d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                  fill="#3C76FF"
                  mask="url(#path-2-inside-1_0_1)"
                />
              </svg>
            </Link>
          </div>
          <div
            className={[styles.generic_card, " card_item"]
              .filter(Boolean)
              .join(" ")}
          >
            <h3>Get Paid.</h3>
            <p>
              Earn up to $3 per lot on eligible flow, turning execution into
              extra PnL.
            </p>
            <Link
              href=""
              className="card_href_link hover:underline"
              target="_blank"
            >
              Read More
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.0809"
                  cy="10.0808"
                  r="9.58093"
                  transform="rotate(-90 10.0809 10.0808)"
                  fill="#fff"
                />
                <mask id="path-2-inside-1_0_1" fill="white">
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                </mask>
                <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                <path
                  d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                  fill="#3C76FF"
                  mask="url(#path-2-inside-1_0_1)"
                />
              </svg>
            </Link>
          </div>
          <div
            className={[styles.generic_card, " card_item"]
              .filter(Boolean)
              .join(" ")}
          >
            <h3>Get Aligned.</h3>
            <p>We profit on volume, not your losses — no B-book, ever.</p>
            <Link
              href=""
              className="card_href_link hover:underline"
              target="_blank"
            >
              Read More
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.0809"
                  cy="10.0808"
                  r="9.58093"
                  transform="rotate(-90 10.0809 10.0808)"
                  fill="#fff"
                />
                <mask id="path-2-inside-1_0_1" fill="white">
                  <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                </mask>
                <path d="M4.88501 10.4863L9.09321 6.27812L13.3014 10.4863L9.09321 14.6945L4.88501 10.4863Z" />
                <path
                  d="M13.3014 10.4863L14.3176 11.5025L15.3338 10.4863L14.3176 9.47012L13.3014 10.4863ZM9.09321 6.27812L8.077 7.29433L12.2852 11.5025L13.3014 10.4863L14.3176 9.47012L10.1094 5.26191L9.09321 6.27812ZM13.3014 10.4863L12.2852 9.47012L8.077 13.6783L9.09321 14.6945L10.1094 15.7107L14.3176 11.5025L13.3014 10.4863Z"
                  fill="#3C76FF"
                  mask="url(#path-2-inside-1_0_1)"
                />
              </svg>
            </Link>
          </div>
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
