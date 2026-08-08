import Card from "@/components/ui/Card";
import styles from "./MoreAlignCard.module.scss";
import {
  transformMoreValueAlignmentCards,
  RawMoreValueAlignmentBlock,
} from "./transformer";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

type SectionProps = RawMoreValueAlignmentBlock;

export async function MoreValueRealAlignment(props: SectionProps) {
  const { sectionTitle, subTitle, cards } =
    transformMoreValueAlignmentCards(props);
  const locale = await getRequestLocale();

  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
    >
      <div className="ap_container_small">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div className="mb-4 md:mb-6">
            <h2
              className="font-size-heading-lg mb-4 md:mb-6 opacity-80"
              dangerouslySetInnerHTML={{
                __html: sectionTitle || "&nbsp;",
              }}
            ></h2>
            {subTitle && (
              <p className="reading-text-md opacity-60 mb-8 md:mb-12">
                {subTitle}
              </p>
            )}
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center ">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.subTitle}
              cardCtaLabel={card.ctaLabel}
              cardCtaLink={
                card.ctaLink ? localizeHref(card.ctaLink, locale) : undefined
              }
              cardSize="small"
              active={index == 1 ? true : false}
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
