import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
      <div className="ap_container_small">
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
            © Copyright 2018-2026 Afterprime Ltd | Global Gateway 8, Rue de la Perle, Providence, Mahé, Seychelles.
          </p>
        </div>
      </div>
    </section>
  );
}
