import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { formatCurrency } from '@/i18n/currency'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Cta } from '../ui/cta'
import { Reveal } from '../ui/reveal'

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
  grid: {
    gap: spacing.xl,
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
  },
  imageColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    position: 'relative',
    minWidth: 0,
  },
  imageFrame: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
    position: 'relative',
    height: {
      default: '20rem',
      '@media (min-width: 40rem)': '25rem',
    },
    width: '100%',
  },
  image: {
    objectFit: 'cover',
    transform: {
      default: 'scale(1)',
      ':hover': 'scale(1.04)',
    },
    transitionDuration: '700ms',
    transitionProperty: 'transform',
  },
  regulatedCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.16)',
    display: {
      default: 'none',
      '@media (min-width: 40rem)': 'block',
    },
    insetInlineEnd: '-1.5rem',
    position: 'absolute',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-3px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    zIndex: 10,
    bottom: '-1.5rem',
    maxWidth: '20rem',
  },
  regulatedHeader: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    marginBottom: spacing.xs,
  },
  regulatedIcon: {
    color: colors.primary,
    flexShrink: 0,
  },
  regulatedTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  regulatedText: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
  copyColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    minWidth: 0,
  },
  eyebrow: {
    color: colors.primary,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
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
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  paragraph: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: spacing.md,
  },
  paragraphLast: {
    marginBottom: spacing.lg,
  },
  actions: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
})

export async function Manifesto() {
  const [t, locale] = await Promise.all([
    getTranslations('landing'),
    getLocale(),
  ])

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.imageColumn)}>
          <Reveal>
            <div {...stylex.props(styles.imageFrame)}>
              <Image
                src="/images/manifesto.jpg"
                alt={t('manifesto.imageAlt')}
                fill
                sizes="(min-width: 40rem) 40rem, 100vw"
                {...stylex.props(styles.image)}
              />
            </div>
            <div {...stylex.props(styles.regulatedCard)}>
              <div {...stylex.props(styles.regulatedHeader)}>
                <BadgeCheck
                  aria-hidden="true"
                  size={20}
                  {...stylex.props(styles.regulatedIcon)}
                />
                <h3 {...stylex.props(styles.regulatedTitle)}>
                  {t('manifesto.badgeRegulated')}
                </h3>
              </div>
              <p {...stylex.props(styles.regulatedText)}>
                {t('manifesto.badgeRegulatedSub', {
                  amount: formatCurrency(250000, locale, {
                    maximumFractionDigits: 0,
                  }),
                })}
              </p>
            </div>
          </Reveal>
        </div>

        <div {...stylex.props(styles.copyColumn)}>
          <Reveal delay={0.1}>
            <span {...stylex.props(styles.eyebrow)}>
              {t('manifesto.eyebrow')}
            </span>
            <h2 {...stylex.props(styles.title)}>{t('manifesto.title')}</h2>
            <p {...stylex.props(styles.paragraph)}>
              {t('manifesto.paragraph1')}
            </p>
            <p {...stylex.props(styles.paragraph, styles.paragraphLast)}>
              {t('manifesto.paragraph2')}
            </p>
            <div {...stylex.props(styles.actions)}>
              <Cta href="/about" variant="inverse" size="md">
                {t('manifesto.cta')}
              </Cta>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
