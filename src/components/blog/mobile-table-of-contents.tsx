'use client'

import type { MouseEvent } from 'react'
import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ChevronDown, ListOrdered } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

export type TableOfContentsItem = {
  /** Section anchor, for example `section-1`. */
  id: string
  /** Display number, for example `01`. */
  number: string
  /** Translated section title. */
  label: string
}

const NAV_ID = 'article-toc-mobile'

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
  card: {
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainerLow,
    display: {
      default: 'block',
      '@media (min-width: 64rem)': 'none',
    },
    width: '100%',
  },
  toggle: {
    padding: 0,
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  toggleLabel: {
    gap: spacing.sm,
    alignItems: 'center',
    color: colors.onSurface,
    display: 'flex',
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  toggleIcon: {
    color: colors.primary,
    display: 'inline-flex',
  },
  chevron: {
    color: colors.onSurfaceVariant,
    display: 'block',
    flexShrink: 0,
  },
  chevronIcon: {
    display: 'block',
    transitionDuration: {
      default: '300ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform',
  },
  chevronOpen: {
    transform: {
      default: 'rotate(180deg)',
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
  },
  nav: {
    gap: '0.75rem',
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    marginBlockStart: '0.75rem',
    paddingBlockStart: spacing.md,
  },
  link: {
    gap: spacing.sm,
    paddingBlock: '0.25rem',
    alignItems: 'baseline',
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.primary,
    },
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  number: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1,
  },
})

type MobileTableOfContentsProps = {
  title: string
  items: TableOfContentsItem[]
}

export function MobileTableOfContents({
  title,
  items,
}: MobileTableOfContentsProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id)

    if (target === null) {
      return
    }

    event.preventDefault()
    target.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.pushState(null, '', `#${id}`)
    setIsOpen(false)
  }

  return (
    <div {...stylex.props(styles.card)}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={NAV_ID}
        onClick={() => setIsOpen((open) => !open)}
        {...stylex.props(styles.toggle, styles.focusRing)}
      >
        <span {...stylex.props(styles.toggleLabel)}>
          <span {...stylex.props(styles.toggleIcon)}>
            <ListOrdered aria-hidden="true" size={18} />
          </span>
          {title}
        </span>
        <span {...stylex.props(styles.chevron)}>
          <ChevronDown
            aria-hidden="true"
            size={18}
            {...stylex.props(styles.chevronIcon, isOpen && styles.chevronOpen)}
          />
        </span>
      </button>

      {isOpen ? (
        <nav id={NAV_ID} aria-label={title} {...stylex.props(styles.nav)}>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleLinkClick(event, item.id)}
              {...stylex.props(styles.link, styles.focusRing)}
            >
              <span {...stylex.props(styles.number)}>{item.number}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
