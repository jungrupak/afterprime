"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import liveStyles from "@/components/live-pricing/style.module.scss";
import styles from "./style.module.scss";
import { localizeHref } from "@/lib/locale/localizeHref";
import { DEFAULT_LOCALE } from "@/config/locales";
import type { RebateRow, TableCategory } from "./types";

// Index-based icon lookup keyed to the English tabNav key (stable identifier)
const tabIcons: Record<string, string> = {
  "FX Majors": "/img/icons/icon-forex.svg",
  "FX Minors": "/img/icons/icon-forex.svg",
  "FX Exotics": "/img/icons/icon-forex.svg",
  Commodities: "/img/icons/icon-commo.svg",
  Metals: "/img/icons/icon-metals.svg",
  Indices: "/img/icons/icon-indices.svg",
  Crypto: "/img/icons/icon-crypto.svg",
};

function renderSymbolCell(
  row: RebateRow,
  linkSymbols: boolean | undefined,
  locale: string,
) {
  if (!linkSymbols) {
    return row.symbol;
  }

  return (
    <Link href={localizeHref(`/trade/${row.symbol.toLowerCase()}`, locale)}>
      {row.symbol}
    </Link>
  );
}

interface RewardFlowTabsProps {
  categories: TableCategory[];
  tabLabelsT: Record<string, string>;
  error: string | null;
  placeholderText: string;
  locale?: string;
  calculateSavingsHref: string;
  calculateSavingsText: string;
  calculateSavingsSuffix: string;
}

export function RewardFlowTabs({
  categories,
  tabLabelsT,
  error,
  placeholderText,
  locale = DEFAULT_LOCALE,
  calculateSavingsHref,
  calculateSavingsText,
  calculateSavingsSuffix,
}: RewardFlowTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];

  return (
    <div>
      <div className={liveStyles.ap_tab_nav}>
        {categories.map(({ tabNav }, index) => (
          <button
            key={tabNav}
            type="button"
            className={index === activeTab ? liveStyles.active : ""}
            onClick={() => setActiveTab(index)}
          >
            {tabIcons[tabNav] && (
              <Image
                src={tabIcons[tabNav]}
                alt={tabLabelsT[tabNav] ?? tabNav}
                width={14}
                height={14}
                className="inline-block me-2"
              />
            )}
            {tabLabelsT[tabNav] ?? tabNav}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : active.rows.length > 0 ? (
        <div className={styles.rewardTableWrapper}>
          <table>
            <thead>
              <tr>
                <th>
                  Symbol
                  <br />
                </th>
                <th className={styles.flowRewardCell}>
                  Flow Rewards<sup>TM</sup>
                  <br />
                  (Per lot round turn)
                </th>
                <th>
                  Trade 50 Lots
                  <br />
                  Earn
                </th>
                <th>
                  Trade 100 Lots
                  <br />
                  Earn
                </th>
                <th>
                  Trade 250 Lots
                  <br />
                  Earn
                </th>
              </tr>
            </thead>
            <tbody>
              {active.rows.map((row) => (
                <tr key={`${row.product}-${row.symbol}`}>
                  <td>{renderSymbolCell(row, active.linkSymbols, locale)}</td>
                  <td className={styles.flowRewardCell}>
                    ${row.rebate_usd_per_lot.toFixed(2)}
                  </td>
                  <td>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                  <td>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                  <td>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5">
            <Link
              style={{ textDecoration: "underline" }}
              href={calculateSavingsHref}
            >
              {calculateSavingsText}
            </Link>{" "}
            {calculateSavingsSuffix}
          </p>
        </div>
      ) : (
        <p>{placeholderText}</p>
      )}
    </div>
  );
}
