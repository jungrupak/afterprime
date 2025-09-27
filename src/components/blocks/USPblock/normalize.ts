export function normalizeUSPBlock(fields: Record<string, any>) {
  const total = Number(fields.inner_page_usp) || 0;

  const usps = Array.from({ length: total }, (_, i) => ({
    title: fields[`inner_page_usp_${i}_title`] ?? "",
    description: fields[`inner_page_usp_${i}_description`] ?? "",
  }));

  return { usps };
}
