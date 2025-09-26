import styles from "./style.module.scss";
import Card from "../ui/Card";
import type { CardDataObject } from "@/types/cardObject";
import type { acfBlocks } from "@/types/acf";

////
function getRepeaterValues<T extends acfBlocks>(
  data: T,
  fieldName: string,
  subField: string
): string[] {
  const totalRows = Number(data[fieldName]) || 0;

  return Array.from({ length: totalRows }, (_, i) => {
    const value = data[`${fieldName}_${i}_${subField}`] as string | undefined;
    return value ?? null;
  }).filter((v): v is string => Boolean(v));
}

type EarningFlowProps = {
  html?: string | TrustedHTML;
  data: acfBlocks;
};
///////

export function MoreValueRealAlignment({ html, data }: EarningFlowProps) {
  //#############
  const rawNoOfCard = data.section_card_repeator_cards;
  const noOfCard =
    typeof rawNoOfCard === "number" ? rawNoOfCard : Number(rawNoOfCard) || 0;

  const cardData: CardDataObject[] = Array.from(
    { length: noOfCard },
    (_, i) => ({
      title: String(data[`section_card_repeator_cards_${i}_title`] ?? ""),
      paragraph: String(
        data[`section_card_repeator_cards_${i}_paragraph`] ?? ""
      ),
      ctaLabel: String(
        data[`section_card_repeator_cards_${i}_button_label`] ?? ""
      ),
      ctaLink: String(
        data[`section_card_repeator_cards_${i}_button_url`] ?? ""
      ),
    })
  );
  //##############

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
                __html: String(data.section_card_repeator_section_title ?? ""),
              }}
            ></h2>
          </div>
          <div className="">
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              {data.section_card_repeator_section_paragraph}
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
