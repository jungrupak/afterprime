import styles from "./Page.module.scss";
import Link from "@/components/ui/Link";

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
      <div className={`${styles.cardItem} ${styles.itemsCenter}`}>
        <div className={styles.verdictEyebrow}>Scalpers / High Frequency</div>
        <h3>Afterprime wins on cost</h3>
        <p className={`opacity-65`}>
          At {savingPct.toFixed(1)}% lower cost per lot, Afterprime is
          materially cheaper for scalpers trading {sym} at volume. On 500
          lots/month the cost difference is ${saving500Lots}.
        </p>
      </div>

      <div className={`${styles.cardItem} ${styles.itemsCenter}`}>
        <div className={styles.verdictEyebrow}>Swing Traders</div>
        <h3>Overnight cost matters too</h3>
        <p className={`opacity-65`}>
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

      <div className={`${styles.cardItem} ${styles.itemsCenter}`}>
        <div className={styles.verdictEyebrow}>Algo / EA Traders</div>
        <h3>Sub-50ms, zero commission</h3>
        <p className={`opacity-65`}>
          Sub-50ms execution and zero commissions make Afterprime a stronger
          choice for automated trading than {brokerName}.
        </p>
      </div>
    </div>
  );
}
