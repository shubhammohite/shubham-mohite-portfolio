
import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently closest to the top
 * of the viewport and highlights the corresponding navbar link.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting
        )

        if (visibleEntries.length === 0) return

        // Select the section closest to the top of the viewport
        const closest = visibleEntries.reduce((closest, entry) => {
          const closestDistance = Math.abs(
            closest.boundingClientRect.top
          )

          const currentDistance = Math.abs(
            entry.boundingClientRect.top
          )

          return currentDistance < closestDistance ? entry : closest
        })

        setActiveId(closest.target.id)
      },
      {
        rootMargin: '-15% 0px -70% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
