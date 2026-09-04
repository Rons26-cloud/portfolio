"use client";

import Link from "next/link";
import { ArrowUpRight, Radio } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types/project";
import { Badge } from "./Badge";
import { ProjectVisual } from "./ProjectVisual";
import { T } from "@/components/providers/LanguageProvider";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--card-rotate-x", `${(0.5 - y) * 7}deg`);
    card.style.setProperty("--card-rotate-y", `${(x - 0.5) * 9}deg`);
    card.style.setProperty("--card-light-x", `${x * 100}%`);
    card.style.setProperty("--card-light-y", `${y * 100}%`);
  };

  const resetPerspective = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
  };

  return (
    <article className="project-card project-card-3d" onPointerMove={handlePointerMove} onPointerLeave={resetPerspective}>
      <div className="project-card-shine" aria-hidden="true" />
      <div className="project-card-visual">
        <Link href={`/projects/${project.slug}`} aria-label={`View ${project.name}`}><ProjectVisual project={project} compact /></Link>
      </div>
      <div className="project-content">
        <div className="project-card-meta"><span>{String(index + 1).padStart(2, "0")}</span><p className="project-category"><T>{project.category}</T></p></div>
        <h3>{project.name}</h3>
        <p className="project-description"><T>{project.description}</T></p>
        {project.technologies.length > 0 && <div className="badges">{project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}</div>}
        <div className="project-actions">
          <Link href={`/projects/${project.slug}`}><T>View Project</T> <ArrowUpRight size={16} /></Link>
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><SiGithub size={16} aria-hidden="true" /> GitHub</a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Radio size={16} /> <T>Live Demo</T></a>}
        </div>
      </div>
    </article>
  );
}
