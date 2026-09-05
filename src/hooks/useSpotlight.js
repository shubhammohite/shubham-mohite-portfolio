import { useRef } from 'react'

/**
 * Tracks the cursor position relative to an element and exposes it as
 * CSS custom properties (--spot-x/--spot-y) for a radial-gradient
 * "spotlight" effect defined in the `.spotlight` utility class. Pure
 * CSS transition on opacity, so it's cheap and naturally inert on
 * touch devices (no mousemove there).
 */
export function useSpotlight() {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--spot-x', `${x}%`)
    el.style.setProperty('--spot-y', `${y}%`)
  }

  return { ref, onMouseMove }
}
