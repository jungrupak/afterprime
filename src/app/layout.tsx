"use client";
import { useEffect } from "react";
import { Blinker } from "next/font/google";
import HeadScripts from "@/components/HeaderScripts";
import Header from "@/components/header/Header";
import BottomCards from "@/components/footer/bottom-cards/BottomCards";
import Footer from "@/components/footer/Footer";
import "./globals.scss";
import FooterScripts from "@/components/FooterScripts";

//HTML sanitization global
export function TypeformLoader() {
  useEffect(() => {
    if (!document.querySelector("#typeform-embed")) {
      const script = document.createElement("script");
      script.id = "typeform-embed";
      script.src = "//embed.typeform.com/next/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // nothing visible
}

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"], // choose the weights you need
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <DefaultSeo
          title="GET PAID TO @ Afterprime"
          description="#1 Lowest Costs—Verified.
Aligned A-Book+. Flow Rewards Built In."
          openGraph={{
            type: "website",
            locale: "en_US",
            url: "https://afterprime.com",
            site_name: "My Website",
          }}
        /> */}
        <HeadScripts />
      </head>

      <body className={`${blinker.className} antialiased`}>
        <TypeformLoader />
        {/* Fixed Vid Bg for entire website */}
        <div className="home_banner_video">
          <video
            playsInline
            className="mui-1eodtn4-video"
            controls={false}
            data-automation="VideoPlayer"
            height="100%"
            width="100%"
            style={{ height: "calc(100vh + 42vh)" }}
            loop
            muted
            autoPlay
            poster=""
            preload="auto"
            aria-label="video-player"
            controlsList="nodownload"
          >
            <source src="/low-res.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Fixed Vid Bg for entire website ends */}
        <Header />
        {children}
        <BottomCards />
        <Footer />

        {/* Footer Scripts */}
        <FooterScripts />
        {/* Footer Scripts */}
      </body>
    </html>
  );
}
