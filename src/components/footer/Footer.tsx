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
        {/* Row 1: Logo + Social icons */}
        <div
          className={`flex flex-col md:flex-row items-center md:justify-between gap-6 mb-10 md:mb-12 ${styles.footLogoRow}`}
        >
          <Link href={localizeHref("/", locale)} className="block">
            <Image
              src="/img/logo-main.svg"
              alt={t.logoAlt}
              width={160}
              height={29}
            />
          </Link>
          <div className="flex gap-4">
            {socialItems.map((item, index) => (
              <Link key={index} href={item.link} target={item.target}>
                <Image
                  src={`/img/${item.imgFileName}`}
                  alt={item.alt}
                  width={29}
                  height={29}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: Useful links */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-12 mb-10 md:mb-12`}
        >
          <div className={`${styles.footer_links}`}>
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
          <div className={`${styles.footer_links}`}>
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
          <div className={`${styles.footer_links}`}>
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
          <div className={`${styles.footer_links}`}>
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

        <div className={`${styles.footer_texts} mb-4 md:mb-5`}>
          <h3>{t.notice.heading}</h3>
          <p>
            {t.notice.disclosurePre}{" "}
            <Link href={localizeHref("/legal-documents", locale)}>
              <u>{t.notice.disclosureLinkText}</u>
            </Link>{" "}
            {t.notice.disclosurePost}
          </p>
        </div>
        <div className={`${styles.footer_texts} mb-8 md:mb-10`}>
          <h3>{t.notice.regHeading}</h3>
          <p>{t.notice.inducement}</p>
        </div>

        {/* Row 3: Method icons + App store icons */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:justify-between mb-10 md:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-[10px]">
            {[
              { src: "/img/method-icons/visa-card.png", alt: "Visa" },
              { src: "/img/method-icons/master-card.png", alt: "Mastercard" },
              { src: "/img/method-icons/btc.png", alt: "Bitcoin" },
              { src: "/img/method-icons/neteller.png", alt: "Neteller" },
              { src: "/img/method-icons/skrill.png", alt: "Skrill" },
            ].map((item, index) => (
              <Image
                key={index}
                src={item.src}
                alt={item.alt}
                width={60}
                height={38}
                style={{ height: "38px", width: "auto" }}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Link
              href="https://apps.apple.com/us/app/metatrader-5/id413251709"
              target="_blank"
              className="block"
            >
              <Image
                width={120}
                height={38}
                src="/img/app-download-ios.png"
                alt={t.appDownload.iosAlt}
                style={{ height: "38px", width: "auto" }}
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
              target="_blank"
              className="block"
            >
              <Image
                width={120}
                height={38}
                src="/img/app-download-android.png"
                alt={t.appDownload.androidAlt}
                style={{ height: "38px", width: "auto" }}
              />
            </Link>
          </div>
        </div>

        {/* Row 4: Divider + Copyright/Notice */}
        <div className="border-t border-[rgba(255,255,255,0.14)] mb-8"></div>

        <p className={`${styles.copyrightText}`}>
          © Copyright 2018-{currentYear} {t.notice.copyrightSuffix}
        </p>
      </div>
    </section>
  );
}
