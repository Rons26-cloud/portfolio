"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Braces, CircleCheck, Terminal } from "lucide-react";

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [34, 66]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [34, 66]);
  const chipX = useTransform(smoothX, [-0.5, 0.5], [-8, 12]);
  const chipY = useTransform(smoothY, [-0.5, 0.5], [-6, 9]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => { pointerX.set(0); pointerY.set(0); };

  return (
    <div className="hero-visual" aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <motion.div className="hero-glow" style={{ left: glowX, top: glowY }} />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <motion.div
        className="code-window"
        style={prefersReducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="window-reflection" />
        <div className="window-top"><i /><i /><i /><span>build.tsx</span></div>
        <div className="code-lines">
          <p><Braces size={17} /> <b>create</b>(<em>idea</em>)</p>
          <p className="indent">design.withPurpose()</p>
          <p className="indent">code.withCare()</p>
          <p><CircleCheck size={17} /> ship(<em>experience</em>)</p>
        </div>
      </motion.div>
      <motion.div className="floating-chip" style={prefersReducedMotion ? undefined : { x: chipX, y: chipY }}>
        <Terminal size={17} /> thoughtful interactions
      </motion.div>
      <span className="visual-coordinate">06° 12&apos; / crafted in Indonesia</span>
    </div>
  );
}
