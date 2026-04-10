import TypeformLoader from "@/utils/TypeFormLoader";
import Header from "@/components/header/Header";
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
              src="https://motion.afterprime.com/web/low-res.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* Fixed Vid Bg for entire website ends */}
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
