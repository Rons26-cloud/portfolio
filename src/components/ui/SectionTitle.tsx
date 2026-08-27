export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
