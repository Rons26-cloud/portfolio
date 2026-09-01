import type { Social } from "@/types/project";

export const socials: Social[] = [
  { key: "website", label: "XyronHub", url: "https://www.xyronhub.xyz/" },
  { key: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@xyrons_" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/xyrons__" },
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/share/1DPccAoHFX/?mibextid=wwXIfr" },
  { key: "github", label: "GitHub", url: "https://github.com/Rons26-cloud" },
  { key: "youtube", label: "YouTube", url: "" },
  { key: "linkedin", label: "LinkedIn", url: "" },
];

export const availableSocials = socials.filter((social) => Boolean(social.url));
