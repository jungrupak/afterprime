export async function metaDataHelper(instrument: string) {
  if (!instrument) return {
    title: `Trade ${instrument}`,
    description: `Trade ${instrument} on Afterprime`,
  };

  // Fetch broker comparison data via our server proxy
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_BASE_URL}/api/afterprime/${instrument}`,
    { cache: "no-store" } // ensures fresh data for SEO debugging
  );

  let data;
  if (res.ok) {
    data = await res.json();
  } else {
    console.warn("Failed to fetch broker data for metadata");
    data = null;
  }

  const secondBestVsAfterprimePct = data?.secondBestVsAfterprimePct ?? 0;

  return {
    title: `Trade ${instrument} at ${secondBestVsAfterprimePct}% Lower Cost vs the Next Best Option`,
    description: `Trade ${instrument} on Afterprime with verified low trading costs, transparent execution, and institutional liquidity. Compare brokers all-in costs.`,
  };
}