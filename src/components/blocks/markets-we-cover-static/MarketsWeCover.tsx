import Link from "next/link";
import { Blocks } from "@/types/blocks";
import { marketsWeCoverContent } from "./marketsWeCoverContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import styles from "./MarketsWeCover.module.scss";

type SectionProps = Blocks["markets-we-cover-static"];

function CardArrow() {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="9.58093"
        cy="10.4996"
        r="9.58093"
        transform="rotate(-90 9.58093 10.4996)"
        fill="#FDFCF7"
      />
      <path
        d="M8.59319 6.69727L12.8014 10.9055L8.59319 15.1137L7.57739 14.0979L10.7698 10.9055L7.57739 7.71306L8.59319 6.69727Z"
        fill="#0C0C0D"
      />
    </svg>
  );
}

export async function MarketsWeCover(_props: SectionProps) {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "markets-we-cover",
    locale,
    marketsWeCoverContent,
  );

  const markets = [
    { ...t.forex, href: "/forex" },
    { ...t.metals, href: "/metals" },
    { ...t.crypto, href: "/crypto" },
    { ...t.commodities, href: "/commodities" },
    { ...t.indices, href: "/indices" },
  ];

  return (
    <section
      className={`${styles.section_generic_cards_content} compact-section`}
    >
      <div className="ap_container_small">
        <div className="mb-4 md:mb-6 max-w-[720px]">
          <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
            {t.heading1} {t.heading2}
          </h2>
          <p className="reading-text-md">{t.subheading}</p>
        </div>

        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-10">
          {markets.map((market) => (
            <div key={market.href} className={styles.cardItem}>
              <h3>{market.title}</h3>
              <p>{market.description}</p>
              <div className={styles.cardCta}>
                <Link
                  className="card_href_link hover:underline"
                  href={localizeHref(market.href, locale)}
                >
                  {market.cta}
                  <CardArrow />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
