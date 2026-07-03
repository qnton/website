import type { APIRoute } from "astro";
import { personWebsiteJsonLd } from "@/data/jsonLd";
import { homeDescription } from "@/data/site";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = new URL(site ?? "https://qnt.one/").origin;
  const body = JSON.stringify(personWebsiteJsonLd(origin, homeDescription));
  return new Response(body, {
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
