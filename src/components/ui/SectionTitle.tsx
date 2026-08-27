"use client";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  const { t } = useLanguage();
  return <div className="section-title"><span>{t(eyebrow)}</span><h2>{t(title)}</h2>{description && <p>{t(description)}</p>}</div>;
}
