import TypeformLoader from "@/utils/TypeFormLoader";
import Header from "@/components/instrument-lps/header/Header";
//import BottomCards from "@/components/footer/bottom-cards/BottomCards";
import Footer from "@/components/footer/Footer";

import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";
import ReactQueryProvider from "../providers/ReactQueryProvider";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ReactQueryProvider>
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
      </ReactQueryProvider>
    </>
  );
}
