// src/utils/earning-calculator/EarningCalc.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { RebateDataType } from "@/lib/rebates";
import {
  earningCalcContent,
  type EarningCalcContent,
} from "./earningCalcContent";

interface Props {
  initialRebates: RebateDataType[];
  content?: EarningCalcContent;
  disclaimerHref?: string;
}

export function EarningCalc({
  initialRebates,
  content = earningCalcContent,
  disclaimerHref = "/trade-execution",
}: Props) {
  const [rebates] = useState<RebateDataType[]>(initialRebates);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [lotTradedValue, setLotTradedValue] = useState<number | "">(100);
  const [rebatePerLot, setRebatePerLot] = useState<number | null>(null);
  const [oneYearResult, setOneYearResult] = useState<number>(0);
  const [fiveYearResult, setFiveYearResult] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!rebates || rebates.length === 0) return;
    const defaultSymbol =
      rebates.find((s) => s.symbol === "CADCHF") ?? rebates[0];
    setSelectedSymbol(defaultSymbol.symbol);
    setRebatePerLot(defaultSymbol.rebate_usd_per_lot);
  }, [rebates]);

  useEffect(() => {
    const lot = lotTradedValue === "" ? 0 : lotTradedValue;
    const rebate = rebatePerLot ?? 0;
    setOneYearResult(rebate * lot * 12);
    setFiveYearResult(rebate * lot * 60);
  }, [lotTradedValue, rebatePerLot, selectedSymbol]);

  const handleOnChangeTradeLot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = Number(value);
    if (value === "") {
      setLotTradedValue("");
      return;
    }
    if (isNaN(num) || num <= 0) {
      setError(content.invalidInput);
      return;
    }
    setError("");
    setLotTradedValue(num);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sym = e.target.value;
    setSelectedSymbol(sym);
    const found = rebates.find((s) => s.symbol === sym);
    setRebatePerLot(found ? found.rebate_usd_per_lot : null);
  };

  return (
    <>
      <h3 className="text-[20px] font-[700] opacity-80">{content.heading}</h3>

      <div className="mt-5 md:mt-10 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-5 items-start">
        {/* LOT TRADED */}
        <div>
          <label>{content.lotsLabel}</label>
          <input
            type="text"
            placeholder={content.lotsPlaceholder}
            className={`${styles.customInput} w-full mt-5`}
            value={lotTradedValue}
            onChange={handleOnChangeTradeLot}
          />
          {error && (
            <span className="text-red-500 block mt-4 text-[12px]">{error}</span>
          )}
        </div>

        {/* SYMBOL */}
        <div>
          <label>{content.symbolLabel}</label>
          <select
            className={`${styles.customSelect} block mt-5 w-full`}
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            {rebates.map((symbol) => (
              <option key={symbol.symbol} value={symbol.symbol}>
                {symbol.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RESULT */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className={`${styles.resultCard} text-center`}>
          <p className="text-[13px] opacity-60">{content.oneYearLabel}:</p>
          <p className="mt-2 text-[22px] font-[700]">${oneYearResult}</p>
        </div>
        <div className={`${styles.resultCard} text-center`}>
          <p className="text-[13px] opacity-60">{content.fiveYearLabel}:</p>
          <p className="mt-2 text-[22px] font-[700]">${fiveYearResult}</p>
        </div>
      </div>

      <div className="bg-[var(--primary-white-8)] py-5 px-10 note_box text-center mt-5 text-[var(--primary-white-60)]">
        Afterprime&apos;s{" "}
        <a href={disclaimerHref}>
          <u>{content.disclaimerLinkText}</u>
        </a>{" "}
        {content.disclaimerSuffix}
      </div>
    </>
  );
}
