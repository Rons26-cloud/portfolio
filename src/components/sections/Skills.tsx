import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import { SkillsGrid } from "@/components/sections/SkillsGrid";

export function Skills() {
  return (
    <section id="skills" className="section">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="03 / Capabilities" title="Skills & Technologies" description="A practical toolkit for building across web, mobile, backend, and interactive worlds." />
        </Reveal>
        <SkillsGrid />
      </Container>
    </section>
  );
}
