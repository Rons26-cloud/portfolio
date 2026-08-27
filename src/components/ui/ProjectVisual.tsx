import Image from "next/image";
import { Code2 } from "lucide-react";

export function ProjectVisual({ name, image, compact = false }: { name: string; image?: string; compact?: boolean }) {
  return (
    <div className={`project-visual ${compact ? "compact" : ""}`} role="img" aria-label={`${name} project visual`}>
      {image ? (
        <Image
          src={image}
          alt={`${name} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="project-image"
        />
      ) : (
        <>
          <div className="visual-grid" />
          <div className="visual-orb" />
          <div className="visual-label">
            <Code2 size={18} />
            <span>{name}</span>
          </div>
        </>
      )}
    </div>
  );
}
