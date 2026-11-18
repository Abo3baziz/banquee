'use client'

import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { MotionConfig, useInView, useReducedMotion } from 'motion/react'
import { PhoneFrame } from '../phone/phone-frame'
import { ProgressDemo } from './progress-demo'
import { SavingsGoalsDemo } from './savings-goals-demo'
import {
  SavingsModeSwitcher,
  type SavingsDemoMode,
} from './savings-mode-switcher'
import { SmartSavingsDemo } from './smart-savings-demo'

const MODE_LABELS: Record<SavingsDemoMode, string> = {
  goals: 'Savings Goals demo',
  progress: 'Progress Tracking demo',
  smart: 'Smart Savings demo',
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

export function SavingsDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()
  const [isDocumentHidden, setIsDocumentHidden] = useState(false)
  const [mode, setMode] = useState<SavingsDemoMode>('goals')
  const [runId, setRunId] = useState(0)

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

  const handleModeChange = (nextMode: SavingsDemoMode) => {
    setMode(nextMode)
    setRunId((current) => current + 1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} dir="ltr" {...stylex.props(styles.root)}>
        <SavingsModeSwitcher mode={mode} onChange={handleModeChange} />
        <PhoneFrame size="md">
          <div
            id="savings-demo-screen"
            role="tabpanel"
            aria-label={MODE_LABELS[mode]}
            {...stylex.props(styles.panel)}
          >
            {mode === 'goals' ? (
              <SavingsGoalsDemo
                key={`goals-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {mode === 'progress' ? (
              <ProgressDemo
                key={`progress-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {mode === 'smart' ? (
              <SmartSavingsDemo
                key={`smart-${runId}`}
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
