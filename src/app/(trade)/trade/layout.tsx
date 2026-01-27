import Footer from "@/components/instrument-lps/footer/Footer";
import Header from "@/components/instrument-lps/header/Header";

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* Fixed Vid Bg for entire website */}
      <div
        className="home_banner_video"
        style={{ height: "100vh", overflow: "hidden" }}
      >
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
          <source src="/low-res.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Fixed Vid Bg for entire website ends */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
