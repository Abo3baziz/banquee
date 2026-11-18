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
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    paddingBlockEnd: '2rem',
    paddingBlockStart: '4rem',
    width: '100%',
  },
  content: {
    marginInline: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    maxWidth: '60rem',
  },
  eyebrow: {
    borderRadius: radii.full,
    gap: spacing.xs,
    paddingBlock: '0.375rem',
    paddingInline: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.md,
  },
  eyebrowDot: {
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
  eyebrowText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
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
      '@media (min-width: 64rem)': '3.5rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
    textWrap: 'balance',
  },
  description: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    marginTop: spacing.md,
    maxWidth: '42rem',
  },
})

export async function SupportHero() {
  const t = await getTranslations('support')

  return (
    <section aria-labelledby="support-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.content)}>
        <Reveal>
          <div {...stylex.props(styles.eyebrow)}>
            <span aria-hidden="true" {...stylex.props(styles.eyebrowDot)} />
            <span {...stylex.props(styles.eyebrowText)}>
              {t('hero.eyebrow')}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 id="support-title" {...stylex.props(styles.title)}>
            {t('hero.title')}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p {...stylex.props(styles.description)}>{t('hero.description')}</p>
        </Reveal>
      </div>
    </section>
  )
}
