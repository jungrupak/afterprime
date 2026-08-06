import Image from "next/image";
import Link from "next/link";
import cardStyles from "../platform-cards-section-static/PlatformCards.module.scss";
import { CardArrow } from "../platform-cards-section-static/PlatformCards";

export default function WebtraderPlatform() {
  return (
    <section className={`py-[clamp(40px_,10vw_,60px)]! compact-section`}>
      <div className="ap_container_small">
        <h2 className={`mb-3! md:mb-5!`}>WebTrader Platform</h2>
        <p className="paragraph">Get Access your Platform via Web Browsers.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-15">
          <Link
            href="/webtrader-mt5"
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
                <h3>MT5 WebTrader</h3>
                <p>Access your MetaTrader 5 account from your web browser.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-white">
                  MT5 Login
                </span>
                <CardArrow />
              </div>
            </div>
            <div
              className="pointer-events-none relative z-10 mx-auto md:absolute md:right-[-15%] md:bottom-0 md:mx-0"
              aria-hidden="true"
            >
              <Image
                src="/img/wt-mt5-3.png"
                alt=""
                width={220}
                height={161}
                className="h-[clamp(160px,22vw,260px)] w-auto object-contain"
              />
            </div>
          </Link>
          <Link
            href="/webtrader-mt4"
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
                <h3>MT4 WebTrader</h3>
                <p>
                  Access your MetaTrader 4 live account from your web browser.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-white">
                  MT4 Login
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
