function countDecimals(value: number): number {
  const str = value.toString();
  return str.includes(".") ? str.split(".")[1].length : 0;
}

// "Pip" is a forex-only concept. Broker fractional-pip quoting adds exactly
// one extra digit beyond standard precision: non-JPY standard=4dp,
// fractional=5dp; JPY standard=2dp, fractional=3dp. Either way the
// fractional form has an ODD decimal count, so pip = 2nd-to-last decimal
// (divide raw diff by 10); even decimal counts mean point == pip.
// Crypto/metals/indices/commodities have no pip convention — real platforms
// show the raw price difference there, so point == pip always for them.
export function formatSpreadPips(
  bestBid: number,
  bestAsk: number,
  group: string,
): string {
  if (!bestBid || !bestAsk) return "-";
  const decimals = Math.max(countDecimals(bestBid), countDecimals(bestAsk));
  const isForex = group.startsWith("Forex");
  const pipSize =
    isForex && decimals % 2 === 1
      ? Math.pow(10, -(decimals - 1))
      : Math.pow(10, -decimals);
  const pips = (bestAsk - bestBid) / pipSize;
  return pips.toFixed(1);
}
