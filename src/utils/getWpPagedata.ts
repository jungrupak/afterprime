import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import { notFound } from "next/navigation";

export async function getWpPagedata(slug: string): Promise<WPPage> {
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}`);
  const pageData = pages?.[0];

  // ✅ Handle possible null/undefined
  if (!pageData) notFound();
  return pageData;
}
