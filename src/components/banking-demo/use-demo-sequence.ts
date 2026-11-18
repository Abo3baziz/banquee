import { useEffect, useRef, useState } from 'react'
import type { DemoSequenceStage } from './demo-sequence'

type UseDemoSequenceOptions = {
  paused?: boolean
  disabled?: boolean
}

export function useDemoSequence<Id extends string>(
  stages: readonly DemoSequenceStage<Id>[],
  { paused = false, disabled = false }: UseDemoSequenceOptions = {},
) {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const remainingRef = useRef(stages[0]?.duration ?? 0)

  useEffect(() => {
    remainingRef.current = stages[index]?.duration ?? 0
  }, [index, stages])

  useEffect(() => {
    if (paused || disabled) {
      return
    }

    const duration = remainingRef.current
    if (duration <= 0) {
      return
    }

    const startedAt = performance.now()
    const isLast = index === stages.length - 1
    const timer = window.setTimeout(() => {
      remainingRef.current = 0

      if (isLast) {
        setIndex(0)
        setCycle((current) => current + 1)
      } else {
        setIndex(index + 1)
      }
    }, duration)

    return () => {
      window.clearTimeout(timer)
      remainingRef.current = Math.max(
        0,
        duration - (performance.now() - startedAt),
      )
    }
  }, [disabled, index, paused, stages])

  return { index, cycle, stage: stages[index]?.id }
}
