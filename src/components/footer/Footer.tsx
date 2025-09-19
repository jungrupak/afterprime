import styles from "./style.module.scss";
import Link from "next/link";

export default function Footer() {
  const socialItems = [
    {
      imgFileName: "discord.svg",
      link: "#",
    },
    {
      imgFileName: "fb.svg",
      link: "#",
    },
    {
      imgFileName: "tw.svg",
      link: "#",
    },
    {
      imgFileName: "insta.svg",
      link: "#",
    },
    {
      imgFileName: "in.svg",
      link: "#",
    },
  ];

  return (
    <section className={`${styles.footer_section}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-12 sm:gap-6`}
        >
          <div className="col-span-full sm:col-auto">
            <Link href="/" className="block mb-6">
              <img src="/img/logo-text.svg" alt="" />
            </Link>
            <div className="flex gap-3 mb-6">
              {socialItems.map((item, index) => (
                <Link key={index} href={item.link} className="mb-4">
                  <img src={`/img/${item.imgFileName}`} alt="" />
                </Link>
              ))}
            </div>
            <Link href="#" className="flex gap-2 items-center font-[600] mb-12">
              <img src="/img/yt.png" alt="" />
              Checkout our Youtube Chanel
            </Link>
            <div className="flex gap-3">
              <Link href="#" className="block">
                <img src="/img/app-download-ios.png" alt="" />
              </Link>
              <Link href="#" className="block">
                <img src="/img/app-download-android.png" alt="" />
              </Link>
            </div>
          </div>
          <div className={`${styles.footer_links}`}>
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link href="#">Start Trading Now</Link>
              </li>
              <li>
                <Link href="#">How to Open an Account</Link>
              </li>
              <li>
                <Link href="#">How to Verify Identity</Link>
              </li>
              <li>
                <Link href="#">How to Deposit</Link>
              </li>
              <li>
                <Link href="#">How to Withdraw</Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links}`}>
            <h2>Markets</h2>
            <ul>
              <li>
                <Link href="#">Live Spreads</Link>
              </li>
              <li>
                <Link href="#">Forex</Link>
              </li>
              <li>
                <Link href="#">Crypto</Link>
              </li>
              <li>
                <Link href="#">Indices</Link>
              </li>
              <li>
                <Link href="#">Commodities</Link>
              </li>
              <li>
                <Link href="#">Stocks</Link>
              </li>
              <li>
                <Link href="#">Bonds</Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links}`}>
            <h2>Platforms & Tools</h2>
            <ul>
              <li>
                <Link href="#">TradingView</Link>
              </li>
              <li>
                <Link href="#">MT4</Link>
              </li>
              <li>
                <Link href="#">Webtrader</Link>
              </li>
              <li>
                <Link href="#">TraderEvolution</Link>
              </li>
              <li>
                <Link href="#">FIX API</Link>
              </li>
              <li>
                <Link href="#">MAM/PAMM</Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footer_links}`}>
            <h2>Afterprime</h2>
            <ul>
              <li>
                <Link href="#">Who We Are</Link>
              </li>
              <li>
                <Link href="#">Regulation & Licensing</Link>
              </li>
              <li>
                <Link href="#">Legal Documents</Link>
              </li>
              <li>
                <Link href="#">Knowledgebase</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">GDPR Policy</Link>
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
            © Copyright 2022-2022 Afterprime Pty Ltd | Global Gateway 8, Rue de
            la Perle, Providence, Mahé, Seychelles.
          </p>
        </div>
      </div>
    </section>
  );
}
