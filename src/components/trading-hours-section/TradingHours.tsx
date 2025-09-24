import styles from "./TradingHoursSection.module.scss";
import Card from "../ui/Card";
import type { CardDataObject } from "@/types/cardObject";

interface SectionProps {
  sectionTitle?: string;
  sectionParagraph?: string;
  pdfCards?: CardDataObject[];
}

export function TradingHoursSection({ pdfCards = [] }: SectionProps) {
  return (
    <section className={`${styles.section_generic_cards_content}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div className="">
            <h2
              className="h2-size mb-6 text-center md:text-left"
              style={{ fontWeight: "600" }}
            >
              Monthly Session and
              <br /> Holiday Hours
            </h2>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          {pdfCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.paragraph}
              cardCtaLabel={card.ctaLabel}
              cardCtaLink={card.ctaLink}
              cardSize="compact"
              active={false}
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
