import { Analytics } from "@vercel/analytics/next";
import TypeformLoader from "@/utils/TypeFormLoader";
import { Blinker } from "next/font/google";
import Header from "@/components/header/Header";
import BottomCards from "@/components/footer/bottom-cards/BottomCards";
import Footer from "@/components/footer/Footer";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://afterprime.com"),
  title: "Afterprime – Get Paid to Trade",
  description:
    "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",
  keywords:
    "Get Paid to Trade, Forex broker with lowest costs, A-Book forex broker",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Afterprime – Get Paid to Trade",
    description:
      "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",
    url: "https://afterprime.com",
    siteName: "Afterprime",
    images: [
      {
        url: "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
        width: 1200,
        height: 630,
        alt: "Afterprime",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afterprime – Trade Smarter",
    description:
      "Afterprime offers multi-asset trading with institutional-grade pricing and execution.",
    images: ["https://cdn.afterprime.com/images/og_image_afterprime.jpg"],
  },
  alternates: {
    canonical: "https://afterprime.com",
  },
};

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
      <body className={`${blinker.className} antialiased`}>
        {/* Head Scripts */}
        <HeadScripts />
        {/* Head Scripts Ends */}

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
        <Analytics />

        {/* Footer Scripts */}
        <FooterScripts />
        {/* Footer Scripts */}
      </body>
    </html>
  );
}
