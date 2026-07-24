import styles from "./HeroUsp.module.scss";
import { heroUspContent } from "./heroUspContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

const DynamicData = async () => {
  try {
    const res = await fetch(`https://feed.afterprime.com/api/costs`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return "Failed to load Data from api source";
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failded to fetch data:", err);
  }
};
const dynamicData = await DynamicData();

export default async function HeroUsp({ text }: { text: string }) {
  const { top10VsAfterprimeAvgPct, industryVsAfterprimeAvgPct } = dynamicData;
  const top10Saving = Math.round(top10VsAfterprimeAvgPct ?? 0);
  const averageVsInds = Math.round(industryVsAfterprimeAvgPct ?? 0);

  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("hero-usp", locale, heroUspContent);

  return (
    <>
      <div
        className={`${styles.heroUspContainer} mx-auto lg:absolute left-0 bottom-0 z-5`}
      >
        <div
          className={`${styles.HeroUps} ap_container_medium py-8 md:pt-6 md:pb-15 flex-col flex-wrap flex md:flex-row items-center justify-center gap-y-5 gap-x-5 lg:gap-x-12 px-5 mx:px-0`}
        >
          <div className={`${styles.upsItem}`}>
            <div className={`${styles.value}`}>{t.rank}</div>
            <div className={`${styles.descp}`}>
              {t.lowestCostLine1}
              <br />
              {t.lowestCostLine2}
            </div>
          </div>
          <div className={`${styles.upsItem}`}>
            <div className={`${styles.value}`}>{top10Saving}%</div>
            <div className={`${styles.descp}`}>
              {t.vsTop10Line1} <br />
              {t.vsTop10Line2}
            </div>
          </div>
          <div className={`${styles.upsItem}`}>
            <div className={`${styles.value}`}>{averageVsInds}%</div>
            <div className={`${styles.descp}`}>
              {t.vsIndustryLine1} <br />
              {t.vsIndustryLine2}
            </div>
          </div>

          <p
            className={`${styles.note} text-[14px] absolute bottom-5 opacity-55 max-md:static leading-[1.4]`}
            //style={{ opacity: note ? "0.55" : "0" }}
          >
            {text}. {""}
            {t.licenseNote}
          </p>
        </div>
      </div>
    </>
  );
}
