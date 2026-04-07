export async function getPrices() {
  const res = await fetch("https://marketprice.afterprime.io:5000/MarketPrice", {
    next: { revalidate: 1800 },
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}