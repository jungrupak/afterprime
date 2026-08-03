import styles from "./SectionFeaturesCards.module.scss";
import Button from "@/components/ui/Button";
import BulletBlue from "@/components/ui/BulletBlue";
import GlobeVideoBg from "./GlobeVideoBg";
import { CardRepeaterType } from "@/types/blocks";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

export type SectionFeaturedCardsProps = {
  section_card_repeator_section_title?: string;
  section_card_repeator_section_paragraph?: string;
  section_card_repeator_enable_cta?: string;
  section_card_repeator_cta_button_label?: string;
  section_card_repeator_cta_button_link?: string;
  cards?: CardRepeaterType[];
};

export default async function SectionFeaturedCards({
  section_card_repeator_section_title,
  section_card_repeator_section_paragraph,
  section_card_repeator_enable_cta,
  section_card_repeator_cta_button_label,
  section_card_repeator_cta_button_link,
  cards = [],
}: SectionFeaturedCardsProps) {
  const locale = await getRequestLocale();
  const contents = String(section_card_repeator_section_paragraph || "");
  const isHtml = /<[a-z][\s\S]*>/i.test(contents);
  const htmlContent = isHtml
    ? contents
    : contents
        .split(/\r?\n\r?\n/)
        .map((para?: string) => `<p>${para}</p>`)
        .join("");

  return (
    <section
      className={`${styles.sectionBlockWithCards} compact-section relative overflow-hidden`}
    >
      <GlobeVideoBg />
      <div className="ap_container_small relative">
        <div
          className={`${styles.content_block} relative z-10 min-[1260px]:max-w-[700px]`}
        >
          <h2
            className="h2-size mb-6 max-md:text-center"
            style={{ fontWeight: "600" }}
          >
            {section_card_repeator_section_title}
          </h2>
          <div
            className="paragraph max-md:text-center"
            dangerouslySetInnerHTML={{
              __html: htmlContent ?? "&nbsp;",
            }}
          />
          {section_card_repeator_enable_cta === "1" && (
            <div className="mt-8 md:mt-14 lg:mt-20">
              <Button
                varient="primary-ghost"
                href={localizeHref(
                  section_card_repeator_cta_button_link || "/",
                  locale,
                )}
                isArrowVisible={true}
                size="regular"
              >
                {section_card_repeator_cta_button_label}
              </Button>
            </div>
          )}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {cards.map((item, index) => (
              <div key={index} className="flex gap-4 items-start text-left">
                <BulletBlue />
                <div>
                  <h3 className="text-[clamp(20px_,5vw,25px)] font-[700]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[clamp(16px_,5vw,20px)] opacity-60 leading-relaxed">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
