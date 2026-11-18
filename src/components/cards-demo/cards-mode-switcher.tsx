'use client'

import * as stylex from '@stylexjs/stylex'
import { motion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'

export type CardsDemoMode = 'freeze' | 'limits' | 'add'

type CardsModeSwitcherProps = {
  mode: CardsDemoMode
  onChange: (mode: CardsDemoMode) => void
}

const MODES: { id: CardsDemoMode; label: string }[] = [
  { id: 'freeze', label: 'Freeze Card' },
  { id: 'limits', label: 'Spending Limits' },
  { id: 'add', label: 'Add New Card' },
]

const styles = stylex.create({
  root: {
    padding: '0.25rem',
    borderRadius: radii.full,
    gap: '0.125rem',
    backgroundColor: colors.surfaceContainer,
    display: 'inline-flex',
    position: 'relative',
    maxWidth: '100%',
  },
  tab: {
    borderRadius: radii.full,
    borderWidth: 0,
    paddingBlock: '0.3125rem',
    paddingInline: {
      default: '0.375rem',
      '@media (min-width: 22rem)': '0.5rem',
    },
    backgroundColor: 'transparent',
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    cursor: 'pointer',
    fontFamily: fonts.body,
    fontSize: {
      default: '0.5625rem',
      '@media (min-width: 22rem)': '0.625rem',
    },
    fontWeight: 600,
    lineHeight: '0.875rem',
    position: 'relative',
    transitionDuration: '200ms',
    transitionProperty: 'color',
    whiteSpace: 'nowrap',
  },
  tabActive: {
    color: colors.onSurface,
  },
  pill: {
    inset: 0,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
    position: 'absolute',
    zIndex: 0,
  },
  label: {
    position: 'relative',
    zIndex: 1,
  },
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
})

export function CardsModeSwitcher({ mode, onChange }: CardsModeSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Card management demo mode"
      {...stylex.props(styles.root)}
    >
      {MODES.map((item) => {
        const isActive = mode === item.id

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="cards-demo-screen"
            onClick={() => onChange(item.id)}
            {...stylex.props(
              styles.tab,
              isActive && styles.tabActive,
              styles.focusRing,
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="cards-demo-active-tab"
                {...stylex.props(styles.pill)}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span {...stylex.props(styles.label)}>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
