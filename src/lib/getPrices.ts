import { MARKET_PRICE_SNAPSHOT_URL } from "@/config/marketPriceEndpoints";

export async function getPrices() {
  const res = await fetch(MARKET_PRICE_SNAPSHOT_URL, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}