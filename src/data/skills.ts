import type { SkillGroup } from "@/types/project";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiFlutter,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", url: "https://react.dev/" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", url: "https://nextjs.org/" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", url: "https://www.typescriptlang.org/" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com/" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", url: "https://nodejs.org/" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", url: "https://supabase.com/" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", url: "https://www.postgresql.org/" },
    ],
  },
  {
    category: "Mobile",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B", url: "https://flutter.dev/" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", url: "https://git-scm.com/" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff", url: "https://github.com/" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC", url: "https://code.visualstudio.com/" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E", url: "https://www.figma.com/" },
    ],
  },
];
