"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Braces, CircleCheck, Terminal } from "lucide-react";

export function HeroVisual() {
  const reduced = useReducedMotion();
  return <div className="hero-visual" aria-hidden="true"><div className="hero-glow" />
    <motion.div className="code-window" animate={reduced ? undefined : { y: [0, -9, 0], rotate: [0, 0.8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      <div className="window-top"><i /><i /><i /><span>build.tsx</span></div>
      <div className="code-lines"><p><Braces size={17} /> <b>create</b>(<em>idea</em>)</p><p className="indent">design.withPurpose()</p><p className="indent">code.withCare()</p><p><CircleCheck size={17} /> ship(<em>experience</em>)</p></div>
    </motion.div>
    <motion.div className="floating-chip" animate={reduced ? undefined : { y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}><Terminal size={17} /> thoughtful interactions</motion.div>
  </div>;
}
