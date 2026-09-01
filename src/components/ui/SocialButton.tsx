import type { CSSProperties } from "react";
import { SiTiktok, SiInstagram, SiFacebook, SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { Globe2 } from "lucide-react";
import type { Social } from "@/types/project";
import { profile } from "@/data/profile";

const icons = {
  tiktok: SiTiktok,
  instagram: SiInstagram,
  facebook: SiFacebook,
  github: SiGithub,
  linkedin: FaLinkedinIn,
  website: Globe2,
} as const;

const brandColors = {
  tiktok: "#25F4EE",
  instagram: "#DD2A7B",
  facebook: "#1877F2",
  github: "#FFFFFF",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
  website: "#8BA8FF",
} as const;

export function SocialButton({ social, showLabel = false }: { social: Social; showLabel?: boolean }) {
  if (!social.url) return null;
  const Icon = icons[social.key as keyof typeof icons];
  if (!Icon && social.key !== "youtube") return null;
  return (
    <a
      className={`social-button social-${social.key}`}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${profile.brand} on ${social.label}`}
      title={social.label}
      style={{ "--social-color": brandColors[social.key as keyof typeof brandColors] } as CSSProperties}
    >
      <span className="social-button-icon">
        {social.key === "website" ? <span className="xyronhub-mark" aria-hidden="true" /> : social.key === "tiktok" ? <span className="tiktok-mark" aria-hidden="true"><SiTiktok className="tiktok-cyan" size={20} /><SiTiktok className="tiktok-pink" size={20} /><SiTiktok className="tiktok-white" size={20} /></span> : social.key === "youtube" ? <span className="youtube-mark" aria-hidden="true"><i /></span> : Icon ? <Icon size={20} aria-hidden="true" /> : null}
      </span>
      {showLabel && <span className="social-label">{social.label}</span>}
    </a>
  );
}
