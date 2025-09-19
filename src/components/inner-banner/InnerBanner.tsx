import styles from "./style.module.scss";

interface InnerBannerProps {
  children?: React.ReactNode;
  bannerImgUrl?: string;
}

export default function InnerBanner({
  bannerImgUrl,
  children,
}: InnerBannerProps) {
  return (
    <>
      <section
        className={`${styles.innerBannerSection}`}
        style={{ backgroundImage: `url(${bannerImgUrl})` }}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container flex items-center h-full">
          <div className={`apBannerContent`}>{children}</div>
        </div>
      </section>
    </>
  );
}
