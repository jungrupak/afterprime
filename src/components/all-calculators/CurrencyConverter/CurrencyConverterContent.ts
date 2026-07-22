// Display names only. Keys are currency CODES used as API lookup
// identifiers elsewhere in the component — they must never be translated.
// The index signature lets the component look up a name by a `string`
// code (e.g. from `Object.entries`) without a TS indexing error.
const currencyNames: { [code: string]: string } = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CHF: "Swiss Franc",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  NZD: "New Zealand Dollar",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
  SGD: "Singapore Dollar",
  INR: "Indian Rupee",
  MXN: "Mexican Peso",
  ZAR: "South African Rand",
  BTC: "Bitcoin",
  XAU: "Gold (oz)",
  XAG: "Silver (oz)",
};

export const currencyConverterContent = {
  loadingExchangeRates: "Loading exchange rates...",
  from: "From",
  to: "To",
  rateLabel: "Rate:",
  inverseLabel: "Inverse:",
  updatedLabel: "Updated:",
  quickLabel: "Quick:",
  disclaimer: "Rates are indicative only. For demonstration purposes.",
  currencyNames,
};

export type CurrencyConverterContent = typeof currencyConverterContent;
