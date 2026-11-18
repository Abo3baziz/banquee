'use client'

import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import * as stylex from '@stylexjs/stylex'
import { BookOpen, ChevronDown, List } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import type { BlogArticle } from './blog-types'

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
  mobile: {
    display: {
      default: 'block',
      '@media (min-width: 64rem)': 'none',
    },
  },
  mobileCard: {
    padding: '1.25rem',
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainerLow,
  },
  mobileToggle: {
    borderWidth: 0,
    gap: '0.625rem',
    paddingBlock: 0,
    paddingInline: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: colors.onSurface,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textAlign: 'start',
    textTransform: 'uppercase',
    width: '100%',
  },
  mobileToggleIcon: {
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
  },
  mobileChevron: {
    color: colors.onSurfaceVariant,
    display: 'flex',
    marginInlineStart: 'auto',
    transform: 'rotate(0deg)',
    transitionDuration: {
      default: '200ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform',
  },
  mobileChevronOpen: {
    transform: 'rotate(180deg)',
  },
  mobileNav: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    marginBlockStart: spacing.md,
  },
  mobileLink: {
    gap: '0.75rem',
    paddingBlock: '0.5rem',
    alignItems: 'baseline',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  mobileNumber: {
    color: colors.primary,
    flexShrink: 0,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    lineHeight: '1rem',
    minWidth: '1.25rem',
  },
  desktop: {
    gridColumn: '2',
    gridRow: '1',
    alignSelf: 'start',
    display: {
      default: 'none',
      '@media (min-width: 64rem)': 'block',
    },
    position: 'sticky',
    top: '7rem',
  },
  desktopCard: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainerLow,
  },
  desktopHeader: {
    gap: spacing.sm,
    alignItems: 'center',
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    color: colors.onSurface,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    paddingBlockEnd: spacing.md,
    textTransform: 'uppercase',
  },
  desktopHeaderIcon: {
    color: colors.primary,
    display: 'flex',
  },
  desktopNav: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    marginBlockStart: spacing.md,
  },
  desktopLink: {
    padding: '0.5rem',
    borderRadius: radii.md,
    gap: '0.75rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  desktopLinkActive: {
    color: colors.primary,
    fontWeight: 600,
  },
  desktopNumber: {
    borderRadius: radii.md,
    paddingBlock: '0.125rem',
    paddingInline: '0.5rem',
    backgroundColor: colors.surfaceContainer,
    color: colors.secondary,
    flexShrink: 0,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
  desktopNumberActive: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  divider: {
    backgroundColor: colors.divider,
    marginBlockStart: spacing.lg,
    height: 1,
    width: '100%',
  },
  cta: {
    padding: spacing.md,
    borderRadius: radii.xl,
    gap: '0.625rem',
    backgroundColor: colors.primaryTint,
    display: 'flex',
    flexDirection: 'column',
    marginBlockStart: spacing.lg,
  },
  ctaTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.9375rem',
    fontWeight: 700,
    lineHeight: 1.375,
  },
  ctaDescription: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  ctaButton: {
    borderRadius: radii.md,
    paddingBlock: '0.5rem',
    paddingInline: spacing.md,
    backgroundColor: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    color: colors.onPrimary,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textAlign: 'center',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color',
  },
})

type ArticleTocProps = {
  translationKey: BlogArticle['translationKey']
  ids: readonly string[]
}

function formatNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}

/**
 * Table of contents in two presentations: a collapsible panel above the body
 * on small screens, and a sticky sidebar card with the sidebar CTA on desktop.
 */
export function ArticleToc({ translationKey, ids }: ArticleTocProps) {
  const t = useTranslations('blog')
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [ids])

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)

    if (!target) {
      return
    }

    event.preventDefault()

    const shouldReduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    target.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.replaceState(null, '', `#${id}`)
    setActiveId(id)
    setIsOpen(false)
  }

  const tocTitle = t('articleDetail.tocTitle')

  return (
    <>
      <div {...stylex.props(styles.mobile)}>
        <div {...stylex.props(styles.mobileCard)}>
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            {...stylex.props(styles.mobileToggle, styles.focusRing)}
          >
            <span {...stylex.props(styles.mobileToggleIcon)}>
              <List aria-hidden="true" size={18} />
            </span>
            <span>{tocTitle}</span>
            <span
              aria-hidden="true"
              {...stylex.props(
                styles.mobileChevron,
                isOpen && styles.mobileChevronOpen,
              )}
            >
              <ChevronDown size={18} />
            </span>
          </button>
          {isOpen ? (
            <nav {...stylex.props(styles.mobileNav)}>
              {ids.map((id, index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => handleNavigate(event, id)}
                  {...stylex.props(styles.mobileLink, styles.focusRing)}
                >
                  <span {...stylex.props(styles.mobileNumber)}>
                    {formatNumber(index)}
                  </span>
                  <span>{t(`articles.${translationKey}.toc.${id}`)}</span>
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </div>

      <aside {...stylex.props(styles.desktop)}>
        <div {...stylex.props(styles.desktopCard)}>
          <div {...stylex.props(styles.desktopHeader)}>
            <span {...stylex.props(styles.desktopHeaderIcon)}>
              <BookOpen aria-hidden="true" size={16} />
            </span>
            <span>{tocTitle}</span>
          </div>
          <nav {...stylex.props(styles.desktopNav)}>
            {ids.map((id, index) => {
              const isActive = activeId === id

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => handleNavigate(event, id)}
                  {...stylex.props(
                    styles.desktopLink,
                    isActive && styles.desktopLinkActive,
                    styles.focusRing,
                  )}
                >
                  <span
                    {...stylex.props(
                      styles.desktopNumber,
                      isActive && styles.desktopNumberActive,
                    )}
                  >
                    {formatNumber(index)}
                  </span>
                  <span>{t(`articles.${translationKey}.toc.${id}`)}</span>
                </a>
              )
            })}
          </nav>
          <div aria-hidden="true" {...stylex.props(styles.divider)} />
          <div {...stylex.props(styles.cta)}>
            <p {...stylex.props(styles.ctaTitle)}>
              {t('articleDetail.sidebarCta.title')}
            </p>
            <p {...stylex.props(styles.ctaDescription)}>
              {t('articleDetail.sidebarCta.description')}
            </p>
            <Link
              href="/open-account"
              {...stylex.props(styles.ctaButton, styles.focusRing)}
            >
              {t('articleDetail.sidebarCta.button')}
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
