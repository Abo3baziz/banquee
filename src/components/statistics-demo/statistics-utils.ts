import {
  CATEGORY_BUDGETS,
  type CategoryBudget,
  type RecurringExpense,
  type SpendingBreakdown,
  type StatisticsCategoryId,
  type StatisticsTransaction,
} from './statistics-demo-data'

export const BUDGET_APPROACHING_RATIO = 0.7

export type BudgetStatus = 'on-track' | 'approaching' | 'over'

export type CategoryShare = {
  id: StatisticsCategoryId
  amount: number
  share: number
}

export type BudgetRow = {
  id: StatisticsCategoryId
  limit: number
  spent: number
  remaining: number
  progress: number
  status: BudgetStatus
}

export function sumSpending(spending: SpendingBreakdown): number {
  return Object.values(spending).reduce((total, value) => total + value, 0)
}

/** Share of a total as a percentage between 0 and 100. */
export function getShare(amount: number, total: number): number {
  if (total <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, (amount / total) * 100))
}

export function getCategoryShares(
  spending: SpendingBreakdown,
): CategoryShare[] {
  const total = sumSpending(spending)

  return (Object.keys(spending) as StatisticsCategoryId[]).map((id) => {
    const amount = spending[id]

    return { id, amount, share: getShare(amount, total) }
  })
}

/**
 * Percentage change between two amounts. A zero baseline cannot produce a
 * meaningful ratio, so it reports 100% for new spending and 0% when both
 * amounts are zero.
 */
export function getPercentageChange(current: number, previous: number): number {
  if (previous <= 0) {
    return current > 0 ? 100 : 0
  }

  return ((current - previous) / previous) * 100
}

/** Remaining budget, floored at zero so over-budget rows stay readable. */
export function getRemainingBudget(limit: number, spent: number): number {
  return Math.max(0, limit - spent)
}

/** Budget usage as a percentage. Can exceed 100 when spending is over limit. */
export function getBudgetProgress(spent: number, limit: number): number {
  if (limit <= 0) {
    return 0
  }

  return Math.max(0, (spent / limit) * 100)
}

export function getBudgetStatus(
  spent: number,
  limit: number,
  approachingRatio = BUDGET_APPROACHING_RATIO,
): BudgetStatus {
  if (limit > 0 && spent > limit) {
    return 'over'
  }

  if (limit > 0 && spent / limit >= approachingRatio) {
    return 'approaching'
  }

  return 'on-track'
}

export function getBudgetRows(
  spending: SpendingBreakdown,
  budgets: readonly CategoryBudget[] = CATEGORY_BUDGETS,
  limitOverrides: Partial<Record<StatisticsCategoryId, number>> = {},
): BudgetRow[] {
  return budgets.map((budget) => {
    const limit = limitOverrides[budget.category] ?? budget.limit
    const spent = spending[budget.category]

    return {
      id: budget.category,
      limit,
      spent,
      remaining: getRemainingBudget(limit, spent),
      progress: getBudgetProgress(spent, limit),
      status: getBudgetStatus(spent, limit),
    }
  })
}

export function getTotalBudgetLimit(
  budgets: readonly CategoryBudget[] = CATEGORY_BUDGETS,
  limitOverrides: Partial<Record<StatisticsCategoryId, number>> = {},
): number {
  return budgets.reduce(
    (total, budget) =>
      total + (limitOverrides[budget.category] ?? budget.limit),
    0,
  )
}

export function getDailyAverage(spent: number, daysElapsed: number): number {
  if (daysElapsed <= 0) {
    return 0
  }

  return spent / daysElapsed
}

export function getProjectedSpending(
  spent: number,
  daysElapsed: number,
  daysInCycle: number,
): number {
  if (daysElapsed <= 0 || daysInCycle <= 0) {
    return 0
  }

  return (spent / daysElapsed) * daysInCycle
}

export function getNetCashFlow(income: number, spending: number): number {
  return income - spending
}

/** Net cash flow as a percentage of income. */
export function getSavingsRate(income: number, spending: number): number {
  if (income <= 0) {
    return 0
  }

  return (getNetCashFlow(income, spending) / income) * 100
}

export function getLargestCategory(
  spending: SpendingBreakdown,
): CategoryShare | null {
  const shares = getCategoryShares(spending)
  const largest = shares.reduce<CategoryShare | null>((current, item) => {
    if (item.amount <= 0) {
      return current
    }

    if (!current || item.amount > current.amount) {
      return item
    }

    return current
  }, null)

  return largest
}

export function getLargestTransaction(
  transactions: readonly StatisticsTransaction[],
): StatisticsTransaction | null {
  return transactions.reduce<StatisticsTransaction | null>(
    (current, transaction) =>
      !current || transaction.amount > current.amount ? transaction : current,
    null,
  )
}

export function getCategoryTransactions(
  transactions: readonly StatisticsTransaction[],
  category: StatisticsCategoryId,
): StatisticsTransaction[] {
  return transactions.filter((transaction) => transaction.category === category)
}

/** Most recent entries first, as the data module already lists them. */
export function getRecentTransactions(
  transactions: readonly StatisticsTransaction[],
  category: StatisticsCategoryId,
  count: number,
): StatisticsTransaction[] {
  return getCategoryTransactions(transactions, category).slice(0, count)
}

export function getTopTransactions(
  transactions: readonly StatisticsTransaction[],
  category: StatisticsCategoryId,
  count: number,
): StatisticsTransaction[] {
  return getCategoryTransactions(transactions, category)
    .slice()
    .sort((a, b) => b.amount - a.amount)
    .slice(0, count)
}

export function sumTransactions(
  transactions: readonly StatisticsTransaction[],
): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  )
}

export function getRecurringTotal(
  expenses: readonly RecurringExpense[],
): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`
}

export function formatSignedPercent(value: number, fractionDigits = 1): string {
  const sign = value >= 0 ? '+' : '-'

  return `${sign}${Math.abs(value).toFixed(fractionDigits)}%`
}
