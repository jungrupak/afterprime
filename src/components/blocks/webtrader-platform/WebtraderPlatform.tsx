import Image from "next/image";
import Link from "next/link";
import cardStyles from "../platform-cards-section-static/PlatformCards.module.scss";
import { CardArrow } from "../platform-cards-section-static/PlatformCards";
import { webtraderPlatformContent } from "./webtraderPlatformContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { localizeHref } from "@/lib/locale/localizeHref";

export default async function WebtraderPlatform() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "webtrader-platform",
    locale,
    webtraderPlatformContent,
  );

  return (
    <section className={`py-[clamp(40px_,10vw_,60px)]! compact-section`}>
      <div className="ap_container_small">
        <h2 className={`mb-3! md:mb-5!`}>{t.heading}</h2>
        <p className="paragraph">{t.paragraph}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-15">
          <Link
            href={"https://mt5web.afterprime.io/terminal"}
            target="_blank"
            className={`${cardStyles.cardItem} ${cardStyles.cardMt4} flex-col! md:flex-row! items-start! md:items-center! justify-between! gap-6! min-h-[300px]! rounded-[var(--radius-lg)]! overflow-hidden! p-[clamp(28px,4vw,40px)]!`}
          >
            <div className="relative z-10 flex w-full flex-col gap-5 md:max-w-[55%]">
              <Image
                src="/img/mt5-icon.svg"
                alt=""
                width={43}
                height={40}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-3">
                <h3>{t.mt5.title}</h3>
                <p>{t.mt5.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[length:var(--font-size-note)] font-bold text-white">
                  {t.mt5.ctaLabel}
                </span>
                <CardArrow />
              </div>
            </div>
            <div
              className="pointer-events-none relative z-10 mx-auto md:absolute md:right-[-15%] md:bottom-0 md:mx-0"
              aria-hidden="true"
            >
              <Image
                src="/img/wt-mt5-4.png"
                alt=""
                width={220}
                height={161}
                className="h-[clamp(160px,22vw,260px)] w-auto object-contain"
              />
            </div>
          </Link>
          <Link
            href={localizeHref("/webtrader-mt4", locale)}
            target="_blank"
            className={`${cardStyles.cardItem} ${cardStyles.cardMt4} flex-col! md:flex-row! items-start! md:items-center! justify-between! gap-6! min-h-[300px]! rounded-[var(--radius-lg)]! overflow-hidden! p-[clamp(28px,4vw,40px)]!`}
          >
            <div className="relative z-10 flex w-full flex-col gap-5 md:max-w-[55%]">
              <Image
                src="/img/mt4-icon.svg"
                alt=""
                width={43}
                height={40}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-3">
                <h3>{t.mt4.title}</h3>
                <p>{t.mt4.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[length:var(--font-size-note)] font-bold text-white">
                  {t.mt4.ctaLabel}
                </span>
                <CardArrow />
              </div>
            </div>
            <div
              className="pointer-events-none relative z-10 mx-auto md:absolute md:right-[-15%] md:bottom-0 md:mx-0"
              aria-hidden="true"
            >
              <Image
                src="/img/wt-mt4.png"
                alt=""
                width={220}
                height={141}
                className="h-[clamp(160px,22vw,260px)] w-auto object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
