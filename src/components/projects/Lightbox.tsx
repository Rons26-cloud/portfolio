"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/types/project";
import { useLanguage } from "@/components/providers/LanguageProvider";

type LightboxProps = {
  images: ProjectImage[];
  index: number;
  name: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ images, index, name, onClose, onIndexChange }: LightboxProps) {
  const { t } = useLanguage();
  const count = images.length;
  const current = images[index];
  const hasPrev = count > 1;
  const hasNext = count > 1;

  const prev = useCallback(() => {
    if (!hasPrev) return;
    onIndexChange((index - 1 + count) % count);
  }, [index, count, hasPrev, onIndexChange]);

  const next = useCallback(() => {
    if (!hasNext) return;
    onIndexChange((index + 1) % count);
  }, [index, count, hasNext, onIndexChange]);

  useEffect(() => {
    if (count === 0) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [count, onClose, prev, next]);

  if (count === 0 || !current) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image viewer`} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label={t("Close viewer")}> <X size={22} /> </button>

      {hasPrev && (
        <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label={t("Previous image")}>
          <ChevronLeft size={26} />
        </button>
      )}
      {hasNext && (
        <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label={t("Next image")}>
          <ChevronRight size={26} />
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="80vw"
          className="lightbox-image"
        />
      </figure>

      {current.caption && <p className="lightbox-caption">{current.caption}</p>}
      <p className="lightbox-count">{index + 1} / {count}</p>
    </div>
  );
}
