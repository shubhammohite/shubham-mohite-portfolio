import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Gives an element a subtle "magnetic" pull toward the cursor on hover —
 * a small, premium detail on primary CTAs. Automatically does nothing on
 * touch devices (no mousemove events fire) and respects reduced-motion
 * preferences.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.3 })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}
