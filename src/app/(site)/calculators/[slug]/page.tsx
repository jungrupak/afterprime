import styles from "../Page.module.scss";
import { getWpPagedata } from "@/utils/getWpPagedata";
import FaqCalc from "@/components/faq-calculators/Faq";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

//## Function to get data source here
async function pageDataSource(slug: string) {
  try {
    const res = await fetch(
      `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${slug}`,
    );
    if (!res.ok) return {};
    const pageData = await res.json();
    if (!pageData || !pageData.length) return;
    return pageData?.[0];
  } catch (err) {
    console.error("Faild to load data:", err);
  }
}
//##

export async function generateMetadata({ params }: PageSlug) {
  const { slug } = await params;
  const dataSource = await pageDataSource(slug);
  return {
    title: dataSource.aioseo_head_json?.title,
    description: dataSource.aioseo_head_json?.description,
    alternates: {
      canonical: `https://afterprime.com/calculators/${slug}`,
    },
  };
}
//##

export default async function Page({ params }: PageSlug) {
  const { slug } = await params;
  const pageData = await getWpPagedata(slug);
  if (!pageData) return;

  const acfFields = pageData?.acf;
  const calculatorPageFields = acfFields?.calculator_page_fields;

  const pageTitle = pageData?.title.rendered;
  const heroParagraph = calculatorPageFields?.intro_paragraph;
  const sectionTitle = acfFields?.faq_section?.ssection_title;
  const faqData = acfFields?.faq_section?.q_and_a;
  const pageFullContent = calculatorPageFields?.page_content;

  const pageSchema = calculatorPageFields?.page_schema;
  const faqSchema =
    faqData && faqData.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData
            .filter(
              (item: { question?: string; answer?: string }) =>
                item.question && item.answer,
            )
            .map((item: { question?: string; answer?: string }) => ({
              "@type": "Question",
              name: item.question?.replace(/(<([^>]+)>)/gi, ""),
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer?.replace(/(<([^>]+)>)/gi, ""),
              },
            })),
        }
      : null;

  return (
    <>
      {/* Banner Section */}
      <section className={`${styles.innerBannerSection}`}>
        <div className="grainy_bg"></div>
        <div className="ap_container flex items-center h-full">
          <div className="apBannerContent md:max-w-[800px]">
            <h1 className="h1-size mt-28 lg:mt-42 ">
              <span className="font-[600]">{pageTitle}</span>
            </h1>
            <div
              className="paragraph mb-12 max-lg:mx-auto lg:mt-20 opacity-80"
              style={{ fontWeight: "300" }}
            >
              {heroParagraph}
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* Calculator WIdget Section */}
      <section>
        <div className="grainy_bg"></div>
        <div className="ap_container flex items-center h-full">
          <div className="apBannerContent md:max-w-[800px]">
            Here goes ... {slug} calculator
          </div>
        </div>
      </section>
      {/* Calculator WIdget Section */}

      {/* Page Contents */}
      <section>
        <div className="grainy_bg"></div>
        <div className="ap_container">
          <div
            className={`${styles.pageEditorContent}`}
            dangerouslySetInnerHTML={{ __html: pageFullContent || `&nbsp` }}
          />
        </div>
      </section>

      {/* Page Contents Ends */}

      {/* FAQ FROM CMS */}
      {faqData && <FaqCalc faqSubject={sectionTitle} data={faqData} />}
      {/* FAQ FROM CMS ENDS */}
      {/* FAQ schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {/* //render data comparison schema */}
      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema),
          }}
        />
      )}
    </>
  );
}
