import type { Metadata } from "next";
import { Blinker } from "next/font/google";
import Header from "../components/header/Header";
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
        <Header />
        {children}
      </body>
    </html>
  );
}
