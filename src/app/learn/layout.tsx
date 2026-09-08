import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import FooterScripts from "@/components/FooterScripts";
import HeadScripts from "@/components/HeaderScripts";
import AfterprimeOrgSchema from "@/lib/schema/orgSchema";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { headerContent } from "@/components/header/headerContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

export default async function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const headerT = await getTranslatedStatic("header", locale, headerContent);

  return (
    <>
      <ReactQueryProvider>
        <HeadScripts />
        <AfterprimeOrgSchema />
        <Header content={headerT} />
        {children}
        <Footer />
        <FooterScripts />
      </ReactQueryProvider>
    </>
  );
}
