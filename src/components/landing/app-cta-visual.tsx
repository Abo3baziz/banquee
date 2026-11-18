import * as stylex from '@stylexjs/stylex'
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUp,
  Bell,
  ChartNoAxesColumn,
  CreditCard,
  Ellipsis,
  Eye,
  Film,
  House,
  Laptop,
  Music,
  Plus,
  Signal,
  TrendingUp,
  User,
  Wallet,
  Wifi,
  BatteryFull,
} from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { formatCurrency } from '@/i18n/currency'
import { colors, fonts, radii } from '../../styles/tokens.stylex'

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
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
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-8px)',
    },
    transitionDuration: '500ms',
    transitionProperty: 'transform',
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
  },
  statusBar: {
    paddingInline: '1.25rem',
    backgroundColor: colors.surfaceLight,
    paddingBottom: '0.25rem',
    paddingTop: '0.75rem',
  },
  statusRow: {
    gap: '0.25rem',
    paddingInline: '0.25rem',
    alignItems: 'center',
    color: colors.onSurface,
    display: 'flex',
    fontSize: '0.6875rem',
    fontWeight: 600,
    justifyContent: 'space-between',
    lineHeight: '0.875rem',
    marginBottom: '0.375rem',
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
  header: {
    paddingBlock: '0.25rem',
    paddingInline: '1.25rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.25rem',
  },
  identity: {
    gap: '0.5rem',
    alignItems: 'center',
    display: 'flex',
  },
  avatar: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    display: 'flex',
    fontFamily: fonts.heading,
    fontSize: '0.75rem',
    fontWeight: 700,
    justifyContent: 'center',
    height: '2rem',
    width: '2rem',
  },
  greeting: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  userName: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  bell: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    color: colors.onSurfaceVariant,
    display: 'flex',
    justifyContent: 'center',
    height: '1.75rem',
    width: '1.75rem',
  },
  body: {
    gap: '0.625rem',
    paddingInline: '0.875rem',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '0.5rem',
    paddingTop: '0.375rem',
  },
  balanceCard: {
    padding: '0.875rem',
    borderRadius: '1rem',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(135deg, #006b5c, #005145)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    color: colors.onPrimary,
    position: 'relative',
  },
  balanceSheen: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    filter: 'blur(24px)',
    pointerEvents: 'none',
    position: 'absolute',
    bottom: '-1.5rem',
    height: '6rem',
    right: '-1.5rem',
    width: '6rem',
  },
  balanceTop: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  balanceValue: {
    color: colors.onPrimary,
    fontFamily: fonts.heading,
    fontSize: '1.5625rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: '2rem',
    position: 'relative',
    zIndex: 1,
    marginTop: '0.125rem',
  },
  trendRow: {
    gap: '0.25rem',
    alignItems: 'center',
    color: colors.primaryFixed,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
    position: 'relative',
    zIndex: 1,
    marginTop: '0.375rem',
  },
  quickActions: {
    gap: '0.375rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    textAlign: 'center',
  },
  quickAction: {
    gap: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  quickIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    height: '2.5rem',
    width: '2.5rem',
  },
  quickIconMuted: {
    backgroundColor: colors.surfaceContainerLow,
    color: colors.onSurfaceVariant,
  },
  quickLabel: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
  },
  sectionHeader: {
    paddingInline: '0.125rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  seeAll: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
  },
  transactions: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
  },
  transaction: {
    padding: '0.375rem',
    borderRadius: radii.md,
    gap: '0.5rem',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 243, 243, 0.7)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  transactionLeft: {
    gap: '0.5rem',
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  transactionIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1.75rem',
    width: '1.75rem',
  },
  iconSpotify: {
    backgroundColor: 'rgba(30, 215, 96, 0.15)',
    color: '#1ed760',
  },
  iconNetflix: {
    backgroundColor: colors.errorContainer,
    color: colors.error,
  },
  iconApple: {
    backgroundColor: colors.tintBlue,
    color: colors.onSurface,
  },
  iconSalary: {
    backgroundColor: colors.primary,
    color: colors.onPrimary,
  },
  transactionName: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
  },
  transactionCategory: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    lineHeight: '0.75rem',
  },
  transactionAmount: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    lineHeight: '0.875rem',
  },
  creditAmount: {
    color: colors.primary,
  },
  tabBar: {
    paddingInline: '0.75rem',
    backgroundColor: colors.surfaceLight,
    borderTopColor: 'rgba(217, 217, 217, 0.2)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingBottom: '0.5rem',
    paddingTop: '0.375rem',
  },
  tabs: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  tab: {
    gap: '0.125rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    flexDirection: 'column',
  },
  tabActive: {
    color: colors.primary,
  },
  tabLabel: {
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    lineHeight: '0.75rem',
  },
  tabLabelActive: {
    fontWeight: 700,
  },
  homeIndicator: {
    backgroundColor: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
  },
  homeBar: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(26, 28, 28, 0.3)',
    height: '0.25rem',
    width: '6rem',
  },
})

export async function AppCtaVisual() {
  const [tm, tc, locale] = await Promise.all([
    getTranslations('mockups'),
    getTranslations('common'),
    getLocale(),
  ])

  return (
    <div aria-hidden="true" {...stylex.props(styles.root)}>
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
            <div {...stylex.props(styles.header)}>
              <div {...stylex.props(styles.identity)}>
                <span {...stylex.props(styles.avatar)}>JD</span>
                <div>
                  <div {...stylex.props(styles.greeting)}>
                    {tm('dashboard.greeting')}
                  </div>
                  <div {...stylex.props(styles.userName)}>
                    {tm('dashboard.userName')}
                  </div>
                </div>
              </div>
              <span {...stylex.props(styles.bell)}>
                <Bell size={16} />
              </span>
            </div>
          </div>

          <div {...stylex.props(styles.body)}>
            <div {...stylex.props(styles.balanceCard)}>
              <div {...stylex.props(styles.balanceSheen)} />
              <div {...stylex.props(styles.balanceTop)}>
                <span {...stylex.props(styles.balanceLabel)}>
                  {tm('dashboard.totalBalance')}
                </span>
                <Eye size={16} />
              </div>
              <div {...stylex.props(styles.balanceValue)}>
                {tm('dashboard.balanceValue', {
                  amount: formatCurrency(24580, locale),
                })}
              </div>
              <div {...stylex.props(styles.trendRow)}>
                <TrendingUp size={13} />
                <span>{tm('dashboard.monthTrendAlt')}</span>
              </div>
            </div>

            <div {...stylex.props(styles.quickActions)}>
              <span {...stylex.props(styles.quickAction)}>
                <span {...stylex.props(styles.quickIcon)}>
                  <ArrowUp size={18} />
                </span>
                <span {...stylex.props(styles.quickLabel)}>{tc('send')}</span>
              </span>
              <span {...stylex.props(styles.quickAction)}>
                <span {...stylex.props(styles.quickIcon)}>
                  <ArrowDown size={18} />
                </span>
                <span {...stylex.props(styles.quickLabel)}>
                  {tc('request')}
                </span>
              </span>
              <span {...stylex.props(styles.quickAction)}>
                <span {...stylex.props(styles.quickIcon)}>
                  <Plus size={18} />
                </span>
                <span {...stylex.props(styles.quickLabel)}>{tc('topUp')}</span>
              </span>
              <span {...stylex.props(styles.quickAction)}>
                <span
                  {...stylex.props(styles.quickIcon, styles.quickIconMuted)}
                >
                  <Ellipsis size={18} />
                </span>
                <span {...stylex.props(styles.quickLabel)}>{tc('more')}</span>
              </span>
            </div>

            <div {...stylex.props(styles.sectionHeader)}>
              <span {...stylex.props(styles.sectionTitle)}>
                {tm('dashboard.recentTransactions')}
              </span>
              <span {...stylex.props(styles.seeAll)}>
                {tm('dashboard.viewAll')}
              </span>
            </div>

            <div {...stylex.props(styles.transactions)}>
              <div {...stylex.props(styles.transaction)}>
                <div {...stylex.props(styles.transactionLeft)}>
                  <span
                    {...stylex.props(
                      styles.transactionIcon,
                      styles.iconSpotify,
                    )}
                  >
                    <Music size={15} />
                  </span>
                  <div>
                    <div {...stylex.props(styles.transactionName)}>
                      {tm('dashboard.transactions.spotify')}
                    </div>
                    <div {...stylex.props(styles.transactionCategory)}>
                      {tm('dashboard.transactions.spotifyCategory')}
                    </div>
                  </div>
                </div>
                <span {...stylex.props(styles.transactionAmount)}>
                  {formatCurrency(-12.99, locale)}
                </span>
              </div>

              <div {...stylex.props(styles.transaction)}>
                <div {...stylex.props(styles.transactionLeft)}>
                  <span
                    {...stylex.props(
                      styles.transactionIcon,
                      styles.iconNetflix,
                    )}
                  >
                    <Film size={15} />
                  </span>
                  <div>
                    <div {...stylex.props(styles.transactionName)}>
                      {tm('dashboard.transactions.netflix')}
                    </div>
                    <div {...stylex.props(styles.transactionCategory)}>
                      {tm('dashboard.transactions.netflixCategory')}
                    </div>
                  </div>
                </div>
                <span {...stylex.props(styles.transactionAmount)}>
                  {formatCurrency(-15.49, locale)}
                </span>
              </div>

              <div {...stylex.props(styles.transaction)}>
                <div {...stylex.props(styles.transactionLeft)}>
                  <span
                    {...stylex.props(styles.transactionIcon, styles.iconApple)}
                  >
                    <Laptop size={15} />
                  </span>
                  <div>
                    <div {...stylex.props(styles.transactionName)}>
                      {tm('dashboard.transactions.appleStore')}
                    </div>
                    <div {...stylex.props(styles.transactionCategory)}>
                      {tm('dashboard.transactions.appleCategory')}
                    </div>
                  </div>
                </div>
                <span {...stylex.props(styles.transactionAmount)}>
                  {formatCurrency(-249, locale)}
                </span>
              </div>

              <div {...stylex.props(styles.transaction)}>
                <div {...stylex.props(styles.transactionLeft)}>
                  <span
                    {...stylex.props(styles.transactionIcon, styles.iconSalary)}
                  >
                    <Wallet size={15} />
                  </span>
                  <div>
                    <div {...stylex.props(styles.transactionName)}>
                      {tm('dashboard.transactions.salaryDeposit')}
                    </div>
                    <div {...stylex.props(styles.transactionCategory)}>
                      {tm('dashboard.transactions.salaryDepositSub')}
                    </div>
                  </div>
                </div>
                <span
                  {...stylex.props(
                    styles.transactionAmount,
                    styles.creditAmount,
                  )}
                >
                  {formatCurrency(3500, locale, { signDisplay: 'always' })}
                </span>
              </div>
            </div>
          </div>

          <div {...stylex.props(styles.tabBar)}>
            <div {...stylex.props(styles.tabs)}>
              <span {...stylex.props(styles.tab, styles.tabActive)}>
                <House size={18} />
                <span {...stylex.props(styles.tabLabel, styles.tabLabelActive)}>
                  {tm('dashboard.tabs.home')}
                </span>
              </span>
              <span {...stylex.props(styles.tab)}>
                <CreditCard size={18} />
                <span {...stylex.props(styles.tabLabel)}>
                  {tm('dashboard.tabs.cards')}
                </span>
              </span>
              <span {...stylex.props(styles.tab)}>
                <ArrowLeftRight size={18} />
                <span {...stylex.props(styles.tabLabel)}>
                  {tm('dashboard.tabs.payments')}
                </span>
              </span>
              <span {...stylex.props(styles.tab)}>
                <ChartNoAxesColumn size={18} />
                <span {...stylex.props(styles.tabLabel)}>
                  {tm('dashboard.tabs.statistics')}
                </span>
              </span>
              <span {...stylex.props(styles.tab)}>
                <User size={18} />
                <span {...stylex.props(styles.tabLabel)}>
                  {tm('dashboard.tabs.profile')}
                </span>
              </span>
            </div>
            <div {...stylex.props(styles.homeIndicator)}>
              <span {...stylex.props(styles.homeBar)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
