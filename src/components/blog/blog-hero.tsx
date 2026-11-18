import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  section: {
    paddingBlockEnd: {
      default: '3rem',
      '@media (min-width: 40rem)': '3.5rem',
      '@media (min-width: 64rem)': '4rem',
    },
    paddingBlockStart: {
      default: spacing.xl,
      '@media (min-width: 64rem)': '3rem',
    },
    width: '100%',
  },
  content: {
    marginInline: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    maxWidth: '48rem',
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
    backgroundColor: colors.primary,
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
      default: '2rem',
      '@media (min-width: 40rem)': '2.75rem',
      '@media (min-width: 64rem)': '3.5rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: {
      default: 1.15,
      '@media (min-width: 64rem)': 1.1,
    },
    textWrap: 'balance',
    marginBottom: spacing.md,
  },
  titleDot: {
    color: colors.primaryContainer,
  },
  description: {
    margin: 0,
    marginInline: 'auto',
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    maxWidth: '42rem',
  },
})

export async function BlogHero() {
  const t = await getTranslations('blog')

  const title = t('hero.title')
  const hasDot = title.endsWith('.')
  const titleText = hasDot ? title.slice(0, -1) : title
  const titleDot = hasDot ? title.slice(-1) : ''

  return (
    <section {...stylex.props(styles.section)}>
      <Reveal>
        <div {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.badge)}>
            <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
            <span {...stylex.props(styles.badgeText)}>{t('hero.eyebrow')}</span>
          </div>
          <h1 {...stylex.props(styles.title)}>
            {titleText}
            {titleDot ? (
              <span {...stylex.props(styles.titleDot)}>{titleDot}</span>
            ) : null}
          </h1>
          <p {...stylex.props(styles.description)}>{t('hero.description')}</p>
        </div>
      </Reveal>
    </section>
  )
}
