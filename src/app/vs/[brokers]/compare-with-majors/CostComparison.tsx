import CompareWithMajorsClient, {
  CompareMajorsData,
} from "./CostComparisonClient";

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
  if (!broker) {
    return (
      <p className="text-red text-[16px] opacity-65">
        Broker did not find in Compare List..
      </p>
    );
  }

  const data = await getCompareWithMajorsData(broker);

  if (!data) {
    return (
      <p className="text-red text-[12px] text-center">Error while data..</p>
    );
  }

  return <CompareWithMajorsClient data={data} />;
}
