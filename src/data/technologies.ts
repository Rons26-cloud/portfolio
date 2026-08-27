export type TechnologyMeta = {
  name: string;
  iconKey: string;
  color: string;
  url: string;
};

export const technologyCatalog: Record<string, TechnologyMeta> = {
  React: { name: "React", iconKey: "react", color: "#61DAFB", url: "https://react.dev/" },
  "Next.js": { name: "Next.js", iconKey: "nextjs", color: "#FFFFFF", url: "https://nextjs.org/" },
  TypeScript: { name: "TypeScript", iconKey: "typescript", color: "#3178C6", url: "https://www.typescriptlang.org/" },
  JavaScript: { name: "JavaScript", iconKey: "javascript", color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  "Tailwind CSS": { name: "Tailwind CSS", iconKey: "tailwind css", color: "#06B6D4", url: "https://tailwindcss.com/" },
  "Node.js": { name: "Node.js", iconKey: "node.js", color: "#339933", url: "https://nodejs.org/" },
  Supabase: { name: "Supabase", iconKey: "supabase", color: "#3ECF8E", url: "https://supabase.com/" },
  PostgreSQL: { name: "PostgreSQL", iconKey: "postgresql", color: "#4169E1", url: "https://www.postgresql.org/" },
  Flutter: { name: "Flutter", iconKey: "flutter", color: "#02569B", url: "https://flutter.dev/" },
  Unity: { name: "Unity", iconKey: "unity", color: "#FFFFFF", url: "https://unity.com/" },
  "C#": { name: "C#", iconKey: "c#", color: "#512BD4", url: "https://learn.microsoft.com/dotnet/csharp/" },
  Git: { name: "Git", iconKey: "git", color: "#F05032", url: "https://git-scm.com/" },
  GitHub: { name: "GitHub", iconKey: "github", color: "#FFFFFF", url: "https://github.com/" },
  Figma: { name: "Figma", iconKey: "figma", color: "#F24E1E", url: "https://figma.com/" },
};

export function getTechnology(name: string): TechnologyMeta | undefined {
  return technologyCatalog[name] ?? technologyCatalog[Object.keys(technologyCatalog).find((key) => key.toLowerCase() === name.toLowerCase()) ?? ""];
}
