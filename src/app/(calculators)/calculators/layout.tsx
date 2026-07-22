import TypeformLoader from "@/utils/TypeFormLoader";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Metadata } from "next";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { headerContent } from "@/components/header/headerContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

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
        url: "/img/og-images/default-og-afterprime-home.jpg",
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
    images: ["/img/og-images/default-og-afterprime-home.jpg"],
  },
  alternates: {
    canonical: "https://afterprime.com",
  },
};

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const headerT = await getTranslatedStatic("header", locale, headerContent);

  return (
    <main className={`compact-section-ui`}>
      <ReactQueryProvider>
        {/* Head Scripts */}
        <HeadScripts />
        <AfterprimeOrgSchema />
        {/* Head Scripts Ends */}
        <TypeformLoader />
        <Header content={headerT} />
        {children}
        <Footer />
        {/* Footer Scripts */}
        <FooterScripts />
        {/* Footer Scripts */}
      </ReactQueryProvider>
    </main>
  );
}
