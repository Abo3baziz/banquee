'use client'

import * as stylex from '@stylexjs/stylex'
import { User } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Direction } from 'radix-ui'
import { Link, usePathname } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { LanguageSwitcher } from './language-switcher'

const NAV_ITEMS = [
  { key: 'features', href: '/features' },
  { key: 'compare', href: '/compare' },
  { key: 'support', href: '/support' },
  { key: 'blog', href: '/blog' },
] as const

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
  header: {
    insetInline: 0,
    backdropFilter: 'blur(24px)',
    backgroundColor: 'rgba(249, 249, 249, 0.8)',
    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.04)',
    position: 'fixed',
    zIndex: 50,
    top: 0,
    width: '100%',
  },
  inner: {
    gap: spacing.gutter,
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    height: '5rem',
    maxWidth: '80rem',
    width: '100%',
  },
  left: {
    gap: spacing.xl,
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  brand: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: '1.6875rem',
    textDecorationLine: 'none',
  },
  brandDot: {
    color: colors.primaryContainer,
  },
  nav: {
    gap: spacing.md,
    alignItems: 'center',
    display: {
      default: 'none',
      '@media (min-width: 48rem)': 'flex',
    },
  },
  navLink: {
    borderRadius: radii.md,
    paddingBlock: spacing.xs,
    paddingInline: spacing.md,
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    backgroundColor: colors.primaryTint,
    color: {
      default: colors.primary,
      ':hover': colors.primary,
    },
  },
  right: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
  },
  language: {
    display: {
      default: 'none',
      '@media (min-width: 40rem)': 'block',
    },
  },
  login: {
    paddingBlock: spacing.sm,
    paddingInline: spacing.md,
    alignItems: 'center',
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    display: {
      default: 'none',
      '@media (min-width: 40rem)': 'inline-flex',
    },
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
    whiteSpace: 'nowrap',
  },
  cta: {
    borderRadius: radii.md,
    paddingBlock: spacing.sm,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.lg,
    },
    alignItems: 'center',
    backgroundColor: {
      default: colors.primaryContainer,
      ':hover': colors.primary,
    },
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
    color: {
      default: colors.onPrimaryContainer,
      ':hover': colors.onPrimary,
    },
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transform: {
      default: null,
      ':active': 'scale(0.95)',
    },
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color, box-shadow, transform',
    whiteSpace: 'nowrap',
  },
  avatar: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primary,
    color: colors.onPrimary,
    display: {
      default: 'none',
      '@media (min-width: 40rem)': 'flex',
    },
    flexShrink: 0,
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
})

export function SiteHeader() {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const locale = useLocale()
  const direction = locale === 'ar' ? 'rtl' : 'ltr'

  const brand = tCommon('brandName')
  const hasSuffix = brand.endsWith('.')
  const wordmark = hasSuffix ? brand.slice(0, -1) : brand
  const suffix = hasSuffix ? brand.slice(-1) : ''

  return (
    <Direction.Provider dir={direction}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.inner)}>
          <div {...stylex.props(styles.left)}>
            <Link
              href="/"
              dir="ltr"
              {...stylex.props(styles.brand, styles.focusRing)}
            >
              <span>{wordmark}</span>
              {suffix ? (
                <span {...stylex.props(styles.brandDot)}>{suffix}</span>
              ) : null}
            </Link>
            <nav {...stylex.props(styles.nav)}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    {...stylex.props(
                      styles.navLink,
                      isActive && styles.navLinkActive,
                      styles.focusRing,
                    )}
                  >
                    {t(item.key)}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div {...stylex.props(styles.right)}>
            <div {...stylex.props(styles.language)}>
              <LanguageSwitcher label={tCommon('selectLanguage')} />
            </div>
            <Link
              href="/login"
              {...stylex.props(styles.login, styles.focusRing)}
            >
              {tCommon('login')}
            </Link>
            <Link
              href="/open-account"
              {...stylex.props(styles.cta, styles.focusRing)}
            >
              {tCommon('openAccount')}
            </Link>
            <div {...stylex.props(styles.avatar)} aria-hidden="true">
              <User aria-hidden="true" size={18} />
            </div>
          </div>
        </div>
      </header>
    </Direction.Provider>
  )
}
