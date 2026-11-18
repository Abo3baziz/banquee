import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  section: {
    paddingBlock: '3rem',
    width: '100%',
  },
  container: {
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  content: {
    marginInline: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    maxWidth: '44rem',
  },
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
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '2.25rem',
      '@media (min-width: 40rem)': '3rem',
      '@media (min-width: 64rem)': '3.75rem',
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
  subtitle: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: {
      default: '0.9375rem',
      '@media (min-width: 48rem)': '1.0625rem',
    },
    fontWeight: 500,
    lineHeight: 1.625,
    maxWidth: '38rem',
  },
})

export async function CompareHero() {
  const t = await getTranslations('compareCards')

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.badge)}>
            <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
            <span {...stylex.props(styles.badgeText)}>{t('hero.badge')}</span>
          </div>
          <h1 {...stylex.props(styles.title)}>{t('hero.title')}</h1>
          <p {...stylex.props(styles.subtitle)}>{t('hero.subtitle')}</p>
        </div>
      </div>
    </section>
  )
}
