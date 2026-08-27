import Link from "next/link";
import { ArrowUpRight, Radio } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types/project";
import { Badge } from "./Badge";
import { ProjectVisual } from "./ProjectVisual";
import { T } from "@/components/providers/LanguageProvider";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-visual">
        <Link href={`/projects/${project.slug}`} aria-label={`View ${project.name}`}><ProjectVisual project={project} compact /></Link>
      </div>
      <div className="project-content">
        <p className="project-category"><T>{project.category}</T></p>
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
