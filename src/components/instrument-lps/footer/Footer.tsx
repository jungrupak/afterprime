import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { lpFooterContent } from "./lpFooterContent";

export default async function Footer() {
  const locale = await getRequestLocale();
  const c = await getTranslatedStatic("lp-footer", locale, lpFooterContent);
  const socialItems = [
    {
      imgFileName: "discord.svg",
      link: "https://discord.com/invite/NKBcxyWzdM",
      target: "_blank",
    },
    {
      imgFileName: "fb.svg",
      link: "https://www.facebook.com/afterprime.official/",
      target: "_blank",
    },
    {
      imgFileName: "tw.svg",
      link: "https://x.com/afterprime_com",
      target: "_blank",
    },
    {
      imgFileName: "insta.svg",
      link: "https://www.instagram.com/afterprime.official/?hl=en",
      target: "_blank",
    },
    {
      imgFileName: "in.svg",
      link: "https://sc.linkedin.com/company/afterprime",
      target: "_blank",
    },
  ];

  return (
    <section className={`${styles.footer_section} py-8! md:py-10!`}>
      <div className="ap_container_small">
        <div className={`${styles.footer_texts}`}>
          <h3>{c.customerNoticeHeading}</h3>
          <p>
            {c.disclaimerPart1}
            <a href={localizeHref("/legal-documents", locale)} rel="noopener">
              <u>{c.legalDocsLinkText}</u>
            </a>
            {c.disclaimerPart2}
          </p>
          <p>{c.jurisdictionNotice}</p>
          <p>{c.copyright}</p>
        </div>
      </div>
    </section>
  );
}
