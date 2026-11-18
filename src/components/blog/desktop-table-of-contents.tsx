'use client'

import { useMemo } from 'react'
import type { MouseEvent } from 'react'
import * as stylex from '@stylexjs/stylex'
import { BookOpen } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Cta } from '../ui/cta'
import type { TableOfContentsItem } from './mobile-table-of-contents'
import { useActiveSection } from './use-active-section'

type TableOfContentsCta = {
  title: string
  description: string
  buttonLabel: string
}

type DesktopTableOfContentsProps = {
  title: string
  items: TableOfContentsItem[]
  cta: TableOfContentsCta
}

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
  aside: {
    alignSelf: 'start',
    display: {
      default: 'none',
      '@media (min-width: 64rem)': 'block',
    },
    position: 'sticky',
    top: '6.5rem',
  },
  card: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 75rem)': spacing.xl,
    },
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainerLow,
  },
  header: {
    alignItems: 'center',
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    marginBlockEnd: '1.25rem',
    paddingBlockEnd: '0.75rem',
  },
  title: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  headerIcon: {
    color: colors.primary,
    display: 'inline-flex',
  },
  nav: {
    gap: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    padding: '0.5rem',
    borderRadius: radii.md,
    gap: '0.75rem',
    alignItems: 'flex-start',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceLight,
    },
    color: {
      default: colors.secondary,
      ':hover': colors.onSurface,
    },
    display: 'flex',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
  },
  linkActive: {
    backgroundColor: colors.surfaceLight,
    color: colors.onSurface,
    fontWeight: 600,
  },
  number: {
    borderRadius: radii.sm,
    paddingBlock: '0.125rem',
    paddingInline: '0.5rem',
    backgroundColor: colors.surfaceContainer,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: 1.375,
  },
  numberActive: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    lineHeight: 1.375,
  },
  footer: {
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    marginBlockStart: spacing.xl,
    paddingBlockStart: spacing.lg,
  },
  ctaBox: {
    padding: spacing.md,
    borderRadius: radii.lg,
    gap: '0.625rem',
    backgroundColor: colors.primaryTint,
    display: 'flex',
    flexDirection: 'column',
  },
  ctaTitle: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 700,
  },
  ctaDescription: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    lineHeight: 1.5,
  },
})

export function DesktopTableOfContents({
  title,
  items,
  cta,
}: DesktopTableOfContentsProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const activeId = useActiveSection(ids)
  const shouldReduceMotion = useReducedMotion()

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
  }

  return (
    <aside {...stylex.props(styles.aside)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.header)}>
          <span {...stylex.props(styles.title)}>{title}</span>
          <span {...stylex.props(styles.headerIcon)}>
            <BookOpen aria-hidden="true" size={18} />
          </span>
        </div>

        <nav aria-label={title} {...stylex.props(styles.nav)}>
          {items.map((item) => {
            const isActive = item.id === activeId

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => handleLinkClick(event, item.id)}
                {...stylex.props(
                  styles.link,
                  isActive && styles.linkActive,
                  styles.focusRing,
                )}
              >
                <span
                  {...stylex.props(
                    styles.number,
                    isActive && styles.numberActive,
                  )}
                >
                  {item.number}
                </span>
                <span {...stylex.props(styles.label)}>{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div {...stylex.props(styles.footer)}>
          <div {...stylex.props(styles.ctaBox)}>
            <span {...stylex.props(styles.ctaTitle)}>{cta.title}</span>
            <p {...stylex.props(styles.ctaDescription)}>{cta.description}</p>
            <Cta href="/open-account" variant="solid" size="sm">
              {cta.buttonLabel}
            </Cta>
          </div>
        </div>
      </div>
    </aside>
  )
}
