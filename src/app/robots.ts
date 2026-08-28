import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionSite, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProductionSite ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl.origin,
  };
}
