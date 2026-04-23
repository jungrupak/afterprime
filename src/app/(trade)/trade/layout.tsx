import Footer from "@/components/instrument-lps/footer/Footer";
import Header from "@/components/instrument-lps/header/Header";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactQueryProvider>
        {/* Head Scripts */}
        <HeadScripts />
        <AfterprimeOrgSchema />
        {/* Head Scripts Ends */}

        <Header />
        <main>{children}</main>
        <Footer />

        {/* Footer Scripts */}
        <FooterScripts />
        {/* Footer Scripts */}
      </ReactQueryProvider>
    </>
  );
}
