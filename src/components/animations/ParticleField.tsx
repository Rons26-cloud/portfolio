const particles = [
  { x: 8, y: 18, size: 3, delay: -2, duration: 13 },
  { x: 19, y: 72, size: 2, delay: -8, duration: 16 },
  { x: 31, y: 38, size: 4, delay: -5, duration: 18 },
  { x: 47, y: 84, size: 2, delay: -11, duration: 14 },
  { x: 58, y: 12, size: 3, delay: -7, duration: 17 },
  { x: 68, y: 61, size: 2, delay: -3, duration: 15 },
  { x: 78, y: 28, size: 4, delay: -12, duration: 19 },
  { x: 91, y: 76, size: 3, delay: -6, duration: 16 },
  { x: 14, y: 46, size: 2, delay: -10, duration: 18 },
  { x: 39, y: 9, size: 2, delay: -4, duration: 14 },
  { x: 72, y: 91, size: 3, delay: -9, duration: 17 },
  { x: 94, y: 42, size: 2, delay: -1, duration: 15 },
];

export function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          className="particle"
          key={`${particle.x}-${particle.y}`}
          style={
            {
              "--particle-x": `${particle.x}%`,
              "--particle-y": `${particle.y}%`,
              "--particle-size": `${particle.size}px`,
              "--particle-delay": `${particle.delay}s`,
              "--particle-duration": `${particle.duration}s`,
              "--particle-drift": `${index % 2 === 0 ? 24 : -20}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
