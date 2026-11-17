'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ChevronDown } from 'lucide-react'
import { colors, fonts, radii, spacing } from '../../../styles/tokens.stylex'

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
  item: {
    padding: {
      default: spacing.md,
      '@media (min-width: 48rem)': spacing.lg,
    },
    borderColor: {
      default: 'rgba(217, 217, 217, 0.4)',
      ':hover': 'rgba(0, 107, 92, 0.4)',
    },
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceContainerLowest,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transitionDuration: '300ms',
    transitionProperty: 'border-color, box-shadow',
  },
  itemOpen: {
    boxShadow:
      '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  },
  summary: {
    gap: spacing.md,
    listStyle: 'none',
    alignItems: 'center',
    color: colors.onSurface,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    justifyContent: 'space-between',
    lineHeight: '1.5rem',
    userSelect: 'none',
  },
  question: {
    minWidth: 0,
  },
  icon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    transform: 'rotate(0deg)',
    transitionDuration: {
      default: '300ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform',
    height: '2rem',
    width: '2rem',
  },
  iconOpen: {
    transform: 'rotate(180deg)',
  },
  answer: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.625,
    borderTopColor: 'rgba(217, 217, 217, 0.2)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
  },
})

type FaqItemProps = {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <details
      open={defaultOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      {...stylex.props(styles.item, isOpen && styles.itemOpen)}
    >
      <summary {...stylex.props(styles.summary, styles.focusRing)}>
        <span {...stylex.props(styles.question)}>{question}</span>
        <span
          aria-hidden="true"
          {...stylex.props(styles.icon, isOpen && styles.iconOpen)}
        >
          <ChevronDown size={20} />
        </span>
      </summary>
      <p {...stylex.props(styles.answer)}>{answer}</p>
    </details>
  )
}
