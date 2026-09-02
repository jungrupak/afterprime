"use client";
import { useState } from "react";
import type { InstrumentSpec } from "@/lib/getInstrumentSpecs";
import styles from "./ProductSpecification.module.scss";
import {
  specificationTableContent,
  type SpecificationTableContent,
} from "./specificationTableContent";

interface Specification {
  instrument?: string;
  content?: SpecificationTableContent;
  specData: InstrumentSpec[];
}

export default function SpecificationTable({
  instrument,
  content: c = specificationTableContent,
  specData,
}: Specification) {
  const [isCollapsible, setIsCollapsible] = useState(false);
  const INITIAL_ROWS = 10; // Number of rows to show initially

  const selectedInstrument = specData.find(
    (item) => item.Symbol === instrument,
  );

  const entries = selectedInstrument ? Object.entries(selectedInstrument) : [];
  const shouldShowToggle = entries.length > INITIAL_ROWS;
  const displayedEntries = isCollapsible
    ? entries
    : entries.slice(0, INITIAL_ROWS);

  return (
    <div className={`table-wrapper mb-4 md:mb-10 ${styles.costBreakDownTable}`}>
      <h2
        className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}
      >
        {c.heading.replace("{sym}", instrument ?? "")}
      </h2>
      <table cellPadding={"0"} cellSpacing={"0"} border={0} className={`m-0!`}>
        <tbody>
          {selectedInstrument &&
            displayedEntries.map(([key, value]) => (
              <tr key={key}>
                <td>{c.labels[key] ?? key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {shouldShowToggle && (
        <button
          onClick={() => setIsCollapsible(!isCollapsible)}
          className="text-[16px] expand-toggle mt-5 md:mt-8 rounded-xs bg-[#ffffff1c] hover:bg-[#ffffff30] p-[5px_10px]"
        >
          {isCollapsible ? c.showLess : c.showAll}
        </button>
      )}
    </div>
  );
}
