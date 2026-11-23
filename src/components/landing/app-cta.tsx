import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import appStoreBadge from '../../../assets/Apple Store.svg'
import googlePlayBadge from '../../../assets/google-store-logo.svg'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { AppCtaVisual } from './app-cta-visual'

const styles = stylex.create({
  focusRing: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 3,
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
    marginInline: 'auto',
    paddingBlock: spacing.xl,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  card: {
    padding: {
      default: spacing.xl,
      '@media (min-width: 48rem)': '3.5rem',
    },
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.primaryContainer,
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
    color: colors.onPrimaryContainer,
    position: 'relative',
    width: '100%',
  },
  sheen: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
    position: 'absolute',
    bottom: '-5rem',
    height: '24rem',
    right: '-5rem',
    width: '24rem',
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
      '@media (min-width: 64rem)': 'span 7',
    },
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  headline: {
    margin: 0,
    color: colors.onPrimaryContainer,
    fontFamily: fonts.heading,
    fontSize: {
      default: '2.25rem',
      '@media (min-width: 48rem)': '3rem',
      '@media (min-width: 64rem)': '4rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    textWrap: 'balance',
    marginBottom: spacing.md,
  },
  description: {
    margin: 0,
    color: colors.onPrimaryContainer,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: spacing.lg,
    maxWidth: '28rem',
  },
  checklist: {
    gap: spacing.sm,
    columnGap: spacing.md,
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 40rem)': 'repeat(2, minmax(0, 1fr))',
    },
    marginBottom: spacing.xl,
  },
  checkItem: {
    gap: spacing.sm,
    alignItems: 'center',
    color: colors.onPrimaryContainer,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
  },
  checkIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1.5rem',
    width: '1.5rem',
  },
  badges: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  badgeLink: {
    borderRadius: '0.625rem',
    display: 'inline-flex',
    transform: {
      default: 'scale(1)',
      ':hover': 'scale(1.04)',
      ':active': 'scale(0.97)',
    },
    transitionDuration: '200ms',
    transitionProperty: 'transform',
  },
  badgeImage: {
    borderRadius: '0.625rem',
    display: 'block',
    height: '3.125rem',
    width: 'auto',
  },
  visual: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 5',
    },
    minWidth: 0,
  },
})

export async function AppCta() {
  const t = await getTranslations('landing')

  const headline = t('appCta.headline')
  const headlineParts = headline.split('. ')
  const firstLine =
    headlineParts.length > 1 ? `${headlineParts[0]}.` : headlineParts[0]
  const secondLine = headlineParts.slice(1).join('. ')

  const features = [
    t('appCta.featureInstant'),
    t('appCta.featureSavings'),
    t('appCta.featureWorldwide'),
    t('appCta.featureMobile'),
  ]

  return (
    <section id="app" {...stylex.props(styles.section)}>
      <Reveal>
        <div {...stylex.props(styles.card)}>
          <div aria-hidden="true" {...stylex.props(styles.sheen)} />
          <div {...stylex.props(styles.grid)}>
            <div {...stylex.props(styles.copy)}>
              <h2 {...stylex.props(styles.headline)}>
                {firstLine}
                {secondLine ? (
                  <>
                    <br />
                    {secondLine}
                  </>
                ) : null}
              </h2>
              <p {...stylex.props(styles.description)}>
                {t('appCta.description')}
              </p>
              <div {...stylex.props(styles.checklist)}>
                {features.map((feature) => (
                  <span key={feature} {...stylex.props(styles.checkItem)}>
                    <span {...stylex.props(styles.checkIcon)}>
                      <Check aria-hidden="true" size={16} />
                    </span>
                    {feature}
                  </span>
                ))}
              </div>
              <div {...stylex.props(styles.badges)}>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('appCta.appStore')}
                  {...stylex.props(styles.badgeLink, styles.focusRing)}
                >
                  <Image
                    src={appStoreBadge}
                    alt=""
                    width={149}
                    height={50}
                    unoptimized
                    {...stylex.props(styles.badgeImage)}
                  />
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('appCta.googlePlay')}
                  {...stylex.props(styles.badgeLink, styles.focusRing)}
                >
                  <Image
                    src={googlePlayBadge}
                    alt=""
                    width={169}
                    height={50}
                    unoptimized
                    {...stylex.props(styles.badgeImage)}
                  />
                </a>
              </div>
            </div>

            <div {...stylex.props(styles.visual)}>
              <AppCtaVisual />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
