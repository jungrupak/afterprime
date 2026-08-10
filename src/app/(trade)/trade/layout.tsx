import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { headerContent } from "@/components/header/headerContent";

export default async function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();
  const headerT = await getTranslatedStatic("header", locale, headerContent);

  return (
    <>
      <ReactQueryProvider>
        {/* Head Scripts */}
        <HeadScripts />
        <AfterprimeOrgSchema />
        {/* Head Scripts Ends */}

        <Header content={headerT} />
        <main>{children}</main>
        <Footer />

        {/* Footer Scripts */}
        <FooterScripts />
        {/* Footer Scripts */}
      </ReactQueryProvider>
    </>
  );
}
