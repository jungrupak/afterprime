import { Blocks } from "@/types/blocks";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { swapTableContent } from "./swapTableContent";
import { SwapTableTabs, type SwapTab } from "./SwapTableTabs";

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

// Index-based — order must match tabNames above
const tabIcons: Record<(typeof tabNames)[number], string> = {
  "FX Majors": "/img/icons/icon-forex.svg",
  "FX Minors": "/img/icons/icon-forex.svg",
  "FX Exotics": "/img/icons/icon-forex.svg",
  Commodities: "/img/icons/icon-commo.svg",
  Metals: "/img/icons/icon-metals.svg",
  Crypto: "/img/icons/icon-crypto.svg",
  Indices: "/img/icons/icon-indices.svg",
};

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

export async function SwapDataTabs(_: SwapTableProps) {
  const { data, error } = await getSwapData();
  const locale = await getRequestLocale();
  const tabLabelsT = await getTranslatedStatic(
    "swap-table-tabs",
    locale,
    tabNavLabels,
  );
  const swapTableT = await getTranslatedStatic(
    "swap-table",
    locale,
    swapTableContent,
  );

  const tabs: SwapTab[] = tabNames.map((category) => ({
    key: category,
    label: tabLabelsT[category],
    icon: tabIcons[category],
    rows: filterByCategory(data, category),
  }));

  return (
    <section>
      <div className="ap_container_small">
        {error ? (
          <p>{error}</p>
        ) : (
          <SwapTableTabs tabs={tabs} locale={locale} content={swapTableT} />
        )}
      </div>
    </section>
  );
}
