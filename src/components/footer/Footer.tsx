import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { footerContent } from "./footerContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("footer", locale, footerContent);

  const socialItems = [
    {
      imgFileName: "discord.svg",
      link: "https://discord.com/invite/NKBcxyWzdM",
      target: "_blank",
      alt: t.social.discord,
    },
    {
      imgFileName: "fb.svg",
      link: "https://www.facebook.com/afterprime.official/",
      target: "_blank",
      alt: t.social.facebook,
    },
    {
      imgFileName: "tw.svg",
      link: "https://x.com/afterprime_com",
      target: "_blank",
      alt: t.social.twitter,
    },
    {
      imgFileName: "insta.svg",
      link: "https://www.instagram.com/afterprime.official/?hl=en",
      target: "_blank",
      alt: t.social.instagram,
    },
    {
      imgFileName: "in.svg",
      link: "https://sc.linkedin.com/company/afterprime",
      target: "_blank",
      alt: t.social.linkedin,
    },
  ];

  return (
    <section className={`${styles.footer_section} compact-section`}>
      <div className="ap_container_small">
        <div
          className={`flex flex-wrap md:grid md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10 md:gap-12 sm:gap-6`}
        >
          <div className="col-span-full sm:col-auto order-1">
            <Link href={localizeHref("/", locale)} className="block mb-6">
              <Image
                src="/img/logo-text.svg"
                alt={t.logoAlt}
                width={160}
                height={29}
              />
            </Link>
            <div className="flex gap-3 mb-6">
              {socialItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target={item.target}
                  className="mb-4"
                >
                  <Image
                    src={`/img/${item.imgFileName}`}
                    alt={item.alt}
                    width={29}
                    height={29}
                  />
                </Link>
              ))}
            </div>
            <div className="flex gap-3">
              <Link
                href="https://apps.apple.com/us/app/metatrader-5/id413251709"
                target="_blank"
                className="block"
              >
                <Image
                  width={112}
                  height={38}
                  src="/img/app-download-ios.png"
                  alt={t.appDownload.iosAlt}
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
                target="_blank"
                className="block"
              >
                <Image
                  width={112}
                  height={38}
                  src="/img/app-download-android.png"
                  alt={t.appDownload.androidAlt}
                />
              </Link>
            </div>
          </div>
          <div className={`${styles.footer_links} order-2`}>
            <h2>{t.quickLinks.heading}</h2>
            <ul>
              <li>
                <Link href={localizeHref("/get-paid-to-trade", locale)}>
                  {t.quickLinks.flowRewards}
                  <sup>TM</sup>
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/lowest-cost-verified", locale)}>
                  {t.quickLinks.lowestCostVerified}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/aligned-execution", locale)}>
                  {t.quickLinks.alignedExecution}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/deposit-withdrawal", locale)}>
                  {t.quickLinks.depositWithdrawal}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/how-to-qualify", locale)}>
                  {t.quickLinks.howToApply}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/trade-execution", locale)}>
                  {t.quickLinks.tradeExecution}
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links} order-3`}>
            <h2>{t.markets.heading}</h2>
            <ul>
              <li>
                <Link href={localizeHref("/live-spreads", locale)}>
                  {t.markets.liveSpreads}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/forex", locale)}>
                  {t.markets.forexCfds}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/metals", locale)}>
                  {t.markets.preciousMetals}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/commodities", locale)}>
                  {t.markets.commodities}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/crypto", locale)}>
                  {t.markets.cryptoCfds}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/indices", locale)}>
                  {t.markets.indices}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/trade", locale)}>
                  {t.markets.brokerCosts}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/vs", locale)}>
                  {t.markets.compareBrokers}
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links} order-4`}>
            <h2>{t.platforms.heading}</h2>
            <ul>
              <li>
                <Link href={localizeHref("/mt4", locale)}>
                  {t.platforms.mt4}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/mt5", locale)}>
                  {t.platforms.mt5}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/webtrader", locale)}>
                  {t.platforms.webtrader}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/fix-api", locale)}>
                  {t.platforms.fixApi}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/calculators", locale)}>
                  {t.platforms.calculators}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/glossary", locale)}>
                  {t.platforms.glossary}
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links} order-5`}>
            <h2>{t.company.heading}</h2>
            <ul>
              <li>
                <Link href={localizeHref("/our-story", locale)}>
                  {t.company.ourStory}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/why-we-exist", locale)}>
                  {t.company.whyWeExist}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/legal-documents", locale)}>
                  {t.company.legalDocuments}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/license-and-regulations", locale)}>
                  {t.company.license}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/kyc-aml", locale)}>
                  {t.company.kycAml}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/privacy", locale)}>
                  {t.company.privacy}
                </Link>
              </li>
              <li>
                <Link href={localizeHref("/ai-instructions", locale)}>
                  {t.company.aiInstructions}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-15 max-md:my-8 border-t border-[rgba(255,255,255,0.14)]"></div>
        <div className={`${styles.footer_texts}`}>
          <h3>{t.notice.heading}</h3>
          <p>
            {t.notice.disclosurePre}{" "}
            <Link href={localizeHref("/legal-documents", locale)}>
              <u>{t.notice.disclosureLinkText}</u>
            </Link>{" "}
            {t.notice.disclosurePost}
          </p>
          <p>{t.notice.inducement}</p>
          <p>
            © Copyright 2018-{currentYear} {t.notice.copyrightSuffix}
          </p>
        </div>
      </div>
    </section>
  );
}
