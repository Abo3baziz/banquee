'use client'

import { useEffect, useRef, useState } from 'react'

const TOP_OFFSET = 10
const HIDE_AFTER = 80
const HIDE_DELTA = 10
const SHOW_DELTA = 5

type UseScrollDirectionOptions = {
  onHide?: () => void
}

export function useScrollDirection({ onHide }: UseScrollDirectionOptions = {}) {
  const [hidden, setHidden] = useState(false)
  const onHideRef = useRef(onHide)

  useEffect(() => {
    onHideRef.current = onHide
  }, [onHide])

  useEffect(() => {
    let frame = 0
    let anchorY = window.scrollY
    let isHidden = false

    const update = () => {
      frame = 0
      const y = window.scrollY

      if (y <= TOP_OFFSET) {
        anchorY = y
        if (isHidden) {
          isHidden = false
          setHidden(false)
        }
        return
      }

      const delta = y - anchorY

      if (delta > HIDE_DELTA && y > HIDE_AFTER) {
        anchorY = y
        if (!isHidden) {
          isHidden = true
          setHidden(true)
          onHideRef.current?.()
        }
        return
      }

      if (delta < -SHOW_DELTA) {
        anchorY = y
        if (isHidden) {
          isHidden = false
          setHidden(false)
        }
      }
    }

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return { hidden }
}
