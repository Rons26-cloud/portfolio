import type { Social } from "@/types/project";

export const socials: Social[] = [
  { key: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@xyrons" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/xyrons" },
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/xyrons" },
  { key: "github", label: "GitHub", url: "https://github.com/Rons26-cloud" },
  { key: "youtube", label: "YouTube", url: "" },
  { key: "linkedin", label: "LinkedIn", url: "" },
];

export const availableSocials = socials.filter((social) => Boolean(social.url));
