import Card from "@/components/ui/Card";
import styles from "./SectionCardRepeater.module.scss";
import type { SectionPropsToReceiveData } from "./normalizer";
import { cardRepeatorNormalizer } from "./normalizer";

export function SectionCardsBig(props: SectionPropsToReceiveData) {
  const {
    section_card_repeator_section_title,
    section_card_repeator_section_paragraph,
    cards,
  } = cardRepeatorNormalizer(props);

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
            <h2
              className="h2-size mb-6 text-center md:text-left"
              dangerouslySetInnerHTML={{
                __html: section_card_repeator_section_title || "",
              }}
            ></h2>
          </div>
          <div className="">
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              {section_card_repeator_section_paragraph}
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.paragraph}
              cardCtaLabel={``}
              cardCtaLink={card.button_url}
              cardSize="regular"
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
