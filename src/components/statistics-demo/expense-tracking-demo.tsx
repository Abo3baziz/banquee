'use client'

import * as stylex from '@stylexjs/stylex'
import { ArrowRight, CalendarClock, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'
import {
  DemoChip,
  DemoDetailRow,
  DemoHeader,
  DemoPrimaryButton,
  DemoScreen,
  DemoSuccessCheck,
} from '../banking-demo/demo-ui'
import type { DemoSequenceStage } from '../banking-demo/demo-sequence'
import { demoStyles } from '../banking-demo/demo-styles'
import { DemoTapIndicator } from '../banking-demo/demo-tap-indicator'
import { useTypewriter } from '../banking-demo/use-typewriter'
import { useDemoSequence } from '../banking-demo/use-demo-sequence'
import {
  BUDGET_CYCLE,
  CATEGORY_BUDGETS,
  CURRENT_MONTH,
  FOOD_BUDGET,
  OCTOBER_TRANSACTIONS,
  getCategory,
} from './statistics-demo-data'
import { ProgressBar } from './statistics-charts'
import { getCategoryColor } from './statistics-colors'
import { statisticsStyles } from './statistics-styles'
import { CategoryIcon, StatusChip, TransactionRow } from './statistics-ui'
import {
  formatPercent,
  getBudgetProgress,
  getBudgetRows,
  getDailyAverage,
  getProjectedSpending,
  getRecentTransactions,
  getRemainingBudget,
  getTotalBudgetLimit,
  sumSpending,
} from './statistics-utils'

type ExpenseTrackingStage = 'overview' | 'details' | 'edit' | 'success'

const EXPENSE_TRACKING_STAGES: readonly DemoSequenceStage<ExpenseTrackingStage>[] =
  [
    { id: 'overview', duration: 6000 },
    { id: 'details', duration: 6200 },
    { id: 'edit', duration: 6200 },
    { id: 'success', duration: 5600 },
  ]

const MONTH_SPENDING = sumSpending(CURRENT_MONTH.spending)
const FOOD_SPENT = CURRENT_MONTH.spending.food
const FOOD_DAILY_AVERAGE = getDailyAverage(FOOD_SPENT, BUDGET_CYCLE.daysElapsed)
const FOOD_PROJECTED = getProjectedSpending(
  FOOD_SPENT,
  BUDGET_CYCLE.daysElapsed,
  BUDGET_CYCLE.daysInCycle,
)
const FOOD_TRANSACTIONS = getRecentTransactions(OCTOBER_TRANSACTIONS, 'food', 4)

type ExpenseTrackingDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function ExpenseTrackingDemo({
  paused,
  reducedMotion,
}: ExpenseTrackingDemoProps) {
  const { stage } = useDemoSequence(EXPENSE_TRACKING_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  /*
   * The budget edit plays the same 600 → 750 story on every loop: the updated
   * limit is shown in the success screen and resets when the sequence restarts.
   */
  return (
    <AnimatePresence mode="wait">
      {stage === 'overview' ? <BudgetsOverview key="overview" /> : null}
      {stage === 'details' ? <BudgetDetails key="details" /> : null}
      {stage === 'edit' ? <EditBudget key="edit" /> : null}
      {stage === 'success' ? <BudgetUpdated key="success" /> : null}
    </AnimatePresence>
  )
}

function getFoodRows(foodLimit: number) {
  return getBudgetRows(CURRENT_MONTH.spending, CATEGORY_BUDGETS, {
    food: foodLimit,
  })
}

function BudgetsOverview() {
  const rows = getFoodRows(FOOD_BUDGET.limit)
  const totalLimit = getTotalBudgetLimit(CATEGORY_BUDGETS, {
    food: FOOD_BUDGET.limit,
  })
  const totalProgress = getBudgetProgress(MONTH_SPENDING, totalLimit)
  const remaining = getRemainingBudget(totalLimit, MONTH_SPENDING)
  const onTrackCount = rows.filter((row) => row.status === 'on-track').length

  return (
    <DemoScreen>
      <DemoHeader title="Expense Tracking" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.totalBlock)}>
          <span {...stylex.props(demoStyles.label)}>
            Total Monthly Expenses
          </span>
          <span {...stylex.props(statisticsStyles.totalAmount)}>
            {formatUsd(MONTH_SPENDING)}
          </span>
          <div {...stylex.props(statisticsStyles.totalMeta)}>
            <span
              {...stylex.props(demoStyles.chip, statisticsStyles.chipPositive)}
            >
              {onTrackCount} of {rows.length} on track
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {CURRENT_MONTH.label}
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Overall Budget
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {formatPercent(totalProgress)} used
            </span>
          </div>
          <div {...stylex.props(styles.overallBlock)}>
            <ProgressBar value={totalProgress} delay={0.15} height={7} />
            <div {...stylex.props(demoStyles.rowBetween)}>
              <span {...stylex.props(demoStyles.caption)}>
                {formatUsd(MONTH_SPENDING)} spent
              </span>
              <span {...stylex.props(demoStyles.caption)}>
                {formatUsd(remaining)} left
              </span>
            </div>
          </div>
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Category Budgets
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {formatUsd(totalLimit)} total
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.budgetList)}>
            {rows.map((row, index) => {
              const category = getCategory(row.id)
              const isFood = row.id === 'food'

              return (
                <div
                  key={row.id}
                  {...stylex.props(
                    statisticsStyles.budgetRow,
                    styles.budgetRowSpacing,
                    isFood && styles.foodRowHighlight,
                  )}
                >
                  <div {...stylex.props(statisticsStyles.budgetHead)}>
                    <div {...stylex.props(statisticsStyles.budgetIdentity)}>
                      <span
                        {...stylex.props(statisticsStyles.categoryIcon)}
                        style={{ color: getCategoryColor(row.id) }}
                      >
                        <CategoryIcon id={row.id} />
                      </span>
                      <span {...stylex.props(statisticsStyles.categoryLabel)}>
                        {category.label}
                      </span>
                      <StatusChip status={row.status} />
                    </div>
                    <div {...stylex.props(statisticsStyles.budgetFigures)}>
                      <span {...stylex.props(statisticsStyles.categoryAmount)}>
                        {formatUsd(row.spent)}
                      </span>
                      <span {...stylex.props(statisticsStyles.budgetLimit)}>
                        / {formatUsd(row.limit)}
                      </span>
                    </div>
                  </div>
                  <ProgressBar
                    value={row.progress}
                    color={getCategoryColor(row.id)}
                    delay={0.2 + index * 0.06}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Contact lands on the Food & Dining row and the hand lifts as the
          detail screen takes over at 6s. */}
      <DemoTapIndicator x={36} y={44} contactDelay={5.2} />
    </DemoScreen>
  )
}

function BudgetDetails() {
  const foodLimit = FOOD_BUDGET.limit
  const progress = getBudgetProgress(FOOD_SPENT, foodLimit)
  const remaining = getRemainingBudget(foodLimit, FOOD_SPENT)
  const foodRow = getFoodRows(foodLimit).find((row) => row.id === 'food')

  return (
    <DemoScreen>
      <DemoHeader title="Food & Dining" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.heroCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(statisticsStyles.heroLabel)}>
              Food & Dining Budget
            </span>
            {foodRow ? <StatusChip status={foodRow.status} /> : null}
          </div>
          <span {...stylex.props(statisticsStyles.heroValue)}>
            {formatUsd(FOOD_SPENT)}{' '}
            <span {...stylex.props(demoStyles.caption)}>
              of {formatUsd(foodLimit)}
            </span>
          </span>
          <ProgressBar
            value={progress}
            color={getCategoryColor('food')}
            delay={0.15}
            height={7}
          />
          <span {...stylex.props(demoStyles.caption)}>
            {formatUsd(remaining)} remaining · {formatPercent(progress)} used
          </span>
        </div>

        <div {...stylex.props(statisticsStyles.statGrid)}>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>
              Daily Average
            </span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatUsd(FOOD_DAILY_AVERAGE)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              Over {BUDGET_CYCLE.daysElapsed} days
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.statCard)}>
            <span {...stylex.props(statisticsStyles.statLabel)}>
              Projected Month-End
            </span>
            <span {...stylex.props(statisticsStyles.statValue)}>
              {formatUsd(FOOD_PROJECTED)}
            </span>
            <span {...stylex.props(statisticsStyles.statDelta)}>
              {BUDGET_CYCLE.daysInCycle}-day cycle
            </span>
          </div>
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Recent Transactions
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {FOOD_TRANSACTIONS.length} latest
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.transactionList)}>
            {FOOD_TRANSACTIONS.map((transaction, index) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                delay={0.2 + index * 0.06}
              />
            ))}
          </div>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Adjust Monthly Budget"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={5}
        />
      </div>
    </DemoScreen>
  )
}

function EditBudget() {
  const { text, complete } = useTypewriter(String(FOOD_BUDGET.updatedLimit), {
    startDelay: 1000,
    charDelay: 240,
  })
  const typedLimit = Number(text)
  const previewLimit = complete ? typedLimit : FOOD_BUDGET.limit
  const previewRemaining = getRemainingBudget(previewLimit, FOOD_SPENT)
  const previewProgress = getBudgetProgress(FOOD_SPENT, previewLimit)
  const projectedProgress = getBudgetProgress(FOOD_PROJECTED, previewLimit)

  return (
    <DemoScreen>
      <DemoHeader title="Edit Budget" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <div {...stylex.props(statisticsStyles.categoryIdentity)}>
            <span
              {...stylex.props(demoStyles.iconCircle)}
              style={{ color: getCategoryColor('food') }}
            >
              <CategoryIcon id="food" size={14} />
            </span>
            <div>
              <div {...stylex.props(demoStyles.title)}>Food & Dining</div>
              <span {...stylex.props(demoStyles.caption)}>
                October 2026 monthly budget
              </span>
            </div>
          </div>
          <DemoChip>
            {formatPercent(getBudgetProgress(FOOD_SPENT, FOOD_BUDGET.limit))}{' '}
            used
          </DemoChip>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <DemoDetailRow
            label="Current monthly limit"
            value={formatUsd(FOOD_BUDGET.limit)}
          />
          <DemoDetailRow label="Spent so far" value={formatUsd(FOOD_SPENT)} />
        </div>

        <div {...stylex.props(statisticsStyles.field)}>
          <span {...stylex.props(statisticsStyles.fieldLabel)}>
            New monthly budget
          </span>
          <div {...stylex.props(styles.fieldAmountRow)}>
            <span {...stylex.props(statisticsStyles.fieldAmount)}>
              <span {...stylex.props(statisticsStyles.fieldPrefix)}>$</span>
              {text || '0'}
              {!complete ? (
                <motion.span
                  {...stylex.props(statisticsStyles.caret)}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                />
              ) : null}
            </span>
          </div>
          <span {...stylex.props(demoStyles.caption)}>
            Type a new limit. It applies immediately.
          </span>
        </div>

        <motion.div
          {...stylex.props(statisticsStyles.previewCard)}
          initial={{ opacity: 0, y: 6 }}
          animate={complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
        >
          <div {...stylex.props(statisticsStyles.previewRow)}>
            <span {...stylex.props(statisticsStyles.previewLabel)}>
              Remaining after update
            </span>
            <span {...stylex.props(statisticsStyles.previewValueStrong)}>
              {formatUsd(previewRemaining)}
            </span>
          </div>
          <ProgressBar
            value={previewProgress}
            color={getCategoryColor('food')}
            delay={0.15}
            height={6}
          />
          <div {...stylex.props(statisticsStyles.previewRow)}>
            <span {...stylex.props(statisticsStyles.previewLabel)}>
              New usage
            </span>
            <span {...stylex.props(statisticsStyles.previewValue)}>
              {formatPercent(previewProgress)}
            </span>
          </div>
          <div {...stylex.props(statisticsStyles.previewRow)}>
            <span {...stylex.props(statisticsStyles.previewLabel)}>
              Projected month-end usage
            </span>
            <span {...stylex.props(statisticsStyles.previewValue)}>
              {formatPercent(projectedProgress)}
            </span>
          </div>
        </motion.div>

        <div {...stylex.props(statisticsStyles.insightCard)}>
          <CalendarClock
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(statisticsStyles.insightText)}>
            Projected spending of {formatUsd(FOOD_PROJECTED)} is{' '}
            {FOOD_PROJECTED > previewLimit ? 'above' : 'within'} the new{' '}
            {formatUsd(previewLimit)} budget.
          </span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Save New Budget"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={4.4}
          disabled={!complete}
        />
      </div>
    </DemoScreen>
  )
}

function BudgetUpdated() {
  const newLimit = FOOD_BUDGET.updatedLimit
  const remaining = getRemainingBudget(newLimit, FOOD_SPENT)
  const progress = getBudgetProgress(FOOD_SPENT, newLimit)
  const projectedProgress = getBudgetProgress(FOOD_PROJECTED, newLimit)

  return (
    <DemoScreen>
      <DemoHeader title="Food & Dining" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(statisticsStyles.successHero)}>
          <DemoSuccessCheck />
          <span {...stylex.props(statisticsStyles.successTitle)}>
            Budget updated successfully!
          </span>
          <motion.span
            {...stylex.props(statisticsStyles.successAmount)}
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.5,
              ease: [0.1, 0.8, 0.2, 1],
            }}
          >
            {formatUsd(newLimit)}
          </motion.span>
          <span {...stylex.props(statisticsStyles.successText)}>
            Your new Food & Dining monthly budget is active immediately for
            October 2026.
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(statisticsStyles.previewRow)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Budget Summary
            </span>
            <DemoChip>Active</DemoChip>
          </div>
          <div {...stylex.props(styles.receiptRows)}>
            {[
              { label: 'New budget', value: formatUsd(newLimit) },
              { label: 'Previous budget', value: formatUsd(FOOD_BUDGET.limit) },
              { label: 'Spent so far', value: formatUsd(FOOD_SPENT) },
              { label: 'Remaining', value: formatUsd(remaining) },
              { label: 'Effective', value: 'Immediately' },
            ].map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.06, duration: 0.3 }}
              >
                <DemoDetailRow label={row.label} value={row.value} />
              </motion.div>
            ))}
          </div>
        </div>

        <div {...stylex.props(statisticsStyles.previewCard)}>
          <div {...stylex.props(statisticsStyles.previewRow)}>
            <span {...stylex.props(demoStyles.caption)}>New budget usage</span>
            <span {...stylex.props(statisticsStyles.previewValue)}>
              {formatPercent(progress)}
            </span>
          </div>
          <ProgressBar
            value={progress}
            color={getCategoryColor('food')}
            delay={0.35}
            height={6}
          />
          <div {...stylex.props(statisticsStyles.previewRow)}>
            <span {...stylex.props(demoStyles.caption)}>
              Projected month-end
            </span>
            <span {...stylex.props(statisticsStyles.previewValue)}>
              {formatPercent(projectedProgress)}
            </span>
          </div>
        </div>

        <div {...stylex.props(statisticsStyles.insightCard)}>
          <Sparkles
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(statisticsStyles.insightText)}>
            {formatUsd(remaining)} remains for the rest of October. Projected
            spending stays within the new limit.
          </span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton label="Done" />
        <span {...stylex.props(styles.doneHint)}>
          Demo restarts automatically
        </span>
      </div>
    </DemoScreen>
  )
}

const styles = stylex.create({
  overallBlock: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.375rem',
  },
  budgetRowSpacing: {
    padding: '0.25rem',
    borderColor: 'transparent',
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  foodRowHighlight: {
    borderColor: 'rgba(146, 73, 57, 0.16)',
    backgroundColor: 'rgba(231, 142, 122, 0.08)',
  },
  fieldAmountRow: {
    marginBlock: '0.125rem',
    alignItems: 'baseline',
    display: 'flex',
  },
  receiptRows: {
    gap: '0.3125rem',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.375rem',
  },
  doneHint: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
    textAlign: 'center',
  },
})
