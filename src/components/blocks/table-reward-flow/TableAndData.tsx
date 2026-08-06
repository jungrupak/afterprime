import style from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { RewardFlowTabs } from "./RewardFlowTabs";
import type { RebateRow, TableCategory } from "./types";

// tabNav here is a pure display label — category rows are matched against
// `row.product` prefixes ("FOREX-MAJORS", etc.) independently below, so
// translating the label can't desync the filtering. Still kept as a
// separate lookup (rather than translating TableCategory.tabNav directly)
// so the value used for React's `key` stays a stable English identifier.
const tabNavLabels: Record<string, string> = {
  "FX Majors": "FX Majors",
  "FX Minors": "FX Minors",
  "FX Exotics": "FX Exotics",
  Commodities: "Commodities",
  Metals: "Metals",
  Indices: "Indices",
  Crypto: "Crypto",
};

type SectionPropsHead = Blocks["rebate-table"];

function isRebateRow(item: unknown): item is RebateRow {
  if (!item || typeof item !== "object") return false;

  const row = item as Record<string, unknown>;
  return (
    typeof row.symbol === "string" &&
    typeof row.product === "string" &&
    typeof row.rebate_usd_per_lot === "number"
  );
}

function normalizeRebatesPayload(payload: unknown): RebateRow[] {
  const maybeRows = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  return maybeRows.filter(isRebateRow);
}

async function getRebates(): Promise<{
  categories: TableCategory[];
  error: string | null;
}> {
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/rebates/current",
      {
        next: { revalidate: 1800 },
      },
    );

    if (!res.ok) {
      console.error(`Failed to fetch: ${res.status}`);
    }

    const payload = await res.json();
    const data = normalizeRebatesPayload(payload);

    if (data.length === 0) {
      console.error("Invalid rebate data response.");
    }

    return {
      categories: [
        {
          tabNav: "FX Majors",
          rows: data.filter((row) => row.product === "FOREX-MAJORS"),
          linkSymbols: true,
        },
        {
          tabNav: "FX Minors",
          rows: data.filter((row) => row.product === "FOREX-MINORS"),
        },
        {
          tabNav: "FX Exotics",
          rows: data.filter((row) => row.product === "FOREX-EXOTICS"),
        },
        {
          tabNav: "Commodities",
          rows: data.filter((row) => row.product.startsWith("COMMODITIES")),
        },
        {
          tabNav: "Metals",
          rows: data.filter((row) => row.product.startsWith("METALS")),
        },
        {
          tabNav: "Indices",
          rows: data.filter((row) => row.product.startsWith("INDICES")),
        },
        {
          tabNav: "Crypto",
          rows: data.filter((row) => row.product.startsWith("CRYPTO")),
        },
      ],
      error: null,
    };
  } catch (error) {
    return {
      categories: [
        { tabNav: "FX Majors", rows: [], linkSymbols: true },
        { tabNav: "FX Minors", rows: [] },
        { tabNav: "FX Exotics", rows: [] },
        { tabNav: "Commodities", rows: [] },
        { tabNav: "Metals", rows: [] },
        { tabNav: "Indices", rows: [] },
        { tabNav: "Crypto", rows: [] },
      ],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function TableDataRewardFlow({
  rebate_table_title,
  rebate_table_section_paragraph,
}: SectionPropsHead) {
  const { categories, error } = await getRebates();
  const placeholderText = "Flow Rewards: Expanding soon";
  const locale = await getRequestLocale();
  const tabLabelsT = await getTranslatedStatic(
    "rebate-table-tabs",
    locale,
    tabNavLabels,
  );

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        <div className="mb-10 md:mb-15">
          <h2 className={style.sectionTitle}>{rebate_table_title}</h2>
          {rebate_table_section_paragraph && (
            <p className="paragraph">{rebate_table_section_paragraph}</p>
          )}
        </div>

        <RewardFlowTabs
          categories={categories}
          tabLabelsT={tabLabelsT}
          error={error}
          placeholderText={placeholderText}
          locale={locale}
          calculateSavingsHref={localizeHref(
            "/calculators/cost-savings-calculator",
            locale,
          )}
          calculateSavingsText="Calculate your savings"
          calculateSavingsSuffix="and see how much more your current broker is costing you to trade."
        />
      </div>
    </section>
  );
}
