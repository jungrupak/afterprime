

export async function getGlossaryPageSlug(pageSlug:string) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL; 
   if(!baseUrl)return null;
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/pages?slug=${pageSlug}&parent=4100`,
    {
      next:{revalidate:80} 
    } // or revalidate if you want ISR
  )

  if (!res.ok) {
    throw new Error("Failed to fetch WP page")
  }

  const pages = await res.json();
  if(!pages.length) return {};
  return pages[0] // slug is unique → first item
}