import styles from "./Page.module.scss";
import Link from "next/link";

interface VsSymbolVerdictsProps {
  brokerName: string;
  symbol: string;
  savingPct: number;
  savingPer100Lots: number;
}

export default function VsSymbolVerdicts({
  brokerName,
  symbol,
  savingPct,
  savingPer100Lots,
}: VsSymbolVerdictsProps) {
  const sym = symbol.toUpperCase();
  const saving500Lots = (savingPer100Lots * 5).toFixed(0);

  return (
    <div className={styles.verdictGrid}>
      <div className={styles.verdictBlock}>
        <div className={styles.verdictEyebrow}>Scalpers / High Frequency</div>
        <div className={styles.verdictHeading}>Afterprime wins on cost</div>
        <p className={styles.verdictText}>
          At {savingPct.toFixed(1)}% lower cost per lot, Afterprime is
          materially cheaper for scalpers trading {sym} at volume. On 500
          lots/month the cost difference is ${saving500Lots}.
        </p>
      </div>

      <div className={styles.verdictBlock}>
        <div className={styles.verdictEyebrow}>Swing Traders</div>
        <div className={styles.verdictHeading}>Overnight cost matters too</div>
        <p className={styles.verdictText}>
          For traders holding positions overnight, swap rates are the secondary
          cost factor. Check{" "}
          <Link
            href={`/swaps/${symbol.toLowerCase()}`}
            className="underline opacity-80"
          >
            {sym} swap rates
          </Link>{" "}
          for a direct overnight cost comparison.
        </p>
      </div>

      <div className={styles.verdictBlock}>
        <div className={styles.verdictEyebrow}>Algo / EA Traders</div>
        <div className={styles.verdictHeading}>Sub-50ms, zero commission</div>
        <p className={styles.verdictText}>
          Sub-50ms execution and zero commission make Afterprime well-suited
          for systematic strategies where spread consistency and cost certainty
          matter more than {brokerName}&apos;s platform-specific features.
        </p>
      </div>
    </div>
  );
}
