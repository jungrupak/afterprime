type ForexPair = {
  Symbol: string
  Name: string
  "Asset Class": string
  "Product Type": string
  Expiry: string
  "Pricefeed Type": string
  "Margin Currency": string
  "Profit Currency": string
  "Flow Rewards /lot": string
  "Contract Size": number
  "Min. Lot": number
  Step: number
  "Max. Lots": number
  Decimals: number
  MT4: string
  MT5: string
  Web: string
  Traderevolution: string
  Desktop: string
  Mobile: string
  "FIX API": string
  EAs: string
  Scalping: string
  "Day Trading": string
  "News Trading": string
  "Algo Trading": string
  "Time Zone": string
  Monday: string
  Tuesday: string
  Wednesday: string
  Thursday: string
  Friday: string
  Saturday: string
  Sunday: string
  "Swap Type": string
  "3-Day Swap": string
}

export function getRelatedPairs(
  allPairs: ForexPair[],
  currentSymbol: string,
  limit = 3
): ForexPair[] {
  // 1. Find current pair
  const currentPair = allPairs.find(
    pair => pair.Symbol === currentSymbol
  )

  if (!currentPair) return []

  // 2. Filter related pairs
  const related = allPairs.filter(pair => {
    if (pair.Symbol === currentSymbol) return false

    return (
      pair["Margin Currency"] === currentPair["Margin Currency"] ||
      pair["Profit Currency"] === currentPair["Profit Currency"]
    )
  })

  // 3. Return limited results
  return related.slice(0, limit)
}
