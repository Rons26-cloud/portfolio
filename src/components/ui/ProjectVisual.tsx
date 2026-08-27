import Image from "next/image";
import { T } from "@/components/providers/LanguageProvider";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const mode = project.displayMode ?? "desktop";

  if (!project.image) {
    return (
      <div className={`project-visual placeholder ${compact ? "compact" : ""}`} role="img" aria-label={`${project.name} project placeholder`}>
        <div className="placeholder-glow" />
        <span className="placeholder-name">{project.name}</span>
        <span className="placeholder-hint"><T>Visual coming soon</T></span>
      </div>
    );
  }

  if (mode === "mobile") {
    return (
      <div className="project-visual mobile-preview" role="img" aria-label={`${project.name} mobile app preview`}>
        <div className="mobile-shell">
          <div className="mobile-notch" />
          <Image
            src={project.image}
            alt={`${project.name} mobile app screenshot`}
            width={420}
            height={860}
            sizes="(max-width:768px) 70vw, 340px"
            className="mobile-screen"
            priority={!compact}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`project-visual desktop-preview ${compact ? "compact" : ""}`} role="img" aria-label={`${project.name} project screenshot`}>
      <Image
        src={project.image}
        alt={`${project.name} project screenshot`}
        width={815}
        height={802}
        sizes="(max-width:768px) 100vw, (max-width:1100px) 50vw, 560px"
        className="desktop-screen"
      />
      <span className="desktop-screen-label"><ArrowUpRight size={14} />Preview</span>
    </div>
  );
}
