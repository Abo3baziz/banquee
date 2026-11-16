import * as stylex from '@stylexjs/stylex'
import { Quote } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

const TESTIMONIALS = ['sarah', 'guy', 'jenny', 'cody', 'darlene'] as const

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  section: {
    marginInline: 'auto',
    paddingBlock: spacing.xl,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  header: {
    marginInline: 'auto',
    textAlign: 'center',
    marginBottom: spacing.xl,
    maxWidth: '36rem',
  },
  badge: {
    borderRadius: radii.full,
    gap: spacing.xs,
    paddingBlock: '0.25rem',
    paddingInline: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.xs,
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
      default: '1.5rem',
      '@media (min-width: 48rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    textWrap: 'balance',
    marginTop: spacing.xs,
  },
  grid: {
    gap: spacing.lg,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 40rem)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 64rem)': 'repeat(6, minmax(0, 1fr))',
    },
  },
  cardCell: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 64rem)': 'span 2',
    },
    display: 'flex',
  },
  cardCellOffset: {
    gridColumn: {
      '@media (min-width: 64rem)': '2 / span 2',
    },
  },
  cardCellLast: {
    gridColumn: {
      '@media (min-width: 40rem)': '1 / -1',
      '@media (min-width: 64rem)': '4 / span 2',
    },
  },
  card: {
    padding: spacing.lg,
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 12px 32px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  quoteIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    height: '2.5rem',
    marginBottom: spacing.md,
    width: '2.5rem',
  },
  cardTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    marginBottom: spacing.xs,
  },
  quote: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: spacing.lg,
  },
  footer: {
    borderTopColor: 'rgba(217, 217, 217, 0.2)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  author: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  role: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
})

export async function Testimonials() {
  const t = await getTranslations('landing')

  return (
    <section id="testimonials" {...stylex.props(styles.section)}>
      <Reveal>
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.badge)}>
            <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
            <span {...stylex.props(styles.badgeText)}>
              {t('testimonials.eyebrow')}
            </span>
          </div>
          <h2 {...stylex.props(styles.title)}>{t('testimonials.title')}</h2>
        </div>
      </Reveal>

      <div {...stylex.props(styles.grid)}>
        {TESTIMONIALS.map((key, index) => {
          const cell = stylex.props(
            styles.cardCell,
            index === 3 && styles.cardCellOffset,
            index === 4 && styles.cardCellLast,
          )

          return (
            <Reveal
              key={key}
              className={cell.className}
              style={cell.style}
              delay={index * 0.06}
            >
              <article {...stylex.props(styles.card)}>
                <div>
                  <span {...stylex.props(styles.quoteIcon)}>
                    <Quote aria-hidden="true" size={22} />
                  </span>
                  <h3 {...stylex.props(styles.cardTitle)}>
                    {t(`testimonials.items.${key}.title`)}
                  </h3>
                  <p {...stylex.props(styles.quote)}>
                    <q>{t(`testimonials.items.${key}.quote`)}</q>
                  </p>
                </div>
                <div {...stylex.props(styles.footer)}>
                  <div {...stylex.props(styles.author)}>
                    {t(`testimonials.items.${key}.author`)}
                  </div>
                  <div {...stylex.props(styles.role)}>
                    {t(`testimonials.items.${key}.role`)}
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
