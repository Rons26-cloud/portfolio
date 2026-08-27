import { skills } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";

export function Skills() {
  return (
    <section id="skills" className="section">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="03 / Capabilities" title="Skills & Technologies" description="A practical toolkit for building across web, mobile, backend, and interactive worlds." />
        </Reveal>
        {skills.map((group, index) => (
          <Reveal key={group.category} className={index === 0 ? "skill-wide" : ""}>
            <div className="skill-group">
              <h3 className="skill-group-title">{group.category}</h3>
              <div className="skill-grid">
                {group.skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-card"
                    aria-label={`Visit ${skill.name} official website`}
                    style={{ "--skill-color": skill.color } as React.CSSProperties}
                  >
                    <span className="skill-external" aria-hidden="true">↗</span>
                    <skill.icon size={32} style={{ color: skill.color }} />
                    <span className="skill-name">{skill.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
