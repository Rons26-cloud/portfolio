import { Github, Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import type { Social } from "@/types/project";

const icons = { github: Github, instagram: Instagram, tiktok: Music2, linkedin: Linkedin, youtube: Youtube };

export function SocialButton({ social, showLabel = false }: { social: Social; showLabel?: boolean }) {
  if (!social.url) return null;
  const Icon = icons[social.key];
  return <a className="social-button" href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${social.label}`}><Icon size={19} aria-hidden="true" />{showLabel && <span>{social.label}</span>}</a>;
}
