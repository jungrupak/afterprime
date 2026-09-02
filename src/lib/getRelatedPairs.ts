import type { InstrumentSpec } from "@/lib/getInstrumentSpecs";

export function getRelatedPairs(
  allPairs: InstrumentSpec[],
  currentSymbol: string,
  limit = 3
): InstrumentSpec[] {
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
