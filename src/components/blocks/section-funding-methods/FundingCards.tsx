import type { Blocks } from "@/types/blocks";
import styles from "./FundingCards.module.scss";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { fundingCardsContent } from "./fundingCardsContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

type FundingCardsProps = Blocks["funding-card-lists"];

type FundingCard = FundingCardsProps & {
  cardsItem?: {
    method_icon?: string;
    method_name?: string;
    is_popular?: boolean;
    currency_type?: string[];
    processing_time?: string;
  }[];
};

export async function SectionFundingCards({
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

  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "funding-cards",
    locale,
    fundingCardsContent,
  );
  const cards = t.depositCards;
  const wthDrawCards = t.withdrawCards;

  /////
  return (
    <section
      className={`${styles.section_generic_cards_content} ${styles.moreAlignmentSection} compact-section`}
    >
      <div className="ap_container_small">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(1000px,1fr))] gap-6">
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
        {funding_cards_section_select_method_type === "Deposit Methods" && (
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 text-center md:mt-18">
            {cards.map((card, idx) => (
              <div key={idx} className={`${styles.cardItem} items-center`}>
                <img
                  src={card.method_icon}
                  height={30}
                  width={120}
                  alt="Image Alt"
                  className={`${styles.methodIcon}`}
                />
                <div className="mt-5 text-[28px] font-[700]">
                  {card.method_name}
                </div>
                <div className="db mt-5 opacity-68">
                  {t.labels.acceptedCurrencies}
                </div>
                <div
                  className={`flex gap-1 items-center mt-4 justify-center flex-wrap`}
                >
                  {card.currency_type.map((cur, i) => (
                    <div key={i} className={`${styles.curItems}`}>
                      {cur}
                    </div>
                  ))}
                </div>
                <div className="db mt-8 opacity-68">
                  {t.labels.processingTime}
                </div>
                <p className="mb-4">
                  {card.processing_time} {t.labels.zeroFee}
                </p>
                <div className="mt-auto">
                  <Link
                    className="ap_button primaryGhost small"
                    href="https://app.afterprime.com/live"
                    target="_blank"
                  >
                    {t.labels.depositNow}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {funding_cards_section_select_method_type === "Withdrawal Methods" && (
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 text-center md:mt-18">
            {wthDrawCards.map((card, idx) => (
              <div key={idx} className={`${styles.cardItem} items-center`}>
                <img
                  src={card.method_icon}
                  height={30}
                  width={120}
                  alt="Image Alt"
                  className={`${styles.methodIcon}`}
                />
                <div className="mt-5 text-[28px] font-[700]">
                  {card.method_name}
                </div>
                <div className="db mt-5 opacity-68">
                  {t.labels.acceptedCurrencies}
                </div>
                <div
                  className={`flex gap-1 items-center mt-4 justify-center flex-wrap`}
                >
                  {card.currency_type.map((cur, i) => (
                    <div key={i} className={`${styles.curItems}`}>
                      {cur}
                    </div>
                  ))}
                </div>
                <div className="db mt-8 opacity-68">
                  {t.labels.processingTime}
                </div>
                <p className="mb-4">
                  {card.processing_time} {t.labels.zeroFee}
                </p>
                <div className="mt-auto">
                  <Link
                    className="ap_button primaryGhost small"
                    href="https://app.afterprime.com/live"
                    target="_blank"
                  >
                    {t.labels.withdrawal}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards Ends */}
      </div>
    </section>
  );
}
