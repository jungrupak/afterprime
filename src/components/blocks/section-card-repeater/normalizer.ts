import type { CardObjects } from "@/types/blocks";

export type SectionPropsToReceiveData = {
  section_card_list_big_section_title?: string;
  section_card_list_big_section_paragraph?: string;
  [
    key: `section_card_list_big_cards_${number}_${
      | "title"
      | "paragraph"
      | "button_label"
      | "button_url"}`
  ]: string | undefined;
  section_card_list_big_cards?: string | number;
  section_card_list_big_card_size?: string | undefined;
  section_card_list_big_section_heading_alignment?: string;
  section_card_list_big?: string | undefined;
};

export function cardRepeatorNormalizer(fields?: SectionPropsToReceiveData) {
  // if fields is undefined, default to empty object
  const safeFields = fields ?? {};

  const total = Number(safeFields.section_card_list_big_cards) || 0;

  const cards: CardObjects[] = Array.from({ length: total }, (_, i) => ({
    title: String(safeFields[`section_card_list_big_cards_${i}_title`] ?? ""),
    paragraph: String(
      safeFields[`section_card_list_big_cards_${i}_paragraph`] ?? ""
    ),
    button_label: String(
      safeFields[`section_card_list_big_cards_${i}_button_label`] ?? ""
    ),
    button_url: String(
      safeFields[`section_card_list_big_cards_${i}_button_url`] ?? ""
    ),
  }));

  return {
    section_card_repeator_section_title: String(
      safeFields.section_card_list_big_section_title ?? ""
    ),
    section_card_repeator_section_paragraph: String(
      safeFields.section_card_list_big_section_paragraph ?? ""
    ),

    section_card_list_big_card_size: String(
      safeFields.section_card_list_big_card_size ?? ""
    ),
    cards,
  };
}
