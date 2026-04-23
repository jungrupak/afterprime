import TypeformLoader from "@/utils/TypeFormLoader";
import Header from "@/components/header/Header";
//import BottomCards from "@/components/footer/bottom-cards/BottomCards";
import Footer from "@/components/footer/Footer";
import { Metadata } from "next";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://afterprime.com"),
  title: "Afterprime – Get Paid to Trade",
  description:
    "Lowest costs, transparent execution, shared rewards. Value you won't find anywhere else.",
  keywords:
    "Get Paid to Trade, Forex broker with lowest costs, A-Book forex broker",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
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

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link
          rel="preconnect"
          href="https://motion.afterprime.com"
          crossOrigin=""
        />
      </head>
      {/* Head Scripts */}
      <HeadScripts />
      <AfterprimeOrgSchema />
      {/* Head Scripts Ends */}
      <TypeformLoader />
      <Header />
      {children}
      {/* <BottomCards /> */}
      <Footer />
      {/* Footer Scripts */}
      <FooterScripts />
      {/* Footer Scripts */}
    </>
  );
}
