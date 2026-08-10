import styles from "./CompareBoth.module.scss";
import { compareBothContent } from "./compareBothContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

function renderCell(value: string) {
  if (value === "Yes") {
    return (
      <span className={`${styles.statusDot} ${styles.statusYes}`}>{value}</span>
    );
  }
  if (value === "No") {
    return (
      <span className={`${styles.statusDot} ${styles.statusNo}`}>{value}</span>
    );
  }
  return value;
}

export default async function CompareMT4MT5() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("mt4-vs-mt5", locale, compareBothContent);

  return (
    <section className={`py-[clamp(40px_,10vw_,60px)]! compact-section`}>
      <div className="ap_container_small">
        <h2
          className={`font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold`}
        >
          {t.heading}
        </h2>
        <p className="reading-text-md opacity-60 mb-8 md:mb-12">
          {t.subheading}
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>{t.tableHeaders.feature}</th>
                <th>{t.tableHeaders.mt4}</th>
                <th>{t.tableHeaders.mt5}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{renderCell(row.mt4)}</td>
                  <td>{renderCell(row.mt5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="reading-text-caption opacity-40 mt-4 md:mt-6">
          {t.closing}
        </p>
      </div>
    </section>
  );
}
