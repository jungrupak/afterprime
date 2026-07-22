"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/inputfield/Input";
import styles from "./Page.module.scss";
import {
  swapCalculatorInlineContent,
  type SwapCalculatorInlineContent,
} from "./SwapCalculatorInlineContent";

type SwapCalculatorInlineProps = {
  symbol: string;
  currencyProfit: string;
  swapLong: number;
  swapShort: number;
  content?: SwapCalculatorInlineContent;
};

type Direction = "Long" | "Short";

const cryptoSymbolPattern =
  /BTC|ETH|XRP|LTC|BCH|EOS|ADA|DOGE|DOT|LINK|SOL|AVAX|MATIC|UNI|XLM|TRX|ETC/i;

function parsePositiveNumber(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function sanitizeNonNegativeInput(value: string, allowDecimal: boolean) {
  if (value === "") {
    return value;
  }

  const cleanedValue = value.replace(/-/g, "");
  const parsed = allowDecimal
    ? Number.parseFloat(cleanedValue)
    : Number.parseInt(cleanedValue, 10);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return "";
  }

  return cleanedValue;
}

function formatValue(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
}

export default function SwapCalculatorInline({
  symbol,
  currencyProfit,
  swapLong,
  swapShort,
  content = swapCalculatorInlineContent,
}: SwapCalculatorInlineProps) {
  const [lotSize, setLotSize] = useState("1.0");
  const [nightsHeld, setNightsHeld] = useState("1");
  // `direction` stays a stable English literal ("Long"/"Short") — it drives
  // the === comparisons below (which swap rate to show). Only the
  // SEPARATELY rendered label text (directionLabel, button text) is ever
  // translated, so a translated display string never leaks into a
  // comparison.
  const [direction, setDirection] = useState<Direction>("Long");

  const lots = parsePositiveNumber(lotSize, 1);
  const nights = parsePositiveNumber(nightsHeld, 1);
  const selectedRate = direction === "Long" ? swapLong : swapShort;
  const directionLabel =
    direction === "Long" ? content.longLabel : content.shortLabel;
  const totalSwapCost = selectedRate * lots * nights;
  const hasPositiveCarry = swapLong > 0 || swapShort > 0;
  const positiveCarryDirection =
    swapLong > 0 ? "Long" : swapShort > 0 ? "Short" : null;
  const positiveCarryRate =
    swapLong > 0 ? swapLong : swapShort > 0 ? swapShort : null;
  const isCryptoAnnualised = useMemo(
    () => cryptoSymbolPattern.test(symbol),
    [symbol],
  );

  return (
    <div className={styles.calculatorWrap}>
      <div className={styles.calculatorCard}>
        <div className={styles.calculatorHeader}>
          <div className="text-[32px] font-semibold">{content.heading}</div>
          <p className="paragraph opacity-80 text-[1.1rem]!">
            {content.introText.replace("{symbol}", symbol.toUpperCase())}
            <br />
            {content.detailedCalculatorPrefix}{" "}
            <a href="/calculators/swap-calculator">
              <u>{content.detailedCalculatorLinkText}</u>
            </a>{" "}
            {content.detailedCalculatorSuffix}
          </p>
        </div>

        <div className={styles.calculatorGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.fieldLabel} htmlFor="swap-lot-size">
              {content.lotSizeLabel}
            </label>
            <Input
              type="number"
              steps="0.01"
              value={lotSize}
              placeholder="1.0"
              onchange={(value) =>
                setLotSize(sanitizeNonNegativeInput(value, true))
              }
              className={styles.fieldInput}
              wrapperClassName={styles.fieldWrapper}
            />
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.fieldLabel}>
              {content.tradeDirectionLabel}
            </span>
            <div
              className={styles.directionToggle}
              role="tablist"
              aria-label="Swap direction"
            >
              <button
                type="button"
                className={`${styles.directionButton} ${
                  direction === "Long" ? styles.activeDirection : ""
                }`}
                onClick={() => setDirection("Long")}
              >
                {content.longLabel}
              </button>
              <button
                type="button"
                className={`${styles.directionButton} ${
                  direction === "Short" ? styles.activeDirection : ""
                }`}
                onClick={() => setDirection("Short")}
              >
                {content.shortLabel}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.fieldLabel} htmlFor="swap-nights-held">
              {content.nightsHeldLabel}
            </label>
            <Input
              type="number"
              steps="1"
              value={nightsHeld}
              placeholder="1"
              onchange={(value) =>
                setNightsHeld(sanitizeNonNegativeInput(value, false))
              }
              className={styles.fieldInput}
              wrapperClassName={styles.fieldWrapper}
            />
          </div>
        </div>

        <div className={styles.outputCard}>
          <p className={styles.outputLabel}>
            {content.swapCostLabel.replace("{direction}", directionLabel)}{" "}
            <span
              className={
                selectedRate >= 0 ? styles.valueAccent : styles.costNegative
              }
            >
              {selectedRate >= 0 ? "+" : ""}
              {formatValue(totalSwapCost)} {currencyProfit}
            </span>
          </p>

          {selectedRate > 0 && (
            <p className={styles.helperText}>
              {content.positiveRateHelper
                .replace("{rate}", formatValue(selectedRate))
                .replace("{currency}", currencyProfit)}
            </p>
          )}

          {selectedRate < 0 && (
            <p className={styles.helperText}>
              {content.negativeRateHelper
                .replace("{rate}", formatValue(selectedRate))
                .replace("{currency}", currencyProfit)}
            </p>
          )}

          {isCryptoAnnualised && (
            <p className={styles.noteChip}>
              {content.annualisedNote.replace(
                "{rate}",
                `${selectedRate >= 0 ? "+" : ""}${formatValue(selectedRate)}`,
              )}
            </p>
          )}
        </div>
      </div>

      {hasPositiveCarry &&
        positiveCarryDirection &&
        positiveCarryRate !== null && (
          <div className={styles.positiveCarryCallout}>
            <p className={styles.calloutEyebrow}>
              {content.positiveCarryEyebrow}
            </p>
            <h3 className={styles.calloutTitle}>
              {positiveCarryDirection === "Long"
                ? content.positiveCarryTitleLong
                : content.positiveCarryTitleShort}{" "}
              {content.positiveCarryTitleSuffix
                .replace("{symbol}", symbol.toUpperCase())
                .replace("{rate}", formatValue(positiveCarryRate))
                .replace("{currency}", currencyProfit)}
            </h3>
            <p className={styles.calloutBody}>{content.positiveCarryBody}</p>
          </div>
        )}
    </div>
  );
}
