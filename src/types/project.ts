export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  features: string[];
  screenshots: string[];
};

export type SocialKey = "github" | "instagram" | "tiktok" | "linkedin" | "youtube";
export type Social = { key: SocialKey; label: string; url: string };
export type Skill = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
  url: string;
};

export type SkillGroup = { category: string; skills: Skill[] };
export type NavigationItem = { label: string; href: string };
