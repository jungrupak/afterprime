import React from "react";
import LPBanner from "@/components/instrument-lps/lp-bannner/LpBanner";

import {notFound} from "next/navigation";//This needs to render custom 404 page created in this root

interface PageProps {
  params: Promise<{
    slug: string
  }>;
}

export const dynamicParams = true

export default async function TradeSlugPage({params}: PageProps) {
  const {slug} = await params;
  const restEp = process.env.WORDPRESS_REST_ENDPOINT;
  if (!restEp) {
    throw new Error("WORDPRESS_REST_ENDPOINT is not defined")
  }
  const res = await fetch(`https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/wp/v2/pages?slug=${slug}`,
    {cache: "no-store"}
  )
  if (!res.ok) {
    notFound();
  }

  const data = await res.json()
  const pageData = data?.[0];


  if (!pageData) {
    notFound()
  }

  return (
    <>
      {/* grain bg effect */}
      <LPBanner/>
      {/* grain bg effect */}
      <h1>{pageData.title?.rendered}</h1>
    </>
  )
}