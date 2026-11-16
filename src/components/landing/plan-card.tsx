'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { CircleCheck, CircleMinus, Cpu, Nfc, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

type Tier = 'standard' | 'gold' | 'premium'

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
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
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
  popularBadge: {
    borderRadius: radii.full,
    paddingBlock: '0.125rem',
    paddingInline: spacing.md,
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    insetInlineStart: '50%',
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    position: 'absolute',
    textTransform: 'uppercase',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    zIndex: 5,
    top: '-0.75rem',
  },
  visual: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  flipButton: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    display: 'block',
    perspective: '1200px',
    position: 'relative',
    height: '11rem',
    width: '100%',
  },
  flipInner: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    transitionDuration: {
      default: '600ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform',
    height: '100%',
    width: '100%',
  },
  flipInnerFlipped: {
    transform: 'rotateY(180deg)',
  },
  face: {
    inset: 0,
    padding: spacing.md,
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  frontStandard: {
    borderColor: 'rgba(217, 217, 217, 0.4)',
    backgroundColor: colors.surfaceLight,
    color: colors.onSurface,
  },
  frontGold: {
    borderColor: 'rgba(222, 179, 104, 0.7)',
    backgroundImage: 'linear-gradient(135deg, #deb368, #f2d79e, #cd9e4b)',
    color: colors.onSecondaryFixed,
  },
  frontPremium: {
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: colors.onSurface,
    color: colors.surfaceLight,
  },
  backStandard: {
    padding: 0,
    borderColor: 'rgba(217, 217, 217, 0.5)',
    backgroundColor: '#eceef0',
    color: colors.onSurface,
    transform: 'rotateY(180deg)',
  },
  backGold: {
    padding: 0,
    borderColor: 'rgba(212, 167, 80, 0.4)',
    backgroundImage: 'linear-gradient(225deg, #c7963a, #e7c57e, #b38024)',
    color: colors.onSecondaryFixed,
    transform: 'rotateY(180deg)',
  },
  backPremium: {
    padding: 0,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: '#141616',
    color: colors.surfaceLight,
    transform: 'rotateY(180deg)',
  },
  topRow: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  brand: {
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  brandStandard: {
    color: colors.primary,
  },
  brandGold: {
    color: colors.onSecondaryFixed,
  },
  brandPremium: {
    color: colors.surfaceLight,
  },
  dotStandard: {
    color: colors.primaryContainer,
  },
  dotGold: {
    color: colors.onSecondaryContainer,
  },
  dotPremium: {
    color: colors.primaryContainer,
  },
  topRight: {
    gap: '0.375rem',
    alignItems: 'center',
    display: 'flex',
  },
  flipHint: {
    borderRadius: radii.full,
    gap: '0.25rem',
    paddingBlock: 2,
    paddingInline: 8,
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  flipHintStandard: {
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurfaceVariant,
  },
  flipHintGold: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: colors.onSecondaryFixed,
  },
  flipHintPremium: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  contactlessStandard: {
    color: colors.onSurfaceVariant,
  },
  contactlessGold: {
    color: colors.onSecondaryFixed,
  },
  steelBadge: {
    color: colors.primaryFixed,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  bottomRow: {
    gap: spacing.sm,
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  chip: {
    borderRadius: 4,
    height: 20,
    marginBottom: 8,
    width: 28,
  },
  chipStandard: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  chipGold: {
    backgroundColor: 'rgba(28, 27, 32, 0.18)',
  },
  chipPremium: {
    backgroundColor: 'rgba(226, 226, 226, 0.2)',
  },
  cardLabel: {
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.75rem',
    textTransform: 'uppercase',
  },
  labelStandard: {
    color: colors.onSurfaceVariant,
  },
  labelGold: {
    color: 'rgba(28, 27, 32, 0.7)',
  },
  labelPremium: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  number: {
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    lineHeight: '1.125rem',
  },
  numberStandard: {
    color: colors.onSurface,
  },
  numberGold: {
    color: colors.onSecondaryFixed,
  },
  numberPremium: {
    color: colors.surfaceLight,
  },
  logoRow: {
    alignItems: 'center',
    display: 'flex',
  },
  mastercard: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(186, 26, 26, 0.9)',
    display: 'block',
    height: 24,
    width: 24,
  },
  mastercardInner: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(244, 217, 160, 0.9)',
    display: 'block',
    marginBlockStart: 4,
    marginInlineStart: -8,
    height: 16,
    width: 16,
  },
  mastercardSmall: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(186, 26, 26, 0.9)',
    display: 'block',
    height: 16,
    width: 16,
  },
  mastercardInnerSmall: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(244, 217, 160, 0.9)',
    display: 'block',
    marginBlockStart: 2.5,
    marginInlineStart: -5,
    height: 11,
    width: 11,
  },
  visa: {
    fontFamily: fonts.heading,
    fontSize: '1rem',
    fontStyle: 'italic',
    fontWeight: 900,
    letterSpacing: '-0.05em',
    lineHeight: '1.25rem',
  },
  visaStandard: {
    color: colors.primary,
  },
  visaGold: {
    color: colors.onSecondaryFixed,
  },
  visaPremium: {
    color: colors.surfaceLight,
  },
  stripe: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    height: '1.75rem',
    marginTop: '0.625rem',
    width: '100%',
  },
  backContent: {
    gap: spacing.sm,
    paddingInline: spacing.md,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0.5rem',
  },
  backLeft: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  signature: {
    borderRadius: 4,
    paddingInline: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(232, 232, 232, 0.9)',
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.25), rgba(255,255,255,0.25) 5px, rgba(220,220,220,0.1) 5px, rgba(220,220,220,0.1) 10px)',
    display: 'flex',
    justifyContent: 'flex-end',
    height: 24,
    maxWidth: '55%',
    width: 144,
  },
  signatureText: {
    overflow: 'hidden',
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cvvGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  cvvLabel: {
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.75rem',
    textTransform: 'uppercase',
  },
  cvvLabelStandard: {
    color: colors.onSurfaceVariant,
  },
  cvvLabelGold: {
    color: 'rgba(28, 27, 32, 0.7)',
  },
  cvvLabelPremium: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  cvvValue: {
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBlock: 2,
    paddingInline: 6,
    fontFamily: fonts.mono,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  cvvValueStandard: {
    borderColor: colors.divider,
    backgroundColor: colors.surfaceLight,
    color: colors.onSurface,
  },
  cvvValueGold: {
    borderColor: 'rgba(222, 179, 104, 0.7)',
    backgroundColor: '#fff9ec',
    color: colors.onSecondaryFixed,
  },
  cvvValuePremium: {
    borderColor: 'rgba(0, 107, 92, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: colors.primaryFixed,
  },
  backToken: {
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: 20,
    width: 28,
  },
  backTokenStandard: {
    borderColor: colors.divider,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    color: colors.onSurfaceVariant,
  },
  backTokenGold: {
    borderColor: 'rgba(222, 179, 104, 0.7)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: colors.onSecondaryFixed,
  },
  backTokenPremium: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: colors.primaryFixed,
  },
  backBottom: {
    paddingInline: spacing.md,
    marginTop: 'auto',
    paddingBottom: '0.75rem',
  },
  finePrint: {
    margin: 0,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    lineHeight: 1.2,
    marginBottom: 4,
  },
  finePrintStandard: {
    color: colors.onSurfaceVariant,
  },
  finePrintGold: {
    color: 'rgba(28, 27, 32, 0.8)',
  },
  finePrintPremium: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  backFooter: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: 4,
  },
  backFooterStandard: {
    borderTopColor: 'rgba(217, 217, 217, 0.4)',
  },
  backFooterGold: {
    borderTopColor: 'rgba(28, 27, 32, 0.2)',
  },
  backFooterPremium: {
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  backBrand: {
    fontFamily: fonts.heading,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  backBrandStandard: {
    color: colors.primary,
  },
  backBrandGold: {
    color: colors.onSecondaryFixed,
  },
  backBrandPremium: {
    color: colors.surfaceLight,
  },
  backMeta: {
    fontFamily: fonts.mono,
    fontSize: '0.5625rem',
    letterSpacing: '0.05em',
    lineHeight: '0.75rem',
    textTransform: 'uppercase',
  },
  backMetaStandard: {
    color: colors.onSurfaceVariant,
  },
  backMetaGold: {
    color: 'rgba(28, 27, 32, 0.7)',
  },
  backMetaPremium: {
    color: 'rgba(255, 255, 255, 0.5)',
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
  cta: {
    borderRadius: radii.md,
    paddingBlock: '0.625rem',
    paddingInline: spacing.md,
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    justifyContent: 'center',
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transform: {
      default: null,
      ':active': 'scale(0.97)',
    },
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color, transform',
    width: '100%',
  },
  ctaSecondary: {
    backgroundColor: {
      default: colors.surfaceContainer,
      ':hover': colors.surfaceContainerHigh,
    },
    color: colors.onSurface,
  },
  ctaPrimary: {
    backgroundColor: {
      default: colors.primaryContainer,
      ':hover': colors.primary,
    },
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
    color: {
      default: colors.onPrimaryContainer,
      ':hover': colors.onPrimary,
    },
  },
})

export function PlanCard({ tier, popular = false }: PlanCardProps) {
  const t = useTranslations('landing')
  const tm = useTranslations('mockups')
  const [flipped, setFlipped] = useState(false)

  const data = CARD_DATA[tier]
  const name = t(`plans.tiers.${tier}.name`)
  const flipLabel = String(t.raw('plans.flipCard')).replace('{{tier}}', name)
  const isGold = tier === 'gold'
  const isPremium = tier === 'premium'
  const brandDotStyle = isGold
    ? styles.dotGold
    : isPremium
      ? styles.dotPremium
      : styles.dotStandard
  const faceFrontStyle = isGold
    ? styles.frontGold
    : isPremium
      ? styles.frontPremium
      : styles.frontStandard
  const faceBackStyle = isGold
    ? styles.backGold
    : isPremium
      ? styles.backPremium
      : styles.backStandard
  const brandStyle = isGold
    ? styles.brandGold
    : isPremium
      ? styles.brandPremium
      : styles.brandStandard
  const flipHintStyle = isGold
    ? styles.flipHintGold
    : isPremium
      ? styles.flipHintPremium
      : styles.flipHintStandard
  const chipStyle = isGold
    ? styles.chipGold
    : isPremium
      ? styles.chipPremium
      : styles.chipStandard
  const labelStyle = isGold
    ? styles.labelGold
    : isPremium
      ? styles.labelPremium
      : styles.labelStandard
  const numberStyle = isGold
    ? styles.numberGold
    : isPremium
      ? styles.numberPremium
      : styles.numberStandard
  const visaStyle = isGold
    ? styles.visaGold
    : isPremium
      ? styles.visaPremium
      : styles.visaStandard
  const cvvLabelStyle = isGold
    ? styles.cvvLabelGold
    : isPremium
      ? styles.cvvLabelPremium
      : styles.cvvLabelStandard
  const cvvValueStyle = isGold
    ? styles.cvvValueGold
    : isPremium
      ? styles.cvvValuePremium
      : styles.cvvValueStandard
  const backTokenStyle = isGold
    ? styles.backTokenGold
    : isPremium
      ? styles.backTokenPremium
      : styles.backTokenStandard
  const finePrintStyle = isGold
    ? styles.finePrintGold
    : isPremium
      ? styles.finePrintPremium
      : styles.finePrintStandard
  const backFooterStyle = isGold
    ? styles.backFooterGold
    : isPremium
      ? styles.backFooterPremium
      : styles.backFooterStandard
  const backBrandStyle = isGold
    ? styles.backBrandGold
    : isPremium
      ? styles.backBrandPremium
      : styles.backBrandStandard
  const backMetaStyle = isGold
    ? styles.backMetaGold
    : isPremium
      ? styles.backMetaPremium
      : styles.backMetaStandard

  const features = [
    t(`plans.tiers.${tier}.feature1`),
    t(`plans.tiers.${tier}.feature2`),
    t(`plans.tiers.${tier}.feature3`),
  ]

  return (
    <article {...stylex.props(styles.card)}>
      {popular ? (
        <span {...stylex.props(styles.popularBadge)}>
          {t('plans.popularBadge')}
        </span>
      ) : null}

      <div {...stylex.props(styles.visual)}>
        <button
          type="button"
          dir="ltr"
          aria-label={flipLabel}
          aria-pressed={flipped}
          onClick={() => setFlipped((value) => !value)}
          {...stylex.props(styles.flipButton, styles.focusRing)}
        >
          <div
            {...stylex.props(
              styles.flipInner,
              flipped && styles.flipInnerFlipped,
            )}
          >
            <div
              aria-hidden="true"
              {...stylex.props(styles.face, faceFrontStyle)}
            >
              <div {...stylex.props(styles.topRow)}>
                <span {...stylex.props(styles.brand, brandStyle)}>
                  banquee
                  <span {...stylex.props(brandDotStyle)}>.</span>
                </span>
                <div {...stylex.props(styles.topRight)}>
                  <span {...stylex.props(styles.flipHint, flipHintStyle)}>
                    <RefreshCw aria-hidden="true" size={13} />
                    {t('hero.flipHint')}
                  </span>
                  {isPremium ? (
                    <span {...stylex.props(styles.steelBadge)}>
                      {t('plans.steelBadge')}
                    </span>
                  ) : (
                    <Nfc
                      aria-hidden="true"
                      size={20}
                      {...stylex.props(
                        isGold
                          ? styles.contactlessGold
                          : styles.contactlessStandard,
                      )}
                    />
                  )}
                </div>
              </div>
              <div {...stylex.props(styles.bottomRow)}>
                <div>
                  <div
                    {...stylex.props(styles.chip, chipStyle)}
                    aria-hidden="true"
                  />
                  <span {...stylex.props(styles.cardLabel, labelStyle)}>
                    {t(`plans.tiers.${tier}.cardLabel`)}
                  </span>
                  <div {...stylex.props(styles.number, numberStyle)}>
                    {`•••• •••• •••• ${data.number}`}
                  </div>
                </div>
                {isPremium ? (
                  <span {...stylex.props(styles.visa, visaStyle)}>VISA</span>
                ) : (
                  <div {...stylex.props(styles.logoRow)} aria-hidden="true">
                    <span {...stylex.props(styles.mastercard)} />
                    <span {...stylex.props(styles.mastercardInner)} />
                  </div>
                )}
              </div>
            </div>

            <div
              aria-hidden="true"
              {...stylex.props(styles.face, faceBackStyle)}
            >
              <div {...stylex.props(styles.stripe)} />
              <div {...stylex.props(styles.backContent)}>
                <div {...stylex.props(styles.backLeft)}>
                  <div {...stylex.props(styles.signature)}>
                    <span {...stylex.props(styles.signatureText)}>
                      {tm('cardsManagement.cardHolderName')}
                    </span>
                  </div>
                  <div {...stylex.props(styles.cvvGroup)}>
                    <span {...stylex.props(styles.cvvLabel, cvvLabelStyle)}>
                      {t('hero.cvvLabel')}
                    </span>
                    <span {...stylex.props(styles.cvvValue, cvvValueStyle)}>
                      {data.cvv}
                    </span>
                  </div>
                </div>
                <div {...stylex.props(styles.backToken, backTokenStyle)}>
                  <Cpu aria-hidden="true" size={14} />
                </div>
              </div>
              <div {...stylex.props(styles.backBottom)}>
                <p {...stylex.props(styles.finePrint, finePrintStyle)}>
                  {t('plans.cardFinePrint')}
                </p>
                <div {...stylex.props(styles.backFooter, backFooterStyle)}>
                  <span {...stylex.props(styles.backBrand, backBrandStyle)}>
                    banquee
                    <span {...stylex.props(brandDotStyle)}>.</span>
                  </span>
                  <span {...stylex.props(styles.backMeta, backMetaStyle)}>
                    {isPremium
                      ? `${t('plans.tiers.premium.name')} ${t('plans.steelBadge')}`
                      : t(`plans.tiers.${tier}.cardLabel`)}
                  </span>
                  {isPremium ? (
                    <span {...stylex.props(styles.visa, visaStyle)}>VISA</span>
                  ) : (
                    <div {...stylex.props(styles.logoRow)} aria-hidden="true">
                      <span {...stylex.props(styles.mastercardSmall)} />
                      <span {...stylex.props(styles.mastercardInnerSmall)} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </button>
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
        <Link
          href="/open-account"
          {...stylex.props(
            styles.cta,
            isGold ? styles.ctaPrimary : styles.ctaSecondary,
            styles.focusRing,
          )}
        >
          {t(`plans.tiers.${tier}.cta`)}
        </Link>
      </div>
    </article>
  )
}
