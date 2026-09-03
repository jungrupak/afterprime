import { formatSpreadPips } from "@/lib/formatSpreadPips";
import type { InstrumentSpecLite } from "@/lib/getAllInstrumentSpecs";

export interface InstrumentSpecMap {
  [symbol: string]: { contractSize: number; point: number; digits: number };
}

export function buildInstrumentSpecMap(
  specs: InstrumentSpecLite[],
): InstrumentSpecMap {
  const map: InstrumentSpecMap = {};
  for (const inst of specs) {
    map[inst.symbol] = {
      contractSize: inst.contractSize,
      point: inst.point,
      digits: inst.digits,
    };
  }
  return map;
}

// Spread display differs by asset class (matches broker convention):
// - Forex: pip count. Pip size accounts for fractional-pip quoting (odd
//   decimal count = broker adds one extra digit, so pip is the 2nd-to-last
//   decimal, not the last).
// - Metals: pip count too, but pip_size = point × 10 unconditionally (not
//   gated on digit parity like Forex) — e.g. XAUUSD digits=2/point=0.01
//   gives pip_size=0.1, so a 0.19 raw diff shows as 1.9, not 19.0.
// - Crypto: raw price difference, rounded to the symbol's own decimal
//   precision (digits) instead of a hardcoded 2 — BTC-sized diffs need
//   fewer decimals shown correctly, low-price coins need more.
// - Everything else (Indices, Commodities, Stocks): raw price difference
//   at 2dp.
export function calcSpread(
  bestBid: number,
  bestAsk: number,
  symbol: string,
  group: string,
  specs: InstrumentSpecMap,
): string {
  if (!bestBid || !bestAsk) return "-";
  const diff = bestAsk - bestBid;

  if (group.startsWith("Forex")) {
    const spec = specs[symbol];
    if (!spec || !spec.point) return formatSpreadPips(bestBid, bestAsk, group);
    const pipSize = spec.digits % 2 === 1 ? spec.point * 10 : spec.point;
    return (diff / pipSize).toFixed(1);
  }

  if (group.startsWith("Metals")) {
    const spec = specs[symbol];
    if (!spec || !spec.point) return diff.toFixed(2);
    return (diff / (spec.point * 10)).toFixed(1);
  }

  if (group.startsWith("Crypto")) {
    const spec = specs[symbol];
    return diff.toFixed(spec?.digits ?? 2);
  }

  return diff.toFixed(2);
}
