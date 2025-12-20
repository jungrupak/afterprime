type TradeInputs = {
  exchangeRate: number;
  leverage: number;
  lotSize: number;
  bidPrice: number;
  askPrice: number;
};

type TradeResult = {
  marginLong: number;
  marginShort: number;
  spreadPips: number;
  spreadUSD: number;
  pointValue: number;
  contractSize: number;
  swapLongPips: number;
  swapLongUSD: number;
  swapShortPips: number;
  swapShortUSD: number;
};

export function useFxCalculator({
  exchangeRate,
  leverage,
  lotSize,
  bidPrice,
  askPrice,
}: TradeInputs): TradeResult {
  const CONTRACT_SIZE = 100_000;

  // Detect JPY pairs
  const isJPY = Math.round(bidPrice * 100) !== Math.round(bidPrice * 10000);
  const PIP_SIZE = isJPY ? 0.01 : 0.0001;

  // Point Value
const pointValue = CONTRACT_SIZE * lotSize * PIP_SIZE * exchangeRate;

// Spread
const spreadPips = (askPrice - bidPrice) / PIP_SIZE;
const spreadUSD = spreadPips * pointValue;

// Margin
const marginLong = (CONTRACT_SIZE * lotSize * askPrice) / leverage;
const marginShort = (CONTRACT_SIZE * lotSize * bidPrice) / leverage;

// Swap
const swapLongPips = -3.2;
const swapShortPips = -3.2;
const swapLongUSD = +(swapLongPips * CONTRACT_SIZE * PIP_SIZE * exchangeRate).toFixed(2) / 100;
const swapShortUSD = +(swapShortPips * CONTRACT_SIZE * PIP_SIZE * exchangeRate).toFixed(2) / 100;

  return {
    marginLong: +marginLong.toFixed(2),
    marginShort: +marginShort.toFixed(2),
    spreadPips: +spreadPips.toFixed(2),
    spreadUSD: +spreadUSD.toFixed(4),
    pointValue, // keep 4 decimals
    contractSize: CONTRACT_SIZE,
    swapLongPips,
    swapLongUSD,
    swapShortPips,
    swapShortUSD
  };
}
