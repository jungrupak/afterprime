import { USPItem } from "@/types/blocks";

// Define the input fields type for the USP block
export type USPBlockFields = {
  inner_page_usp?: string | number;
  [key: `inner_page_usp_${number}_${"title" | "description"}`]:
    | string
    | undefined;
};

export function normalizeUSPBlock(fields: USPBlockFields): { usps: USPItem[] } {
  const total = Number(fields.inner_page_usp) || 0;

  const usps: USPItem[] = Array.from({ length: total }, (_, i) => ({
    title: String(fields[`inner_page_usp_${i}_title`] ?? ""),
    description: String(fields[`inner_page_usp_${i}_description`] ?? ""),
  }));

  return { usps };
}
