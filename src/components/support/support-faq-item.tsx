'use client'

import * as stylex from '@stylexjs/stylex'
import { Minus, Plus } from 'lucide-react'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

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
  divider: {
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
  },
  trigger: {
    borderWidth: 0,
    gap: spacing.md,
    paddingBlock: spacing.lg,
    paddingInline: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'start',
    width: '100%',
  },
  question: {
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  icon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primaryContainer,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '2rem',
    width: '2rem',
  },
  answer: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    paddingBlockEnd: spacing.lg,
    paddingInlineEnd: '2.5rem',
  },
})

type SupportFaqItemProps = {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  divider: boolean
}

export function SupportFaqItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  divider,
}: SupportFaqItemProps) {
  const triggerId = `${id}-trigger`

  return (
    <div {...stylex.props(divider && styles.divider)}>
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        {...stylex.props(styles.trigger, styles.focusRing)}
      >
        <span {...stylex.props(styles.question)}>{question}</span>
        <span aria-hidden="true" {...stylex.props(styles.icon)}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      {isOpen ? (
        <div role="region" aria-labelledby={triggerId} id={id}>
          <p {...stylex.props(styles.answer)}>{answer}</p>
        </div>
      ) : null}
    </div>
  )
}
