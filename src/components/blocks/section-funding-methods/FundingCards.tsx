import type { Blocks } from "@/types/blocks";
import styles from "./FundingCards.module.scss";
import Image from "next/image";

type FundingCardsProps = Blocks["funding-card-lists"];

type FundingCard = FundingCardsProps & {
  cardsItem?: {
    method_icon?: string;
    method_name?: string;
    is_popular?: boolean;
    currency_type?: string[];
    deposit_time?: string;
  }[];
};

export function SectionFundingCards({
  funding_cards_section_section_title,
  funding_cards_section_section_paragraph,
  funding_cards_section_select_method_type,
  funding_cards_section,
  cardsItem,
}: FundingCard) {
  //Card Data

  const sectionTitle = funding_cards_section_section_title ?? "";
  const sectionParagraph = funding_cards_section_section_paragraph ?? "";
  const selectCategory = funding_cards_section_select_method_type ?? "";

  const cards = [
    {
      method_icon: "https://cdn.afterprime.com/images/method-card-color.svg",
      method_name: "Credit & Debit Cards",
      currency_type: ["AUD", "EUR", "USD", "GBP", "CAD", "SGD"],
    },
    {
      method_icon: "https://cdn.afterprime.com/images/method-card-color.svg",
      method_name: "Credit & Debit Cards",
      currency_type: ["AUD", "EUR", "USD", "GBP", "CAD", "SGD"],
    },
  ];

  /////
  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection}`}
    >
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(1000px,1fr))] gap-6">
          <div className="">
            <h2 className="h2-size mb-6 text-center md:text-left">
              {sectionTitle}
            </h2>
          </div>
          <div className="">
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              {sectionParagraph}
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          {cards.map((card, idx) => (
            <div key={idx} className={`${styles.cardItem} items-center`}>
              <Image
                src={card.method_icon}
                height={30}
                width={120}
                alt="Image Alt"
              />
              <div className="mt-5 text-[28px] font-[700]">
                {card.method_name}
              </div>
              <div className="db mt-5">Accepted Currencies:</div>
              <div className="flex gap-4 items-center mt-4">
                {card.currency_type.map((cur, i) => (
                  <div key={i}>{cur}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
