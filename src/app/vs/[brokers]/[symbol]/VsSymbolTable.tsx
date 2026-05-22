import styles from "./Page.module.scss";

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
              <th>Cost Component</th>
              <th>Afterprime</th>
              <th>{brokerName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All-in spread (pip)</td>
              <td className={styles.afterprimeCol}>{apCost.toFixed(2)}</td>
              <td>{compCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Commission</td>
              <td className={styles.afterprimeCol}>$0</td>
              <td>Varies by account</td>
            </tr>
            <tr>
              <td>Net cost per lot</td>
              <td className={styles.afterprimeCol}>
                ${apCostPerLot.toFixed(2)}
              </td>
              <td>${compCostPerLot.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Flow Rewards</td>
              <td className={styles.afterprimeCol}>
                {rebate > 0 ? <>−${rebate.toFixed(2)}/lot</> : <>N/A</>}
              </td>
              <td>None</td>
            </tr>
            <tr>
              <td>Net after Flow Rewards</td>
              <td className={styles.afterprimeCol}>
                ${apNetCost.toFixed(2)}/lot
              </td>
              <td>${compCostPerLot.toFixed(2)}/lot</td>
            </tr>
            {savingPerlot > 0 && (
              <>
                <tr>
                  <td>Saving vs Afterprime</td>
                  <td>—</td>
                  <td className={styles.savingHighlight}>
                    {savingPct.toFixed(1)}% more expensive
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
            Flow Rewards rebate of ${rebate.toFixed(2)}/lot is a structural edge
            paid back to active traders.
          </>
        )}
        Current month rate shown. Source:{" "}
        <a
          href="https://www.forexbenchmark.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <u>Forexbenchmark.com</u>
        </a>
        . Previous 7 Days Range. Incl. Commissions + Spreads.
      </p>
    </div>
  );
}
