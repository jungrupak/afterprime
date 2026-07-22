import Footer from "@/components/instrument-lps/footer/Footer";
import Header from "@/components/instrument-lps/header/Header";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";

export default async function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("instrument-header", locale, {
    applyNowText: "Apply Now",
  });

  return (
    <>
      <ReactQueryProvider>
        {/* Head Scripts */}
        <HeadScripts />
        <AfterprimeOrgSchema />
        {/* Head Scripts Ends */}

        <Header applyNowText={t.applyNowText} />
        <main>{children}</main>
        <Footer />

        {/* Footer Scripts */}
        <FooterScripts />
        {/* Footer Scripts */}
      </ReactQueryProvider>
    </>
  );
}
