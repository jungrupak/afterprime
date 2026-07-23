import CompareWithMajorsClient, {
  CompareMajorsData,
} from "./CostComparisonClient";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { compareMajorsContent } from "./compareMajorsContent";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

async function getCompareWithMajorsData(
  broker: string,
): Promise<CompareMajorsData | null> {
  try {
    const res = await fetch(
      `https://feed.afterprime.com/api/majors/by-competitor?contains=${broker}`,
      {
        next: { revalidate: 2400 },
      },
    );

    if (!res.ok) {
      throw new Error(`Cost API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch compare data:", err);
    return null;
  }
}

export default async function CompareWithMajors({
  broker,
}: {
  broker: string;
}) {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("vs-compare-majors", locale, compareMajorsContent);

  if (!broker) {
    return (
      <p className="text-red text-[16px] opacity-65">
        {t.brokerNotFoundError}
      </p>
    );
  }

  const data = await getCompareWithMajorsData(broker);

  if (!data) {
    return (
      <p className="text-red text-[12px] text-center">{t.errorWhileData}</p>
    );
  }

  return <CompareWithMajorsClient data={data} broker={broker} content={t} locale={locale} />;
}
