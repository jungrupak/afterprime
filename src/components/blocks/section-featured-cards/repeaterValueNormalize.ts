type CardFields = Record<string, string | number | undefined>;

export function repeatorValueNormalize(fields: CardFields) {
  const total = Number(fields.section_card_repeator_cards) || 0;

  const cards = Array.from({ length: total }, (_, i) => ({
    title: fields[`section_card_repeator_cards_${i}_title`] ?? "",
    paragraph: fields[`section_card_repeator_cards_${i}_paragraph`] ?? "",
    button_label: fields[`section_card_repeator_cards_${i}_button_label`] ?? "",
    button_url: fields[`section_card_repeator_cards_${i}_button_url`] ?? "",
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
