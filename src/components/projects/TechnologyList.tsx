import { getTechnology } from "@/data/technologies";
import { TechnologyCard } from "@/components/projects/TechnologyCard";

export function TechnologyList({ names }: { names: string[] }) {
  const technologies = names
    .map((name) => getTechnology(name))
    .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech));

  if (technologies.length === 0) return null;

  return (
    <div className="technology-list">
      {technologies.map((tech) => (
        <TechnologyCard key={tech.name} tech={tech} />
      ))}
    </div>
  );
}
