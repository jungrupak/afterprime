import type { Metadata } from "next";
import { Blinker } from "next/font/google";
import Header from "@/components/header/Header";
import BottomCards from "@/components/footer/bottom-cards/BottomCards";
import Footer from "@/components/footer/Footer";
import "./globals.scss";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"], // choose the weights you need
});

export const metadata: Metadata = {
  title: "Afterprime",
  description: "Afterprime Marketing Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${blinker.className} antialiased`}>
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
      </body>
    </html>
  );
}
