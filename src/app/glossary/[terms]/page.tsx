import { getGlossaryPageSlug } from "@/lib/getGlossaryPageData";
import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import InnerBannerGeneric from "@/components/InnerBannerGeneric/InnerBannerGeneric";
import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { CtaBlock } from "@/components/acfFieldGroups/cta-block/CtaBlock";

interface PageSlug {
  params: Promise<{
    terms: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageSlug): Promise<Metadata> {
  const { terms } = await params;
  const pageData = await getGlossaryPageSlug(terms);
  const pageTitle = pageData?.title?.rendered ?? "";
  // 🚫 If no page OR wrong parent → no metadata
  if (!pageData || pageData.parent !== 4100) {
    return {};
  }
  return {
    title: `${pageTitle} | Forex Glossary | Afterprime`,
    description: `Learn what ${pageTitle} means in forex trading. Clear, concise definitions for serious traders, part of the Afterprime forex glossary.`,
    alternates: {
      canonical: `https://afterprime.com/glossary/${terms}`,
    },
  };
}

export default async function page({ params }: PageSlug) {
  const { terms } = await params;
  const pageData = await getGlossaryPageSlug(terms);
  // 🚫 If no page OR wrong parent → page not found
  if (!pageData || pageData.parent !== 4100) {
    return notFound();
  }

  //Banner Content
  const banner = {
    heading: pageData?.title?.rendered ?? "",
    paragraph: pageData?.acf?.inner_banner?.hero_paragraph ?? "",
  };

  //Reading Content
  const contents = pageData?.content?.rendered ?? "";

  return (
    <main>
      {/*  */}
      <InnerBannerGeneric content={banner} />
      {/*  */}

      {/*  */}
      <section className="compact-section">
        <div className="ap_container_small">
          {/* Cards */}
          <div className={`${styles.pageEditorContent}`}>
            <div dangerouslySetInnerHTML={{ __html: contents ?? "" }} />
          </div>
          <div className={`mt-5 md:mt-15`}>
            <h3 className={`text-[35px] mb-3 md:mb-5`}>Related Tools</h3>
            <p className={`text-[18px] mb-3 md:mb-5`}>
              Use these calculators to apply what you've learned:
            </p>
            <ul className="ulli mb-0!">
              <li>
                <a
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href="/calculators/pip-value-calculator"
                >
                  Pip Value Calculator
                </a>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  Calculate pip value for any pair
                </p>
              </li>
              <li>
                <a
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href="/calculators/position-size-calculator"
                >
                  Position Size Calculator
                </a>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  Size your position correctly
                </p>
              </li>
              <li>
                <a
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href="/calculators/drawdown-calculator"
                >
                  Drawdown Calculator
                </a>
                <br />
                <p className={`text-[16px] opacity-65`}>Track your risk</p>
              </li>
              <li>
                <a
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href="/vs"
                >
                  Compare Costs
                </a>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  Compare trading costs to current broker
                </p>
              </li>
              <li>
                <a
                  style={{ textDecoration: "underline", fontSize: 20 }}
                  href="/live-spreads"
                >
                  Live Spreads
                </a>
                <br />
                <p className={`text-[16px] opacity-65`}>
                  Trade live institutional spreads verified the lowest all-in
                  costs globally
                </p>
              </li>
            </ul>
          </div>
          {/* Cards Ends */}
        </div>
      </section>
      {/*  */}


      {/* CTA */}
      <section className="compact-section">
        <div className="ap_container_small">
          <CtaBlock />
        </div>
      </section>

      {/* CTA ends */}
    </main>
  );
}

// 🔹 Pre-build all static params for ISR
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?parent=4100&_fields=slug`);
  if (!Array.isArray(pages)) return [];
  return pages.map((p) => ({
    terms: p.slug,
  }));
}
