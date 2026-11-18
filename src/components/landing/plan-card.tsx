'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { CircleCheck, CircleMinus } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { BankCard } from '../banking-card'
import type { BankCardTier } from '../banking-card'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Cta } from '../ui/cta'

type Tier = BankCardTier

type PlanCardProps = {
  tier: Tier
  popular?: boolean
}

const CARD_DATA = {
  standard: { number: '1024', cvv: '391' },
  gold: { number: '8820', cvv: '512' },
  premium: { number: '4289', cvv: '842' },
} as const

const styles = stylex.create({
  card: {
    padding: spacing.lg,
    borderColor: 'transparent',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 18px 44px rgba(0, 0, 0, 0.1)',
    },
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  cardPopular: {
    borderColor: colors.primaryContainer,
    boxShadow: {
      default: '0 12px 32px rgba(26, 28, 28, 0.12)',
      ':hover': '0 22px 48px rgba(26, 28, 28, 0.16)',
    },
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
      '@media (min-width: 64rem)': {
        default: 'translateY(-4px)',
        ':hover': 'translateY(-8px)',
      },
    },
  },
  popularBadge: {
    borderRadius: radii.full,
    insetInline: 0,
    marginInline: 'auto',
    paddingBlock: '0.125rem',
    paddingInline: spacing.md,
    backgroundColor: colors.primary,
    color: colors.onPrimary,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    position: 'absolute',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    zIndex: 5,
    top: '-0.75rem',
    width: 'fit-content',
  },
  popularBadgeArabic: {
    letterSpacing: 0,
  },
  visual: {
    marginInline: 'auto',
    marginBottom: spacing.lg,
    maxWidth: '26rem',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  planName: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.6875rem',
  },
  priceRow: {
    gap: '0.25rem',
    marginBlock: spacing.sm,
    alignItems: 'baseline',
    display: 'flex',
  },
  price: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '2.5rem',
  },
  billing: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    marginBottom: spacing.md,
  },
  features: {
    margin: 0,
    padding: 0,
    gap: spacing.sm,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: spacing.lg,
  },
  feature: {
    gap: spacing.sm,
    alignItems: 'flex-start',
    color: colors.onSurface,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
  featureDisabled: {
    color: 'rgba(62, 73, 70, 0.6)',
  },
  featureIcon: {
    color: colors.primary,
    flexShrink: 0,
    marginTop: 1,
  },
  featureIconDisabled: {
    color: 'rgba(62, 73, 70, 0.6)',
    flexShrink: 0,
    marginTop: 1,
  },
})

export function PlanCard({ tier, popular = false }: PlanCardProps) {
  const t = useTranslations('landing')
  const tm = useTranslations('mockups')
  const locale = useLocale()
  const [flipped, setFlipped] = useState(false)

  const data = CARD_DATA[tier]
  const name = t(`plans.tiers.${tier}.name`)
  const flipLabel = String(t.raw('plans.flipCard')).replace('{{tier}}', name)
  const isGold = tier === 'gold'

  const features = [
    t(`plans.tiers.${tier}.feature1`),
    t(`plans.tiers.${tier}.feature2`),
    t(`plans.tiers.${tier}.feature3`),
  ]

  return (
    <article {...stylex.props(styles.card, popular && styles.cardPopular)}>
      {popular ? (
        <span
          {...stylex.props(
            styles.popularBadge,
            locale === 'ar' && styles.popularBadgeArabic,
          )}
        >
          {t('plans.popularBadge')}
        </span>
      ) : null}

      <div {...stylex.props(styles.visual)}>
        <BankCard
          tier={tier}
          network={tier === 'premium' ? 'visa' : 'mastercard'}
          lastFour={data.number}
          label={t(`plans.tiers.${tier}.cardLabel`)}
          cardholderName={tm('cardsManagement.cardHolderName')}
          cardholderLabel={tm('cardsManagement.cardHolderLabel')}
          expiryDate={tm('cardsManagement.expiryDate')}
          expiryLabel={tm('cardsManagement.expiresLabel')}
          cvv={data.cvv}
          flipped={flipped}
          onFlip={() => setFlipped((value) => !value)}
          flipLabel={flipLabel}
          flipHint={t('hero.flipHint')}
          backLabels={{
            cvvLabel: t('hero.cvvLabel'),
            signatureLabel: tm('cardsManagement.cardHolderName'),
            finePrint: t('plans.cardFinePrint'),
          }}
        />
      </div>

      <div {...stylex.props(styles.content)}>
        <h3 {...stylex.props(styles.planName)}>{name}</h3>
        <div {...stylex.props(styles.priceRow)}>
          <span {...stylex.props(styles.price)}>
            {t(`plans.tiers.${tier}.price`)}
          </span>
          <span {...stylex.props(styles.billing)}>
            {t(`plans.tiers.${tier}.billing`)}
          </span>
        </div>
        <p {...stylex.props(styles.description)}>
          {t(`plans.tiers.${tier}.description`)}
        </p>
        <ul {...stylex.props(styles.features)}>
          {features.map((feature) => (
            <li key={feature} {...stylex.props(styles.feature)}>
              <CircleCheck
                aria-hidden="true"
                size={18}
                {...stylex.props(styles.featureIcon)}
              />
              <span>{feature}</span>
            </li>
          ))}
          {tier === 'standard' ? (
            <li {...stylex.props(styles.feature, styles.featureDisabled)}>
              <CircleMinus
                aria-hidden="true"
                size={18}
                {...stylex.props(styles.featureIconDisabled)}
              />
              <span>{t('plans.tiers.standard.feature4Disabled')}</span>
            </li>
          ) : (
            <li {...stylex.props(styles.feature)}>
              <CircleCheck
                aria-hidden="true"
                size={18}
                {...stylex.props(styles.featureIcon)}
              />
              <span>{t(`plans.tiers.${tier}.feature4`)}</span>
            </li>
          )}
        </ul>
        <Cta
          href="/open-account"
          variant={isGold ? 'primary' : 'secondary'}
          size="sm"
          fullWidth
        >
          {t(`plans.tiers.${tier}.cta`)}
        </Cta>
      </div>
    </article>
  )
}
