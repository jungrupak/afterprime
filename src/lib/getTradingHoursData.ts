import type { InstrumentData } from "@/types/instruments";

const API_URL = "https://scoreboard.argamon.com:8443/api/instruments/";

export async function getTradingHoursData(
  symbol: string,
): Promise<InstrumentData | null> {
  const normalized = symbol.toLowerCase();
  if (normalized.endsWith(".agg") || normalized.endsWith(".prem")) return null;

  try {
    const res = await fetch(API_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const data: InstrumentData[] = await res.json();
    return (
      data.find((item) => item.symbol.toLowerCase() === normalized) ?? null
    );
  } catch {
    return null;
  }
}

export async function getAllInstrumentSymbols(): Promise<string[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data: InstrumentData[] = await res.json();
    return data
      .map((item) => item.symbol.toLowerCase())
      .filter((sym) => !sym.endsWith(".agg") && !sym.endsWith(".prem"));
  } catch {
    return [];
  }
}
