import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";

export function Projects() { return <section id="projects" className="section"><Container><Reveal><SectionTitle eyebrow="01 / Selected work" title="Featured Projects" description="A selection of digital products, business platforms, and interactive experiences built around real ideas." /></Reveal><div className="project-grid">{projects.map((project, index) => <Reveal key={project.slug}><ProjectCard project={project} index={index} /></Reveal>)}</div></Container></section>; }
