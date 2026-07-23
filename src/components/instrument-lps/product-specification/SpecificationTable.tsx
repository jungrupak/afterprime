"use client";
import { AP_FX_PAIRS } from "@/data/ap-fx-pairs-specs";
import { useState } from "react";
import {
  specificationTableContent,
  type SpecificationTableContent,
} from "./specificationTableContent";

interface Specification {
  instrument?: string;
  content?: SpecificationTableContent;
}

export default function SpecificationTable({
  instrument,
  content: c = specificationTableContent,
}: Specification) {
  const [isCollapsible, setIsCollapsible] = useState(false);
  const INITIAL_ROWS = 10; // Number of rows to show initially

  // ####
  const specData = [...AP_FX_PAIRS]; //spreading this since we gonna have other pairs type in future like crypto, indices etc..
  const selectedInstrument = specData.find(
    (item) => item.Symbol === instrument,
  );
  //####

  const entries = selectedInstrument ? Object.entries(selectedInstrument) : [];
  const shouldShowToggle = entries.length > INITIAL_ROWS;
  const displayedEntries = isCollapsible
    ? entries
    : entries.slice(0, INITIAL_ROWS);

  return (
    <div className={`table-wrapper mb-4 md:mb-10`}>
      <h2>{c.heading.replace("{sym}", instrument ?? "")}</h2>
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
          className="expand-toggle mt-5 md:mt-8 rounded-[40px] bg-[#ffffff1c] hover:bg-[#ffffff30] p-[8px_20px]"
        >
          {isCollapsible ? c.showLess : c.showAll}
        </button>
      )}
    </div>
  );
}
