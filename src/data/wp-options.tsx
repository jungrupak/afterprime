export async function getOptionsACF() {
  const res = await fetch(
    `https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/custom/v1/options`,
    { next: { revalidate: 60 } } // ISR
  );

  if (!res.ok) {
    console.error(`Fetch failed with status: ${res.status} ${res.statusText}`);
    throw new Error(`Failed to fetch options`);
  }

  const data = await res.json();
  return data || null; // return the object directly
}
