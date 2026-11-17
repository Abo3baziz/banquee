import * as stylex from '@stylexjs/stylex'
import { Banknote, Laptop, Nfc, ShoppingBag, TrendingUp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const fadeIn = stylex.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const rise = stylex.keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(24px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const BAR_HEIGHTS = [24, 32, 20, 44, 28, 48]

const styles = stylex.create({
  root: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    alignItems: 'center',
    animationDuration: '900ms',
    animationFillMode: 'both',
    animationName: {
      default: fadeIn,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    userSelect: 'none',
    height: {
      default: '21.5rem',
      '@media (min-width: 23rem)': '23.5rem',
      '@media (min-width: 30rem)': '28.5rem',
      '@media (min-width: 40rem)': '39rem',
      '@media (min-width: 64rem)': '31.5rem',
      '@media (min-width: 72rem)': '35rem',
      '@media (min-width: 80rem)': '39.5rem',
    },
    marginTop: {
      default: spacing.xl,
      '@media (min-width: 64rem)': 0,
    },
    minWidth: 0,
    width: '100%',
  },
  canvas: {
    flexShrink: 0,
    position: 'relative',
    transform: {
      default: 'scale(0.46)',
      '@media (min-width: 23rem)': 'scale(0.5)',
      '@media (min-width: 30rem)': 'scale(0.62)',
      '@media (min-width: 40rem)': 'scale(0.86)',
      '@media (min-width: 48rem)': 'scale(0.87)',
      '@media (min-width: 64rem)': 'scale(0.69)',
      '@media (min-width: 72rem)': 'scale(0.78)',
      '@media (min-width: 80rem)': 'scale(0.88)',
    },
    height: 680,
    width: 680,
  },
  aura: {
    inset: 0,
    margin: 'auto',
    borderRadius: radii.full,
    backgroundColor: 'rgba(91, 181, 162, 0.15)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
    position: 'absolute',
    height: 320,
    width: 320,
  },
  riseItem: {
    animationDuration: '700ms',
    animationFillMode: 'both',
    animationName: {
      default: rise,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
  },
  delay1: { animationDelay: '100ms' },
  delay2: { animationDelay: '200ms' },
  delay3: { animationDelay: '300ms' },
  delay4: { animationDelay: '400ms' },
  delay5: { animationDelay: '500ms' },
  mainSlot: {
    insetInlineStart: 135,
    position: 'absolute',
    zIndex: 20,
    top: 210,
  },
  card: {
    padding: '1.75rem',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(135deg, #1e2024, #111215 55%, #0a0b0d)',
    boxShadow: {
      default: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
      ':hover': '0 32px 64px -16px rgba(0, 0, 0, 0.42)',
    },
    color: colors.surfaceLight,
    direction: 'ltr',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    transform: {
      default: 'rotate(-3deg)',
      ':hover': 'rotate(0deg)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: 260,
    width: 410,
  },
  sheen: {
    inset: 0,
    borderRadius: 'inherit',
    backgroundImage:
      'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 50%, rgba(91, 181, 162, 0.2))',
    mixBlendMode: 'overlay',
    pointerEvents: 'none',
    position: 'absolute',
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  brand: {
    gap: '0.375rem',
    alignItems: 'center',
    color: colors.surfaceLight,
    display: 'flex',
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: '1.6875rem',
  },
  brandDot: {
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    height: 8,
    width: 8,
  },
  cardHeaderEnd: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
  },
  contactless: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  debit: {
    borderRadius: 4,
    paddingBlock: 2,
    paddingInline: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  cardMiddle: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
  },
  chip: {
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(135deg, #e2b774, #fce4b8 50%, #c99c54)',
    boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    height: 36,
    width: 48,
  },
  chipLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
  },
  chipLineTop: {
    height: 1,
    top: '0.75rem',
    width: '100%',
  },
  chipLineBottom: {
    bottom: '0.75rem',
    height: 1,
    width: '100%',
  },
  chipLineStart: {
    insetInlineStart: '1rem',
    height: '100%',
    width: 1,
  },
  chipLineEnd: {
    insetInlineEnd: '1rem',
    height: '100%',
    width: 1,
  },
  cardFooter: {
    position: 'relative',
    zIndex: 1,
  },
  number: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: fonts.mono,
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.25em',
    lineHeight: '1.25rem',
    marginBottom: '0.625rem',
  },
  metaRow: {
    gap: spacing.lg,
    alignItems: 'flex-end',
    display: 'flex',
  },
  metaLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.surfaceLight,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.025em',
    lineHeight: '1.25rem',
  },
  visa: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontStyle: 'italic',
    fontWeight: 700,
    letterSpacing: '-0.05em',
    lineHeight: '1.75rem',
    marginInlineStart: 'auto',
  },
  floatCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    transform: {
      default: null,
      ':hover': 'translateY(-2px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform',
  },
  balanceSlot: {
    insetInlineStart: -4,
    position: 'absolute',
    zIndex: 30,
    top: 56,
    width: 224,
  },
  balanceHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  balanceLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
  balanceDot: {
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
  balanceValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: '1.6875rem',
  },
  trendBadge: {
    borderRadius: radii.full,
    gap: 2,
    paddingBlock: 2,
    paddingInline: 8,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: '1rem',
    marginTop: spacing.sm,
  },
  outflowSlot: {
    insetInlineEnd: -8,
    position: 'absolute',
    zIndex: 30,
    top: 112,
    width: 208,
  },
  outflowHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  outflowLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
  outflowValue: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  chart: {
    gap: 6,
    alignItems: 'flex-end',
    display: 'flex',
    height: 48,
    paddingTop: spacing.sm,
  },
  bar: {
    flexBasis: 0,
    flexGrow: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  barMuted: {
    backgroundColor: colors.surfaceContainer,
  },
  barAccent: {
    backgroundColor: colors.primaryContainer,
  },
  barStrong: {
    backgroundColor: colors.primary,
  },
  recentSlot: {
    insetInlineStart: 12,
    position: 'absolute',
    zIndex: 30,
    top: 480,
    width: 256,
  },
  recentTitle: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
    marginBottom: spacing.sm,
  },
  recentList: {
    gap: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  recentRow: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  recentItem: {
    gap: 10,
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  recentIcon: {
    borderRadius: radii.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurface,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
  recentMerchant: {
    overflow: 'hidden',
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 600,
    lineHeight: '1.125rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  recentCategory: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 400,
    lineHeight: '1rem',
  },
  recentAmount: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
    whiteSpace: 'nowrap',
  },
  transferSlot: {
    insetInlineEnd: -12,
    position: 'absolute',
    zIndex: 30,
    top: 478,
    width: 272,
  },
  transferCard: {
    padding: '0.875rem',
  },
  transferRow: {
    gap: spacing.sm,
    alignItems: 'flex-start',
    display: 'flex',
  },
  transferIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: 'rgba(91, 181, 162, 0.2)',
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
  transferBody: {
    minWidth: 0,
  },
  transferName: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  transferDetail: {
    overflow: 'hidden',
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    lineHeight: '1rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  transferTime: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
    marginInlineStart: 'auto',
    whiteSpace: 'nowrap',
  },
  savingsSlot: {
    display: {
      default: 'none',
      '@media (min-width: 40rem)': 'block',
    },
    insetInlineEnd: 32,
    position: 'absolute',
    zIndex: 30,
    top: 562,
    width: 224,
  },
  savingsCard: {
    padding: '0.875rem',
  },
  savingsHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  savingsLabel: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
  savingsValue: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  savingsTrack: {
    borderRadius: radii.full,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    display: 'block',
    height: 8,
    marginBottom: 6,
    width: '100%',
  },
  savingsFill: {
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    height: '100%',
    width: '75%',
  },
  savingsFooter: {
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    justifyContent: 'space-between',
    lineHeight: '1rem',
  },
})

export async function FeaturesHeroVisual() {
  const [t, tm] = await Promise.all([
    getTranslations('featuresPage'),
    getTranslations('mockups'),
  ])

  return (
    <div aria-hidden="true" {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.canvas)}>
        <div {...stylex.props(styles.aura)} />

        <div {...stylex.props(styles.mainSlot, styles.riseItem, styles.delay2)}>
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.sheen)} />
            <div {...stylex.props(styles.cardHeader)}>
              <span {...stylex.props(styles.brand)}>
                banquee
                <span {...stylex.props(styles.brandDot)} />
              </span>
              <div {...stylex.props(styles.cardHeaderEnd)}>
                <Nfc
                  aria-hidden="true"
                  size={20}
                  {...stylex.props(styles.contactless)}
                />
                <span {...stylex.props(styles.debit)}>
                  {t('hero.visual.debit')}
                </span>
              </div>
            </div>
            <div {...stylex.props(styles.cardMiddle)}>
              <div {...stylex.props(styles.chip)}>
                <span {...stylex.props(styles.chipLine, styles.chipLineTop)} />
                <span
                  {...stylex.props(styles.chipLine, styles.chipLineBottom)}
                />
                <span
                  {...stylex.props(styles.chipLine, styles.chipLineStart)}
                />
                <span {...stylex.props(styles.chipLine, styles.chipLineEnd)} />
              </div>
            </div>
            <div {...stylex.props(styles.cardFooter)}>
              <div {...stylex.props(styles.number)}>•••• •••• •••• 4289</div>
              <div {...stylex.props(styles.metaRow)}>
                <div>
                  <div {...stylex.props(styles.metaLabel)}>
                    {tm('cardsManagement.cardHolderLabel')}
                  </div>
                  <div {...stylex.props(styles.metaValue)}>
                    {tm('cardsManagement.cardHolderName')}
                  </div>
                </div>
                <div>
                  <div {...stylex.props(styles.metaLabel)}>
                    {tm('cardsManagement.expiresLabel')}
                  </div>
                  <div {...stylex.props(styles.metaValue)}>
                    {tm('cardsManagement.expiryDate')}
                  </div>
                </div>
                <span {...stylex.props(styles.visa)}>VISA</span>
              </div>
            </div>
          </div>
        </div>

        <div
          {...stylex.props(styles.balanceSlot, styles.riseItem, styles.delay1)}
        >
          <div {...stylex.props(styles.floatCard)}>
            <div {...stylex.props(styles.balanceHeader)}>
              <span {...stylex.props(styles.balanceLabel)}>
                {tm('dashboard.currentBalance')}
              </span>
              <span {...stylex.props(styles.balanceDot)} />
            </div>
            <div {...stylex.props(styles.balanceValue)}>
              {tm('dashboard.balanceValueAlt')}
            </div>
            <div {...stylex.props(styles.trendBadge)}>
              <TrendingUp aria-hidden="true" size={13} />
              <span>{tm('dashboard.monthTrend')}</span>
            </div>
          </div>
        </div>

        <div
          {...stylex.props(styles.outflowSlot, styles.riseItem, styles.delay3)}
        >
          <div {...stylex.props(styles.floatCard)}>
            <div {...stylex.props(styles.outflowHeader)}>
              <span {...stylex.props(styles.outflowLabel)}>
                {t('hero.visual.monthlyOutflow')}
              </span>
              <span {...stylex.props(styles.outflowValue)}>
                {t('hero.visual.outflowValue')}
              </span>
            </div>
            <div {...stylex.props(styles.chart)}>
              {BAR_HEIGHTS.map((height, index) => (
                <span
                  key={height}
                  style={{ height }}
                  {...stylex.props(
                    styles.bar,
                    index === 5
                      ? styles.barStrong
                      : index === 3
                        ? styles.barAccent
                        : styles.barMuted,
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          {...stylex.props(styles.recentSlot, styles.riseItem, styles.delay4)}
        >
          <div {...stylex.props(styles.floatCard)}>
            <div {...stylex.props(styles.recentTitle)}>
              {tm('dashboard.activity')}
            </div>
            <div {...stylex.props(styles.recentList)}>
              <div {...stylex.props(styles.recentRow)}>
                <div {...stylex.props(styles.recentItem)}>
                  <span {...stylex.props(styles.recentIcon)}>
                    <Laptop aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <div {...stylex.props(styles.recentMerchant)}>
                      {tm('dashboard.transactions.appleStore')}
                    </div>
                    <div {...stylex.props(styles.recentCategory)}>
                      {tm('dashboard.transactions.appleCategory')}
                    </div>
                  </div>
                </div>
                <span {...stylex.props(styles.recentAmount)}>-$799.00</span>
              </div>
              <div {...stylex.props(styles.recentRow)}>
                <div {...stylex.props(styles.recentItem)}>
                  <span {...stylex.props(styles.recentIcon)}>
                    <ShoppingBag aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <div {...stylex.props(styles.recentMerchant)}>
                      {tm('dashboard.transactions.amazon')}
                    </div>
                    <div {...stylex.props(styles.recentCategory)}>
                      {tm('dashboard.transactions.amazonCategory')}
                    </div>
                  </div>
                </div>
                <span {...stylex.props(styles.recentAmount)}>-$49.00</span>
              </div>
            </div>
          </div>
        </div>

        <div
          {...stylex.props(styles.transferSlot, styles.riseItem, styles.delay4)}
        >
          <div {...stylex.props(styles.floatCard, styles.transferCard)}>
            <div {...stylex.props(styles.transferRow)}>
              <span {...stylex.props(styles.transferIcon)}>
                <Banknote aria-hidden="true" size={18} />
              </span>
              <div {...stylex.props(styles.transferBody)}>
                <div {...stylex.props(styles.transferName)}>
                  {tm('transfer.recipientName')}
                </div>
                <div {...stylex.props(styles.transferDetail)}>
                  {t('hero.visual.transferDetail')}
                </div>
              </div>
              <span {...stylex.props(styles.transferTime)}>
                {tm('transfer.notificationReceivedWhen')}
              </span>
            </div>
          </div>
        </div>

        <div
          {...stylex.props(styles.savingsSlot, styles.riseItem, styles.delay5)}
        >
          <div {...stylex.props(styles.floatCard, styles.savingsCard)}>
            <div {...stylex.props(styles.savingsHeader)}>
              <span {...stylex.props(styles.savingsLabel)}>
                {tm('savings.goalJapan')}
              </span>
              <span {...stylex.props(styles.savingsValue)}>
                {t('hero.visual.savingsProgress')}
              </span>
            </div>
            <span {...stylex.props(styles.savingsTrack)}>
              <span {...stylex.props(styles.savingsFill)} />
            </span>
            <div {...stylex.props(styles.savingsFooter)}>
              <span>{t('hero.visual.savingsSaved')}</span>
              <span>{t('hero.visual.savingsTarget')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
