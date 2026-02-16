import React from 'react'

export default async function getSymbolSinglePageData(instrument:string) {
    try {
    const res = await fetch(
      `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${instrument}&_fields=id,slug,parent,content,title`,
      {
        cache: "force-cache",
        next: { revalidate: 2400 },
      },
    );
    if (!res.ok) return;
    const fields = await res.json();
    const data = fields?.[0];
    return data;
  } catch (err) {
    console.error("failed to load page data:", err);
  }
}
