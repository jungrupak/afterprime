import styles from "./style.module.scss";
import Card from "../ui/Card";
import type { CardDataObject } from "@/types/cardObject";

export function MoreValueRealAlignment() {
  const cardData: CardDataObject[] = [
    {
      title: "Get Saved.",
      paragraph:
        "The lowest all-in costs cleared through Tier-1 liquidity via PBs.",
      ctaLabel: "Read More",
      ctaLink: "#",
    },
    {
      title: "Get Paid.",
      paragraph:
        "Earn up to $3 per lot on eligible flow, turning execution into extra PnL.",
      ctaLabel: "Read More",
      ctaLink: "#",
    },
    {
      title: "Get Aligned.",
      paragraph: "We profit on volume, not your losses — no B-book, ever.",
      ctaLabel: "Read More",
      ctaLink: "#",
    },
  ];

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
              More Value. <br /> <span>Real Alignment. </span>
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
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.paragraph}
              cardCtaLabel={card.ctaLabel}
              cardCtaLink={card.ctaLink}
              cardSize="large"
              active={index == 1 ? true : false}
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
