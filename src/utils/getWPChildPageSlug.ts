import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import { notFound } from "next/navigation";

export async function getWpChildPagedata(
  childSlug: string
): Promise<WPPage> {

  const pages = await wpFetch<WPPage[]>(
    `/pages?slug=${childSlug}&_fields=id,slug,parent,content,title`
  );

  const page = pages?.[0];

  if (!page) notFound();

  return page;
}
