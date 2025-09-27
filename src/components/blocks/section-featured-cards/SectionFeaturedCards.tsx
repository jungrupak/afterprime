import styles from "./SectionFeaturesCards.module.scss";
import { Blocks } from "@/types/blocks";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type Props = Blocks["section-feature-four-cards"];

export default function SectionFeaturedCards({
  section_card_repeator_section_title,
  section_card_repeator_section_paragraph,
  section_card_repeator_enable_cta,
  section_card_repeator_cta_button_label,
  section_card_repeator_cta_button_link,
  cards = [],
}: Props) {
  const contents = String(section_card_repeator_section_paragraph || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  return (
    <section className={`${styles.sectionBlockWithCards}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className="ap_container relative">
        {/* <div className={`dotted_bg_in_container dotted-block`}></div> */}
        <div
          className={`${styles.content_block} flex gap-28 max-md:gap-10 max-md:flex-col items-center`}
        >
          <div
            className={`contentTextBlockWrapper max-md:text-center`}
            style={{ maxWidth: "480px" }}
          >
            <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
              {section_card_repeator_section_title}
            </h2>
            <div
              className="paragraph"
              dangerouslySetInnerHTML={{
                __html: htmlContent ?? "",
              }}
            />
            {section_card_repeator_enable_cta === "1" && (
              <div className="mt-8 md:mt-14 lg:mt-20">
                <Button
                  varient="primary-ghost"
                  href={section_card_repeator_cta_button_link || ""}
                  isArrowVisible={true}
                  size="large"
                >
                  {section_card_repeator_cta_button_label}
                </Button>
              </div>
            )}
          </div>
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
            {cards.map((item, index) => (
              <Card
                key={index}
                borderEnable={false}
                alignItems="center"
                cardSize="small"
                title={item.title}
                paragraph={item.paragraph}
                cardCtaLabel={item.button_label}
                cardCtaLink={item.button_url}
                active={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
