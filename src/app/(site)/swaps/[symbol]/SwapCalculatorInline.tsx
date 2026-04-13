"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/inputfield/Input";
import styles from "./Page.module.scss";

type SwapCalculatorInlineProps = {
  symbol: string;
  currencyProfit: string;
  swapLong: number;
  swapShort: number;
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
}: SwapCalculatorInlineProps) {
  const [lotSize, setLotSize] = useState("1.0");
  const [nightsHeld, setNightsHeld] = useState("1");
  const [direction, setDirection] = useState<Direction>("Long");

  const lots = parsePositiveNumber(lotSize, 1);
  const nights = parsePositiveNumber(nightsHeld, 1);
  const selectedRate = direction === "Long" ? swapLong : swapShort;
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
          <div className="text-[32px] font-semibold">Swap Cost Calculator</div>
          <p className="paragraph opacity-80 text-[1.1rem]!">
            Model the current overnight carry for {symbol.toUpperCase()} using
            the live long and short swap values.
            <br />
            Use the detailed{" "}
            <a href="/calculators/swap-calculator">
              <u>Swap Calculator</u>
            </a>{" "}
            if you prefer.
          </p>
        </div>

        <div className={styles.calculatorGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.fieldLabel} htmlFor="swap-lot-size">
              Lot size
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
            <span className={styles.fieldLabel}>Trade Direction</span>
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
                Long
              </button>
              <button
                type="button"
                className={`${styles.directionButton} ${
                  direction === "Short" ? styles.activeDirection : ""
                }`}
                onClick={() => setDirection("Short")}
              >
                Short
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.fieldLabel} htmlFor="swap-nights-held">
              Nights held
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
            {direction} swap cost ={" "}
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
              You earn +{formatValue(selectedRate)} {currencyProfit} per lot per
              night at current rates.
            </p>
          )}

          {selectedRate < 0 && (
            <p className={styles.helperText}>
              Current overnight holding cost is {formatValue(selectedRate)}{" "}
              {currencyProfit} per lot per night.
            </p>
          )}

          {isCryptoAnnualised && (
            <p className={styles.noteChip}>
              {selectedRate >= 0 ? "+" : ""}
              {formatValue(selectedRate)}% annualised
            </p>
          )}
        </div>
      </div>

      {hasPositiveCarry &&
        positiveCarryDirection &&
        positiveCarryRate !== null && (
          <div className={styles.positiveCarryCallout}>
            <p className={styles.calloutEyebrow}>Positive carry</p>
            <h3 className={styles.calloutTitle}>
              {positiveCarryDirection === "Long"
                ? "Holding a buy position"
                : "Holding a sell position"}{" "}
              on {symbol} overnight earns you +{formatValue(positiveCarryRate)}{" "}
              {currencyProfit} per standard lot per night at current rates.
            </h3>
            <p className={styles.calloutBody}>
              This is a carry trade opportunity. Your position generates income
              rather than incurring a cost while rates remain at these levels.
            </p>
          </div>
        )}
    </div>
  );
}
