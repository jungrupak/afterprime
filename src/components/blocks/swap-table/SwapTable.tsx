import Tab, { TabItem } from "@/components/ui/Tab";
import { Blocks } from "@/types/blocks";
import style from "./SwapTable.module.scss";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { DEFAULT_LOCALE } from "@/config/locales";

type SwapTableProps = Blocks["swap-table-section"];

const tabNames = [
  "FX Majors",
  "FX Minors",
  "FX Exotics",
  "Commodities",
  "Metals",
  "Crypto",
  "Indices",
] as const;

// tabNames doubles as the category key compared against the live feed's
// `path` prefix in filterByCategory below — translating it directly would
// silently break that dispatch. Tab (Client Component) only ever renders
// whatever's passed as `tabNav`, so a separate translated display-label map
// keeps the English keys intact for matching while the visible label
// translates.
const tabNavLabels = {
  "FX Majors": "FX Majors",
  "FX Minors": "FX Minors",
  "FX Exotics": "FX Exotics",
  Commodities: "Commodities",
  Metals: "Metals",
  Crypto: "Crypto",
  Indices: "Indices",
};

interface InstrumentDataType {
  symbol?: string;
  path?: string;
  swapLong?: number;
  swapShort?: number;
}

type SwapCategory = (typeof tabNames)[number];

function filterByCategory(
  data: InstrumentDataType[],
  category: SwapCategory,
): InstrumentDataType[] {
  return data.filter((item) => {
    if (category === "FX Majors") {
      return item.path?.startsWith("Forex\\Majors");
    }
    if (category === "FX Minors") {
      return item.path?.startsWith("Forex\\Minors");
    }
    if (category === "FX Exotics") {
      return item.path?.startsWith("Forex\\Exotics");
    }
    if (category === "Commodities") {
      return item.path?.startsWith("Commodities");
    }
    if (category === "Metals") {
      return item.path?.startsWith("Metals");
    }
    if (category === "Crypto") {
      return item.path?.startsWith("Crypto");
    }
    if (category === "Indices") {
      return item.path?.startsWith("Indices");
    }

    return false;
  });
}

async function getSwapData(): Promise<{
  data: InstrumentDataType[];
  error: string | null;
}> {
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/instruments/",
      {
        next: { revalidate: 1800 },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch swap data: ${res.status}`);
    }

    const payload = await res.json();

    if (!Array.isArray(payload)) {
      throw new Error("Invalid swap data response");
    }

    return {
      data: payload as InstrumentDataType[],
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function renderTable(rows: InstrumentDataType[], locale: string = DEFAULT_LOCALE) {
  if (rows.length === 0) {
    return <p>No swap data available for this category.</p>;
  }

  return (
    <div className={`genericTable ${style.tableParent}`}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="md:px-4 md:py-2 text-left">Instrument</th>
            <th className="md:px-4 md:py-2 text-left">Long</th>
            <th className="md:px-4 md:py-2 text-left">Short</th>
            <th className="md:px-4 md:py-2 text-left">Market Hours</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.symbol ?? `${row.path}-${index}`}>
              <td className="px-4 py-2">
                <a
                  href={
                    row.path?.startsWith("Forex") ||
                    row.symbol?.toLowerCase() === "xauusd"
                      ? localizeHref(`/trade/${row.symbol?.toLowerCase()}`, locale)
                      : localizeHref(`/swaps/${row.symbol?.toLowerCase()}`, locale)
                  }
                  className={`underline decoration-dotted decoration-2 underline-offset-4`}
                >
                  {row.symbol ?? "-"}
                </a>
              </td>
              <td className="px-4 py-2">{row.swapLong ?? "-"}</td>
              <td className="px-4 py-2">{row.swapShort ?? "-"}</td>
              <td>
                <a href={localizeHref(`/trading-hours/${row.symbol?.toLowerCase()}`, locale)}>
                  <span className="text-[14px] block underline decoration-dotted decoration-2 underline-offset-4 opacity-65">
                    Trading Hours
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function SwapDataTabs(_: SwapTableProps) {
  const { data, error } = await getSwapData();
  const locale = await getRequestLocale();
  const tabLabelsT = await getTranslatedStatic(
    "swap-table-tabs",
    locale,
    tabNavLabels,
  );

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        {error ? (
          <p>{error}</p>
        ) : (
          <Tab>
            {tabNames.map((category) => (
              <TabItem key={category} tabNav={tabLabelsT[category]}>
                {renderTable(filterByCategory(data, category), locale)}
              </TabItem>
            ))}
          </Tab>
        )}
      </div>
    </section>
  );
}
