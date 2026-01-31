type ForexPair = {
  Symbol: string
  InstrumentName: string
  Name: string
  Active: string
  Base: string
  Term: string
  AssetClass: string
  ProductType: string
  ContractSize: number
  MinLot: number
  MaxLots: number
  Decimals: number
  ProfitCurrency: string
  MarginCurrency: string
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
      pair.Base === currentPair.Base ||
      pair.Term === currentPair.Term
    )
  })

  // 3. Return limited results
  return related.slice(0, limit)
}
