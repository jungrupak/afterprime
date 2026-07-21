import "./globals.scss";
import { Blinker } from "next/font/google";
import Script from "next/script";
import VideoBackground from "@/components/VideoBackground";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="00t7hvmnqg2hu47jgje79ofbgdiowc" />
        <link rel="alternate" hrefLang="en" href="https://afterprime.com" />
        <link rel="alternate" hrefLang="es" href="https://es.afterprime.com" />
        <link rel="preconnect" href="https://motion.afterprime.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.afterprime.com" crossOrigin="" />
        <link rel="preconnect" href="https://form.typeform.com" crossOrigin="" />
        <link rel="preconnect" href="https://embed.typeform.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.typeform.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://form.typeform.com" />
        <link rel="dns-prefetch" href="https://embed.typeform.com" />
        <link rel="dns-prefetch" href="https://api.typeform.com" />
        <link rel="dns-prefetch" href="https://cdn.segment.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script src="https://cdn.weglot.com/weglot.min.js" strategy="beforeInteractive" />
        <Script id="weglot-init" strategy="beforeInteractive">
          {`Weglot.initialize({ api_key: "${process.env.NEXT_PUBLIC_WEGLOT_API_KEY}" });`}
        </Script>
        <script src="https://cdn.by.wonderpush.com/sdk/1.1/wonderpush-loader.min.js" async></script>
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
      </body>
    </html>
  );
}
