import Tab, { TabItem } from "@/components/ui/Tab";
import style from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import Link from "next/link";

type SectionPropsHead = Blocks["rebate-table"];

type RebateRow = {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
};

type TableCategory = {
  tabNav: string;
  rows: RebateRow[];
  linkSymbols?: boolean;
};

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

function renderSymbolCell(row: RebateRow, linkSymbols?: boolean) {
  if (!linkSymbols) {
    return row.symbol;
  }

  return <Link href={`/trade/${row.symbol.toLowerCase()}`}>{row.symbol}</Link>;
}

function renderTable(rows: RebateRow[], linkSymbols?: boolean) {
  return (
    <div className="genericTable overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>
              Symbol
              <br />{" "}
            </th>
            <th
              style={{
                backgroundColor: "rgb(67, 59, 249)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Flow Rewards<sup>TM</sup>
              <br />
              (Per lot round turn)
            </th>
            <th style={{ width: "25%", textAlign: "center" }}>
              Trade 50 Lots
              <br />
              Earn
            </th>
            <th style={{ width: "25%", textAlign: "center" }}>
              Trade 100 Lots
              <br />
              Earn
            </th>
            <th style={{ width: "25%", textAlign: "center" }}>
              Trade 250 Lots
              <br />
              Earn
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.product}-${row.symbol}`}>
              <td>{renderSymbolCell(row, linkSymbols)}</td>
              <td
                style={{
                  backgroundColor: "rgb(67, 59, 249)",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                ${row.rebate_usd_per_lot.toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                ${(row.rebate_usd_per_lot * 50).toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                ${(row.rebate_usd_per_lot * 100).toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                ${(row.rebate_usd_per_lot * 250).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={`mt-5`}>
        <Link
          style={{ textDecoration: "underline" }}
          href={`/calculators/cost-savings-calculator`}
        >
          Calculate your savings
        </Link>{" "}
        and see how much more your current broker is costing you to trade.
      </p>
    </div>
  );
}

export async function TableDataRewardFlow({
  rebate_table_title,
  rebate_table_section_paragraph,
}: SectionPropsHead) {
  const { categories, error } = await getRebates();
  const placeholderText = "Flow Rewards: Expanding soon";

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        <div className="mb-10 md:mb-20">
          <h2 className={style.sectionTitle}>{rebate_table_title}</h2>
          {rebate_table_section_paragraph && (
            <p className="paragraph">{rebate_table_section_paragraph}</p>
          )}
        </div>

        <Tab>
          {categories.map(({ tabNav, rows, linkSymbols }) => (
            <TabItem key={tabNav} tabNav={tabNav}>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : rows.length > 0 ? (
                renderTable(rows, linkSymbols)
              ) : (
                <p>{placeholderText}</p>
              )}
            </TabItem>
          ))}
        </Tab>
      </div>
    </section>
  );
}
