import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../Page.module.scss";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { localizeHref } from "@/lib/locale/localizeHref";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import { learnGuides } from "../learnGuides";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return learnGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageSlug): Promise<Metadata> {
  const { slug } = await params;
  const guide = learnGuides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDescription,
  };
}

export default async function Page({ params }: PageSlug) {
  const { slug } = await params;
  const guide = learnGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const locale = await getRequestLocale();

  const t = await getTranslatedStatic(`learn-guide-${guide.slug}`, locale, {
    title: guide.title,
    teaser: guide.teaser,
    comingSoon:
      "This guide is coming soon. In the meantime, browse the Learn hub for other guides.",
    backToHub: "Back to Learn hub",
  });

  return (
    <main>
      <section className={`${styles.innerBannerSection} h-auto! innerpage-banner`}>
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent text-center">
            <h1 className="font-size-heading-xl mt-13 md:mt-18 font-semibold">
              {t.title}
            </h1>
            <div className="reading-text-lg mt-5 md:mt-10 font-light">
              {t.teaser}
            </div>
          </div>
        </div>
      </section>

      <section className="compact-section">
        <div className="ap_container_small text-center">
          <p className="reading-text-lg font-light">{t.comingSoon}</p>
          <a
            href={localizeHref("/learn", locale)}
            className="reading-text-lg font-light hover:underline"
          >
            {t.backToHub}
          </a>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Learn", href: "/learn" },
          { name: guide.title, href: `/learn/${guide.slug}` },
        ]}
      />
    </main>
  );
}
