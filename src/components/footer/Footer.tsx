import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <section className={`${styles.footer_section}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div
          className={`flex flex-wrap md:grid md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10 md:gap-12 sm:gap-6`}
        >
          <div className="col-span-full sm:col-auto order-1">
            <Link href="/" className="block mb-6">
              <Image src="/img/logo-text.svg" alt="" width={160} height={29} />
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
                    alt=""
                    width={29}
                    height={29}
                  />
                </Link>
              ))}
            </div>
            <Link
              href="https://www.youtube.com/@afterprime"
              target="_blank"
              className="flex gap-2 items-center font-[600] mb-12"
            >
              <Image width={34} height={34} src="/img/yt.png" alt="" />
              Checkout our Youtube Channel
            </Link>
            <div className="flex gap-3">
              <Link
                href="https://apps.apple.com/us/app/afterprime/id1672935764"
                target="_blank"
                className="block"
              >
                <Image
                  width={112}
                  height={38}
                  src="/img/app-download-ios.png"
                  alt=""
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.traderevolution.afterprime"
                target="_blank"
                className="block"
              >
                <Image
                  width={112}
                  height={38}
                  src="/img/app-download-android.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className={`${styles.footer_links} order-2`}>
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link href="/get-paid-to-trade">Get Paid To Trade</Link>
              </li>
              <li>
                <Link href="/lowest-cost-verified">Lowest Cost Verified</Link>
              </li>
              <li>
                <Link href="/aligned-execution">Aligned Execution</Link>
              </li>
              <li>
                <Link href="/deposit-withdrawal">Deposit and Withdrawal</Link>
              </li>
              <li>
                <Link href="/how-to-qualify">How to Qualify</Link>
              </li>
              <li>
                <Link href="/trade-execution">Trade Execution</Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links} order-3`}>
            <h2>Markets</h2>
            <ul>
              <li>
                <Link href="/live-spreads">Live Spreads</Link>
              </li>
              <li>
                <Link href="/forex">Forex</Link>
              </li>
              <li>
                <Link href="/crypto">Crypto</Link>
              </li>
              <li>
                <Link href="/indices">Indices</Link>
              </li>
              <li>
                <Link href="/commodities">Commodities</Link>
              </li>
              {/* <li>
                <Link href="/stocks">Stocks</Link>
              </li> */}
            </ul>
          </div>
          <div className={`${styles.footer_links} order-4`}>
            <h2>Platforms & Tools</h2>
            <ul>
              <li>
                <Link href="/mt4">MT4</Link>
              </li>
              <li>
                <Link href="/mt5">MT5</Link>
              </li>
              <li>
                <Link href="/webtrader">Webtrader</Link>
              </li>
              <li>
                <Link href="/traderevolution">TraderEvolution</Link>
              </li>
              <li>
                <Link href="/fix-api">FIX API</Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links} order-5`}>
            <h2>Afterprime</h2>
            <ul>
              <li>
                <Link href="/our-story">Our Story</Link>
              </li>
              <li>
                <Link href="/why-we-exist">Why We Exist</Link>
              </li>
              <li>
                <Link href="/legal-documents">Legal Documents</Link>
              </li>
              <li>
                <Link href="/license-and-regulations">
                  License and Regulation
                </Link>
              </li>
              <li>
                <Link href="/kyc-aml">KYC & AML/CTF</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-15 max-md:my-8 border-t border-[rgba(255,255,255,0.14)]"></div>
        <div className={`${styles.footer_texts}`}>
          <h3>Customer Notice</h3>
          <p>
            Trading derivatives is high risk. Losses can exceed your initial
            investment. You should only trade with money you can afford to lose.
            Any Information or advice contained on this website is general in
            nature and has been prepared without taking into account your
            objectives, financial situation or needs. Past performance of any
            product described on this website is not a reliable indication of
            future performance. You should consider whether you’re part of our
            target market by reviewing our Target Market Determination, and read
            our PDS and other legal documents to ensure you fully understand the
            risks before you make any trading decisions.
          </p>
          <p>
            The information on this website is not intended to be an inducement,
            offer or solicitation to any person in any country or jurisdiction
            where such distribution or use would be contrary to local law or
            regulation.
          </p>
          <p>
            © Copyright {currentYear} Afterprime Pty Ltd | Global Gateway 8, Rue
            de la Perle, Providence, Mahé, Seychelles.
          </p>
        </div>
      </div>
    </section>
  );
}
