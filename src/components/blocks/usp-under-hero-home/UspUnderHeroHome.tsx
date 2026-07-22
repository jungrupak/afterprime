// src/components/blocks/usp-under-hero-home/UspUnderHeroHome.tsx
import styles from "./UspHome.module.scss";
import { Blocks } from "@/types/blocks";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";
import { uspUnderHomeContent } from "./uspUnderHomeContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

type USPBlockProps = Blocks["usp-under-home-hero"];

interface ComparisonData {
  secondBestVsAfterprimePct: number;
  industryVsAfterprimeAvgPct: number;
}

async function fetchComparisonData(): Promise<ComparisonData | null> {
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function UspUnderHome(props: USPBlockProps) {
  const { usp_under_home_static_info_text } = props;
  const data = await fetchComparisonData();
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "usp-under-home",
    locale,
    uspUnderHomeContent,
  );

  return (
    <section className={`${styles.section_usp}`}>
      <div className="ap_container_small">
        <div className={`${styles.usp_items_wrapper} items-center`}>
          <div>
            <h3>{t.rank}</h3>
            <p>
              {t.verifiedLine1}
              <br /> {t.verifiedLine2}
            </p>
          </div>
          <div>
            <h3>
              {data ? `${data.secondBestVsAfterprimePct.toFixed(1)}%` : "—"}
            </h3>
            <p>
              {t.savingVsBest}
              <br /> {t.bestLine2}
            </p>
          </div>
          <div>
            <h3>
              {data ? `${data.industryVsAfterprimeAvgPct.toFixed(1)}%` : "—"}
            </h3>
            <p>
              {t.savingVsIndustry} <br /> {t.industryLine2}
            </p>
          </div>
          <div className="max-md:flex items-center flex-col">
            <GoogleReviewBadge />
            <span className="text-[20px] font-[300] mt-6 block">
              <p>{usp_under_home_static_info_text || ""}</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
