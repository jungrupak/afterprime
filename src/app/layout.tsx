import "./globals.scss";
import { Blinker } from "next/font/google";
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
      <body className={`${blinker.className} antialiased`}>
        <VideoBackground />
        {children}
      </body>
    </html>
  );
}
