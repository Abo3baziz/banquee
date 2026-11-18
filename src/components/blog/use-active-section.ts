'use client'

import { useEffect, useState } from 'react'

// Only the middle band of the viewport counts as "in view" so the highlight
// follows the section the reader is actually looking at.
const ROOT_MARGIN = '-20% 0px -60% 0px'

/**
 * Returns the id of the section currently in view. Sections are matched in the
 * order they appear in `ids`, so pass the same array used to render the links.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) {
      return
    }

    const visibleIds = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id)
          } else {
            visibleIds.delete(entry.target.id)
          }
        }

        // When the viewport sits between two sections, keep the last known
        // highlight instead of clearing it and causing a flicker.
        const nextId = ids.find((id) => visibleIds.has(id)) ?? null
        if (nextId !== null) {
          setActiveId(nextId)
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [ids])

  // Ignore a highlight left over from a previous set of ids.
  return activeId !== null && ids.includes(activeId) ? activeId : null
}
