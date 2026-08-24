import styles from "./InnerBannerGeneric.module.scss";

interface BannerContent {
  heading: string;
  paragraph: string;
}
interface DataObject {
  content: BannerContent;
}

export default function InnerBannerGeneric({ content }: DataObject) {
  if (!content) return null;
  return (
    <section
      className={`${styles.innerBannerSection} h-auto! compact-innerpage-banner`}
    >
      <div className="ap_container_small h-full">
        <div className="apBannerContent text-center">
          <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold">
            {content.heading ?? "No Heading Provided"}
          </h1>
          <div
            className="reading-text-lg mt-5 md:mt-10 font-light"
            style={{ fontWeight: "300" }}
          >
            {content.paragraph ?? "No Banner Paragraph provided"}
          </div>
        </div>
      </div>
    </section>
  );
}
