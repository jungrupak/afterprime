import Script from "next/script";

export default function SchemaData() {
  return (
    <Script
      type="application/ld+json"
      id="organization-schema"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Afterprime",
          url: "https://afterprime.com",
          logo: "https://cdn.afterprime.com/images/ap-logo-blk.svg",
          sameAs: [
            "https://www.facebook.com/afterprime.official/",
            "https://x.com/afterprime_com",
            "https://www.instagram.com/afterprime.official/?hl=en",
            "https://sc.linkedin.com/company/afterprime",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+61 02 9138 0640",
              contactType: "Customer Support",
              areaServed: "Global",
              availableLanguage: ["English"],
            },
          ],
        }),
      }}
    />
  );
}
