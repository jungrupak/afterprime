import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./Page.module.scss";
import getSymbolSinglePageData from "@/lib/getSymbolSinglePageData";
import InnerBanner from "@/components/blocks/inner-banner/InnerBanner";
import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import PageRenderer from "@/components/PageRender";

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    brokers: string;
  }>;
};

//
// 🔹 Metadata
//
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brokers } = await params;
  return {
    title: ``,
    description: ``,
    alternates: {
      canonical: `https://afterprime.com/vs/${brokers}`,
    },
  };
}

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { brokers } = await params;
  const pageData = await getPageDataBySlug(brokers);
  if (!pageData) {
    notFound();
  }

  return (
    <>
      {/* This is dynamic block renderer form page */}
      <PageRenderer pageData={pageData} />
      {/* This is dynamic block renderer from page ends */}
    </>
  );
}

//
// 🔹 Pre-build all static params for ISR
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);
  if (!pages) return [];

  const parents = pages.filter((p) => p.parent === 0);
  const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

  return pages
    .filter((p) => p.parent !== 0 && parentMap[p.parent])
    .map((p) => ({
      slug: parentMap[p.parent],
      inst: p.slug,
    }));
}
