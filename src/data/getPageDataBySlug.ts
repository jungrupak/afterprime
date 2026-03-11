
export async function getPageDataBySlug(pageSlug:string) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL; 
   if(!baseUrl)return null;
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/pages?slug=${pageSlug}`,
    {
      next:{revalidate:80} 
    } // or revalidate if you want ISR
  )

  if (!res.ok) {
    console.error("Failed to fetch WP page", res.status);
    return null;
  }

  const pages = await res.json();
  if(!pages.length) return null;
  return pages[0] ?? null // slug is unique → first item
}

