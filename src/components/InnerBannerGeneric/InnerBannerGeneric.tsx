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
      <div className="ap_container_small flex items-center h-full">
        <div className="apBannerContent">
          <h1 className="h1-size mt-10 lg:mt-15 md:max-w-[800px]">
            <span className="font-[600]">
              {content.heading ?? "No Heading Provided"}
            </span>
          </h1>
          <div
            className="paragraph max-lg:mx-auto lg:mt-8 opacity-80"
            style={{ fontWeight: "300" }}
          >
            {content.paragraph ?? "No Banner Paragraph provided"}
          </div>
        </div>
      </div>
    </section>
  );
}
