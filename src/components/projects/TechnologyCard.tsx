import type { CSSProperties } from "react";
import { SkillIcon } from "@/components/ui/SkillIcon";
import type { TechnologyMeta } from "@/data/technologies";

export function TechnologyCard({ tech }: { tech: TechnologyMeta }) {
  return (
    <a
      className="tech-card"
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tech.name} (opens external website)`}
      style={{ "--tech-color": tech.color } as CSSProperties}
    >
      <span className="tech-icon" style={{ color: tech.color }}>
        <SkillIcon iconKey={tech.iconKey} size={22} fallback />
      </span>
      <span className="tech-name">{tech.name}</span>
      <span className="tech-arrow" aria-hidden="true">↗</span>
    </a>
  );
}
