import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Cta } from '../ui/cta'
import { HeroVisual } from './hero-visual'

const fadeUp = stylex.keyframes({
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
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.35,
  },
})

const styles = stylex.create({
  section: {
    marginInline: 'auto',
    overflow: 'hidden',
    paddingInline: spacing.margin,
    position: 'relative',
    maxWidth: '80rem',
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
    width: '100%',
  },
  grid: {
    gap: spacing.xl,
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
  },
  copy: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    minWidth: 0,
  },
  badge: {
    borderRadius: radii.full,
    gap: spacing.xs,
    paddingBlock: '0.25rem',
    paddingInline: spacing.md,
    alignItems: 'center',
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.md,
    width: 'fit-content',
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
    backgroundColor: colors.primary,
    height: 8,
    width: 8,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.025em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
  },
  headline: {
    margin: 0,
    animationDelay: '100ms',
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '3rem',
      '@media (min-width: 64rem)': '4rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: {
      default: 1.08,
      '@media (min-width: 64rem)': 1.125,
    },
    textWrap: 'balance',
    marginBottom: spacing.md,
    maxWidth: '11ch',
  },
  headlineDot: {
    color: colors.primaryContainer,
  },
  subheadline: {
    margin: 0,
    animationDelay: '200ms',
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
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
    animationDelay: '300ms',
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
  },
  metrics: {
    gap: spacing.md,
    animationDelay: '400ms',
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    paddingTop: spacing.md,
  },
  metricValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.6875rem',
  },
  metricLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
})

export async function Hero() {
  const [t, locale] = await Promise.all([
    getTranslations('landing'),
    getLocale(),
  ])

  const headline = t('hero.headline')
  const hasDot = headline.endsWith('.')
  const headlineText = hasDot ? headline.slice(0, -1) : headline
  const headlineDot = hasDot ? headline.slice(-1) : ''
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  const stats = [
    {
      value: t('hero.stats.activeAccountsValue'),
      label: t('hero.stats.activeAccountsLabel'),
    },
    {
      value: t('hero.stats.fxMarkupValue'),
      label: t('hero.stats.fxMarkupLabel'),
    },
    {
      value: t('hero.stats.appStoreRatingValue'),
      label: t('hero.stats.appStoreRatingLabel'),
    },
  ]

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.copy)}>
          <div {...stylex.props(styles.badge)}>
            <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
            <span {...stylex.props(styles.badgeText)}>{t('hero.badge')}</span>
          </div>
          <h1 {...stylex.props(styles.headline)}>
            {headlineText}
            {headlineDot ? (
              <span {...stylex.props(styles.headlineDot)}>{headlineDot}</span>
            ) : null}
          </h1>
          <p {...stylex.props(styles.subheadline)}>{t('hero.subheadline')}</p>
          <div {...stylex.props(styles.actions)}>
            <Cta
              href="/open-account"
              variant="primary"
              size="lg"
              trailingIcon={<Arrow aria-hidden="true" size={20} />}
            >
              {t('hero.ctaPrimary')}
            </Cta>
            <Cta href="/compare" variant="secondary" size="lg">
              {t('hero.ctaSecondary')}
            </Cta>
          </div>
          <div {...stylex.props(styles.metrics)}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div {...stylex.props(styles.metricValue)}>{stat.value}</div>
                <div {...stylex.props(styles.metricLabel)}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
