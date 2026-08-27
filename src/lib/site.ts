const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

const configuredUrl = deploymentHost ?? "http://localhost:3000";
const parsedUrl = new URL(
  configuredUrl.startsWith("http://") || configuredUrl.startsWith("https://")
    ? configuredUrl
    : `https://${configuredUrl}`,
);

export const siteUrl = new URL(parsedUrl.origin);
export const isProductionSite =
  siteUrl.protocol === "https:" &&
  siteUrl.hostname !== "localhost" &&
  siteUrl.hostname !== "127.0.0.1";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
