import styles from "./Page.module.scss";
import Link from "next/link";
import {
  vsSymbolVerdictsContent,
  type VsSymbolVerdictsContent,
} from "./vsSymbolVerdictsContent";
import { localizeHref } from "@/lib/locale/localizeHref";

interface VsSymbolVerdictsProps {
  brokerName: string;
  symbol: string;
  savingPct: number;
  savingPer100Lots: number;
  content?: VsSymbolVerdictsContent;
  locale?: string;
}

export default function VsSymbolVerdicts({
  brokerName,
  symbol,
  savingPct,
  savingPer100Lots,
  content: t = vsSymbolVerdictsContent,
  locale = "en",
}: VsSymbolVerdictsProps) {
  const sym = symbol.toUpperCase();
  const saving500Lots = (savingPer100Lots * 5).toFixed(0);

  return (
    <div className={styles.verdictGrid}>
      <div className={`${styles.cardItem} ${styles.itemsCenter}`}>
        <div className={styles.verdictEyebrow}>{t.scalpersLabel}</div>
        <h3>{t.scalpersTitle}</h3>
        <p className={`opacity-65`}>
          {t.scalpersDesc
            .replace("{savingPct}", savingPct.toFixed(1))
            .replace("{sym}", sym)
            .replace("{saving500Lots}", saving500Lots)}
        </p>
      </div>

      <div className={`${styles.cardItem} ${styles.itemsCenter}`}>
        <div className={styles.verdictEyebrow}>{t.swingLabel}</div>
        <h3>{t.swingTitle}</h3>
        <p className={`opacity-65`}>
          {t.swingDescPrefix}{" "}
          <Link
            href={localizeHref(`/swaps/${symbol.toLowerCase()}`, locale)}
            className="underline opacity-80"
          >
            {t.swingDescLinkText.replace("{sym}", sym)}
          </Link>{" "}
          {t.swingDescSuffix}
        </p>
      </div>

      <div className={`${styles.cardItem} ${styles.itemsCenter}`}>
        <div className={styles.verdictEyebrow}>{t.algoLabel}</div>
        <h3>{t.algoTitle}</h3>
        <p className={`opacity-65`}>
          {t.algoDesc.replace("{brokerName}", brokerName)}
        </p>
      </div>
    </div>
  );
}
