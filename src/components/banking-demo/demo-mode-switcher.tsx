'use client'

import * as stylex from '@stylexjs/stylex'
import { motion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'

export type DemoMode = 'send' | 'receive'

type DemoModeSwitcherProps = {
  mode: DemoMode
  onChange: (mode: DemoMode) => void
}

const MODES: { id: DemoMode; label: string }[] = [
  { id: 'send', label: 'Send Money' },
  { id: 'receive', label: 'Receive Money' },
]

const styles = stylex.create({
  root: {
    padding: '0.25rem',
    borderRadius: radii.full,
    gap: '0.125rem',
    backgroundColor: colors.surfaceContainer,
    display: 'inline-flex',
    position: 'relative',
  },
  tab: {
    borderRadius: radii.full,
    borderWidth: 0,
    paddingBlock: '0.375rem',
    paddingInline: '0.875rem',
    backgroundColor: 'transparent',
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    cursor: 'pointer',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1rem',
    position: 'relative',
    transitionDuration: '200ms',
    transitionProperty: 'color',
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

export function DemoModeSwitcher({ mode, onChange }: DemoModeSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Banking demo mode"
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
            aria-controls="banking-demo-screen"
            onClick={() => onChange(item.id)}
            {...stylex.props(
              styles.tab,
              isActive && styles.tabActive,
              styles.focusRing,
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="banking-demo-active-tab"
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
