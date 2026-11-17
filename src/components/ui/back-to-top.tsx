'use client'

import { useEffect, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { colors, radii, spacing } from '../../styles/tokens.stylex'

const SHOW_AFTER = 480

const styles = stylex.create({
  focusRing: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 2,
    },
    outlineStyle: {
      default: 'none',
      ':focus-visible': 'solid',
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 2,
    },
  },
  button: {
    borderRadius: radii.full,
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    boxShadow: {
      default: '0 4px 14px rgba(0, 0, 0, 0.16)',
      ':hover': '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
    color: colors.onPrimary,
    cursor: 'pointer',
    display: 'inline-flex',
    insetBlockEnd: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.lg,
    },
    insetInlineEnd: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.lg,
    },
    justifyContent: 'center',
    position: 'fixed',
    transitionDuration: {
      default: '200ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty:
      'background-color, box-shadow, opacity, transform, visibility',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 40,
    height: {
      default: '2.75rem',
      '@media (min-width: 40rem)': '3rem',
    },
    width: {
      default: '2.75rem',
      '@media (min-width: 40rem)': '3rem',
    },
  },
  visible: {
    opacity: 1,
    transform: {
      default: 'translateY(0) scale(1)',
      ':active': 'scale(0.94)',
    },
    visibility: 'visible',
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translateY(0.5rem) scale(0.96)',
    visibility: 'hidden',
  },
})

type BackToTopProps = {
  label: string
}

export function BackToTop({ label }: BackToTopProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setIsVisible(window.scrollY > SHOW_AFTER)
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

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-hidden={isVisible ? undefined : true}
      tabIndex={isVisible ? 0 : -1}
      onClick={handleClick}
      {...stylex.props(
        styles.button,
        isVisible ? styles.visible : styles.hidden,
        styles.focusRing,
      )}
    >
      <ArrowUp aria-hidden="true" size={20} />
    </button>
  )
}
