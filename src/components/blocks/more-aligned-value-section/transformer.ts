import { Blocks } from "@/types/blocks";

// Raw API block type
export type RawMoreValueAlignmentBlock =
  Blocks["section-more-value-real-alignment"];

// Clean card type
export type MoreAlignCard = {
  title?: string;
  subTitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

// Transformer function
export function transformMoreValueAlignmentCards(
  data: RawMoreValueAlignmentBlock
): {
  sectionTitle: string;
  subTitle: string;
  cards: MoreAlignCard[];
} {
  if (!data) {
    return { sectionTitle: "", subTitle: "", cards: [] };
  }
  const cards: MoreAlignCard[] = [];
  const cardNumbers = [1, 2, 3] as const;

  cardNumbers.forEach((i) => {
    const title =
      data[
        `more_value_real_alignment_card_${i}_title` as keyof RawMoreValueAlignmentBlock
      ];
    const subTitle =
      data[
        `more_value_real_alignment_card_${i}_sub_title` as keyof RawMoreValueAlignmentBlock
      ];
    const ctaLabel =
      data[
        `more_value_real_alignment_card_${i}_cta_label` as keyof RawMoreValueAlignmentBlock
      ];
    const ctaLink =
      data[
        `more_value_real_alignment_card_${i}_cta_link` as keyof RawMoreValueAlignmentBlock
      ];

    if (title || subTitle || ctaLabel || ctaLink) {
      cards.push({ title, subTitle, ctaLabel, ctaLink });
    }
  });

  return {
    sectionTitle: data?.more_value_real_alignment_section_title || "",
    subTitle: data?.more_value_real_alignment_sub_title || "",
    cards,
  };
}
