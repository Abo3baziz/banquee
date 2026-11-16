import * as stylex from '@stylexjs/stylex'
import {
  ArrowLeft,
  ArrowRight,
  ReceiptText,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { SendReceiveVisual } from './send-receive-visual'

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
    backgroundColor: 'rgba(243, 243, 243, 0.6)',
    borderBottomColor: 'rgba(217, 217, 217, 0.2)',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderTopColor: 'rgba(217, 217, 217, 0.2)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    width: '100%',
  },
  container: {
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
  copyColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    minWidth: 0,
  },
  visualColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    minWidth: 0,
  },
  badge: {
    borderRadius: radii.full,
    gap: spacing.xs,
    paddingBlock: '0.25rem',
    paddingInline: spacing.md,
    alignItems: 'center',
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
      '@media (min-width: 40rem)': '2.75rem',
      '@media (min-width: 64rem)': '3rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.12,
    textWrap: 'balance',
    marginBottom: spacing.md,
  },
  titleDot: {
    color: colors.primaryContainer,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    marginBottom: spacing.xl,
    maxWidth: '36rem',
  },
  features: {
    gap: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: spacing.xl,
  },
  feature: {
    gap: spacing.md,
    alignItems: 'flex-start',
    display: 'flex',
  },
  featureIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primaryContainer,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '3rem',
    width: '3rem',
  },
  featureBody: {
    minWidth: 0,
    paddingTop: '0.125rem',
  },
  featureTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    marginBottom: '0.125rem',
  },
  featureDescription: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
  actions: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  primaryCta: {
    borderRadius: radii.md,
    gap: spacing.xs,
    paddingBlock: '0.75rem',
    paddingInline: spacing.xl,
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
  ctaIcon: {
    flexShrink: 0,
  },
  secondaryCta: {
    borderRadius: radii.md,
    paddingBlock: '0.75rem',
    paddingInline: spacing.md,
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
})

export async function SendReceive() {
  const [t, locale] = await Promise.all([
    getTranslations('landing'),
    getLocale(),
  ])

  const title = t('sendReceive.title')
  const hasDot = title.endsWith('.')
  const titleText = hasDot ? title.slice(0, -1) : title
  const titleDot = hasDot ? title.slice(-1) : ''
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  const features = [
    {
      title: t('sendReceive.feature1Title'),
      description: t('sendReceive.feature1Desc'),
      icon: Zap,
    },
    {
      title: t('sendReceive.feature2Title'),
      description: t('sendReceive.feature2Desc'),
      icon: ShieldCheck,
    },
    {
      title: t('sendReceive.feature3Title'),
      description: t('sendReceive.feature3Desc'),
      icon: ReceiptText,
    },
  ]

  return (
    <section id="transfers" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid)}>
          <div {...stylex.props(styles.copyColumn)}>
            <Reveal>
              <div {...stylex.props(styles.badge)}>
                <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
                <span {...stylex.props(styles.badgeText)}>
                  {t('sendReceive.eyebrow')}
                </span>
              </div>
              <h2 {...stylex.props(styles.title)}>
                {titleText}
                {titleDot ? (
                  <span {...stylex.props(styles.titleDot)}>{titleDot}</span>
                ) : null}
              </h2>
              <p {...stylex.props(styles.description)}>
                {t('sendReceive.description')}
              </p>
              <div {...stylex.props(styles.features)}>
                {features.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <div key={feature.title} {...stylex.props(styles.feature)}>
                      <span {...stylex.props(styles.featureIcon)}>
                        <Icon aria-hidden="true" size={24} />
                      </span>
                      <div {...stylex.props(styles.featureBody)}>
                        <h3 {...stylex.props(styles.featureTitle)}>
                          {feature.title}
                        </h3>
                        <p {...stylex.props(styles.featureDescription)}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div {...stylex.props(styles.actions)}>
                <Link
                  href="/open-account"
                  {...stylex.props(styles.primaryCta, styles.focusRing)}
                >
                  <span>{t('sendReceive.ctaStart')}</span>
                  <Arrow
                    aria-hidden="true"
                    size={18}
                    {...stylex.props(styles.ctaIcon)}
                  />
                </Link>
                <Link
                  href="/features"
                  {...stylex.props(styles.secondaryCta, styles.focusRing)}
                >
                  {t('sendReceive.ctaLearn')}
                </Link>
              </div>
            </Reveal>
          </div>

          <div {...stylex.props(styles.visualColumn)}>
            <Reveal delay={0.1}>
              <SendReceiveVisual />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
