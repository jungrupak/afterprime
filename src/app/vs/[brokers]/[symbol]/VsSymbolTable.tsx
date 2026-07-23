import styles from "./Page.module.scss";
import {
  vsSymbolTableContent,
  type VsSymbolTableContent,
} from "./vsSymbolTableContent";

interface VsSymbolTableProps {
  brokerName: string;
  symbol: string;
  apCost: number;
  compCost: number;
  apCostPerLot: number;
  compCostPerLot: number;
  rebate: number;
  apNetCost: number;
  savingPct: number;
  content?: VsSymbolTableContent;
}

export default function VsSymbolTable({
  brokerName,
  symbol,
  apCost,
  compCost,
  apCostPerLot,
  compCostPerLot,
  rebate,
  apNetCost,
  savingPct,
  content: t = vsSymbolTableContent,
}: VsSymbolTableProps) {
  const sym = symbol.toUpperCase();
  const savingPerlot = compCostPerLot - apCostPerLot;

  return (
    <div id="comparison-table" style={{ scrollMarginTop: "80px" }}>
      <div
        className={`genericTable table-wrapper ${styles.comparisonTableSection}`}
      >
        <table>
          <thead>
            <tr>
              <th>{t.costComponent}</th>
              <th>Afterprime</th>
              <th>{brokerName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t.allInSpread}</td>
              <td className={styles.afterprimeCol}>{apCost.toFixed(2)}</td>
              <td>{compCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>{t.commission}</td>
              <td className={styles.afterprimeCol}>$0</td>
              <td>{t.variesByAccount}</td>
            </tr>
            <tr>
              <td>{t.netCostPerLot}</td>
              <td className={styles.afterprimeCol}>
                ${apCostPerLot.toFixed(2)}
              </td>
              <td>${compCostPerLot.toFixed(2)}</td>
            </tr>
            <tr>
              <td>{t.flowRewards}</td>
              <td className={styles.afterprimeCol}>
                {rebate > 0 ? <>−${rebate.toFixed(2)}/lot</> : <>{t.na}</>}
              </td>
              <td>{t.none}</td>
            </tr>
            <tr>
              <td>{t.netAfterFlowRewards}</td>
              <td className={styles.afterprimeCol}>
                ${apNetCost.toFixed(2)}/lot
              </td>
              <td>${compCostPerLot.toFixed(2)}/lot</td>
            </tr>
            {savingPerlot > 0 && (
              <>
                <tr>
                  <td>{t.savingVsAfterprime}</td>
                  <td>—</td>
                  <td className={styles.savingHighlight}>
                    {savingPct.toFixed(1)}% {t.moreExpensive}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <p className={styles.tableNote}>
        {rebate > 0 && (
          <>
            {t.rebateNote.replace("${rebate}", `$${rebate.toFixed(2)}`)}
          </>
        )}
        {t.sourceNotePrefix}{" "}
        <a
          href="https://www.forexbenchmark.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <u>Forexbenchmark.com</u>
        </a>
        {t.sourceNoteSuffix}
      </p>
    </div>
  );
}
