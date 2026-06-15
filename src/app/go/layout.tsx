import "../globals.scss";
import { Blinker } from "next/font/google";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
  display: "swap",
});

export default function GoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${blinker.className} antialiased bg-[#0A0A0A]`}>
        {children}
      </body>
    </html>
  );
}
