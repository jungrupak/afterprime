
export async function getCalcPageData(pageSlug:string) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL; 
   if (!baseUrl) {
    console.error("NEXT_PUBLIC_WP_BASE_URL is not defined");
    return null;
  }
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/pages?slug=${pageSlug}`,
    {cache:"force-cache",
      next:{revalidate:86400} } // or revalidate if you want ISR
  )

  if (!res.ok) {
    console.error("WP fetch failed:", res.status);
    return null;
  }

  const pages = await res.json()
  return pages[0] ?? null // slug is unique → first item
}

