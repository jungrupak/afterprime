interface dataType {
  symbol: string;
  path:string;
  description: string;
  currencyProfit: string;
  swapLong: number;
  swapShort: number;
}

export async function getSwapsData(symbol: string) {
  const API_ENDPOINT = "https://scoreboard.argamon.com:8443/api/instruments/";
  if (!API_ENDPOINT) {
    console.error("Failed to load API_ENDPOINT");
  }

  try {
    const res = await fetch(API_ENDPOINT, {
      cache: "force-cache",
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error("Failed to load source data:", res.status);
    }

    const data: dataType[] = await res.json();
    const normalizedSymbol = symbol.toLowerCase();
    const symbolData = data.find(
      (item) => item.symbol.toLowerCase() === normalizedSymbol,
    );

    return symbolData
      ? { ...symbolData, symbol: symbolData.symbol.toLowerCase() }
      : undefined;
  } catch (err) {
    console.error("Failed to load source data:", err);
  }
}
