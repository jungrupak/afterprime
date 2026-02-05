

export async function getCalcPageData(pageSlug:string) {
  const res = await fetch(
    `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${pageSlug}`,
    { cache: "no-store" } // or revalidate if you want ISR
  )

  if (!res.ok) {
    throw new Error("Failed to fetch WP page")
  }

  const pages = await res.json()
  return pages[0] // slug is unique → first item
}

