"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Skill } from "@/types/project";
import { SkillIcon } from "@/components/ui/SkillIcon";

type SkillCardProps = {
  skill: Skill;
};

export function SkillCard({ skill }: SkillCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      className="skill-card"
      style={{ "--skill-color": skill.color } as React.CSSProperties}
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${skill.name} official website`}
      whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <span className="skill-card-icon">
        <SkillIcon iconKey={skill.iconKey} size={22} />
      </span>
      <span className="skill-card-name">{skill.name}</span>
      <ArrowUpRight size={15} className="skill-card-link" aria-hidden="true" />
    </motion.a>
  );
}
