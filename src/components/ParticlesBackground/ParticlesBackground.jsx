import { useMemo } from 'react'
import './ParticlesBackground.css'

/**
 * Lightweight CSS-driven floating particle field (no external particle
 * engine dependency, keeps bundle size small).
 */
export default function ParticlesBackground({ count = 34 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 80,
        size: 1 + Math.random() * 3,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * -20,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  )

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
