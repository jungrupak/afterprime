// Server-side fetch of the full instruments feed (all categories, not just
// Forex/XAUUSD like getInstrumentSpecs.ts) for spread calculation. Keeps
// only the numeric fields needed for (Ask-Bid) × Contract Size ÷ Pip Value
// per Standard Lot, so this can be passed as an initial prop to client
// components without a client-side fetch gap.

export interface InstrumentSpecLite {
  symbol: string;
  category: string;
  digits: number;
  point: number;
  contractSize: number;
}

interface RawInstrument {
  symbol: string;
  category: string;
  digits: number;
  point: number;
  contractSize: number;
}

const INSTRUMENTS_ENDPOINT = "https://scoreboard.argamon.com:8443/api/instruments/";

export async function getAllInstrumentSpecs(): Promise<InstrumentSpecLite[]> {
  const res = await fetch(INSTRUMENTS_ENDPOINT, {
    next: { revalidate: 900 },
  });

  if (!res.ok) throw new Error("Failed to fetch instrument specs");

  const raw: RawInstrument[] = await res.json();

  // AGG-*/PREM-* are duplicate feeds for the same symbols with different
  // specs — excluded so a plain "EURUSD" always resolves to the primary
  // listing, matching the categories categorizePrices() groups by.
  return raw
    .filter(
      (item) =>
        !item.category.startsWith("AGG") && !item.category.startsWith("PREM"),
    )
    .map((item) => ({
      symbol: item.symbol.split(".")[0],
      category: item.category,
      digits: item.digits,
      point: item.point,
      contractSize: item.contractSize,
    }));
}
