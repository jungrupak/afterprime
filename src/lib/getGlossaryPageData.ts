import {WPPage} from "@/types/blocks";


export async function getGlossaryPageData(params:string) {
  const restEndpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (!restEndpoint) {
    throw new Error("WORDPRESS_REST_ENDPOINT is not defined")
  }
  //defined parend ID to call only slugs that has Trade Page as parent
  const res = await fetch(restEndpoint + `/pages?slug=${params}&parent=4100`, {
      next:{revalidate:80}});
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