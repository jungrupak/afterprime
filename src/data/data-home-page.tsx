interface PageSlug {
  pageSlug?: string;
}

export async function getPageData({ pageSlug }: PageSlug) {
  const res = await fetch(
    `https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/wp/v2/pages?slug=${pageSlug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data from WordPress");
  }
  const data = await res.json();
  return data; // just return the array
}
