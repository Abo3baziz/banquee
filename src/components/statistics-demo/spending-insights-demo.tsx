'use client'

import * as stylex from '@stylexjs/stylex'
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  TrendingUp,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCurrency } from '../../hooks/use-currency'
import { colors } from '../../styles/tokens.stylex'
import { DemoHeader, DemoScreen } from '../banking-demo/demo-ui'
import type { DemoSequenceStage } from '../banking-demo/demo-sequence'
import { demoStyles } from '../banking-demo/demo-styles'
import { DemoTapIndicator } from '../banking-demo/demo-tap-indicator'
import { useDelayedFlag } from '../banking-demo/use-delayed-flag'
import { useDemoSequence } from '../banking-demo/use-demo-sequence'
import {
  CURRENT_MONTH,
  OCTOBER_TRANSACTIONS,
  PREVIOUS_MONTH,
  RECURRING_EXPENSES,
  SPENDING_PERIODS,
  getCategory,
} from './statistics-demo-data'
import { ComparisonBars } from './statistics-charts'
import { getCategoryColor } from './statistics-colors'
import { statisticsStyles } from './statistics-styles'
import {
  CategoryBarRow,
  CategoryIcon,
  PeriodTabs,
  TransactionRow,
} from './statistics-ui'
import {
  formatPercent,
  formatSignedPercent,
  getCategoryShares,
  getPercentageChange,
  getRecurringTotal,
  getShare,
  getTopTransactions,
  sumSpending,
  sumTransactions,
} from './statistics-utils'

type SpendingInsightsStage = 'overview' | 'spike' | 'recurring'

const SPENDING_INSIGHTS_STAGES: readonly DemoSequenceStage<SpendingInsightsStage>[] =
  [
    { id: 'overview', duration: 7200 },
    { id: 'spike', duration: 6200 },
    { id: 'recurring', duration: 6000 },
  ]

const SHOPPING_SPIKE_CHANGE = getPercentageChange(
  CURRENT_MONTH.spending.shopping,
  PREVIOUS_MONTH.spending.shopping,
)

const RECURRING_TOTAL = getRecurringTotal(RECURRING_EXPENSES)
const CURRENT_TOTAL = sumSpending(CURRENT_MONTH.spending)
const RECURRING_SHARE = getShare(RECURRING_TOTAL, CURRENT_TOTAL)
/** Milliseconds after the overview mounts when the period tab switches. */
const PERIOD_SWITCH_DELAY = 3600

type SpendingInsightsDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function SpendingInsightsDemo({
  paused,
  reducedMotion,
}: SpendingInsightsDemoProps) {
  const { stage } = useDemoSequence(SPENDING_INSIGHTS_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait">
      {stage === 'overview' ? <InsightsOverview key="overview" /> : null}
      {stage === 'spike' ? <SpendingSpike key="spike" /> : null}
      {stage === 'recurring' ? <RecurringExpenses key="recurring" /> : null}
    </AnimatePresence>
  )
}

function InsightsOverview() {
  const { formatCurrency } = useCurrency()
  const hasSwitched = useDelayedFlag(PERIOD_SWITCH_DELAY)
  const activeIndex = hasSwitched ? 1 : 0
  const period = SPENDING_PERIODS[activeIndex]
  const total = sumSpending(period.current)
  const previousTotal = sumSpending(period.previous)
  const change = getPercentageChange(total, previousTotal)
  const shares = getCategoryShares(period.current)

  return (
    <DemoScreen>
      <DemoHeader title="Spending Insights" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.periodBar)}>
          <PeriodTabs periods={SPENDING_PERIODS} activeIndex={activeIndex} />
          <span {...stylex.props(demoStyles.caption)}>6 categories</span>
        </div>

        <div {...stylex.props(statisticsStyles.totalBlock)}>
          <span {...stylex.props(demoStyles.label)}>Total Spending</span>
          <span {...stylex.props(statisticsStyles.totalAmount)}>
            {formatCurrency(total)}
          </span>
          <div {...stylex.props(statisticsStyles.totalMeta)}>
            <span
              {...stylex.props(
                demoStyles.chip,
                change >= 0
                  ? statisticsStyles.chipWarning
                  : statisticsStyles.chipPositive,
              )}
            >
              <TrendingUp aria-hidden="true" size={9} />
              {formatSignedPercent(change)}
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {period.compareLabel}
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Category Breakdown
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              prev. {formatCurrency(previousTotal)}
            </span>
          </div>
          <div
            {...stylex.props(
              statisticsStyles.categoryList,
              styles.breakdownSpacing,
            )}
          >
            {shares.map((share, index) => (
              <CategoryBarRow
                key={share.id}
                category={getCategory(share.id)}
                amount={share.amount}
                share={share.share}
                delay={0.15 + index * 0.05}
              />
            ))}
          </div>
        </div>

        <motion.div
          {...stylex.props(statisticsStyles.spikeCard)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
        >
          <div {...stylex.props(statisticsStyles.spikeHead)}>
            <span
              {...stylex.props(demoStyles.iconCircleSmall, styles.spikeIcon)}
            >
              <AlertTriangle aria-hidden="true" size={12} />
            </span>
            <span {...stylex.props(statisticsStyles.spikeTitle)}>
              Unusual spike in Shopping
            </span>
            <span
              {...stylex.props(demoStyles.chip, statisticsStyles.chipWarning)}
            >
              +{formatPercent(SHOPPING_SPIKE_CHANGE)}
            </span>
          </div>
          <span {...stylex.props(statisticsStyles.spikeText)}>
            Shopping reached {formatCurrency(CURRENT_MONTH.spending.shopping)}{' '}
            this month, up from{' '}
            {formatCurrency(PREVIOUS_MONTH.spending.shopping)} in{' '}
            {PREVIOUS_MONTH.compactLabel}.
          </span>
          <span {...stylex.props(statisticsStyles.spikeLink)}>
            View spike details
            <ArrowRight aria-hidden="true" size={10} strokeWidth={2.6} />
          </span>
        </motion.div>
      </div>
      <DemoTapIndicator
        x={32}
        y={10}
        contactDelay={PERIOD_SWITCH_DELAY / 1000}
      />
    </DemoScreen>
  )
}

function SpendingSpike() {
  const { formatCurrency } = useCurrency()
  const topDrivers = getTopTransactions(OCTOBER_TRANSACTIONS, 'shopping', 4)
  const topDriversTotal = sumTransactions(topDrivers)
  const driverShare = getShare(topDriversTotal, CURRENT_MONTH.spending.shopping)

  return (
    <DemoScreen>
      <DemoHeader title="Shopping Spike" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <div {...stylex.props(statisticsStyles.categoryIdentity)}>
            <span {...stylex.props(demoStyles.iconCircle, styles.spikeIcon)}>
              <CategoryIcon id="shopping" size={14} />
            </span>
            <div>
              <div {...stylex.props(demoStyles.title)}>Shopping</div>
              <span {...stylex.props(demoStyles.caption)}>
                {PREVIOUS_MONTH.label} → {CURRENT_MONTH.label}
              </span>
            </div>
          </div>
          <span
            {...stylex.props(demoStyles.chip, statisticsStyles.chipWarning)}
          >
            {formatSignedPercent(SHOPPING_SPIKE_CHANGE)}
          </span>
        </div>

        <div {...stylex.props(statisticsStyles.statGrid)}>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>Current</span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatCurrency(CURRENT_MONTH.spending.shopping)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              {CURRENT_MONTH.compactLabel} · Elevated
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>Previous</span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatCurrency(PREVIOUS_MONTH.spending.shopping)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              {PREVIOUS_MONTH.compactLabel} · Regular volume
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Month over Month
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {formatCurrency(
                CURRENT_MONTH.spending.shopping -
                  PREVIOUS_MONTH.spending.shopping,
                { signDisplay: 'always' },
              )}{' '}
              more
            </span>
          </div>
          <ComparisonBars
            delay={0.2}
            height={96}
            bars={[
              {
                label: PREVIOUS_MONTH.compactLabel,
                value: PREVIOUS_MONTH.spending.shopping,
                color: colors.outlineVariant,
              },
              {
                label: CURRENT_MONTH.compactLabel,
                value: CURRENT_MONTH.spending.shopping,
                color: colors.tertiary,
              },
            ]}
          />
        </div>

        <div {...stylex.props(statisticsStyles.insightCard)}>
          <AlertTriangle
            aria-hidden="true"
            size={12}
            style={{ color: colors.tertiary, flexShrink: 0 }}
          />
          <span {...stylex.props(statisticsStyles.insightText)}>
            The 4 largest purchases total {formatCurrency(topDriversTotal)},{' '}
            {formatPercent(driverShare)} of shopping this month.
          </span>
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>Key Drivers</span>
            <span {...stylex.props(demoStyles.caption)}>
              {topDrivers.length} transactions
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.transactionList)}>
            {topDrivers.map((transaction, index) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                delay={0.35 + index * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </DemoScreen>
  )
}

function RecurringExpenses() {
  const { formatCurrency } = useCurrency()
  const nextExpense = RECURRING_EXPENSES[0]

  return (
    <DemoScreen>
      <DemoHeader title="Recurring Expenses" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.heroCard)}>
          <span {...stylex.props(statisticsStyles.heroLabel)}>
            Total Committed Outflow
          </span>
          <div {...stylex.props(statisticsStyles.inlineRow)}>
            <span {...stylex.props(statisticsStyles.heroValue)}>
              {formatCurrency(RECURRING_TOTAL)}
            </span>
            <span {...stylex.props(demoStyles.caption)}>/ month</span>
          </div>
          <span {...stylex.props(demoStyles.caption)}>
            {RECURRING_EXPENSES.length} active subscriptions ·{' '}
            {formatPercent(RECURRING_SHARE)} of monthly spending
          </span>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>
            Scheduled Subscriptions
          </span>
          <span {...stylex.props(demoStyles.caption)}>Next charges</span>
        </div>

        <div {...stylex.props(statisticsStyles.transactionList)}>
          {RECURRING_EXPENSES.map((expense, index) => {
            return (
              <motion.div
                key={expense.id}
                {...stylex.props(styles.recurringRow)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.06, duration: 0.3 }}
              >
                <span
                  {...stylex.props(statisticsStyles.transactionIcon)}
                  style={{ color: getCategoryColor(expense.category) }}
                >
                  <CategoryIcon id={expense.category} size={11} />
                </span>
                <div {...stylex.props(statisticsStyles.transactionBody)}>
                  <div {...stylex.props(statisticsStyles.transactionMerchant)}>
                    {expense.merchant}
                  </div>
                  <div {...stylex.props(statisticsStyles.transactionMeta)}>
                    {expense.frequency} · Next {expense.nextPayment}
                  </div>
                </div>
                <div {...stylex.props(styles.recurringAmount)}>
                  <span {...stylex.props(statisticsStyles.transactionAmount)}>
                    {formatCurrency(expense.amount)}
                  </span>
                  <span {...stylex.props(demoStyles.caption)}>per month</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div {...stylex.props(statisticsStyles.insightCard)}>
          <CalendarClock
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(statisticsStyles.insightText)}>
            Next charge: {formatCurrency(nextExpense.amount)} for{' '}
            {nextExpense.merchant} on {nextExpense.nextPayment}. Auto-pay is
            enabled for all recurring services.
          </span>
        </div>
      </div>
    </DemoScreen>
  )
}

const styles = stylex.create({
  spikeIcon: {
    backgroundColor: 'rgba(231, 142, 122, 0.2)',
    color: colors.tertiary,
  },
  breakdownSpacing: {
    marginTop: '0.375rem',
  },
  recurringRow: {
    gap: '0.375rem',
    paddingBlock: '0.25rem',
    alignItems: 'center',
    display: 'flex',
  },
  recurringAmount: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
})
