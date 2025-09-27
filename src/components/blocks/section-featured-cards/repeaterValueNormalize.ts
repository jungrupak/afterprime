import { CardRepeaterType } from "@/types/blocks";

// Input fields type for the section-feature-four-cards block
export type SectionCardsFields = {
  section_card_repeator_section_title?: string;
  section_card_repeator_section_paragraph?: string;
  section_card_repeator_enable_cta?: string;
  section_card_repeator_cta_button_label?: string;
  section_card_repeator_cta_button_link?: string;
  section_card_repeator_cards?: number;
  [
    key: `section_card_repeator_cards_${number}_${
      | "title"
      | "paragraph"
      | "button_label"
      | "button_url"}`
  ]: string | undefined;
};

export function repeatorValueNormalize(fields: SectionCardsFields) {
  const total = Number(fields.section_card_repeator_cards) || 0;

  const cards: CardRepeaterType[] = Array.from({ length: total }, (_, i) => ({
    title: String(fields[`section_card_repeator_cards_${i}_title`] ?? ""),
    paragraph: String(
      fields[`section_card_repeator_cards_${i}_paragraph`] ?? ""
    ),
    button_label: String(
      fields[`section_card_repeator_cards_${i}_button_label`] ?? ""
    ),
    button_url: String(
      fields[`section_card_repeator_cards_${i}_button_url`] ?? ""
    ),
  }));

  return {
    section_card_repeator_section_title: String(
      fields.section_card_repeator_section_title ?? ""
    ),
    section_card_repeator_section_paragraph: String(
      fields.section_card_repeator_section_paragraph ?? ""
    ),
    section_card_repeator_enable_cta: String(
      fields.section_card_repeator_enable_cta ?? "0"
    ),
    section_card_repeator_cta_button_label: String(
      fields.section_card_repeator_cta_button_label ?? ""
    ),
    section_card_repeator_cta_button_link: String(
      fields.section_card_repeator_cta_button_link ?? ""
    ),
    cards,
  };
}
