export async function GetRebateData() {
  const res = await fetch(
    "https://scoreboard.argamon.com:8443/api/rebates/current",
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to Connect!");
  }
  const dataRebate = await res.json();
  //
  return dataRebate;
}
