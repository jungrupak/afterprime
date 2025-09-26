export async function getPageACF(slug: string) {
  const res = await fetch(
    `https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 60 } } // ISR
  );
  if (!res.ok) throw new Error(`Failed to fetch page: ${slug}`);
  const data = await res.json();
  return data[0] || null;
}
