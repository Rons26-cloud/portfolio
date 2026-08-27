import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { T } from "@/components/providers/LanguageProvider";

export function ProjectNavigation({ previous, next }: { previous?: Project; next?: Project }) {
  return (
    <nav className="project-pagination" aria-label="Project pagination">
      {previous ? (
        <Link href={`/projects/${previous.slug}`}>
          <ArrowLeft size={18} />
          <span><small><T>Previous project</T></small>{previous.name}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/projects/${next.slug}`}>
          <span><small><T>Next project</T></small>{next.name}</span>
          <ArrowRight size={18} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
