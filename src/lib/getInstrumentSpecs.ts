// Replaces the old static src/data/ap-fx-pairs-specs.ts with live data from
// Argamon's instrument feed. Output keeps exactly the key set the static
// file used to have (minus "Time Zone", removed separately) so downstream
// consumers (ProductSpecification, SpecificationTable, getRelatedPairs)
// don't need to change shape — only where the data comes from.

export interface InstrumentSpec {
  Symbol: string;
  Name: string;
  "Asset Class": string;
  Expiry: string;
  "Pricefeed Type": string;
  "Margin Currency": string;
  "Profit Currency": string;
  "Contract Size": number;
  "Pip Value per Lot": string;
  "Min. Lot": number;
  Step: number;
  "Max. Lots": number;
  Decimals: number;
  MT4: string;
  MT5: string;
  Web: string;
  Desktop: string;
  Mobile: string;
  "FIX API": string;
  EAs: string;
  Scalping: string;
  "Day Trading": string;
  "News Trading": string;
  "Algo Trading": string;
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
  "Swap Type": string;
  "3-Day Swap": string;
}

interface RawSessionTrade {
  open: number;
  close: number;
  dayOfWeek: number; // 1 = Monday .. 5 = Friday
}

interface RawInstrument {
  path: string;
  category: string;
  symbol: string;
  currencyBase: string;
  description: string;
  currencyProfit: string;
  digits: number;
  point: number;
  contractSize: number;
  volumeMin: number;
  volumeStep: number;
  swap3Day: string;
  sessionsTrades: RawSessionTrade[];
  weekendTrading: boolean;
}

const INSTRUMENTS_ENDPOINT = "https://scoreboard.argamon.com:8443/api/instruments/";

// Feed doesn't expose platform availability at all — every pair defaults to
// "Y" (matches the old static file for all but one row) with a small
// exceptions map for the one documented gap (EURHUF has no MT4 listing).
const MT4_EXCEPTIONS: Record<string, string> = {
  EURHUF: "N",
};

// No "Max Lots" field in the feed, but the per-pair tier is fully implied by
// the Forex path's subfolder (matches the old static file's values exactly:
// Majors 200, Minors/Metals 100, Exotics 50).
function maxLotsFor(category: string, path: string): number {
  if (category === "Metals") return 100;
  const subCategory = path.split("\\")[1];
  if (subCategory === "Majors") return 200;
  if (subCategory === "Minors") return 100;
  return 50; // Exotics
}

// Broker fractional-pip quoting adds exactly one extra digit beyond
// standard precision (non-JPY 4dp->5dp, JPY 2dp->3dp) — the fractional
// form always has an ODD digit count, so pip = 10x point there. Even digit
// counts (standard forex, metals) mean point == pip. Same rule already used
// for live spread coloring in src/lib/formatSpreadPips.ts, applied here
// against the feed's own authoritative `digits`/`point` instead of a
// price string. Metals/crypto/indices have no pip convention — point == pip.
function pipSizeFor(category: string, digits: number, point: number): number {
  const isForex = category === "Forex";
  return isForex && digits % 2 === 1 ? point * 10 : point;
}

const CURRENCY_PREFIX: Record<string, string> = {
  USD: "$",
  AUD: "$",
  NZD: "$",
  SGD: "$",
  HKD: "$",
  CAD: "$",
  CNH: "$",
  MXN: "$",
  GBP: "£",
  EUR: "€",
  CHF: "Fr. ",
  JPY: "¥",
  NOK: "Kr ",
  SEK: "Kr ",
  PLN: "zł ",
  ZAR: "R ",
  CZK: "Kč ",
  HUF: "Ft ",
  THB: "฿",
  ILS: "₪",
  RUB: "₽",
  TRY: "₺",
};

function formatPipValue(amount: number, currencyProfit: string): string {
  const prefix = CURRENCY_PREFIX[currencyProfit] ?? `${currencyProfit} `;
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${prefix}${formatted}`;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function minutesToHHMM(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${pad2(hours)}:${pad2(minutes)}`;
}

const WEEKDAY_KEYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

function tradingHoursByWeekday(
  sessionsTrades: RawSessionTrade[],
): Record<(typeof WEEKDAY_KEYS)[number], string> {
  const hours: Record<string, string> = {};
  for (const key of WEEKDAY_KEYS) hours[key] = "Closed";
  for (const session of sessionsTrades) {
    const key = WEEKDAY_KEYS[session.dayOfWeek - 1];
    if (!key) continue;
    hours[key] = `${minutesToHHMM(session.open)}-${minutesToHHMM(session.close)}`;
  }
  return hours as Record<(typeof WEEKDAY_KEYS)[number], string>;
}

function mapInstrument(raw: RawInstrument): InstrumentSpec {
  // "AGG-Metals\\XAUUSD.agg" style symbols never reach here (AGG-*/PREM-*
  // categories are filtered out before mapping), but strip any trailing
  // ".agg"/".prem" suffix defensively in case the feed adds more later.
  const symbol = raw.symbol.split(".")[0];
  const weekdayHours = tradingHoursByWeekday(raw.sessionsTrades);
  const pipSize = pipSizeFor(raw.category, raw.digits, raw.point);
  const pipValuePerLot = raw.contractSize * pipSize;

  return {
    Symbol: symbol,
    Name: raw.description,
    "Asset Class": raw.category,
    // Constants, not sourced from the feed — true for every spot FX/metals
    // CFD on this feed, not per-instrument data that could vary.
    Expiry: "Perpetual",
    "Pricefeed Type": "Real time",
    "Margin Currency": raw.currencyBase,
    "Profit Currency": raw.currencyProfit,
    "Contract Size": raw.contractSize,
    "Pip Value per Lot": formatPipValue(pipValuePerLot, raw.currencyProfit),
    // MT5 volume units are 1/10000 lot (volumeStep 100 == 0.01 lot step) —
    // same convention already used in TradingCalculator.tsx.
    "Min. Lot": raw.volumeMin / 10000,
    Step: raw.volumeStep / 10000,
    "Max. Lots": maxLotsFor(raw.category, raw.path),
    Decimals: raw.digits,
    MT4: MT4_EXCEPTIONS[symbol] ?? "Y",
    MT5: "Y",
    Web: "Y",
    Desktop: "Y",
    Mobile: "Y",
    "FIX API": "Y",
    EAs: "Y",
    Scalping: "Y",
    "Day Trading": "Y",
    "News Trading": "Y",
    "Algo Trading": "Y",
    Monday: weekdayHours.Monday,
    Tuesday: weekdayHours.Tuesday,
    Wednesday: weekdayHours.Wednesday,
    Thursday: weekdayHours.Thursday,
    Friday: weekdayHours.Friday,
    // No weekend session ever appears in this feed for Forex/Metals.
    Saturday: "Closed",
    Sunday: "Closed",
    "Swap Type": "Points",
    "3-Day Swap": raw.swap3Day,
  };
}

export async function getInstrumentSpecs(): Promise<InstrumentSpec[]> {
  const res = await fetch(INSTRUMENTS_ENDPOINT, {
    next: { revalidate: 900 },
  });

  if (!res.ok) throw new Error("Failed to fetch instrument specs");

  const raw: RawInstrument[] = await res.json();

  // Keep the clean, canonical listing only — "Forex" (not the "AGG-FX"
  // duplicate feed) plus just XAUUSD out of "Metals" (not the ".agg"/".prem"
  // duplicates, and not the other 7 metals — matches the old static file's
  // scope, which only ever covered XAUUSD).
  const filtered = raw.filter(
    (item) =>
      item.category === "Forex" ||
      (item.category === "Metals" && item.symbol === "XAUUSD"),
  );

  return filtered.map(mapInstrument);
}
