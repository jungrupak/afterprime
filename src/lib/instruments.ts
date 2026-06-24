import type { InstrumentApi } from "@/hooks/useInstruments";

export interface InstrumentMeta {
  symbol: string;
  label: string;
  category: string;
  group: string;
  pipDecimal: number;
  pipSize: number;
  pipValuePerLot: number;
  contractSize: number;
  base: string;
  quote: string;
  pipLabel: "pips" | "points";
  swapLong: number;
  swapShort: number;
}

export interface GroupedInstruments {
  group: string;
  displayName: string;
  instruments: InstrumentMeta[];
}

export const FOREX_SUBGROUPS = ["Majors", "Minors", "Exotics"];
export const INDICES_SUBGROUPS = ["IndicesMini", "IndicesFull"];

export const GROUP_DISPLAY_NAMES: { [key: string]: string } = {
  Majors: "Major Pairs",
  Minors: "Minor Pairs",
  Exotics: "Exotic Pairs",
  Metals: "Metals",
  Crypto: "Crypto",
  Energies: "Energies",
  IndicesMini: "Indices",
  IndicesFull: "Indices (Full Size)",
  Commodities: "Commodities",
};

export const GROUP_ORDER = [
  "Majors",
  "Minors",
  "Exotics",
  "Metals",
  "Energies",
  "Commodities",
  "IndicesMini",
  "IndicesFull",
  "Crypto",
];

// Builds per-symbol calc metadata from the live instrument feed, excluding
// aggregated/premium duplicate feeds (symbols containing ".").
export function buildInstrumentMap(
  instruments: InstrumentApi[],
): { [symbol: string]: InstrumentMeta } {
  const map: { [symbol: string]: InstrumentMeta } = {};

  instruments.forEach((inst) => {
    if (inst.symbol.includes(".")) return;

    const pathParts = inst.path ? inst.path.split("\\") : [];
    const subPath = pathParts.length > 1 ? pathParts[1] : "";

    let group: string;
    if (inst.category === "Forex" && FOREX_SUBGROUPS.includes(subPath)) {
      group = subPath;
    } else if (
      inst.category === "Indices" &&
      INDICES_SUBGROUPS.includes(subPath)
    ) {
      group = subPath;
    } else {
      group = inst.category;
    }

    const isForex = inst.category === "Forex";
    const pipSize = inst.point * (isForex ? 10 : 1);
    const pipValuePerLot = inst.contractSize * pipSize;
    const pipLabel: "pips" | "points" =
      inst.category === "Indices" ||
      inst.category === "Commodities" ||
      inst.category === "Energies"
        ? "points"
        : "pips";

    const label =
      inst.category === "Forex" || inst.category === "Metals"
        ? `${inst.currencyBase}/${inst.currencyProfit}`
        : inst.symbol;

    map[inst.symbol] = {
      symbol: inst.symbol,
      label,
      category: inst.category,
      group,
      pipDecimal: inst.digits,
      pipSize,
      pipValuePerLot,
      contractSize: inst.contractSize,
      base: inst.currencyBase,
      quote: inst.currencyProfit,
      pipLabel,
      swapLong: inst.swapLong,
      swapShort: inst.swapShort,
    };
  });

  return map;
}

// Groups + sorts instruments for a dropdown, in a fixed display order.
export function groupInstruments(map: {
  [symbol: string]: InstrumentMeta;
}): GroupedInstruments[] {
  const groups: { [group: string]: InstrumentMeta[] } = {};

  Object.values(map).forEach((meta) => {
    if (!groups[meta.group]) groups[meta.group] = [];
    groups[meta.group].push(meta);
  });

  Object.values(groups).forEach((list) =>
    list.sort((a, b) => a.symbol.localeCompare(b.symbol)),
  );

  return GROUP_ORDER.filter((group) => groups[group]?.length).map(
    (group) => ({
      group,
      displayName: GROUP_DISPLAY_NAMES[group] || group,
      instruments: groups[group],
    }),
  );
}

// All exchange rates are quoted base=USD (rates[CCY] = units of CCY per 1 USD).
export function getExchangeRate(
  rates: { [key: string]: number },
  fromCurrency: string,
  toCurrency: string,
): number {
  if (fromCurrency === toCurrency) return 1;

  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;

  // Convert: from -> USD -> to
  return toRate / fromRate;
}

export function currencySymbol(currency: string): string {
  switch (currency) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "AUD":
      return "A$";
    default:
      return "$";
  }
}
