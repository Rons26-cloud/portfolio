import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiFlutter,
  SiGit,
  SiGithub,
  SiUnity,
  SiPython,
  SiHtml5,
  SiCss,
  SiVite,
} from "react-icons/si";
import { TbBrandVscode, TbBrandCSharp } from "react-icons/tb";
import { FigmaIcon } from "@/components/ui/FigmaIcon";

function PhaserMark({ size = 22, className = "" }: { size?: string | number; className?: string }) {
  const fontSize = typeof size === "number" ? Math.max(10, size * 0.55) : "0.7em";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid currentColor",
        borderRadius: "5px",
        fontSize,
        fontWeight: 800,
        lineHeight: 1,
      }}
    >
      P
    </span>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: string | number; className?: string }>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  java: SiOpenjdk,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  nodejs: SiNodedotjs,
  "node.js": SiNodedotjs,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  flutter: SiFlutter,
  unity: SiUnity,
  csharp: TbBrandCSharp,
  "c#": TbBrandCSharp,
  "c sharp": TbBrandCSharp,
  git: SiGit,
  github: SiGithub,
  vscode: TbBrandVscode,
  "vs code": TbBrandVscode,
  figma: FigmaIcon,
  phaser: PhaserMark,
  python: SiPython,
  html: SiHtml5,
  "html5": SiHtml5,
  css: SiCss,
  "css3": SiCss,
  vite: SiVite,
};

export function SkillIcon({ iconKey, size = 22, className = "", fallback = false }: { iconKey: string; size?: string | number; className?: string; fallback?: boolean }) {
  const Icon = iconMap[iconKey.toLowerCase()];
  if (!Icon) return fallback ? null : <SiReact size={size} className={className} />;
  return <Icon size={size} className={className} />;
}
