// lib/categorizePrices.ts

export interface PricesObjects {
  symbol: string;
  bestBid: number;
  bestAsk: number;
  spread: number;
  market: string;
  group: string;
}


export function categorizePrices(prices:PricesObjects[]) {
  const popular = [];
  const forex = [];
  const forexMajor = [];
  const forexMinor = [];
  const forexExotic = [];
  const crypto = [];
  const metals = [];
  const commodities = [];
  const indices = [];
  const stocks = [];

  for (const item of prices) {
    const groupValueToArray = item.group.split("\\");
    const category = groupValueToArray[0] || "";
    const subCategory = groupValueToArray[1] || "";
    const populrItems = groupValueToArray[2] || groupValueToArray[1] || "";

    if (
      ["GBPJPY","EURUSD","BTCUSD","ETHUSD","XAUUSD","XAUAUD","GER30","NAS100"]
        .includes(populrItems)
    ) {
      popular.push(item);
    }

    if (category === "Forex") {
      forex.push(item);
      if (subCategory === "Majors") forexMajor.push(item);
      else if (subCategory === "Minors") forexMinor.push(item);
      else if (subCategory === "Exotics") forexExotic.push(item);
    } else if (item.group.startsWith("Crypto")) crypto.push(item);
    else if (item.group.startsWith("Commodities")) commodities.push(item);
    else if (item.group.startsWith("Metals")) metals.push(item);
    else if (item.group.startsWith("Indices")) indices.push(item);
    else if (item.group.startsWith("Stocks")) stocks.push(item);
  }

  return {
    popular,
    forex,
    forexMajor,
    forexMinor,
    forexExotic,
    crypto,
    metals,
    indices,
    commodities,
    stocks
  };
}