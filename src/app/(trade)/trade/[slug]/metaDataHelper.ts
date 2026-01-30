export async function metaDataHelper(instrument: string) {
  if (!instrument) return { title: instrument, description: instrument };

  const res = await fetch(`https://yourdomain.com/api/afterprime/${instrument}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch broker data for metadata", res.status);
    return {
      title: `Trade ${instrument} at 0% Lower Cost`,
      description: `Trade ${instrument} on Afterprime`,
    };
  }

  const data = await res.json();
  console.log("Broker data in metaDataHelper:", data); // ✅ MUST log object

  const secondBestVsAfterprimePct = data?.secondBestVsAfterprimePct ?? 0;

  return {
    title: `Trade ${instrument} at ${secondBestVsAfterprimePct}% Lower Cost vs the Next Best Option`,
    description: `Trade ${instrument} on Afterprime with verified low trading costs, transparent execution, and institutional liquidity.`,
  };
}
