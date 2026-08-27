import Image from "next/image";
import { T } from "@/components/providers/LanguageProvider";

export function ProjectHero({ name, src }: { name: string; src: string; displayMode?: "desktop" | "mobile" }) {
  if (!src) return null;

  return (
    <div className="project-hero">
      <Image
        src={src}
        alt={`${name} cover`}
        fill
        sizes="(max-width: 768px) 100vw, 1100px"
        className="project-hero-image"
        priority
      />
      <span className="project-hero-label" aria-hidden="true"><T>Preview</T></span>
    </div>
  );
}
