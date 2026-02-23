import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import PageRenderer from "@/components/PageRender";
import CostComparisonWithSelected from "./compare-ap-with-selected/CostComparison";
import CompareWithMajors from "./compare-with-majors/CostComparison";

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
    title: `Afterprime vs ${brokers} - Total Cost Comparison
`,
    description: `Compare Afterprime vs ${brokers}: zero commission, Flow Rewards, verified execution data. See total cost breakdown and monthly savings.`,
    alternates: {
      canonical: `https://afterprime.com/vs/${brokers}`,
    },
  };
}

const compareBrokerData = async (brokers: string) => {
  try {
    const res = await fetch(
      `https://feed.afterprime.com/api/majors/by-competitor?contains=${brokers}`,
      {
        next: { revalidate: 80 },
      },
    );
    if (!res.ok) {
      throw new Error("Faild to load broker individual data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Faild to load broker individual data:", err);
  }
};

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { brokers } = await params;
  if (!brokers) return;
  const [pageData, brokerData] = await Promise.all([
    getPageDataBySlug(brokers),
    compareBrokerData(brokers),
  ]);
  if (!pageData) {
    notFound();
  }

  return (
    <>
      {/* This is dynamic block renderer form page */}
      <PageRenderer pageData={pageData} />
      {/* This is dynamic block renderer from page ends */}

      {/* Trading Cost Breakdown */}
      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <h2 className={`leading-[1.2]`}>Trading Cost Breakdown</h2>
          <CostComparisonWithSelected selectedBrokerSlug={brokers} />
        </div>
      </section>
      {/* Trading Cost Breakdown Ends */}

      {/* Trading Cost Breakdown */}
      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <h2 className={`leading-[1.2]`}>Monthly Cost by Volume</h2>
          <CompareWithMajors broker={brokers} />
        </div>
      </section>
      {/* Trading Cost Breakdown Ends */}
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
