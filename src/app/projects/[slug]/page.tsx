import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, PackageCheck, ShoppingBag } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects, getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { TechnologyList } from "@/components/projects/TechnologyList";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { T } from "@/components/providers/LanguageProvider";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${profile.brand}`,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: "article",
      siteName: profile.brand,
      ...(project.coverImage ? { images: [{ url: project.coverImage, alt: `${project.name} project preview` }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${profile.brand}`,
      description: project.description,
      ...(project.coverImage ? { images: [project.coverImage] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    ...(project.coverImage ? { image: absoluteUrl(project.coverImage) } : {}),
    creator: { "@type": "Person", name: profile.name, url: absoluteUrl() },
    keywords: project.technologies.join(", "),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main className="project-page">
        <Container>
          <Link className="back-link" href="/#projects">
            <ArrowLeft size={17} /> <T>Back to Projects</T>
          </Link>

          <header className="detail-heading">
            <p><T>{project.category}</T></p>
            <h1>{project.name}</h1>
            <span className="detail-description"><T>{project.description}</T></span>

            {(project.githubUrl || project.liveUrl) && (
              <div className="detail-actions">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <SiGithub size={18} aria-hidden="true" /> GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} /> <T>Live Website</T> <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </header>

          <ProjectHero name={project.name} src={project.coverImage} displayMode={project.displayMode} />

          <article className="case-study">
            {(project.problem || project.solution) && (
              <section className="case-section overview-section">
                <div className="case-section-heading">
                  <p className="detail-label"><T>Overview</T></p>
                  <h2><T>Project Overview</T></h2>
                </div>
                <div className="overview-content">
                  {project.solution && <p className="detail-body overview-lead"><T>{project.solution}</T></p>}
                  {project.problem && (
                    <div className="challenge-block">
                      <p className="detail-label"><T>The challenge</T></p>
                      <p className="detail-body"><T>{project.problem}</T></p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {project.offer && (
              <section className="project-offer">
                <div className="offer-copy">
                  <PackageCheck size={28} aria-hidden="true" />
                  <div>
                    <p className="detail-label"><T>Source Package</T></p>
                    <h2><T>{project.offer.title}</T></h2>
                    <p><T>{project.offer.description}</T></p>
                  </div>
                </div>
                <div className="offer-actions">
                  <Link href="/#contact">
                    <ShoppingBag size={18} /> <T>{project.offer.ctaLabel ?? "Request This Project"}</T> <span aria-hidden="true">↗</span>
                  </Link>
                  {project.githubUrl && (
                    <a className="offer-github" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} source code on GitHub`}>
                      <SiGithub size={19} aria-hidden="true" /> <T>View on GitHub</T>
                    </a>
                  )}
                </div>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section className="case-section features-section">
                <div className="case-section-heading">
                  <p className="detail-label"><T>What it does</T></p>
                  <h2><T>Key Features</T></h2>
                </div>
                <div className="feature-grid">
                  {project.features.map((feature, featureIndex) => (
                    <div className="feature-card" key={feature}>
                      <div className="feature-card-top"><span>{String(featureIndex + 1).padStart(2, "0")}</span><Check size={18} aria-hidden="true" /></div>
                      <h3><T>{feature}</T></h3>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.packageContents && project.packageContents.length > 0 && (
              <section className="case-section architecture-section">
                <div className="case-section-heading">
                  <p className="detail-label"><T>System Architecture</T></p>
                  <h2><T>Complete Full-Stack Package</T></h2>
                  <p className="detail-body"><T>Each application has its own focused codebase while sharing the same commerce backend.</T></p>
                </div>
                <div className="package-grid">
                  {project.packageContents.map((item, itemIndex) => (
                    <div className="package-column" key={item.title}>
                      <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                      <h3><T>{item.title}</T></h3>
                      <p><T>{item.description}</T></p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="case-section technologies-section">
              <div className="case-section-heading">
                <p className="detail-label"><T>Technologies</T></p>
                <h2><T>Technologies Used</T></h2>
              </div>
              <TechnologyList names={project.technologies} />
            </section>
          </article>

          <ProjectGallery name={project.name} images={project.gallery} />

          <ProjectNavigation previous={previous} next={next} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
