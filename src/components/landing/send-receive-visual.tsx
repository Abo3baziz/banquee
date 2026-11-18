import * as stylex from '@stylexjs/stylex'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BatteryFull,
  BellRing,
  CircleCheck,
  Download,
  Share2,
  Signal,
  Store,
  Wifi,
} from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { formatCurrency } from '@/i18n/currency'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const floatUp = stylex.keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-10px)' },
})

const floatDown = stylex.keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(8px)' },
})

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  root: {
    paddingBlock: spacing.xl,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    minHeight: '36rem',
    width: '100%',
  },
  glowPrimary: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(91, 181, 162, 0.15)',
    filter: 'blur(64px)',
    pointerEvents: 'none',
    position: 'absolute',
    height: '20rem',
    width: '20rem',
  },
  glowSecondary: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(223, 235, 241, 0.3)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
    position: 'absolute',
    height: '15rem',
    right: '1.5rem',
    top: '2.5rem',
    width: '15rem',
  },
  phoneFrame: {
    padding: '0.625rem',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3.125rem',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#23252a',
    boxShadow:
      '0 25px 60px -15px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    position: 'relative',
    zIndex: 20,
    maxWidth: '100%',
    width: {
      default: '300px',
      '@media (min-width: 40rem)': '320px',
    },
  },
  phoneScreen: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '2.5rem',
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: colors.surfaceLight,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '36.25rem',
  },
  statusBar: {
    paddingInline: '1.25rem',
    paddingBottom: '0.25rem',
    paddingTop: '0.75rem',
  },
  statusRow: {
    gap: spacing.xs,
    paddingInline: '0.25rem',
    alignItems: 'center',
    color: colors.onSurface,
    display: 'flex',
    fontSize: '0.6875rem',
    fontWeight: 600,
    justifyContent: 'space-between',
    lineHeight: '0.875rem',
    marginBottom: '0.25rem',
  },
  island: {
    borderRadius: radii.full,
    paddingInline: '0.625rem',
    alignItems: 'center',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'space-between',
    height: '1.5rem',
    width: '6rem',
  },
  islandDot: {
    borderRadius: radii.full,
    backgroundColor: '#1c1d22',
    height: '0.5rem',
    width: '0.5rem',
  },
  islandDotActive: {
    borderRadius: radii.full,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: '#10b981',
    height: '0.375rem',
    width: '0.375rem',
  },
  statusIcons: {
    gap: '0.375rem',
    alignItems: 'center',
    display: 'flex',
  },
  screenHeader: {
    paddingBlock: '0.5rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(217, 217, 217, 0.2)',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  screenHeaderLeft: {
    gap: '0.375rem',
    alignItems: 'center',
    color: colors.onSurface,
    display: 'flex',
  },
  screenTitle: {
    fontFamily: fonts.heading,
    fontSize: '0.9375rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  screenShare: {
    color: colors.onSurfaceVariant,
  },
  screenBody: {
    paddingBlock: '0.75rem',
    paddingInline: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  statusCenter: {
    marginBlock: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  statusIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    height: '3.5rem',
    marginBottom: '0.5rem',
    width: '3.5rem',
  },
  statusLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  amount: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: '2.5rem',
    marginTop: '0.125rem',
  },
  completedBadge: {
    borderRadius: radii.full,
    gap: '0.375rem',
    paddingBlock: '0.125rem',
    paddingInline: '0.75rem',
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
    marginTop: '0.25rem',
  },
  completedDot: {
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    height: '0.375rem',
    width: '0.375rem',
  },
  merchantCard: {
    padding: '0.625rem',
    borderColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: '0.625rem',
    marginBlock: '0.75rem',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 243, 243, 0.7)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  merchantLeft: {
    gap: '0.625rem',
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  merchantIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.onSurface,
    color: colors.surfaceLight,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '2.25rem',
    width: '2.25rem',
  },
  merchantTitle: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  merchantSub: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  merchantTime: {
    color: colors.onSurfaceVariant,
    flexShrink: 0,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  specs: {
    gap: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    borderTopColor: 'rgba(217, 217, 217, 0.2)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: '0.25rem',
  },
  specRow: {
    gap: spacing.sm,
    paddingBlock: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    justifyContent: 'space-between',
    lineHeight: '1rem',
  },
  specLabel: {
    color: colors.onSurfaceVariant,
  },
  specValue: {
    color: colors.onSurface,
    fontWeight: 600,
    textAlign: 'end',
  },
  specValueMono: {
    fontFamily: fonts.mono,
    fontSize: '0.6875rem',
    fontWeight: 500,
  },
  actions: {
    gap: spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5rem',
  },
  receiptButton: {
    borderRadius: radii.md,
    gap: '0.375rem',
    paddingBlock: '0.625rem',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: '1.125rem',
  },
  reportButton: {
    borderRadius: radii.md,
    paddingBlock: '0.5rem',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '1rem',
  },
  homeIndicator: {
    backgroundColor: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
    paddingTop: '0.25rem',
  },
  homeBar: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(26, 28, 28, 0.3)',
    height: '0.25rem',
    width: '7rem',
  },
  notification: {
    padding: {
      default: spacing.sm,
      '@media (min-width: 40rem)': spacing.md,
    },
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: spacing.sm,
    alignItems: 'center',
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: {
      default: '0 12px 32px rgba(0, 0, 0, 0.12)',
      ':hover': '0 16px 36px rgba(0, 0, 0, 0.16)',
    },
    display: 'flex',
    position: 'absolute',
    transitionDuration: '200ms',
    transitionProperty: 'box-shadow',
    zIndex: 30,
    maxWidth: {
      default: '13rem',
      '@media (min-width: 40rem)': '17rem',
    },
  },
  notificationReceived: {
    insetInlineStart: {
      default: '-0.5rem',
      '@media (min-width: 40rem)': '-1.5rem',
    },
    top: '-1rem',
  },
  notificationSuccessful: {
    insetInlineEnd: {
      default: '-0.5rem',
      '@media (min-width: 40rem)': '-1rem',
    },
    top: '2.5rem',
  },
  notificationReminder: {
    display: {
      default: 'none',
      '@media (min-width: 64rem)': 'flex',
    },
    insetInlineStart: {
      default: '-0.5rem',
      '@media (min-width: 64rem)': '-2rem',
    },
    bottom: '-1rem',
  },
  notificationSecurity: {
    display: {
      default: 'none',
      '@media (min-width: 64rem)': 'flex',
    },
    insetInlineEnd: {
      default: '-0.5rem',
      '@media (min-width: 64rem)': '-1rem',
    },
    bottom: '1.5rem',
  },
  floatOne: {
    animationDelay: '0s',
    animationDuration: '6s',
    animationIterationCount: 'infinite',
    animationName: {
      default: floatUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  floatTwo: {
    animationDelay: '0.8s',
    animationDuration: '6.5s',
    animationIterationCount: 'infinite',
    animationName: {
      default: floatDown,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  floatThree: {
    animationDelay: '0.4s',
    animationDuration: '7s',
    animationIterationCount: 'infinite',
    animationName: {
      default: floatUp,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  floatFour: {
    animationDelay: '1.2s',
    animationDuration: '7.5s',
    animationIterationCount: 'infinite',
    animationName: {
      default: floatDown,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
  },
  notifIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '2.5rem',
    width: '2.5rem',
  },
  notifIconReceived: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  notifIconSuccess: {
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimary,
  },
  notifIconReminder: {
    backgroundColor: colors.tintBlue,
    color: colors.onSurface,
  },
  notifIconSecurity: {
    backgroundColor: colors.tertiaryFixedDim,
    color: colors.tertiary,
  },
  notifBody: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  notifTop: {
    gap: spacing.xs,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.125rem',
  },
  notifTitle: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  notifWhen: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
    whiteSpace: 'nowrap',
  },
  notifWhenPrimary: {
    color: colors.primary,
    fontWeight: 700,
  },
  notifDetail: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.25,
  },
})

export async function SendReceiveVisual() {
  const [tm, tCommon, locale] = await Promise.all([
    getTranslations('mockups'),
    getTranslations('common'),
    getLocale(),
  ])

  const BackArrow = locale === 'ar' ? ArrowRight : ArrowLeft

  return (
    <div aria-hidden="true" {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.glowPrimary)} />
      <div {...stylex.props(styles.glowSecondary)} />

      <div {...stylex.props(styles.phoneFrame)}>
        <div {...stylex.props(styles.phoneScreen)}>
          <div {...stylex.props(styles.statusBar)}>
            <div {...stylex.props(styles.statusRow)}>
              <span>9:41</span>
              <div {...stylex.props(styles.island)}>
                <span {...stylex.props(styles.islandDot)} />
                <span {...stylex.props(styles.islandDotActive)} />
              </div>
              <div {...stylex.props(styles.statusIcons)}>
                <Signal size={13} />
                <Wifi size={13} />
                <BatteryFull size={14} />
              </div>
            </div>
            <div {...stylex.props(styles.screenHeader)}>
              <div {...stylex.props(styles.screenHeaderLeft)}>
                <BackArrow size={20} />
                <span {...stylex.props(styles.screenTitle)}>
                  {tm('transactionDetails.title')}
                </span>
              </div>
              <Share2 size={18} {...stylex.props(styles.screenShare)} />
            </div>
          </div>

          <div {...stylex.props(styles.screenBody)}>
            <div>
              <div {...stylex.props(styles.statusCenter)}>
                <div {...stylex.props(styles.statusIcon)}>
                  <CircleCheck size={28} />
                </div>
                <span {...stylex.props(styles.statusLabel)}>
                  {tm('transactionDetails.paymentStatus')}
                </span>
                <div {...stylex.props(styles.amount)}>
                  {tm('transactionDetails.amount', {
                    amount: formatCurrency(-249, locale),
                  })}
                </div>
                <span {...stylex.props(styles.completedBadge)}>
                  <span {...stylex.props(styles.completedDot)} />
                  {tCommon('completed')}
                </span>
              </div>

              <div {...stylex.props(styles.merchantCard)}>
                <div {...stylex.props(styles.merchantLeft)}>
                  <div {...stylex.props(styles.merchantIcon)}>
                    <Store size={18} />
                  </div>
                  <div>
                    <div {...stylex.props(styles.merchantTitle)}>
                      {tm('transactionDetails.merchant')}
                    </div>
                    <div {...stylex.props(styles.merchantSub)}>
                      {tm('transactionDetails.merchantSub')}
                    </div>
                  </div>
                </div>
                <span {...stylex.props(styles.merchantTime)}>
                  {tm('transfer.transactionTime')}
                </span>
              </div>

              <div {...stylex.props(styles.specs)}>
                <div {...stylex.props(styles.specRow)}>
                  <span {...stylex.props(styles.specLabel)}>
                    {tm('transactionDetails.dateLabel')}
                  </span>
                  <span {...stylex.props(styles.specValue)}>
                    {tm('transactionDetails.dateValue')}
                  </span>
                </div>
                <div {...stylex.props(styles.specRow)}>
                  <span {...stylex.props(styles.specLabel)}>
                    {tm('transactionDetails.paymentMethodLabel')}
                  </span>
                  <span {...stylex.props(styles.specValue)}>
                    {tm('transactionDetails.paymentMethodValue')}
                  </span>
                </div>
                <div {...stylex.props(styles.specRow)}>
                  <span {...stylex.props(styles.specLabel)}>
                    {tm('transactionDetails.categoryLabel')}
                  </span>
                  <span {...stylex.props(styles.specValue)}>
                    {tm('transactionDetails.categoryValue')}
                  </span>
                </div>
                <div {...stylex.props(styles.specRow)}>
                  <span {...stylex.props(styles.specLabel)}>
                    {tm('transactionDetails.transactionIdLabel')}
                  </span>
                  <span
                    {...stylex.props(styles.specValue, styles.specValueMono)}
                  >
                    {tm('transactionDetails.transactionIdValue')}
                  </span>
                </div>
              </div>
            </div>

            <div {...stylex.props(styles.actions)}>
              <span {...stylex.props(styles.receiptButton)}>
                <Download size={16} />
                {tm('transactionDetails.btnDownloadReceipt')}
              </span>
              <span {...stylex.props(styles.reportButton)}>
                {tm('transactionDetails.btnReportIssue')}
              </span>
            </div>
          </div>

          <div {...stylex.props(styles.homeIndicator)}>
            <span {...stylex.props(styles.homeBar)} />
          </div>
        </div>
      </div>

      <div
        {...stylex.props(
          styles.notification,
          styles.notificationReceived,
          styles.floatOne,
        )}
      >
        <span {...stylex.props(styles.notifIcon, styles.notifIconReceived)}>
          <ArrowDown size={22} />
        </span>
        <div {...stylex.props(styles.notifBody)}>
          <div {...stylex.props(styles.notifTop)}>
            <span {...stylex.props(styles.notifTitle)}>
              {tm('transfer.notificationReceived')}
            </span>
            <span {...stylex.props(styles.notifWhen)}>
              {tm('transfer.notificationReceivedWhen')}
            </span>
          </div>
          <p {...stylex.props(styles.notifDetail)}>
            {tm('transfer.notificationDetail', {
              amount: formatCurrency(250, locale),
            })}
          </p>
        </div>
      </div>

      <div
        {...stylex.props(
          styles.notification,
          styles.notificationSuccessful,
          styles.floatTwo,
        )}
      >
        <span {...stylex.props(styles.notifIcon, styles.notifIconSuccess)}>
          <ArrowUpRight size={20} />
        </span>
        <div {...stylex.props(styles.notifBody)}>
          <div {...stylex.props(styles.notifTop)}>
            <span {...stylex.props(styles.notifTitle)}>
              {tm('transfer.notificationSuccessful')}
            </span>
            <span {...stylex.props(styles.notifWhen)}>
              {tm('transfer.notificationSuccessfulWhen')}
            </span>
          </div>
          <p {...stylex.props(styles.notifDetail)}>
            {tm('transfer.notificationSuccessDetail', {
              amount: formatCurrency(120, locale),
            })}
          </p>
        </div>
      </div>

      <div
        {...stylex.props(
          styles.notification,
          styles.notificationReminder,
          styles.floatThree,
        )}
      >
        <span {...stylex.props(styles.notifIcon, styles.notifIconReminder)}>
          <BellRing size={20} />
        </span>
        <div {...stylex.props(styles.notifBody)}>
          <div {...stylex.props(styles.notifTop)}>
            <span {...stylex.props(styles.notifTitle)}>
              {tm('transfer.paymentReminder')}
            </span>
            <span {...stylex.props(styles.notifWhen, styles.notifWhenPrimary)}>
              {tm('transfer.paymentReminderWhen')}
            </span>
          </div>
          <p {...stylex.props(styles.notifDetail)}>
            {tm('transfer.paymentReminderDetail', {
              amount: formatCurrency(11.99, locale),
            })}
          </p>
        </div>
      </div>

      <div
        {...stylex.props(
          styles.notification,
          styles.notificationSecurity,
          styles.floatFour,
        )}
      >
        <span {...stylex.props(styles.notifIcon, styles.notifIconSecurity)}>
          <BadgeCheck size={20} />
        </span>
        <div {...stylex.props(styles.notifBody)}>
          <div {...stylex.props(styles.notifTop)}>
            <span {...stylex.props(styles.notifTitle)}>
              {tm('transfer.securityAlert')}
            </span>
            <span {...stylex.props(styles.notifWhen)}>
              {tm('transfer.securityAlertWhen')}
            </span>
          </div>
          <p {...stylex.props(styles.notifDetail)}>
            {tm('transfer.securityAlertDetail')}
          </p>
        </div>
      </div>
    </div>
  )
}
