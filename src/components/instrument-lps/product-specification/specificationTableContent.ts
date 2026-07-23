// SpecificationTable is a Client Component ('use client'), so it can't call
// the Weglot translation pipeline itself — this content is translated once
// in each Server Component caller (via flexibleContentMap's renderSection
// options) and passed down as a `content` prop. `{sym}` is interpolated
// with .replace() at render time, after translation — not `{instrument}`:
// Weglot's MT treats "instrument" as a real word and translates it too,
// silently breaking the placeholder (see 12-Weglot-Dashboard-Fixes.md).
//
// `labels` maps each AP_FX_PAIRS (src/data/ap-fx-pairs-specs.ts) object key
// to its translated row label — only the label translates, the row VALUE
// (ticker codes, currency codes, Y/N flags, numeric specs, time ranges)
// stays completely untouched, since those are data, not prose, and
// `selectedInstrument.Symbol` is compared with `===` against the raw
// `instrument` prop upstream.
//
// Platform/product names (MT4, MT5, Web, Desktop, Mobile, FIX API, EAs) are
// deliberately left OUT of `labels` — trading platform brand names aren't
// translated in this industry, and "FIX API" specifically is a documented
// Weglot mistranslation ("API de corrección") since it reads "Fix" as the
// verb, not the FIX protocol acronym. SpecificationTable falls back to the
// raw key when a lookup misses, so these render exactly as they do today.
export const specificationTableContent = {
  heading: "Afterprime Product Specification for {sym}",
  showLess: "Show Less",
  showAll: "Show All",
  labels: {
    Symbol: "Symbol",
    Name: "Name",
    "Asset Class": "Asset Class",
    Expiry: "Expiry",
    "Pricefeed Type": "Pricefeed Type",
    "Margin Currency": "Margin Currency",
    "Profit Currency": "Profit Currency",
    "Contract Size": "Contract Size",
    "Min. Lot": "Min. Lot",
    Step: "Step",
    "Max. Lots": "Max. Lots",
    Decimals: "Decimals",
    Scalping: "Scalping",
    "Day Trading": "Day Trading",
    "News Trading": "News Trading",
    "Algo Trading": "Algo Trading",
    "Time Zone": "Time Zone",
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
    "Swap Type": "Swap Type",
    "3-Day Swap": "3-Day Swap",
  } as Record<string, string>,
};

export type SpecificationTableContent = typeof specificationTableContent;
