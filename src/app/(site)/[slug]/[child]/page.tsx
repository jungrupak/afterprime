import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { CustomMetadata } from "@/utils/CustomMetadata";
import { notFound } from "next/navigation";
import styles from "./Page.module.scss";
import getSymbolSinglePageData from "@/lib/getSymbolSinglePageData";

// Allow runtime slugs
export const dynamicParams = true;

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string; //this is domain.com/dynamic page slug i.e [slug]
    child: string; //remember this is name of child dynamic folder i.e [child]
  }>;
};

//
// 🔹 Metadata
//
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { child } = await params;
  return {
    title: `This is ${child}`,
    description: ``,
  };
}

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { slug, child } = await params;
  const data = await getSymbolSinglePageData(child);
  if (!data) notFound();

  // Validate parent relationship
  if (!data.parent) notFound();

  const parent = await wpFetch<WPPage>(`/pages/${data.parent}?_fields=slug`);
  if (!parent || parent.slug !== slug) {
    notFound();
  }

  // console.log("page data:", data);

  return (
    <>
      {/* Page Bannder */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-10 lg:mt-15">
              <span className="font-[600]">{data?.title.rendered}</span>
            </h1>
          </div>
        </div>
      </section>
      {/* Page Bannder Ends */}
    </>
  );
}

//
// 🔹 Static Params
//
export async function generateStaticParams() {
  try {
    const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);

    if (!pages) return [];

    const parents = pages.filter((p) => p.parent === 0);

    const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

    return pages
      .filter((p) => p.parent !== 0 && parentMap[p.parent])
      .map((p) => ({
        slug: parentMap[p.parent], // parent slug
        child: p.slug, // child slug
      }));
  } catch {
    return [];
  }
}
