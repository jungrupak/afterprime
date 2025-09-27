export function repeatorValueNormalize(fields: Record<string, any>) {
  const total = Number(fields.inner_page_usp) || 0;

  const cards = Array.from({ length: total }, (_, i) => ({
    title: fields[`section_card_repeator_cards_${i}_title`] ?? "",
    paragraph: fields[`section_card_repeator_cards_${i}_paragraph`] ?? "",
    button_label: fields[`section_card_repeator_cards_${i}_button_label`] ?? "",
    button_url: fields[`section_card_repeator_cards_${i}_button_url`] ?? "",
  }));

  return { cards };
}
