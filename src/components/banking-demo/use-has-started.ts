import { useEffect, useRef, useState, type RefObject } from 'react'

/** Share of the element that must be visible before the demo counts as seen. */
const VISIBLE_AMOUNT = 0.2

/**
 * Returns `true` from the first frame the element is at least 20% in view and
 * stays `true` afterwards.
 *
 * The demo containers use it to defer mounting the phone content until the
 * demo is actually visible. Stage 0 starts running as soon as its screen
 * mounts, so mounting it below the fold would spend its typing, delayed flags,
 * and simulated gestures before anyone could see them.
 */
export function useHasStarted<T extends Element>(ref: RefObject<T | null>) {
  const [hasStarted, setHasStarted] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    const element = ref.current

    if (!element || startedRef.current) {
      return
    }

    // Test environments and browsers without IntersectionObserver would keep
    // the demo unmounted forever, so mount it on the next task instead.
    if (typeof IntersectionObserver === 'undefined') {
      const timer = window.setTimeout(() => {
        startedRef.current = true
        setHasStarted(true)
      }, 0)
      return () => window.clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return
        }

        startedRef.current = true
        setHasStarted(true)
        observer.disconnect()
      },
      { threshold: VISIBLE_AMOUNT },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return hasStarted
}
