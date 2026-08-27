import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, Radio } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const project = getProject((await params).slug); if (!project) return {}; return { title: project.name, description: project.description, alternates: profile.siteUrl ? { canonical: `/projects/${project.slug}` } : undefined, openGraph: { title: `${project.name} — ${profile.brand}`, description: project.description } }; }

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug); if (!project) notFound();
  const index = projects.findIndex(({ slug }) => slug === project.slug); const previous = projects[index - 1]; const next = projects[index + 1];
  return <><Navbar /><main className="project-page"><Container><Link className="back-link" href="/#projects"><ArrowLeft size={17} /> Back to Projects</Link><div className="detail-heading"><p>{project.category}</p><h1>{project.name}</h1><span>{project.description}</span></div><ProjectVisual name={project.name} image={project.image} />
    <div className="detail-grid"><article className="detail-story"><section><p className="detail-label">The challenge</p><h2>Problem</h2><p>{project.problem}</p></section><section><p className="detail-label">The approach</p><h2>Solution</h2><p>{project.solution}</p></section><section><p className="detail-label">What it does</p><h2>Key Features</h2><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section></article>
      <aside><div className="detail-sidebar"><p className="detail-label">Technology</p>{project.technologies.length ? <div className="badges">{project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}</div> : <p className="muted">Technology details will be added from project configuration.</p>}<div className="detail-actions">{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Radio size={18} /> Live Demo</a>}</div></div></aside>
    </div>{project.screenshots.length > 0 && <section className="gallery"><p className="detail-label">Gallery</p><h2>Project Screenshots</h2><div className="gallery-grid">{project.screenshots.map((src, i) => <figure key={i}><Image src={src} alt={`${project.name} screenshot ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "contain" }} /></figure>)}</div></section>}
    <nav className="project-pagination" aria-label="Project pagination">{previous ? <Link href={`/projects/${previous.slug}`}><ArrowLeft size={18} /><span><small>Previous project</small>{previous.name}</span></Link> : <span />}{next ? <Link href={`/projects/${next.slug}`}><span><small>Next project</small>{next.name}</span><ArrowRight size={18} /></Link> : <span />}</nav>
  </Container></main><Footer /></>;
}
