type USPFields = Record<string, string | number | undefined>;

export function normalizeUSPBlock(fields: USPFields) {
  const total = Number(fields.inner_page_usp) || 0;

  const usps = Array.from({ length: total }, (_, i) => ({
    title: String(fields[`inner_page_usp_${i}_title`] ?? ""),
    description: String(fields[`inner_page_usp_${i}_description`] ?? ""),
  }));

  return { usps };
}
