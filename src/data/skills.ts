import type { SkillGroup } from "@/types/project";

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", color: "#61DAFB", iconKey: "react", url: "https://react.dev/" },
      { name: "Next.js", color: "#FFFFFF", iconKey: "nextjs", url: "https://nextjs.org/" },
      { name: "TypeScript", color: "#3178C6", iconKey: "typescript", url: "https://www.typescriptlang.org/" },
      { name: "JavaScript", color: "#F7DF1E", iconKey: "javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Tailwind CSS", color: "#06B6D4", iconKey: "tailwind", url: "https://tailwindcss.com/" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", color: "#339933", iconKey: "nodejs", url: "https://nodejs.org/" },
      { name: "Supabase", color: "#3ECF8E", iconKey: "supabase", url: "https://supabase.com/" },
      { name: "PostgreSQL", color: "#4169E1", iconKey: "postgresql", url: "https://www.postgresql.org/" },
    ],
  },
  {
    category: "Mobile",
    items: [{ name: "Flutter", color: "#02569B", iconKey: "flutter", url: "https://flutter.dev/" }],
  },
  {
    category: "Game Development",
    items: [
      { name: "Unity", color: "#D9DEE3", iconKey: "unity", url: "https://unity.com/" },
      { name: "C#", color: "#512BD4", iconKey: "csharp", url: "https://learn.microsoft.com/dotnet/csharp/" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", color: "#F05032", iconKey: "git", url: "https://git-scm.com/" },
      { name: "GitHub", color: "#FFFFFF", iconKey: "github", url: "https://github.com/" },
      { name: "VS Code", color: "#007ACC", iconKey: "vscode", url: "https://code.visualstudio.com/" },
      { name: "Figma", color: "#F24E1E", iconKey: "figma", url: "https://www.figma.com/" },
    ],
  },
];
