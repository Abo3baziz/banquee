'use client'

import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { MotionConfig, useInView, useReducedMotion } from 'motion/react'
import { PhoneFrame } from '../phone/phone-frame'
import {
  DEMO_VIEWPORT_AMOUNT,
  useHasStarted,
} from '../banking-demo/use-has-started'
import { AddCardDemo } from './add-card-demo'
import { CardsModeSwitcher, type CardsDemoMode } from './cards-mode-switcher'
import { FreezeDemo } from './freeze-demo'
import { SpendingLimitsDemo } from './spending-limits-demo'

const MODE_LABELS: Record<CardsDemoMode, string> = {
  freeze: 'Freeze Card demo',
  limits: 'Spending Limits demo',
  add: 'Add New Card demo',
}

const styles = stylex.create({
  root: {
    gap: '0.75rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
  },
  panel: {
    inset: 0,
    position: 'absolute',
  },
})

export function CardsDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: DEMO_VIEWPORT_AMOUNT })
  const shouldReduceMotion = useReducedMotion()
  const [isDocumentHidden, setIsDocumentHidden] = useState(false)
  const [mode, setMode] = useState<CardsDemoMode>('freeze')
  const [runId, setRunId] = useState(0)
  /*
   * Defer the first mount until the demo is actually visible, so in-stage
   * animations such as the card swipe, typing, and simulated taps are not
   * spent while the section is still below the fold. After the first view the
   * demo stays mounted and resumes from where it paused.
   */
  const hasStarted = useHasStarted(rootRef)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const paused = !isInView || isDocumentHidden
  const reducedMotion = Boolean(shouldReduceMotion)

  const handleModeChange = (nextMode: CardsDemoMode) => {
    setMode(nextMode)
    setRunId((current) => current + 1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} dir="ltr" {...stylex.props(styles.root)}>
        <CardsModeSwitcher mode={mode} onChange={handleModeChange} />
        <PhoneFrame size="md">
          <div
            id="cards-demo-screen"
            role="tabpanel"
            aria-label={MODE_LABELS[mode]}
            {...stylex.props(styles.panel)}
          >
            {hasStarted && mode === 'freeze' ? (
              <FreezeDemo
                key={`freeze-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {hasStarted && mode === 'limits' ? (
              <SpendingLimitsDemo
                key={`limits-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {hasStarted && mode === 'add' ? (
              <AddCardDemo
                key={`add-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
          </div>
        </PhoneFrame>
      </div>
    </MotionConfig>
  )
}
