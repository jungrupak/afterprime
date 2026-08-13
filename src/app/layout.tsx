import "./globals.scss";
import { Blinker } from "next/font/google";
import Script from "next/script";
import VideoBackground from "@/components/VideoBackground";
import ExitIntentModal from "@/components/ExitIntentModal/ExitIntentModal";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getHtmlAttrs } from "@/config/locales";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
  display: "swap",
});

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0c0c0d",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();
  const { lang, dir } = getHtmlAttrs(locale);

  return (
    <html lang={lang} dir={dir}>
      <head>
        <meta
          name="facebook-domain-verification"
          content="00t7hvmnqg2hu47jgje79ofbgdiowc"
        />
        <link
          rel="preconnect"
          href="https://motion.afterprime.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://cdn.afterprime.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://cdn.segment.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          src="https://cdn.by.wonderpush.com/sdk/1.1/wonderpush-loader.min.js"
          async
        ></script>

        {/* Typeform Stuff */}
        <link rel="preconnect" href="https://embed.typeform.com" />
        <link rel="preconnect" href="https://form.typeform.com" />
        <Script
          id="typeform-embed"
          src="https://embed.typeform.com/next/embed.js"
          strategy="lazyOnload"
        />
        {/* Ends */}

        <Script id="wonderpush-init" strategy="afterInteractive">
          {`window.WonderPush = window.WonderPush || [];
        WonderPush.push(["init", {
        webKey: "9552eec3af81d433db923f72e6959b9cdd8021e508daf2a7dbb31bf3755702a7",
        }]);`}
        </Script>
      </head>
      <body className={`${blinker.className} antialiased`}>
        <VideoBackground />
        {children}
        <ExitIntentModal />
      </body>
    </html>
  );
}
