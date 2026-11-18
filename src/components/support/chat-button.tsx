'use client'

import { useEffect, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Cta } from '../ui/cta'

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const styles = stylex.create({
  button: {
    marginTop: 'auto',
  },
  spinner: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: {
      default: spin,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'linear',
  },
})

type ChatStatus = 'idle' | 'connecting' | 'connected'

export function ChatButton() {
  const t = useTranslations('support')
  const locale = useLocale()
  const [status, setStatus] = useState<ChatStatus>('idle')
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  useEffect(() => {
    if (status === 'connecting') {
      const timer = window.setTimeout(() => setStatus('connected'), 900)

      return () => window.clearTimeout(timer)
    }

    if (status === 'connected') {
      const timer = window.setTimeout(() => setStatus('idle'), 2500)

      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [status])

  const icon =
    status === 'connecting' ? (
      <LoaderCircle
        aria-hidden="true"
        size={18}
        {...stylex.props(styles.spinner)}
      />
    ) : status === 'connected' ? (
      <Check aria-hidden="true" size={18} />
    ) : (
      <Arrow aria-hidden="true" size={18} />
    )

  const label =
    status === 'connecting'
      ? t('contact.chatConnecting')
      : status === 'connected'
        ? t('contact.chatConnected')
        : t('contact.chatButton')

  return (
    <Cta
      variant="primary"
      size="sm"
      fullWidth
      disabled={status !== 'idle'}
      leadingIcon={status === 'idle' ? undefined : icon}
      trailingIcon={status === 'idle' ? icon : undefined}
      xstyle={styles.button}
      onClick={() => {
        if (status === 'idle') {
          setStatus('connecting')
        }
      }}
    >
      {label}
    </Cta>
  )
}
