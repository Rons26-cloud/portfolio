import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.brand} Portfolio`,
    short_name: profile.brand,
    description: profile.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070a10",
    theme_color: "#070a10",
    icons: [{ src: "/icon.png", sizes: "1254x1254", type: "image/png" }],
  };
}
