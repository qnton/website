import { sameAsUrls } from "@/data/site";

export function personWebsiteJsonLd(origin: string, description: string) {
  const ogImageUrl = new URL("/og.png", `${origin}/`).href;
  const personId = `${origin}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Anton Werschinin",
        alternateName: ["qnton", "qnt.one"],
        url: `${origin}/`,
        image: ogImageUrl,
        email: "hello@qnt.one",
        sameAs: [...sameAsUrls],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: "qnt.one",
        description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };
}
