import type { Social } from "@/types/project";

export const socials: Social[] = [
  { key: "github", label: "GitHub", url: "" },
  { key: "instagram", label: "Instagram", url: "" },
  { key: "tiktok", label: "TikTok", url: "" },
  { key: "linkedin", label: "LinkedIn", url: "" },
  { key: "youtube", label: "YouTube", url: "" },
];

export const availableSocials = socials.filter((social) => Boolean(social.url));
