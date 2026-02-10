
export async function getCalcPageData(pageSlug:string) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL; 
   if(!baseUrl)return;
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/pages?slug=${pageSlug}`,
    { cache: "no-store" } // or revalidate if you want ISR
  )

  if (!res.ok) {
    throw new Error("Failed to fetch WP page")
  }

  const pages = await res.json()
  return pages[0] // slug is unique → first item
}

