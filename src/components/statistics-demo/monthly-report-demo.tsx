'use client'

import * as stylex from '@stylexjs/stylex'
import { ChevronLeft, ChevronRight, Sparkles, Wallet } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors, fonts } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'
import {
  DemoChip,
  DemoDetailRow,
  DemoHeader,
  DemoScreen,
} from '../banking-demo/demo-ui'
import type { DemoSequenceStage } from '../banking-demo/demo-sequence'
import { demoStyles } from '../banking-demo/demo-styles'
import { DemoTapIndicator } from '../banking-demo/demo-tap-indicator'
import { useDelayedFlag } from '../banking-demo/use-delayed-flag'
import { useDemoSequence } from '../banking-demo/use-demo-sequence'
import {
  CURRENT_MONTH,
  MONTHLY_REPORTS,
  OCTOBER_TRANSACTIONS,
  getCategory,
} from './statistics-demo-data'
import { DonutChart, IncomeExpenseChart } from './statistics-charts'
import { getCategoryColor } from './statistics-colors'
import { statisticsStyles } from './statistics-styles'
import { CategoryIcon, TransactionRow } from './statistics-ui'
import {
  formatPercent,
  formatSignedPercent,
  getBudgetRows,
  getCategoryShares,
  getCategoryTransactions,
  getLargestCategory,
  getLargestTransaction,
  getNetCashFlow,
  getPercentageChange,
  getSavingsRate,
  getTopTransactions,
  sumSpending,
} from './statistics-utils'

type MonthlyReportStage = 'overview' | 'breakdown' | 'summary'

const MONTHLY_REPORT_STAGES: readonly DemoSequenceStage<MonthlyReportStage>[] =
  [
    { id: 'overview', duration: 7200 },
    { id: 'breakdown', duration: 7000 },
    { id: 'summary', duration: 6600 },
  ]

const LATEST_REPORT_INDEX = MONTHLY_REPORTS.length - 1
const SHARES = getCategoryShares(CURRENT_MONTH.spending)
const SHOPPING_SHARE = SHARES.find((share) => share.id === 'shopping')
const BILLS_SHARE = SHARES.find((share) => share.id === 'bills')
const LARGEST_CATEGORY = getLargestCategory(CURRENT_MONTH.spending)
const LARGEST_TRANSACTION = getLargestTransaction(OCTOBER_TRANSACTIONS)
const FOOD_BUDGET_ROW = getBudgetRows(CURRENT_MONTH.spending).find(
  (row) => row.id === 'food',
)
/** Milliseconds after the breakdown mounts when Shopping is selected. */
const CATEGORY_SELECTION_DELAY = 1700

type MonthlyReportDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function MonthlyReportDemo({
  paused,
  reducedMotion,
}: MonthlyReportDemoProps) {
  const { stage } = useDemoSequence(MONTHLY_REPORT_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait">
      {stage === 'overview' ? <ReportOverview key="overview" /> : null}
      {stage === 'breakdown' ? <CategoryBreakdown key="breakdown" /> : null}
      {stage === 'summary' ? <ReportSummary key="summary" /> : null}
    </AnimatePresence>
  )
}

function ReportOverview() {
  const hasAdvanced = useDelayedFlag(3600)
  const activeIndex = hasAdvanced
    ? LATEST_REPORT_INDEX
    : LATEST_REPORT_INDEX - 1
  const report = MONTHLY_REPORTS[activeIndex]
  const previous = MONTHLY_REPORTS[activeIndex - 1]
  const expenses = sumSpending(report.spending)
  const previousExpenses = sumSpending(previous.spending)
  const net = getNetCashFlow(report.income, expenses)
  const previousNet = getNetCashFlow(previous.income, previousExpenses)
  const incomeChange = getPercentageChange(report.income, previous.income)
  const expenseChange = getPercentageChange(expenses, previousExpenses)
  const netChange = getPercentageChange(net, previousNet)

  return (
    <DemoScreen>
      <DemoHeader title="Monthly Report" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.monthSelector)}>
          <span {...stylex.props(statisticsStyles.monthArrow)}>
            <ChevronLeft aria-hidden="true" size={12} strokeWidth={2.6} />
          </span>
          <span {...stylex.props(statisticsStyles.monthLabel)}>
            {report.label}
          </span>
          <span
            {...stylex.props(statisticsStyles.monthArrow)}
            style={{ color: colors.primary }}
          >
            <ChevronRight aria-hidden="true" size={12} strokeWidth={2.6} />
          </span>
        </div>

        <div {...stylex.props(statisticsStyles.statGrid)}>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>
              Monthly Income
            </span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatUsd(report.income)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              {formatSignedPercent(incomeChange)} vs {previous.compactLabel}
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>
              Monthly Expenses
            </span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatUsd(expenses)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              {formatSignedPercent(expenseChange)} vs {previous.compactLabel}
            </span>
          </div>
        </div>

        <div {...stylex.props(statisticsStyles.heroCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(statisticsStyles.heroLabel)}>
              Net Cash Flow
            </span>
            <span
              {...stylex.props(
                demoStyles.chip,
                netChange >= 0
                  ? statisticsStyles.chipPositive
                  : statisticsStyles.chipWarning,
              )}
            >
              {formatSignedPercent(netChange)} vs {previous.compactLabel}
            </span>
          </div>
          <span {...stylex.props(statisticsStyles.heroValue)}>
            {formatUsd(net)}
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {formatPercent(getSavingsRate(report.income, expenses))} savings
            rate · {formatUsd(report.income - previous.income)} income growth
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Income vs Expenses
            </span>
            <div {...stylex.props(styles.legend)}>
              <span {...stylex.props(styles.legendItem)}>
                <span
                  {...stylex.props(statisticsStyles.legendDot)}
                  style={{ backgroundColor: colors.primaryContainer }}
                />
                Income
              </span>
              <span {...stylex.props(styles.legendItem)}>
                <span
                  {...stylex.props(statisticsStyles.legendDot)}
                  style={{ backgroundColor: colors.tertiaryContainer }}
                />
                Expenses
              </span>
            </div>
          </div>
          <IncomeExpenseChart
            income={report.income}
            expenses={expenses}
            delay={0.2}
          />
        </div>
      </div>
    </DemoScreen>
  )
}

function CategoryBreakdown() {
  const hasSelected = useDelayedFlag(CATEGORY_SELECTION_DELAY)
  const selectedId = hasSelected ? 'shopping' : null
  const shopping = getCategory('shopping')
  const shoppingTransactions = getCategoryTransactions(
    OCTOBER_TRANSACTIONS,
    'shopping',
  )
  const topTransactions = getTopTransactions(
    OCTOBER_TRANSACTIONS,
    'shopping',
    2,
  )

  return (
    <DemoScreen>
      <DemoHeader title="Category Breakdown" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.donutCard)}>
          <DonutChart
            slices={SHARES.map((share) => ({
              id: share.id,
              value: share.amount,
              color: getCategoryColor(share.id),
            }))}
            activeId={selectedId}
            centerValue={formatUsd(sumSpending(CURRENT_MONTH.spending))}
            centerLabel="Spent"
            delay={0.15}
          />
          <div {...stylex.props(statisticsStyles.legendList)}>
            {SHARES.map((share) => {
              const category = getCategory(share.id)

              return (
                <div
                  key={share.id}
                  {...stylex.props(statisticsStyles.legendRow)}
                >
                  <span
                    {...stylex.props(statisticsStyles.legendDot)}
                    style={{ backgroundColor: getCategoryColor(share.id) }}
                  />
                  <span {...stylex.props(statisticsStyles.legendLabel)}>
                    {category.label}
                  </span>
                  <span {...stylex.props(statisticsStyles.legendValue)}>
                    {formatUsd(share.amount)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div {...stylex.props(statisticsStyles.statGrid)}>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>
              Categories
            </span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {SHARES.length}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              Tracked this month
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>
              Largest Category
            </span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatPercent(LARGEST_CATEGORY?.share ?? 0)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              {LARGEST_CATEGORY
                ? getCategory(LARGEST_CATEGORY.id).label
                : 'No spending'}
            </span>
          </div>
        </div>

        <motion.div
          {...stylex.props(statisticsStyles.selectionCard)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hasSelected ? 1 : 0, y: hasSelected ? 0 : 8 }}
          transition={{ duration: 0.35 }}
        >
          <div {...stylex.props(statisticsStyles.selectionHead)}>
            <div {...stylex.props(statisticsStyles.categoryIdentity)}>
              <span
                {...stylex.props(statisticsStyles.categoryIcon)}
                style={{ color: getCategoryColor('shopping') }}
              >
                <CategoryIcon id="shopping" size={11} />
              </span>
              <span {...stylex.props(demoStyles.strongText)}>
                {shopping.label}
              </span>
              <DemoChip>{formatPercent(SHOPPING_SHARE?.share ?? 0)}</DemoChip>
            </div>
            <span {...stylex.props(statisticsStyles.selectionAmount)}>
              {formatUsd(SHOPPING_SHARE?.amount ?? 0)}
            </span>
          </div>
          <span {...stylex.props(statisticsStyles.selectionMeta)}>
            {formatPercent(SHOPPING_SHARE?.share ?? 0)} of total spending ·{' '}
            {shoppingTransactions.length} transactions
          </span>
          <div {...stylex.props(statisticsStyles.transactionList)}>
            {topTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </motion.div>

        <div {...stylex.props(statisticsStyles.insightCard)}>
          <Sparkles
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(statisticsStyles.insightText)}>
            Shopping and Bills & Utilities account for{' '}
            {formatPercent(
              (SHOPPING_SHARE?.share ?? 0) + (BILLS_SHARE?.share ?? 0),
            )}{' '}
            of monthly expenses.
          </span>
        </div>
      </div>
      <DemoTapIndicator
        x={32}
        y={13}
        contactDelay={CATEGORY_SELECTION_DELAY / 1000}
      />
    </DemoScreen>
  )
}

function ReportSummary() {
  const largestCategory = LARGEST_CATEGORY
  const largestTransaction = LARGEST_TRANSACTION
  const expenses = sumSpending(CURRENT_MONTH.spending)
  const net = getNetCashFlow(CURRENT_MONTH.income, expenses)

  const rows: { label: string; value: string; highlight?: boolean }[] = [
    { label: 'Total Income', value: formatUsd(CURRENT_MONTH.income) },
    { label: 'Total Expenses', value: formatUsd(expenses) },
    { label: 'Net Savings', value: formatUsd(net), highlight: true },
    {
      label: 'Biggest Category',
      value: largestCategory
        ? `${getCategory(largestCategory.id).label} · ${formatPercent(largestCategory.share)}`
        : 'No spending',
    },
    {
      label: 'Largest Transaction',
      value: largestTransaction
        ? `${largestTransaction.merchant} · ${formatUsd(largestTransaction.amount)}`
        : 'None',
    },
    {
      label: 'Savings Rate',
      value: formatPercent(getSavingsRate(CURRENT_MONTH.income, expenses)),
    },
  ]

  return (
    <DemoScreen>
      <DemoHeader title="Monthly Summary" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.summaryHero)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(statisticsStyles.summaryMonth)}>
              {CURRENT_MONTH.label}
            </span>
            <DemoChip>
              <Wallet aria-hidden="true" size={9} />
              Report ready
            </DemoChip>
          </div>
          <span {...stylex.props(statisticsStyles.summaryTitle)}>
            Your month at a glance
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {formatUsd(CURRENT_MONTH.income)} in · {formatUsd(expenses)} out
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(statisticsStyles.summaryRows)}>
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + index * 0.08,
                  duration: 0.3,
                  ease: [0.1, 0.8, 0.2, 1],
                }}
              >
                <DemoDetailRow
                  label={row.label}
                  value={row.value}
                  highlight={row.highlight}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          {...stylex.props(statisticsStyles.insightCard)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Sparkles
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(statisticsStyles.insightText)}>
            {largestCategory
              ? `${getCategory(largestCategory.id).label} is the largest category at ${formatPercent(largestCategory.share)} of spending.`
              : 'No spending recorded this month.'}{' '}
            {FOOD_BUDGET_ROW
              ? `Food & Dining is at ${formatPercent(FOOD_BUDGET_ROW.progress)} of its ${formatUsd(FOOD_BUDGET_ROW.limit)} budget.`
              : ''}
          </span>
        </motion.div>
      </div>
    </DemoScreen>
  )
}

const styles = stylex.create({
  legend: {
    gap: '0.5rem',
    alignItems: 'center',
    display: 'flex',
  },
  legendItem: {
    gap: '0.1875rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
  },
})
