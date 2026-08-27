import Link from "next/link";
import { ArrowUpRight, Github, Radio } from "lucide-react";
import type { Project } from "@/types/project";
import { Badge } from "./Badge";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} aria-label={`View ${project.name}`} className="project-visual-link">
        <ProjectVisual name={project.name} image={project.image} compact />
      </Link>
      <div className="project-content">
        <p className="project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-desc">{project.description}</p>
        {project.technologies.length > 0 && (
          <div className="badges">
            {project.technologies.map((technology) => (
              <Badge key={technology}>{technology}</Badge>
            ))}
          </div>
        )}
        <div className="project-actions">
          <Link href={`/projects/${project.slug}`} className="project-cta">
            View Project <ArrowUpRight size={16} />
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Radio size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
