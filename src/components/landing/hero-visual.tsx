'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Cpu, Nfc, RefreshCw, ShoppingBag, Wallet } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const fadeIn = stylex.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const float = stylex.keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-8px)' },
})

const floatDown = stylex.keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(6px)' },
})

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
  visual: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    alignItems: 'center',
    animationDelay: '200ms',
    animationDuration: '900ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeIn,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    height: {
      default: 320,
      '@media (min-width: 40rem)': 420,
      '@media (min-width: 64rem)': 520,
    },
    minWidth: 0,
    width: '100%',
  },
  orbMint: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(232, 242, 238, 0.6)',
    filter: 'blur(64px)',
    pointerEvents: 'none',
    position: 'absolute',
    height: 288,
    right: '-2.5rem',
    top: '-2.5rem',
    width: 288,
  },
  orbBlue: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(223, 235, 241, 0.4)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
    position: 'absolute',
    bottom: '-2.5rem',
    height: 256,
    left: '2.5rem',
    width: 256,
  },
  canvas: {
    flexShrink: 0,
    position: 'relative',
    transform: {
      default: 'scale(0.54)',
      '@media (min-width: 23rem)': 'scale(0.64)',
      '@media (min-width: 40rem)': 'scale(0.86)',
      '@media (min-width: 64rem)': 'scale(0.9)',
      '@media (min-width: 80rem)': 'scale(1)',
    },
    transformOrigin: 'center',
    height: 400,
    width: 500,
  },
  balanceCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    gap: spacing.md,
    alignItems: 'center',
    animationDelay: '200ms',
    animationDuration: '6s',
    animationIterationCount: 'infinite',
    animationName: {
      default: float,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.surfaceContainerLowest,
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    position: 'absolute',
    zIndex: 30,
    left: 0,
    top: 0,
  },
  balanceIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  balanceLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  balanceRow: {
    gap: spacing.xs,
    alignItems: 'center',
    display: 'flex',
  },
  balanceValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    whiteSpace: 'nowrap',
  },
  trendBadge: {
    borderRadius: 4,
    paddingBlock: 2,
    paddingInline: 6,
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
  },
  slotA: {
    position: 'absolute',
    transform: 'rotate(-12deg)',
    zIndex: 10,
    left: 10,
    top: 55,
  },
  slotB: {
    position: 'absolute',
    transform: 'rotate(-3deg)',
    zIndex: 20,
    left: 65,
    top: 75,
  },
  slotC: {
    position: 'absolute',
    transform: 'rotate(6deg)',
    zIndex: 30,
    left: 110,
    top: 105,
  },
  floatA: {
    animationDelay: '0.4s',
    animationDuration: '5.5s',
    animationIterationCount: 'infinite',
    animationName: {
      default: float,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  floatB: {
    animationDelay: '0.9s',
    animationDuration: '6s',
    animationIterationCount: 'infinite',
    animationName: {
      default: float,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  floatC: {
    animationDelay: '1.2s',
    animationDuration: '6.5s',
    animationIterationCount: 'infinite',
    animationName: {
      default: float,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    transform: {
      default: null,
      ':hover': 'scale(1.03)',
    },
    transitionDuration: '300ms',
    transitionProperty: 'transform, box-shadow',
  },
  cardStandard: {
    borderColor: 'rgba(217, 217, 217, 0.2)',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
    height: 190,
    width: 320,
  },
  cardGold: {
    backgroundImage: 'linear-gradient(135deg, #E3B873, #F4D9A0, #E3B873)',
    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.12)',
    height: 195,
    width: 330,
  },
  cardTop: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
  },
  brand: {
    color: colors.primary,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  brandGold: {
    color: colors.onSecondaryFixed,
  },
  brandDot: {
    color: colors.primaryContainer,
  },
  brandDotGold: {
    color: colors.onSecondaryContainer,
  },
  tier: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
  tierGold: {
    borderRadius: 4,
    paddingBlock: 2,
    paddingInline: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: colors.onSecondaryFixed,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  chip: {
    borderRadius: 4,
    backgroundColor: colors.surfaceContainerHigh,
    height: 20,
    marginBottom: 8,
    width: 28,
  },
  number: {
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    lineHeight: '1.25rem',
  },
  numberGold: {
    color: colors.onSecondaryFixed,
    fontFamily: fonts.mono,
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.18em',
    lineHeight: '1.25rem',
    marginBottom: 4,
  },
  standardBottom: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  standardMeta: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  goldBottom: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  goldMetaLabel: {
    color: 'rgba(28, 27, 32, 0.7)',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  goldMetaValue: {
    color: colors.onSecondaryFixed,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  mastercard: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: '#eb001b',
    display: 'flex',
    justifyContent: 'center',
    opacity: 0.9,
    height: 32,
    width: 32,
  },
  mastercardInner: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(247, 158, 27, 0.9)',
    flexShrink: 0,
    marginInlineStart: -10,
    height: 32,
    width: 32,
  },
  premiumButton: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: colors.surfaceLight,
    cursor: 'pointer',
    fontFamily: fonts.body,
    perspective: '1200px',
    position: 'relative',
    textAlign: 'left',
    transform: {
      default: null,
      ':hover': 'scale(1.02)',
    },
    transitionDuration: '200ms',
    transitionProperty: 'transform',
    height: 200,
    width: 340,
  },
  flipInner: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    transitionDuration: '600ms',
    transitionProperty: 'transform',
    height: '100%',
    width: '100%',
  },
  flipInnerFlipped: {
    transform: 'rotateY(180deg)',
  },
  face: {
    inset: 0,
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
  faceFront: {
    padding: spacing.lg,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: colors.onSurface,
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
    color: colors.surfaceLight,
  },
  faceBack: {
    padding: 0,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: '#141616',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.32)',
    color: colors.surfaceLight,
    transform: 'rotateY(180deg)',
  },
  premiumTop: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  premiumBrand: {
    color: colors.surfaceLight,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  premiumBrandDot: {
    color: colors.primaryContainer,
  },
  premiumTopRight: {
    gap: 8,
    alignItems: 'center',
    display: 'flex',
  },
  flipHint: {
    borderRadius: radii.full,
    gap: 4,
    paddingBlock: 2,
    paddingInline: 8,
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  contactless: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  premiumChip: {
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'rgba(226, 226, 226, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    height: 24,
    marginBottom: 8,
    width: 32,
  },
  premiumChipInner: {
    borderRadius: 2,
    backgroundColor: 'rgba(255, 180, 164, 0.4)',
    height: 12,
    width: 16,
  },
  premiumNumber: {
    color: colors.surfaceLight,
    fontFamily: fonts.mono,
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    lineHeight: '1.25rem',
    marginBottom: 8,
  },
  premiumBottom: {
    alignItems: 'flex-end',
    color: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'space-between',
  },
  premiumMetaLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  premiumMetaValue: {
    color: colors.surfaceLight,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  visa: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontStyle: 'italic',
    fontWeight: 900,
    letterSpacing: '-0.05em',
    lineHeight: '1.5rem',
  },
  backStripe: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderStyle: 'solid',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 36,
    marginTop: 12,
    width: '100%',
  },
  backContent: {
    paddingInline: 20,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  backLeft: {
    gap: 8,
    alignItems: 'center',
    display: 'flex',
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
    width: 144,
  },
  signatureText: {
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
  },
  cvvGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  cvvLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.75rem',
    textTransform: 'uppercase',
  },
  cvvValue: {
    borderColor: 'rgba(0, 107, 92, 0.3)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBlock: 2,
    paddingInline: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: colors.primaryFixed,
    fontFamily: fonts.mono,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  backToken: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: colors.primaryFixed,
    display: 'flex',
    justifyContent: 'center',
    height: 20,
    width: 28,
  },
  backBottom: {
    paddingInline: 20,
    paddingBottom: 12,
  },
  finePrint: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: fonts.body,
    fontSize: '8.5px',
    lineHeight: 1.2,
    marginBottom: 4,
  },
  backFooter: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: 4,
  },
  backBrand: {
    color: colors.surfaceLight,
    fontFamily: fonts.heading,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  backSteel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: fonts.mono,
    fontSize: '0.625rem',
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
  },
  backVisa: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: fonts.heading,
    fontSize: '0.8125rem',
    fontStyle: 'italic',
    fontWeight: 900,
    letterSpacing: '-0.05em',
  },
  notification: {
    padding: spacing.md,
    borderRadius: radii.lg,
    gap: spacing.md,
    alignItems: 'center',
    animationDelay: '0.6s',
    animationDuration: '7s',
    animationIterationCount: 'infinite',
    animationName: {
      default: floatDown,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    position: 'absolute',
    zIndex: 40,
    bottom: 0,
    left: 10,
    maxWidth: '20rem',
  },
  notificationIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: 36,
    width: 36,
  },
  notificationBody: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  notificationTop: {
    gap: spacing.xs,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  notificationMerchant: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  notificationTime: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  notificationAmount: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  recent: {
    padding: spacing.md,
    borderRadius: radii.lg,
    animationDelay: '0.3s',
    animationDuration: '6.5s',
    animationIterationCount: 'infinite',
    animationName: {
      default: float,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
    display: {
      default: 'none',
      '@media (min-width: 40rem)': 'block',
    },
    position: 'absolute',
    zIndex: 40,
    bottom: -8,
    right: 0,
    width: '13rem',
  },
  recentHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  recentTitle: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  recentDot: {
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    height: 8,
    width: 8,
  },
  recentList: {
    gap: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  recentRow: {
    borderRadius: 4,
    paddingBlock: 4,
    paddingInline: 8,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    justifyContent: 'space-between',
  },
  recentMerchant: {
    overflow: 'hidden',
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  recentAmount: {
    color: colors.error,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
})

export function HeroVisual() {
  const t = useTranslations('landing')
  const tm = useTranslations('mockups')
  const [flipped, setFlipped] = useState(false)

  return (
    <div {...stylex.props(styles.visual)}>
      <div aria-hidden="true" {...stylex.props(styles.orbMint)} />
      <div aria-hidden="true" {...stylex.props(styles.orbBlue)} />
      <div {...stylex.props(styles.canvas)}>
        <div aria-hidden="true" {...stylex.props(styles.balanceCard)}>
          <div {...stylex.props(styles.balanceIcon)}>
            <Wallet size={22} />
          </div>
          <div>
            <div {...stylex.props(styles.balanceLabel)}>
              {tm('dashboard.currentBalance')}
            </div>
            <div {...stylex.props(styles.balanceRow)}>
              <span {...stylex.props(styles.balanceValue)}>
                {tm('dashboard.balanceValueAlt')}
              </span>
              <span {...stylex.props(styles.trendBadge)}>+12.4%</span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" {...stylex.props(styles.slotA)}>
          <div {...stylex.props(styles.floatA)}>
            <div {...stylex.props(styles.card, styles.cardStandard)}>
              <div {...stylex.props(styles.cardTop)}>
                <span {...stylex.props(styles.brand)}>
                  banquee<span {...stylex.props(styles.brandDot)}>.</span>
                </span>
                <span {...stylex.props(styles.tier)}>
                  {t('plans.tiers.standard.name')}
                </span>
              </div>
              <div>
                <div {...stylex.props(styles.chip)} />
                <div {...stylex.props(styles.number)}>•••• •••• •••• 8092</div>
                <div {...stylex.props(styles.standardBottom)}>
                  <span {...stylex.props(styles.standardMeta)}>
                    {tm('cardsManagement.cardHolderName')}
                  </span>
                  <span {...stylex.props(styles.standardMeta)}>
                    {tm('cardsManagement.expiryDate')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" {...stylex.props(styles.slotB)}>
          <div {...stylex.props(styles.floatB)}>
            <div {...stylex.props(styles.card, styles.cardGold)}>
              <div {...stylex.props(styles.cardTop)}>
                <span {...stylex.props(styles.brand, styles.brandGold)}>
                  banquee
                  <span {...stylex.props(styles.brandDotGold)}>.</span>
                </span>
                <span {...stylex.props(styles.tierGold)}>
                  {t('plans.tiers.gold.name')}
                </span>
              </div>
              <div>
                <div {...stylex.props(styles.numberGold)}>
                  •••• •••• •••• 6194
                </div>
                <div {...stylex.props(styles.goldBottom)}>
                  <div>
                    <div {...stylex.props(styles.goldMetaLabel)}>
                      {tm('cardsManagement.cardHolderLabel')}
                    </div>
                    <div {...stylex.props(styles.goldMetaValue)}>
                      {tm('cardsManagement.cardHolderName')}
                    </div>
                  </div>
                  <div {...stylex.props(styles.mastercard)}>
                    <div {...stylex.props(styles.mastercardInner)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.slotC)}>
          <div {...stylex.props(styles.floatC)}>
            <button
              type="button"
              aria-label={t('hero.flipCard')}
              aria-pressed={flipped}
              onClick={() => setFlipped((value) => !value)}
              {...stylex.props(styles.premiumButton, styles.focusRing)}
            >
              <div
                {...stylex.props(
                  styles.flipInner,
                  flipped && styles.flipInnerFlipped,
                )}
              >
                <div
                  aria-hidden="true"
                  {...stylex.props(styles.face, styles.faceFront)}
                >
                  <div {...stylex.props(styles.premiumTop)}>
                    <span {...stylex.props(styles.premiumBrand)}>
                      banquee
                      <span {...stylex.props(styles.premiumBrandDot)}>.</span>
                    </span>
                    <div {...stylex.props(styles.premiumTopRight)}>
                      <span {...stylex.props(styles.flipHint)}>
                        <RefreshCw aria-hidden="true" size={13} />
                        {t('hero.flipHint')}
                      </span>
                      <Nfc
                        aria-hidden="true"
                        size={20}
                        {...stylex.props(styles.contactless)}
                      />
                    </div>
                  </div>
                  <div>
                    <div {...stylex.props(styles.premiumChip)}>
                      <div {...stylex.props(styles.premiumChipInner)} />
                    </div>
                    <div {...stylex.props(styles.premiumNumber)}>
                      •••• •••• •••• 4289
                    </div>
                    <div {...stylex.props(styles.premiumBottom)}>
                      <div>
                        <div {...stylex.props(styles.premiumMetaLabel)}>
                          {tm('cardsManagement.cardHolderLabel')}
                        </div>
                        <div {...stylex.props(styles.premiumMetaValue)}>
                          {tm('cardsManagement.cardHolderName')}
                        </div>
                      </div>
                      <div>
                        <div {...stylex.props(styles.premiumMetaLabel)}>
                          {tm('cardsManagement.expiresLabel')}
                        </div>
                        <div {...stylex.props(styles.premiumMetaValue)}>
                          {tm('cardsManagement.expiryDate')}
                        </div>
                      </div>
                      <span {...stylex.props(styles.visa)}>VISA</span>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  {...stylex.props(styles.face, styles.faceBack)}
                >
                  <div>
                    <div {...stylex.props(styles.backStripe)} />
                    <div {...stylex.props(styles.backContent)}>
                      <div {...stylex.props(styles.backLeft)}>
                        <div {...stylex.props(styles.signature)}>
                          <span {...stylex.props(styles.signatureText)}>
                            {tm('cardsManagement.cardHolderName')}
                          </span>
                        </div>
                        <div {...stylex.props(styles.cvvGroup)}>
                          <span {...stylex.props(styles.cvvLabel)}>
                            {t('hero.cvvLabel')}
                          </span>
                          <span {...stylex.props(styles.cvvValue)}>842</span>
                        </div>
                      </div>
                      <div {...stylex.props(styles.backToken)}>
                        <Cpu aria-hidden="true" size={14} />
                      </div>
                    </div>
                  </div>
                  <div {...stylex.props(styles.backBottom)}>
                    <p {...stylex.props(styles.finePrint)}>
                      Authorized signature • Not valid unless signed. For
                      customer service call +1 (800) 555-BANQ or visit
                      banquee.com/support.
                    </p>
                    <div {...stylex.props(styles.backFooter)}>
                      <span {...stylex.props(styles.backBrand)}>
                        banquee
                        <span {...stylex.props(styles.premiumBrandDot)}>.</span>
                      </span>
                      <span {...stylex.props(styles.backSteel)}>
                        {t('plans.tiers.premium.name')} {t('plans.steelBadge')}
                      </span>
                      <span {...stylex.props(styles.backVisa)}>VISA</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div aria-hidden="true" {...stylex.props(styles.notification)}>
          <div {...stylex.props(styles.notificationIcon)}>
            <ShoppingBag size={20} />
          </div>
          <div {...stylex.props(styles.notificationBody)}>
            <div {...stylex.props(styles.notificationTop)}>
              <span {...stylex.props(styles.notificationMerchant)}>
                {tm('dashboard.transactions.amazon')}
              </span>
              <span {...stylex.props(styles.notificationTime)}>
                {t('hero.justNow')}
              </span>
            </div>
            <span {...stylex.props(styles.notificationAmount)}>
              {`-$49.00 • ${t('hero.purchase')}`}
            </span>
          </div>
        </div>

        <div aria-hidden="true" {...stylex.props(styles.recent)}>
          <div {...stylex.props(styles.recentHeader)}>
            <span {...stylex.props(styles.recentTitle)}>
              {tm('dashboard.activity')}
            </span>
            <span {...stylex.props(styles.recentDot)} />
          </div>
          <div {...stylex.props(styles.recentList)}>
            <div {...stylex.props(styles.recentRow)}>
              <span {...stylex.props(styles.recentMerchant)}>
                {tm('dashboard.transactions.appleStore')}
              </span>
              <span {...stylex.props(styles.recentAmount)}>-$799</span>
            </div>
            <div {...stylex.props(styles.recentRow)}>
              <span {...stylex.props(styles.recentMerchant)}>Google Play</span>
              <span {...stylex.props(styles.recentAmount)}>-$49</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
