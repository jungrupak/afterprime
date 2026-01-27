import React from "react";
import LPBanner from "@/components/instrument-lps/lp-bannner/LpBanner";
import {getTradePageData} from "@/lib/getTradePageData";
import {notFound} from "next/navigation";//This needs to render custom 404 page created in this root

interface PageProps {
  params: Promise<{ slug: string }>
}


export default async function TradeSlugPage({params}: PageProps) {
  const page = await getTradePageData({params});
  if (!page) {
    notFound();
  }

  const heroBullets = page.acf?.instrument_page_fields?.hero_bullet_lists ?? [];

  //###################

  return (
    <>
      {/* grain bg effect */}
      <LPBanner instrumentname={page.title.rendered} lists={heroBullets}/>
      {/* grain bg effect */}
    </>
  )
}