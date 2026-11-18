import { describe, expect, it } from 'vitest'
import {
  CATEGORY_BUDGETS,
  CURRENT_MONTH,
  FOOD_BUDGET,
  OCTOBER_TRANSACTIONS,
  RECURRING_EXPENSES,
  STATISTICS_CATEGORIES,
  type StatisticsCategoryId,
} from './statistics-demo-data'
import {
  formatPercent,
  formatSignedPercent,
  getBudgetProgress,
  getBudgetRows,
  getBudgetStatus,
  getCategoryShares,
  getDailyAverage,
  getLargestCategory,
  getLargestTransaction,
  getNetCashFlow,
  getPercentageChange,
  getProjectedSpending,
  getRecurringTotal,
  getRemainingBudget,
  getSavingsRate,
  getShare,
  getTopTransactions,
  getTotalBudgetLimit,
  sumSpending,
  sumTransactions,
} from './statistics-utils'

describe('statistics data', () => {
  it('keeps category totals in sync with the October transactions', () => {
    for (const category of STATISTICS_CATEGORIES) {
      const transactions = OCTOBER_TRANSACTIONS.filter(
        (transaction) => transaction.category === category.id,
      )

      expect(sumTransactions(transactions)).toBeCloseTo(
        CURRENT_MONTH.spending[category.id],
        2,
      )
    }
  })

  it('sums the monthly breakdown to the category totals', () => {
    expect(sumSpending(CURRENT_MONTH.spending)).toBeCloseTo(2655.47, 2)
  })
})

describe('percent helpers', () => {
  it('calculates category shares from the provided total', () => {
    expect(getShare(850, 2655.47)).toBeCloseTo(32.009, 3)
    expect(getShare(0, 2655.47)).toBe(0)
  })

  it('handles a zero total safely', () => {
    expect(getShare(850, 0)).toBe(0)
    expect(getCategoryShares(CURRENT_MONTH.spending).length).toBe(6)
  })

  it('derives the shopping spike from the two months', () => {
    expect(getPercentageChange(850, 520)).toBeCloseTo(63.4615, 3)
  })

  it('handles a zero baseline safely', () => {
    expect(getPercentageChange(0, 0)).toBe(0)
    expect(getPercentageChange(250, 0)).toBe(100)
    expect(getPercentageChange(0, 520)).toBe(-100)
  })

  it('formats percentages without hardcoded strings', () => {
    expect(formatPercent(63.4615)).toBe('63.5%')
    expect(formatSignedPercent(63.4615)).toBe('+63.5%')
    expect(formatSignedPercent(-12.5)).toBe('-12.5%')
    expect(formatSignedPercent(0)).toBe('+0.0%')
  })
})

describe('budget helpers', () => {
  it('derives remaining budget, progress, and status', () => {
    expect(getRemainingBudget(600, 420)).toBe(180)
    expect(getRemainingBudget(600, 750)).toBe(0)
    expect(getBudgetProgress(420, 600)).toBe(70)
    expect(getBudgetProgress(420, 300)).toBe(140)
    expect(getBudgetProgress(420, 0)).toBe(0)
    expect(getBudgetStatus(300, 600)).toBe('on-track')
    expect(getBudgetStatus(420, 600)).toBe('approaching')
    expect(getBudgetStatus(600, 600)).toBe('approaching')
    expect(getBudgetStatus(650, 600)).toBe('over')
    expect(getBudgetStatus(0, 0)).toBe('on-track')
  })

  it('builds budget rows with an optional limit override', () => {
    const rows = getBudgetRows(CURRENT_MONTH.spending)
    const food = rows.find((row) => row.id === 'food')

    expect(rows).toHaveLength(6)
    expect(food).toMatchObject({
      limit: FOOD_BUDGET.limit,
      spent: 420,
      remaining: 180,
      progress: 70,
      status: 'approaching',
    })

    const updated = getBudgetRows(CURRENT_MONTH.spending, CATEGORY_BUDGETS, {
      food: FOOD_BUDGET.updatedLimit,
    })
    const updatedFood = updated.find((row) => row.id === 'food')

    expect(updatedFood).toMatchObject({
      limit: 750,
      remaining: 330,
      status: 'on-track',
    })
    expect(updatedFood?.progress).toBeCloseTo(56, 3)
  })

  it('totals the configured budget limits', () => {
    expect(getTotalBudgetLimit()).toBe(4100)
    expect(getTotalBudgetLimit(CATEGORY_BUDGETS, { food: 750 })).toBe(4250)
  })
})

describe('forecast helpers', () => {
  it('derives daily averages and end-of-month projections', () => {
    expect(getDailyAverage(420, 18)).toBeCloseTo(23.3333, 3)
    expect(getDailyAverage(420, 0)).toBe(0)
    expect(getProjectedSpending(420, 18, 31)).toBeCloseTo(723.3333, 3)
    expect(getProjectedSpending(420, 0, 31)).toBe(0)
    expect(getProjectedSpending(420, 18, 0)).toBe(0)
  })

  it('derives net cash flow and savings rate', () => {
    expect(getNetCashFlow(6200, 2655.47)).toBeCloseTo(3544.53, 2)
    expect(getSavingsRate(6200, 2655.47)).toBeCloseTo(57.1698, 3)
    expect(getSavingsRate(0, 2655.47)).toBe(0)
  })
})

describe('aggregate helpers', () => {
  it('finds the largest category', () => {
    const largest = getLargestCategory(CURRENT_MONTH.spending)

    expect(largest?.id).toBe<StatisticsCategoryId>('shopping')
    expect(largest?.amount).toBe(850)
  })

  it('returns null for an empty breakdown', () => {
    const empty = {
      shopping: 0,
      food: 0,
      transportation: 0,
      entertainment: 0,
      bills: 0,
      healthcare: 0,
    }

    expect(getLargestCategory(empty)).toBeNull()
  })

  it('finds the largest transaction and handles an empty list', () => {
    const largest = getLargestTransaction(OCTOBER_TRANSACTIONS)

    expect(largest?.merchant).toBe('Apple Store')
    expect(largest?.amount).toBe(349)
    expect(getLargestTransaction([])).toBeNull()
  })

  it('orders key transactions by amount', () => {
    const top = getTopTransactions(OCTOBER_TRANSACTIONS, 'shopping', 4)

    expect(top.map((transaction) => transaction.merchant)).toEqual([
      'Apple Store',
      'Zara Flagship',
      'Amazon Marketplace',
      'Nike Store',
    ])
  })

  it('totals recurring expenses', () => {
    expect(getRecurringTotal(RECURRING_EXPENSES)).toBeCloseTo(311.97, 2)
  })
})
