export type RebateDataType = {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
  effective_from: string;
  effective_to: string;
};

function isRebateDataType(item: unknown): item is RebateDataType {
  if (!item || typeof item !== "object") return false;
  const row = item as Record<string, unknown>;
  return (
    typeof row.symbol === "string" &&
    typeof row.product === "string" &&
    typeof row.rebate_usd_per_lot === "number"
  );
}

export function normalizeRebatesPayload(payload: unknown): RebateDataType[] {
  const maybeRows = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];
  return maybeRows.filter(isRebateDataType);
}
