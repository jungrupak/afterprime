
export interface FuncParams{
    bid: number;
    ask: number;
    lotSize: number;
    symbol: string;
    conversionRate?: number;
}

//Calculation Functions ######

export function calculateSpread({
    bid,
    ask,
    lotSize,
    symbol,
    conversionRate = 1}:FuncParams){

  const contractSize = 100000;
  const pipSize = symbol?.includes("JPY") ? 0.01 : 0.0001;

  const spreadPrice = ask - bid;
  const spreadPips = spreadPrice / pipSize;

  const pipValueQuote = lotSize * contractSize * pipSize;
  const spreadQuote = spreadPips * pipValueQuote;

  const spreadAccount = spreadQuote * conversionRate;

  return {
    spreadPips: spreadPips.toFixed(1),
    spreadAccount: spreadAccount.toFixed(2),
  };

}