import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import styles from "./Page.module.scss";
import { notFound } from "next/navigation";
import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import PageRenderer from "@/components/PageRender";
import CostComparisonWithSelected from "./compare-ap-with-selected/CostComparison";
import CompareWithMajors from "./compare-with-majors/CostComparison";
import Button from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";
import FaqCalc from "@/components/faq-calculators/Faq";

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

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { brokers } = await params;
  if (!brokers) return;
  const pageData = await getPageDataBySlug(brokers);
  if (!pageData) {
    notFound();
  }

  const ctaBlockFields = pageData?.acf?.cta_block;
  const heroBanner = pageData?.acf?.hero_banner_home;
  const faqData = pageData?.acf?.faq_section?.q_and_a;
  return (
    <>
      {/* Inner Banner */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-10 lg:mt-15 max-w-[800px]">
              <span className="font-[600]">{heroBanner?.banner_heading}</span>
            </h1>
            <div
              className="paragraph max-w-[600px] lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: heroBanner?.banner_paragraph || "&nbsp;",
              }}
            />

            {heroBanner &&
              (heroBanner?.is_type_form_cta === true ? (
                <div className={`mt-8 md:mt-15`}>
                  <TypeformButton buttonText="Get Invite Code" size="Large" />
                </div>
              ) : (
                <div className={`mt-8 md:mt-15`}>
                  <Button
                    href={heroBanner?.banner_btn_url}
                    varient="primary"
                    size="regular"
                    isArrowVisible={true}
                  >
                    {heroBanner?.banner_btn_text}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Inner Banner Ends */}

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

      {/* Dynamic Content Area */}
      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <div className={`${styles.pageEditorContent}`}>
            <h2 className={`mt-0!`}>Spreads</h2>
            <ul>
              <li>Spread differential</li>
              <li>Cost per lot impact</li>
              <li>How it affects total cost calculation</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Dynamic Content Area Ends */}

      {/* CTA */}
      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <div
            className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
          >
            <div>
              <h2
                className={`text-[clamp(30px_,5vw_,50px)]! md:mb-8! leading-[1]`}
              >
                {ctaBlockFields?.title}
              </h2>
              <p
                className={`paragraph mb-8 md:mb-10 opacity-80`}
                dangerouslySetInnerHTML={{
                  __html: ctaBlockFields?.paragraph || "",
                }}
              />
              <Button
                varient="primary"
                size="regular"
                href={ctaBlockFields?.button_url}
              >
                {ctaBlockFields?.button_text}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Ends */}

      {/* FAQs */}
      <FaqCalc faqSubject="FAQ." data={faqData} />
      {/* FAQs Ends */}
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
