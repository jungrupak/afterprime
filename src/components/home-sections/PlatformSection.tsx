import React from "react";
import styles from "./style.module.scss";
import Card from "../ui/Card";
import { useRepeaterCards, CardDataObject } from "@/hooks/useCardsRepeater";
import { acfBlocks } from "@/types/acf";

type getData = {
  data: acfBlocks;
};

//
export function PlatformsSection({ data }: getData) {
  const cards: CardDataObject[] = useRepeaterCards(
    data,
    data.section_card_repeator_cards, // raw number of cards
    "section_card_repeator_cards" // dynamic prefix
  );

  const heading = String(data.section_card_repeator_section_title || "");

  return (
    <section className={`${styles.section_platforms}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <h2
              className="h2-size mb-6 text-center md:text-left"
              dangerouslySetInnerHTML={{ __html: heading }}
            ></h2>
          </div>
          <div>
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              {data.section_card_repeator_section_paragraph}
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 text-center md:mt-18">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.paragraph}
              cardCtaLabel={card.ctaLabel}
              cardCtaLink={card.ctaLink}
              cardSize="regular"
              linkTarget="Self"
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
