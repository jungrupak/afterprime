import Tab, { TabItem } from "@/components/ui/Tab";
import { Blocks } from "@/types/blocks";
import style from "./SwapTable.module.scss";

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

function renderTable(rows: InstrumentDataType[]) {
  if (rows.length === 0) {
    return <p>No swap data available for this category.</p>;
  }

  return (
    <div className={`genericTable ${style.tableParent}`}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Instrument</th>
            <th className="px-4 py-2 text-left">Short</th>
            <th className="px-4 py-2 text-left">Long</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.symbol ?? `${row.path}-${index}`}>
              <td className="px-4 py-2">
                <a href={`/swaps/${row.symbol?.toLowerCase()}`}>
                  {row.symbol ?? "-"}
                </a>
              </td>
              <td className="px-4 py-2">{row.swapShort ?? "-"}</td>
              <td className="px-4 py-2">{row.swapLong ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function SwapDataTabs(_: SwapTableProps) {
  const { data, error } = await getSwapData();

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        {error ? (
          <p>{error}</p>
        ) : (
          <Tab>
            {tabNames.map((category) => (
              <TabItem key={category} tabNav={category}>
                {renderTable(filterByCategory(data, category))}
              </TabItem>
            ))}
          </Tab>
        )}
      </div>
    </section>
  );
}
