'use client'

import { useEffect, useRef, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { MotionConfig, useInView, useReducedMotion } from 'motion/react'
import { PhoneFrame } from '../phone/phone-frame'
import { DemoModeSwitcher, type DemoMode } from './demo-mode-switcher'
import { ReceiveDemo } from './receive-demo'
import { SendDemo } from './send-demo'

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

export function BankingDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()
  const [isDocumentHidden, setIsDocumentHidden] = useState(false)
  const [mode, setMode] = useState<DemoMode>('send')
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

  const handleModeChange = (nextMode: DemoMode) => {
    setMode(nextMode)
    setRunId((current) => current + 1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} dir="ltr" {...stylex.props(styles.root)}>
        <DemoModeSwitcher mode={mode} onChange={handleModeChange} />
        <PhoneFrame size="md">
          <div
            id="banking-demo-screen"
            role="tabpanel"
            aria-label={
              mode === 'send' ? 'Send Money demo' : 'Receive Money demo'
            }
            {...stylex.props(styles.panel)}
          >
            {mode === 'send' ? (
              <SendDemo
                key={`send-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            ) : (
              <ReceiveDemo
                key={`receive-${runId}`}
                paused={paused}
                reducedMotion={reducedMotion}
              />
            )}
          </div>
        </PhoneFrame>
      </div>
    </MotionConfig>
  )
}
