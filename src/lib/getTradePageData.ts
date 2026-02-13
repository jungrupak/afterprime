import {WPPage} from "@/types/blocks";

interface GetParams {
  params: Promise<{ slug: string }>
}

export async function getTradePageData({params}: GetParams) {
  const {slug} = await params;
  const restEndpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (!restEndpoint) {
    throw new Error("WORDPRESS_REST_ENDPOINT is not defined")
  }
  const res = await fetch(restEndpoint + `/pages?slug=${slug}`, {
      cache:"force-cache",
      next:{revalidate:2460}});
  if (!res.ok) {
    throw new Error("Failed to retrieve data from external service")
  }
  const data: WPPage[] = await res.json();

  // WordPress returns an array — even for a single slug
  if (!data.length) {
    return null
  }

  return data[0]
}