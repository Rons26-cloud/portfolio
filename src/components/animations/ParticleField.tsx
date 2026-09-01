"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; z: number; vx: number; vy: number; radius: number };
type ProjectedParticle = Particle & { screenX: number; screenY: number; scale: number };

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    let particles: Particle[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(72, Math.max(26, Math.floor((width * height) / 18000)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        z: -220 + ((index * 83) % 440),
        radius: 0.7 + Math.random() * 1.7,
      }));
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      const centerX = width / 2;
      const centerY = height / 2;
      const tiltX = pointer.y * 0.32;
      const tiltY = pointer.x * 0.42;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);
      const cosY = Math.cos(tiltY);
      const sinY = Math.sin(tiltY);

      const projected: ProjectedParticle[] = particles.map((particle) => {
        if (!reducedMotion.matches) {
          const speed = 0.55 + (particle.z + 220) / 440;
          particle.x += particle.vx * speed;
          particle.y += particle.vy * speed;
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        const localX = particle.x - centerX;
        const localY = particle.y - centerY;
        const rotatedX = localX * cosY + particle.z * sinY;
        const rotatedZ = -localX * sinY + particle.z * cosY;
        const rotatedY = localY * cosX - rotatedZ * sinX;
        const finalZ = localY * sinX + rotatedZ * cosX;
        const scale = Math.max(0.35, Math.min(1.8, 620 / (620 - finalZ)));

        return {
          ...particle,
          screenX: centerX + rotatedX * scale,
          screenY: centerY + rotatedY * scale,
          scale,
        };
      });

      projected.forEach((particle, index) => {
        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = projected[nextIndex];
          const distance = Math.hypot(particle.screenX - next.screenX, particle.screenY - next.screenY);
          const depthDistance = Math.abs(particle.z - next.z);
          if (distance < 128 && depthDistance < 155) {
            const strength = (1 - distance / 128) * (1 - depthDistance / 155);
            const gradient = context.createLinearGradient(particle.screenX, particle.screenY, next.screenX, next.screenY);
            gradient.addColorStop(0, `rgba(105,135,255,${strength * 0.25 * particle.scale})`);
            gradient.addColorStop(1, `rgba(157,116,255,${strength * 0.2 * next.scale})`);
            context.beginPath();
            context.moveTo(particle.screenX, particle.screenY);
            context.lineTo(next.screenX, next.screenY);
            context.strokeStyle = gradient;
            context.lineWidth = Math.max(0.35, 0.75 * particle.scale);
            context.stroke();
          }
        }

        const glowSize = Math.max(0.1, particle.radius * 5 * particle.scale);
        const glow = context.createRadialGradient(particle.screenX, particle.screenY, 0, particle.screenX, particle.screenY, glowSize);
        glow.addColorStop(0, `rgba(184,198,255,${Math.min(0.88, 0.58 * particle.scale)})`);
        glow.addColorStop(1, "rgba(101,128,255,0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.screenX, particle.screenY, glowSize, 0, Math.PI * 2);
        context.fill();
      });
      if (!reducedMotion.matches) frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const isInside = localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height;
      if (!isInside) {
        pointer.active = false;
        pointer.targetX = 0;
        pointer.targetY = 0;
        return;
      }
      pointer.targetX = Math.max(-1, Math.min(1, (localX / rect.width - 0.5) * 2));
      pointer.targetY = Math.max(-1, Math.min(1, (localY / rect.height - 0.5) * 2));
      pointer.active = true;
    };
    const leave = () => { pointer.active = false; pointer.targetX = 0; pointer.targetY = 0; };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    resize();
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
