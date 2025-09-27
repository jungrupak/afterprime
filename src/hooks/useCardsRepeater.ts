import { useMemo } from "react";

export type CardDataObject = {
  title?: string | "";
  paragraph?: string | "";
  ctaLabel?: string | "";
  ctaLink?: string | "";
  ctaOpenTarget?: "Self" | "Blank";
};

export function useRepeaterCards<T extends Record<string, unknown>>(
  data: T,
  rawNoOfCard: number | string | null | undefined | boolean,
  prefix: string // dynamic prefix, e.g. "section_card_repeator_cards"
): CardDataObject[] {
  return useMemo(() => {
    const noOfCard =
      typeof rawNoOfCard === "number" ? rawNoOfCard : Number(rawNoOfCard) || 0;

    return Array.from({ length: noOfCard }, (_, i) => ({
      title: String(data[`${prefix}_${i}_title`] ?? ""),
      paragraph: String(data[`${prefix}_${i}_paragraph`] ?? ""),
      ctaLabel: String(data[`${prefix}_${i}_button_label`] ?? ""),
      ctaLink: String(data[`${prefix}_${i}_button_url`] ?? ""),
    }));
  }, [data, rawNoOfCard, prefix]);
}
