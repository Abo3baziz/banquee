'use client'

import { useEffect, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Menu, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Dialog, Direction } from 'radix-ui'
import { Link, usePathname } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Cta } from '../ui/cta'
import { LanguageOptions, LanguageSwitcher } from './language-switcher'
import { useScrollDirection } from './use-scroll-direction'

const NAV_ITEMS = [
  { key: 'features', href: '/features' },
  { key: 'compare', href: '/compare' },
  { key: 'support', href: '/support' },
  { key: 'blog', href: '/blog' },
] as const

const fadeIn = stylex.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const fadeOut = stylex.keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const slideInFromEnd = stylex.keyframes({
  '0%': { transform: 'translateX(100%)' },
  '100%': { transform: 'translateX(0)' },
})

const slideOutToEnd = stylex.keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(100%)' },
})

const slideInFromStart = stylex.keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(0)' },
})

const slideOutToStart = stylex.keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-100%)' },
})

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
    transitionDuration: {
      default: '250ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 50,
    top: 0,
    width: '100%',
  },
  headerHidden: {
    pointerEvents: 'none',
    transform: 'translateY(-100%)',
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
    fontFamily: fonts.latinHeading,
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
      '@media (min-width: 64rem)': 'flex',
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
      '@media (min-width: 64rem)': 'block',
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
      '@media (min-width: 64rem)': 'inline-flex',
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
  ctaDesktop: {
    display: {
      default: 'none',
      '@media (min-width: 64rem)': 'inline-flex',
    },
  },
  menuButton: {
    padding: 0,
    borderRadius: radii.md,
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceContainerLow,
    },
    color: colors.onSurface,
    cursor: 'pointer',
    display: {
      default: 'inline-flex',
      '@media (min-width: 64rem)': 'none',
    },
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
    height: '2.75rem',
    width: '2.75rem',
  },
  overlay: {
    animationDuration: {
      '[data-state="closed"]': '180ms',
      '[data-state="open"]': '220ms',
    },
    animationFillMode: 'both',
    animationName: {
      '[data-state="closed"]': {
        default: fadeOut,
        '@media (prefers-reduced-motion: reduce)': 'none',
      },
      '[data-state="open"]': {
        default: fadeIn,
        '@media (prefers-reduced-motion: reduce)': 'none',
      },
    },
    animationTimingFunction: 'ease',
    backdropFilter: 'blur(2px)',
    backgroundColor: 'rgba(26, 28, 28, 0.32)',
    position: 'fixed',
    zIndex: 55,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  panel: {
    gap: spacing.lg,
    overscrollBehavior: 'contain',
    paddingBlock: spacing.lg,
    paddingInline: spacing.md,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 0 48px rgba(0, 0, 0, 0.16)',
    display: 'flex',
    flexDirection: 'column',
    insetInlineEnd: 0,
    position: 'fixed',
    zIndex: 60,
    bottom: 0,
    height: '100dvh',
    overflowY: 'auto',
    top: 0,
    width: 'min(20rem, 100vw)',
  },
  panelLtr: {
    animationDuration: {
      '[data-state="closed"]': '220ms',
      '[data-state="open"]': '320ms',
    },
    animationFillMode: 'both',
    animationName: {
      '[data-state="closed"]': {
        default: slideOutToEnd,
        '@media (prefers-reduced-motion: reduce)': 'none',
      },
      '[data-state="open"]': {
        default: slideInFromEnd,
        '@media (prefers-reduced-motion: reduce)': 'none',
      },
    },
    animationTimingFunction: {
      '[data-state="closed"]': 'cubic-bezier(0.4, 0, 1, 1)',
      '[data-state="open"]': 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },
  panelRtl: {
    animationDuration: {
      '[data-state="closed"]': '220ms',
      '[data-state="open"]': '320ms',
    },
    animationFillMode: 'both',
    animationName: {
      '[data-state="closed"]': {
        default: slideOutToStart,
        '@media (prefers-reduced-motion: reduce)': 'none',
      },
      '[data-state="open"]': {
        default: slideInFromStart,
        '@media (prefers-reduced-motion: reduce)': 'none',
      },
    },
    animationTimingFunction: {
      '[data-state="closed"]': 'cubic-bezier(0.4, 0, 1, 1)',
      '[data-state="open"]': 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },
  panelHeader: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: 0,
    borderRadius: radii.md,
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceContainerLow,
    },
    color: colors.onSurfaceVariant,
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
    height: '2.75rem',
    width: '2.75rem',
  },
  panelNav: {
    gap: spacing.xs,
    display: 'flex',
    flexDirection: 'column',
  },
  panelNavLink: {
    paddingBlock: spacing.md,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    whiteSpace: 'normal',
  },
  panelDivider: {
    backgroundColor: colors.divider,
    height: 1,
    width: '100%',
  },
  panelActions: {
    gap: spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    paddingTop: spacing.md,
  },
  panelLogin: {
    borderColor: colors.divider,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBlock: '0.75rem',
    backgroundColor: {
      default: colors.surfaceLight,
      ':hover': colors.surfaceContainerLow,
    },
    display: 'inline-flex',
    fontSize: '0.9375rem',
    justifyContent: 'center',
    width: '100%',
  },
  visuallyHidden: {
    margin: -1,
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: 1,
    width: 1,
  },
})

export function SiteHeader() {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const locale = useLocale()
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const [menuOpen, setMenuOpen] = useState(false)
  const { hidden } = useScrollDirection({
    onHide: () => setMenuOpen(false),
  })

  const brand = tCommon('brandName')
  const hasSuffix = brand.endsWith('.')
  const wordmark = hasSuffix ? brand.slice(0, -1) : brand
  const suffix = hasSuffix ? brand.slice(-1) : ''

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <Direction.Provider dir={direction}>
      <header
        inert={hidden || undefined}
        {...stylex.props(styles.header, hidden && styles.headerHidden)}
      >
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
            <nav aria-label={t('menu')} {...stylex.props(styles.nav)}>
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
            <Cta
              href="/open-account"
              variant="primary"
              size="nav"
              xstyle={styles.ctaDesktop}
            >
              {tCommon('openAccount')}
            </Cta>
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label={t('openMenu')}
                  {...stylex.props(styles.menuButton, styles.focusRing)}
                >
                  <Menu aria-hidden="true" size={22} />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay {...stylex.props(styles.overlay)} />
                <Dialog.Content
                  aria-describedby={undefined}
                  {...stylex.props(
                    styles.panel,
                    direction === 'rtl' ? styles.panelRtl : styles.panelLtr,
                  )}
                >
                  <div {...stylex.props(styles.panelHeader)}>
                    <Link
                      href="/"
                      dir="ltr"
                      onClick={closeMenu}
                      {...stylex.props(styles.brand, styles.focusRing)}
                    >
                      <span>{wordmark}</span>
                      {suffix ? (
                        <span {...stylex.props(styles.brandDot)}>{suffix}</span>
                      ) : null}
                    </Link>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={t('closeMenu')}
                        {...stylex.props(styles.closeButton, styles.focusRing)}
                      >
                        <X aria-hidden="true" size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Title {...stylex.props(styles.visuallyHidden)}>
                    {t('menu')}
                  </Dialog.Title>
                  <nav
                    aria-label={t('menu')}
                    {...stylex.props(styles.panelNav)}
                  >
                    {NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href

                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={isActive ? 'page' : undefined}
                          {...stylex.props(
                            styles.navLink,
                            styles.panelNavLink,
                            isActive && styles.navLinkActive,
                            styles.focusRing,
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      )
                    })}
                  </nav>
                  <div {...stylex.props(styles.panelDivider)} />
                  <LanguageOptions
                    label={tCommon('selectLanguage')}
                    onSelect={closeMenu}
                  />
                  <div {...stylex.props(styles.panelActions)}>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      {...stylex.props(
                        styles.login,
                        styles.panelLogin,
                        styles.focusRing,
                      )}
                    >
                      {tCommon('login')}
                    </Link>
                    <Cta
                      href="/open-account"
                      onClick={closeMenu}
                      variant="primary"
                      size="panel"
                      fullWidth
                    >
                      {tCommon('openAccount')}
                    </Cta>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </Direction.Provider>
  )
}
