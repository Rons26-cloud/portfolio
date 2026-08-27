"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/types/project";
import { Lightbox } from "@/components/projects/Lightbox";
import { T } from "@/components/providers/LanguageProvider";

export function ProjectGallery({ name, images }: { name: string; images: ProjectImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <section className="project-gallery" id="gallery">
      <div className="detail-label"><T>Project Gallery</T></div>
      <h2 className="gallery-title"><T>Gallery</T></h2>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="gallery-item"
            onClick={() => setActive(index)}
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={640}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="gallery-image"
              loading="lazy"
            />
            {image.caption && <span className="gallery-caption"><T>{image.caption}</T></span>}
          </button>
        ))}
      </div>
      {active !== null && (
        <Lightbox
          images={images}
          index={active}
          name={name}
          onClose={() => setActive(null)}
          onIndexChange={setActive}
        />
      )}
    </section>
  );
}
