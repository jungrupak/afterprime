import Card from "@/components/ui/Card";
import styles from "./SectionCardRepeater.module.scss";
import type { SectionPropsToReceiveData } from "./normalizer";
import { cardRepeatorNormalizer } from "./normalizer";

export function SectionCardsBig(props: SectionPropsToReceiveData) {
  const {
    section_card_repeator_section_title,
    section_card_repeator_section_paragraph,
    section_card_list_big_card_size,
    cards,
  } = cardRepeatorNormalizer(props);

  const cardSize = section_card_list_big_card_size || "regular"; // Default to "regular" if undefined

  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection}`}
    >
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid max-md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 justify-center max-md:mb-8">
          <div className="">
            {section_card_repeator_section_title && (
              <div
                className="h2-size mb-6 text-center md:text-left"
                dangerouslySetInnerHTML={{
                  __html: section_card_repeator_section_title || "&nbsp;",
                }}
              />
            )}
          </div>
          {section_card_repeator_section_paragraph && (
            <div className="">
              <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
                {section_card_repeator_section_paragraph}
              </p>
            </div>
          )}
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.paragraph}
              cardCtaLabel={card.button_label}
              cardCtaLink={card.button_url}
              cardSize={
                cardSize === "Small"
                  ? "small"
                  : cardSize === "Compact"
                  ? "compact"
                  : cardSize === "Large"
                  ? "large"
                  : "regular"
              } //compact|large|regular|small|
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
