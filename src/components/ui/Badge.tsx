import type { CSSProperties } from "react";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { getTechnology } from "@/data/technologies";

export function Badge({ children }: { children: React.ReactNode }) {
  const name = typeof children === "string" ? children : "";
  const tech = getTechnology(name);
  if (!tech) return <span className="badge"><span>{children}</span></span>;
  return <a className="badge technology-chip" href={tech.url} target="_blank" rel="noopener noreferrer" style={{ "--tech-color": tech.color } as CSSProperties} aria-label={`${tech.name} official website`}><SkillIcon iconKey={tech.iconKey} size={16} fallback /><span>{tech.name}</span></a>;
}
