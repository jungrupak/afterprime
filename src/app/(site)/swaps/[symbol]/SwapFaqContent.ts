// Accordion is a Client Component ('use client'), so it can't call the
// Weglot translation pipeline itself — this content is translated once in
// the swaps Page (Server Component) via getTranslatedStatic("swap-faq",
// locale, swapFaqContent) and passed down as translated templates. Live
// values (symbol, swap rates, currency) are interpolated with .replace()
// at render time, after translation.
export const swapFaqContent = {
  q1: "What is the swap rate for {symbol}?",
  a1: "Afterprime's current {symbol} swap rates are {swapLong} (long) and {swapShort} (short) per standard lot per night, denominated in {currencyProfit}.",
  q2: "When is the triple swap applied to {symbol}?",
  a2: "Triple swap is charged on [Wednesday/Friday] to account for the Saturday and Sunday settlement period.",
  q3: "How do I calculate my {symbol} overnight holding cost?",
  a3: "Multiply the swap rate by your lot size and nights held. Example: 2 lots long for 3 nights = {exampleCost} {currencyProfit}.",
  q4: "Does {symbol} have a positive or negative swap?",
  a4: "The long swap on {symbol} is {swapLong} {currencyProfit} per lot per night — a cost on overnight buy positions.",
};

export type SwapFaqContent = typeof swapFaqContent;
