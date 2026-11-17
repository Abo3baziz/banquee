import { Fragment } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { FeaturesHeroVisual } from './hero-visual'

const rise = stylex.keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(24px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
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
  section: {
    overflow: 'hidden',
    paddingBlock: '2rem',
    position: 'relative',
    width: '100%',
  },
  container: {
    marginInline: 'auto',
    paddingInline: spacing.margin,
    position: 'relative',
    zIndex: 1,
    maxWidth: '80rem',
  },
  auraEnd: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(91, 181, 162, 0.1)',
    filter: 'blur(64px)',
    insetInlineEnd: 0,
    pointerEvents: 'none',
    position: 'absolute',
    height: 640,
    top: '-10rem',
    width: 640,
  },
  auraStart: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(125, 215, 195, 0.15)',
    filter: 'blur(64px)',
    insetInlineStart: '-9.375rem',
    pointerEvents: 'none',
    position: 'absolute',
    height: 520,
    top: '50%',
    width: 520,
  },
  grid: {
    gap: spacing.xl,
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
    position: 'relative',
    zIndex: 1,
  },
  copy: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    minWidth: 0,
  },
  riseItem: {
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: rise,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
  },
  delay1: { animationDelay: '100ms' },
  delay2: { animationDelay: '200ms' },
  delay3: { animationDelay: '300ms' },
  delay4: { animationDelay: '400ms' },
  badge: {
    borderRadius: radii.full,
    gap: spacing.sm,
    paddingBlock: '0.375rem',
    paddingInline: '0.75rem',
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.md,
  },
  badgeDot: {
    borderRadius: radii.full,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.primaryContainer,
    flexShrink: 0,
    height: 8,
    width: 8,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 600,
    letterSpacing: '0.025em',
    lineHeight: '1.125rem',
  },
  headline: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '2.25rem',
      '@media (min-width: 40rem)': '3rem',
      '@media (min-width: 64rem)': '4.25rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: {
      default: 1.15,
      '@media (min-width: 64rem)': 1.1,
    },
    textWrap: 'balance',
    marginBottom: spacing.md,
  },
  subheadline: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    marginBottom: spacing.xl,
    maxWidth: '36rem',
  },
  actions: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  primaryCta: {
    borderRadius: radii.lg,
    gap: spacing.xs,
    paddingBlock: '0.875rem',
    paddingInline: '1.75rem',
    alignItems: 'center',
    backgroundColor: {
      default: colors.primaryContainer,
      ':hover': colors.primary,
    },
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.05)',
      ':hover': '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
    color: {
      default: colors.onPrimaryContainer,
      ':hover': colors.onPrimary,
    },
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transform: {
      default: null,
      ':hover': 'translateY(-2px)',
      ':active': 'scale(0.95)',
    },
    transitionDuration: '200ms',
    transitionProperty: 'background-color, color, box-shadow, transform',
  },
  secondaryCta: {
    borderRadius: radii.lg,
    paddingBlock: '0.875rem',
    paddingInline: '1.75rem',
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceContainerLowest,
      ':hover': colors.surfaceContainer,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    color: colors.onSurface,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transform: {
      default: null,
      ':active': 'scale(0.95)',
    },
    transitionDuration: '200ms',
    transitionProperty: 'background-color, transform',
  },
  ctaIcon: {
    flexShrink: 0,
  },
  metrics: {
    gap: {
      default: '1.25rem',
      '@media (min-width: 40rem)': spacing.xl,
    },
    alignItems: 'center',
    display: 'flex',
    marginTop: '3rem',
    paddingTop: spacing.xl,
    width: '100%',
  },
  metricDivider: {
    backgroundColor: colors.divider,
    flexShrink: 0,
    height: '2.5rem',
    width: 1,
  },
  metricValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: '1.75rem',
    whiteSpace: 'nowrap',
  },
  metricLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
})

export async function FeaturesHero() {
  const [t, locale] = await Promise.all([
    getTranslations('featuresPage'),
    getLocale(),
  ])

  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  const stats = [
    {
      value: t('hero.stats.ratingVal'),
      label: t('hero.stats.ratingLbl'),
    },
    {
      value: t('hero.stats.usersVal'),
      label: t('hero.stats.usersLbl'),
    },
    {
      value: t('hero.stats.settlementVal'),
      label: t('hero.stats.settlementLbl'),
    },
  ]

  return (
    <section {...stylex.props(styles.section)}>
      <div aria-hidden="true" {...stylex.props(styles.auraEnd)} />
      <div aria-hidden="true" {...stylex.props(styles.auraStart)} />

      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.copy)}>
            <div {...stylex.props(styles.badge, styles.riseItem)}>
              <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
              <span {...stylex.props(styles.badgeText)}>{t('hero.badge')}</span>
            </div>

            <h1
              {...stylex.props(styles.headline, styles.riseItem, styles.delay1)}
            >
              {t('hero.headline')}
            </h1>

            <p
              {...stylex.props(
                styles.subheadline,
                styles.riseItem,
                styles.delay2,
              )}
            >
              {t('hero.description')}
            </p>

            <div
              {...stylex.props(styles.actions, styles.riseItem, styles.delay3)}
            >
              <Link
                href="/open-account"
                {...stylex.props(styles.primaryCta, styles.focusRing)}
              >
                <span>{t('hero.ctaOpen')}</span>
                <Arrow
                  aria-hidden="true"
                  size={18}
                  {...stylex.props(styles.ctaIcon)}
                />
              </Link>
              <Link
                href="/compare"
                {...stylex.props(styles.secondaryCta, styles.focusRing)}
              >
                <span>{t('hero.ctaCompare')}</span>
              </Link>
            </div>

            <div
              {...stylex.props(styles.metrics, styles.riseItem, styles.delay4)}
            >
              {stats.map((stat, index) => (
                <Fragment key={stat.label}>
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      {...stylex.props(styles.metricDivider)}
                    />
                  ) : null}
                  <div>
                    <div {...stylex.props(styles.metricValue)}>
                      {stat.value}
                    </div>
                    <div {...stylex.props(styles.metricLabel)}>
                      {stat.label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <FeaturesHeroVisual />
        </div>
      </div>
    </section>
  )
}
