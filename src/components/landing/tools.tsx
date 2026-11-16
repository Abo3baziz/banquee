import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import {
  ArrowLeftRight,
  CreditCard,
  Globe,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import amazonPayLogo from '../../../assets/amazon-pay-logo.svg'
import applePayLogo from '../../../assets/apple-pay-logo.svg'
import bitcoinLogo from '../../../assets/bitcoin-logo.svg'
import googlePayLogo from '../../../assets/google-pay-logo.svg'
import mastercardLogo from '../../../assets/mastercard-logo.svg'
import paypalLogo from '../../../assets/paypal-logo.svg'
import shopifyLogo from '../../../assets/shopify-logo.svg'
import visaLogo from '../../../assets/visa-logo.svg'
import webflowLogo from '../../../assets/webflow-logo.svg'
import zapierLogo from '../../../assets/zapier-logo.svg'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const PAYMENT_LOGOS = [
  {
    key: 'visa',
    labelKey: 'tools.networks.visa',
    src: visaLogo,
    width: 94,
    height: 60,
  },
  {
    key: 'mastercard',
    labelKey: 'tools.networks.mastercard',
    src: mastercardLogo,
    width: 73,
    height: 60,
  },
  {
    key: 'paypal',
    labelKey: 'tools.networks.paypal',
    src: paypalLogo,
    width: 126,
    height: 60,
  },
  {
    key: 'applePay',
    labelKey: 'tools.networks.applePay',
    src: applePayLogo,
    width: 93,
    height: 60,
  },
  {
    key: 'googlePay',
    labelKey: 'tools.networks.googlePay',
    src: googlePayLogo,
    width: 95,
    height: 60,
  },
  {
    key: 'amazonPay',
    labelKey: 'tools.networks.amazonPay',
    src: amazonPayLogo,
    width: 163,
    height: 60,
  },
] as const

const INTEGRATION_LOGOS = [
  {
    key: 'shopify',
    labelKey: 'tools.integrations.shopify',
    src: shopifyLogo,
    width: 138,
    height: 60,
  },
  {
    key: 'webflow',
    labelKey: 'tools.integrations.webflow',
    src: webflowLogo,
    width: 132,
    height: 60,
  },
  {
    key: 'zapier',
    labelKey: 'tools.integrations.zapier',
    src: zapierLogo,
    width: 98,
    height: 60,
  },
  {
    key: 'bitcoin',
    labelKey: 'tools.crypto.bitcoin',
    src: bitcoinLogo,
    width: 152,
    height: 60,
    badgeKey: 'tools.crypto.bitcoinSymbol',
  },
] as const

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
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  titleDot: {
    color: colors.primaryContainer,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  showcase: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 48rem)': spacing.xl,
    },
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    marginBottom: spacing.xl,
  },
  group: {
    marginBottom: spacing.lg,
  },
  groupLast: {
    marginBottom: 0,
  },
  groupHeader: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    marginBottom: spacing.md,
  },
  groupIcon: {
    color: colors.primary,
    flexShrink: 0,
  },
  groupTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  paymentGrid: {
    gap: spacing.md,
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 48rem)': 'repeat(3, minmax(0, 1fr))',
      '@media (min-width: 64rem)': 'repeat(6, minmax(0, 1fr))',
    },
  },
  integrationGrid: {
    gap: spacing.md,
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 40rem)': 'repeat(4, minmax(0, 1fr))',
    },
  },
  tile: {
    padding: spacing.md,
    borderColor: {
      default: 'rgba(217, 217, 217, 0.3)',
      ':hover': 'rgba(0, 107, 92, 0.4)',
    },
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: spacing.sm,
    alignItems: 'center',
    backgroundColor: {
      default: 'rgba(243, 243, 243, 0.6)',
      ':hover': colors.surfaceLight,
    },
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.03)',
      ':hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-3px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow, background-color, border-color',
    height: '100%',
    minHeight: '7rem',
  },
  logo: {
    display: 'block',
    objectFit: 'contain',
    height: '3.5rem',
    maxWidth: '100%',
    width: 'auto',
  },
  labelRow: {
    gap: '0.375rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1rem',
    textAlign: 'center',
  },
  symbol: {
    borderRadius: radii.sm,
    paddingBlock: '0.125rem',
    paddingInline: '0.375rem',
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.mono,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  features: {
    gap: spacing.lg,
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  featureCard: {
    padding: spacing.lg,
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-3px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  featureIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '3rem',
    width: '3rem',
  },
  featureTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
})

export async function Tools() {
  const t = await getTranslations('landing')

  const title = t('tools.title')
  const hasDot = title.endsWith('.')
  const titleText = hasDot ? title.slice(0, -1) : title
  const titleDot = hasDot ? title.slice(-1) : ''

  const features = [
    { title: t('tools.pillSecure'), icon: ShieldCheck },
    { title: t('tools.pillApi'), icon: Terminal },
    { title: t('tools.pillWorldwide'), icon: Globe },
  ]

  return (
    <section id="integrations" {...stylex.props(styles.section)}>
      <Reveal>
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.badge)}>
            <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
            <span {...stylex.props(styles.badgeText)}>
              {t('tools.eyebrow')}
            </span>
          </div>
          <h2 {...stylex.props(styles.title)}>
            {titleText}
            {titleDot ? (
              <span {...stylex.props(styles.titleDot)}>{titleDot}</span>
            ) : null}
          </h2>
          <p {...stylex.props(styles.description)}>{t('tools.description')}</p>
        </div>
      </Reveal>

      <Reveal>
        <div {...stylex.props(styles.showcase)}>
          <div {...stylex.props(styles.group)}>
            <div {...stylex.props(styles.groupHeader)}>
              <CreditCard
                aria-hidden="true"
                size={20}
                {...stylex.props(styles.groupIcon)}
              />
              <h3 {...stylex.props(styles.groupTitle)}>
                {t('tools.groupPaymentNetworks')}
              </h3>
            </div>
            <div {...stylex.props(styles.paymentGrid)}>
              {PAYMENT_LOGOS.map((logo, index) => (
                <Reveal key={logo.key} delay={index * 0.05}>
                  <div {...stylex.props(styles.tile)}>
                    <Image
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                      {...stylex.props(styles.logo)}
                    />
                    <span {...stylex.props(styles.label)}>
                      {t(logo.labelKey)}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div {...stylex.props(styles.group, styles.groupLast)}>
            <div {...stylex.props(styles.groupHeader)}>
              <ArrowLeftRight
                aria-hidden="true"
                size={20}
                {...stylex.props(styles.groupIcon)}
              />
              <h3 {...stylex.props(styles.groupTitle)}>
                {t('tools.groupIntegrations')}
              </h3>
            </div>
            <div {...stylex.props(styles.integrationGrid)}>
              {INTEGRATION_LOGOS.map((logo, index) => (
                <Reveal key={logo.key} delay={index * 0.05}>
                  <div {...stylex.props(styles.tile)}>
                    <Image
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                      {...stylex.props(styles.logo)}
                    />
                    <span {...stylex.props(styles.labelRow)}>
                      <span {...stylex.props(styles.label)}>
                        {t(logo.labelKey)}
                      </span>
                      {'badgeKey' in logo ? (
                        <span {...stylex.props(styles.symbol)}>
                          {t(logo.badgeKey)}
                        </span>
                      ) : null}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div {...stylex.props(styles.features)}>
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div {...stylex.props(styles.featureCard)}>
                <span {...stylex.props(styles.featureIcon)}>
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h3 {...stylex.props(styles.featureTitle)}>{feature.title}</h3>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
