import { wpFetch } from "@/utils/wpFetch";
import { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./Page.module.scss";
import getSymbolSinglePageData from "@/lib/getSymbolSinglePageData";
import CostComparison from "@/components/instrument-lps/cost-comparison/CostComparison";
import InstrumentKeyBenifits from "@/components/instrument-key-benifits/InstrumentKeyBenifits";
import NotFound from "../not-found";

// Allow runtime slugs
export const dynamicParams = true;

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string; //this is domain.com/dynamic page slug i.e [slug]
    inst: string; //remember this is name of child dynamic folder i.e [child]
  }>;
};

//
// 🔹 Metadata
//
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { inst } = await params;
  return {
    title: `This is ${inst}`,
    description: ``,
  };
}

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { slug, inst } = await params;

  const parentRes = await wpFetch<WPPage[]>(`/pages?slug=${slug}&_fields=id`); //this asks domain/forex as [slug] page id.
  const getParentId = parentRes?.[0];
  const data = await getSymbolSinglePageData(inst, String(getParentId?.id));
  //console.log("data", data);
  if (!data) notFound();

  // Validate parent relationship
  if (!data.parent) notFound();

  const parent = await wpFetch<WPPage>(`/pages/${data.parent}?_fields=slug`); // this line is asking parent ID's slug
  if (!parent || parent.slug !== slug) {
    notFound();
  }

  // console.log("page data:", data);

  //Get CUstom Fields
  const getFields = data?.acf?.instrument_single_page_fields;
  const allContent = getFields?.page_content;

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
            <p>{getFields.hero_paragraph_one ?? ""}</p>
          </div>
        </div>
      </section>
      {/* Page Bannder Ends */}

      {/* Key Advantages */}
      <section
        className={`${styles.sectionIntroBlockGeneric} py-[clamp(40px_,10vw_,60px)]!`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small">
          <div className={`${styles.sectionIntroContents}`}>
            <div className={`max-md:order-2`}>
              <p>{getFields.hero_paragraph_two ?? ""}</p>
            </div>
            <div className={`max-md:order-1 text-left`}>
              <InstrumentKeyBenifits instrument={inst} />
            </div>
          </div>
        </div>
      </section>
      {/* Key Advantages */}

      {/* Cost Comparision */}
      <CostComparison instrument={inst} />
      {/* Cost Comparision */}

      {/* Page Contents */}
      {allContent && (
        <section className={`compact-section`}>
          <div className="grainy_bg"></div>
          <div className="ap_container_small">
            <div
              className={`${styles.pageEditorContent}`}
              dangerouslySetInnerHTML={{ __html: allContent || `&nbsp` }}
            />
          </div>
        </section>
      )}
      {/* Page Contents Ends */}
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
        inst: p.slug, // child slug
      }));
  } catch {
    return [];
  }
}
