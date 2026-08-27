"use client";
import { skills } from "@/data/skills";
import { Reveal } from "@/components/animations/Reveal";
import { SkillCard } from "@/components/ui/SkillCard";
import { T } from "@/components/providers/LanguageProvider";

export function SkillsGrid() {
  return (
    <div className="skills-groups">
      {skills.map((group, index) => (
        <Reveal key={group.category}>
          <div className="skills-group">
            <h3 className="skills-group-title"><span>0{index + 1}</span><T>{group.category}</T></h3>
            <div className="skills-grid">
              {group.items.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
