export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  displayMode?: "desktop" | "mobile";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  packageContents?: {
    title: string;
    description: string;
  }[];
  offer?: {
    title: string;
    description: string;
    ctaLabel?: string;
  };
  coverImage: string;
  gallery: ProjectImage[];
};

export type SocialKey = "github" | "instagram" | "tiktok" | "linkedin" | "youtube" | "facebook" | "website";
export type Social = { key: SocialKey; label: string; url: string };
export type Skill = { name: string; color: string; url: string; iconKey: string };
export type SkillGroup = { category: string; items: Skill[] };
export type NavigationItem = { label: string; href: string };
