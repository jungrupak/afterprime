import React from 'react'

export default async function getSymbolSinglePageData(child:string) {
    try {
    const res = await fetch(
      `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${child}&_fields=id,slug,parent,content,title`,
      {
        cache: "force-cache",
        next: { revalidate: 60 },
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
