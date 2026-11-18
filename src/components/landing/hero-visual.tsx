'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ShoppingBag, Wallet } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { BankCard } from '../banking-card'
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
    width: 320,
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
    width: 330,
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
    width: 340,
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
            <BankCard
              tier="standard"
              label={t('plans.tiers.standard.name')}
              lastFour="8092"
              cardholderName={tm('cardsManagement.cardHolderName')}
              expiryDate={tm('cardsManagement.expiryDate')}
            />
          </div>
        </div>

        <div aria-hidden="true" {...stylex.props(styles.slotB)}>
          <div {...stylex.props(styles.floatB)}>
            <BankCard
              tier="gold"
              network="mastercard"
              label={t('plans.tiers.gold.name')}
              lastFour="6194"
              cardholderName={tm('cardsManagement.cardHolderName')}
            />
          </div>
        </div>

        <div {...stylex.props(styles.slotC)}>
          <div {...stylex.props(styles.floatC)}>
            <BankCard
              tier="premium"
              network="visa"
              lastFour="4289"
              cardholderName={tm('cardsManagement.cardHolderName')}
              cardholderLabel={tm('cardsManagement.cardHolderLabel')}
              expiryDate={tm('cardsManagement.expiryDate')}
              expiryLabel={tm('cardsManagement.expiresLabel')}
              cvv="842"
              flipped={flipped}
              onFlip={() => setFlipped((value) => !value)}
              flipLabel={t('hero.flipCard')}
              flipHint={t('hero.flipHint')}
              backLabels={{
                cvvLabel: t('hero.cvvLabel'),
                signatureLabel: tm('cardsManagement.cardHolderName'),
                finePrint: t('plans.cardFinePrint'),
              }}
            />
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
