import type { APIRoute } from "astro";
import { homeDescription, sameAsUrls } from "@/data/site";

export const prerender = true;

function personWebsiteJsonLd(origin: string, description: string) {
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

export const GET: APIRoute = ({ site }) => {
  const origin = new URL(site ?? "https://qnt.one/").origin;
  const body = JSON.stringify(
    personWebsiteJsonLd(origin, homeDescription),
  );
  return new Response(body, {
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
