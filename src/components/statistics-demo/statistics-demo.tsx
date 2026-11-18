'use client'

import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { MotionConfig, useInView, useReducedMotion } from 'motion/react'
import { PhoneFrame } from '../phone/phone-frame'
import { ExpenseTrackingDemo } from './expense-tracking-demo'
import { MonthlyReportDemo } from './monthly-report-demo'
import { SpendingInsightsDemo } from './spending-insights-demo'
import {
  StatisticsModeSwitcher,
  type StatisticsDemoMode,
} from './statistics-mode-switcher'

const MODE_LABELS: Record<StatisticsDemoMode, string> = {
  insights: 'Spending Insights demo',
  report: 'Monthly Report demo',
  budgets: 'Expense Tracking demo',
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

export function StatisticsDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()
  const [isDocumentHidden, setIsDocumentHidden] = useState(false)
  const [mode, setMode] = useState<StatisticsDemoMode>('insights')
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

  const handleModeChange = (nextMode: StatisticsDemoMode) => {
    setMode(nextMode)
    setRunId((current) => current + 1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} dir="ltr" {...stylex.props(styles.root)}>
        <StatisticsModeSwitcher mode={mode} onChange={handleModeChange} />
        <PhoneFrame size="md">
          <div
            id="statistics-demo-screen"
            role="tabpanel"
            aria-label={MODE_LABELS[mode]}
            {...stylex.props(styles.panel)}
          >
            {mode === 'insights' ? (
              <SpendingInsightsDemo
                key={`insights-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {mode === 'report' ? (
              <MonthlyReportDemo
                key={`report-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : null}
            {mode === 'budgets' ? (
              <ExpenseTrackingDemo
                key={`budgets-${runId}`}
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
