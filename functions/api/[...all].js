export async function onRequest(context) {
  const API_HOST = "eu.i.posthog.com"; // Change to "eu.i.posthog.com" for the EU region
  const ASSET_HOST = "eu-assets.i.posthog.com"; // Change to "eu-assets.i.posthog.com" for the EU region

  const request = context.request;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;
  const pathWithParams = pathname + search;

  if (pathname.startsWith("/static/")) {
    return retrieveStatic(request, pathWithParams, context);
  } else {
    return forwardRequest(request, pathWithParams);
  }

  async function retrieveStatic(request, pathname, context) {
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      response = await fetch(`https://${ASSET_HOST}${pathname}`);
      context.waitUntil(cache.put(request, response.clone()));
    }

    return response;
  }

  async function forwardRequest(request, pathWithSearch) {
    const originRequest = new Request(request);
    originRequest.headers.delete("cookie");
    return await fetch(`https://${API_HOST}${pathWithSearch}`, originRequest);
  }
}
