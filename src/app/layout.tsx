import "./globals.scss";
import { Blinker } from "next/font/google";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"], // choose the weights you need
});

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
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
            <source
              src="https://cfcdn.afterprime.com/low-res.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* Fixed Vid Bg for entire website ends */}
        {children}
      </body>
    </html>
  );
}
