import { describe, expect, it } from 'vitest'
import {
  DEMO_SAVINGS_DEPOSIT,
  DEMO_SAVINGS_GOALS,
  EMERGENCY_FUND_GOAL,
  SUMMER_AUTO_CONTRIBUTION,
  SUMMER_VACATION_CONTRIBUTIONS,
  SUMMER_VACATION_GOAL,
  SPARE_CHANGE_PURCHASES,
} from './savings-demo-data'
import {
  formatSavingsPercent,
  formatScheduleDelta,
  getAnnualContribution,
  getBalanceGrowth,
  getCrossedMilestone,
  getDepositPreview,
  getEstimatedCompletionDate,
  getGoalProgress,
  getGoalSnapshot,
  getMilestones,
  getMonthlyTotals,
  getNextMilestone,
  getNextRunDate,
  getOverallProgress,
  getRemainingAmount,
  getRequiredMonthlyContribution,
  getRoundUpEntry,
  getScheduleDelta,
  getSpareChangeAnnualProjection,
  getSpareChangeMonths,
  getAverageMonthlySpareChange,
  roundUp,
  spareChange,
  sumContributions,
  sumCurrency,
  sumMonthlySpareChange,
  sumSpareChange,
} from './savings-utils'

describe('savings demo data', () => {
  it('keeps the three demo goals in sync with the specification', () => {
    expect(DEMO_SAVINGS_GOALS).toHaveLength(3)
    expect(SUMMER_VACATION_GOAL).toMatchObject({
      name: 'Summer Vacation',
      target: 1200,
      saved: 480,
    })
    expect(EMERGENCY_FUND_GOAL).toMatchObject({
      name: 'Emergency Fund',
      target: 5000,
      saved: 2350,
    })
    expect(DEMO_SAVINGS_GOALS[2]).toMatchObject({
      name: 'New Laptop',
      target: 2000,
      saved: 1100,
    })
  })

  it('sums the Summer Vacation contributions to its saved balance', () => {
    expect(sumContributions(SUMMER_VACATION_CONTRIBUTIONS)).toBe(480)
    expect(SUMMER_VACATION_GOAL.saved).toBe(480)
  })

  it('derives the overall goal progress from all three goals', () => {
    const overall = getOverallProgress(DEMO_SAVINGS_GOALS)

    expect(overall.saved).toBe(3930)
    expect(overall.target).toBe(8200)
    expect(overall.remaining).toBe(4270)
    expect(overall.progress).toBeCloseTo(47.9268, 3)
  })
})

describe('goal progress helpers', () => {
  it('derives completion and remaining amounts', () => {
    expect(getGoalProgress(1200, 480)).toBe(40)
    expect(getRemainingAmount(1200, 480)).toBe(720)
    expect(getRemainingAmount(1200, 1500)).toBe(0)
    expect(getGoalProgress(0, 480)).toBe(0)
    expect(getGoalProgress(1200, 2400)).toBe(100)
  })

  it('builds a goal snapshot', () => {
    const snapshot = getGoalSnapshot(SUMMER_VACATION_GOAL)

    expect(snapshot.progress).toBe(40)
    expect(snapshot.remaining).toBe(720)
    expect(snapshot.completed).toBe(false)
    expect(snapshot.percentLabel).toBe('40%')
  })

  it('marks a fully funded goal as completed', () => {
    const snapshot = getGoalSnapshot({
      ...SUMMER_VACATION_GOAL,
      saved: 1200,
    })

    expect(snapshot.completed).toBe(true)
    expect(snapshot.remaining).toBe(0)
  })
})

describe('milestone helpers', () => {
  it('calculates milestone amounts and reached state', () => {
    const milestones = getMilestones(5000, 2350)

    expect(milestones).toEqual([
      { percent: 25, amount: 1250, reached: true },
      { percent: 50, amount: 2500, reached: false },
      { percent: 75, amount: 3750, reached: false },
      { percent: 100, amount: 5000, reached: false },
    ])
  })

  it('finds the next unreached milestone', () => {
    expect(getNextMilestone(5000, 2350)).toEqual({
      percent: 50,
      amount: 2500,
      reached: false,
    })
    expect(getNextMilestone(5000, 5000)).toBeNull()
  })

  it('detects a milestone crossed by a deposit', () => {
    expect(getCrossedMilestone(5000, 2350, 2500)).toBe(50)
    expect(getCrossedMilestone(5000, 2400, 2600)).toBe(50)
    expect(getCrossedMilestone(5000, 300, 1300)).toBe(25)
    expect(getCrossedMilestone(5000, 2350, 2400)).toBeNull()
    expect(getCrossedMilestone(0, 0, 100)).toBeNull()
  })
})

describe('deposit preview', () => {
  it('derives the Emergency Fund 47% to 50% jump', () => {
    const preview = getDepositPreview(
      EMERGENCY_FUND_GOAL,
      DEMO_SAVINGS_DEPOSIT.amount,
    )

    expect(preview.previousSaved).toBe(2350)
    expect(preview.updatedSaved).toBe(2500)
    expect(preview.previousRemaining).toBe(2650)
    expect(preview.remaining).toBe(2500)
    expect(preview.previousProgress).toBe(47)
    expect(preview.updatedProgress).toBe(50)
    expect(preview.crossedMilestone).toBe(50)
  })

  it('caps an over-funded goal at 100%', () => {
    const preview = getDepositPreview(SUMMER_VACATION_GOAL, 5000)

    expect(preview.updatedSaved).toBe(5480)
    expect(preview.updatedProgress).toBe(100)
    expect(preview.remaining).toBe(0)
  })
})

describe('spare change helpers', () => {
  it('rounds a purchase up to the next dollar', () => {
    expect(roundUp(4.65)).toBe(5)
    expect(roundUp(5)).toBe(5)
    expect(roundUp(0)).toBe(0)
    expect(roundUp(4.65, 2)).toBe(6)
    expect(roundUp(4.65, 0)).toBe(4.65)
  })

  it('derives the $4.65 to $5.00 to $0.35 spare change', () => {
    expect(spareChange(4.65)).toBe(0.35)
    expect(spareChange(5)).toBe(0)
    expect(spareChange(4.65, 2)).toBe(1.35)
    expect(getRoundUpEntry(4.65)).toEqual({
      amount: 4.65,
      rounded: 5,
      change: 0.35,
      saved: 0.35,
    })
  })

  it('applies a round-up multiplier to the saved amount', () => {
    expect(getRoundUpEntry(4.65, 1, 3)).toMatchObject({
      change: 0.35,
      saved: 1.05,
    })
  })

  it('sums current purchases and appends the current month', () => {
    const months = getSpareChangeMonths(SPARE_CHANGE_PURCHASES)
    const current = months[months.length - 1]

    expect(months).toHaveLength(6)
    expect(current.label).toBe('Nov')
    expect(current.amount).toBeCloseTo(3.91, 2)
    expect(sumSpareChange(SPARE_CHANGE_PURCHASES)).toBeCloseTo(3.91, 2)
    expect(sumMonthlySpareChange(months)).toBeCloseTo(35.21, 2)
  })

  it('derives the average and annual projection from completed months', () => {
    const completed = getSpareChangeMonths(SPARE_CHANGE_PURCHASES).slice(0, -1)

    expect(getAverageMonthlySpareChange(completed)).toBeCloseTo(6.26, 2)
    expect(getSpareChangeAnnualProjection(completed)).toBeCloseTo(75.12, 2)
    expect(getAverageMonthlySpareChange([])).toBe(0)
  })
})

describe('contribution helpers', () => {
  it('groups contributions into monthly totals', () => {
    const months = getMonthlyTotals(SUMMER_VACATION_CONTRIBUTIONS)

    expect(months.map((month) => month.label)).toEqual([
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
    ])
    expect(months.map((month) => month.amount)).toEqual([
      60, 65, 85, 90, 100, 80,
    ])
  })

  it('builds a cumulative balance series from zero', () => {
    const growth = getBalanceGrowth(SUMMER_VACATION_CONTRIBUTIONS)

    expect(growth.values).toEqual([0, 60, 125, 210, 300, 400, 480])
    expect(growth.labels[0]).toBe('Start')
    expect(growth.labels[growth.labels.length - 1]).toBe('Nov')
  })
})

describe('projection helpers', () => {
  it('calculates annual contributions from a frequency', () => {
    expect(getAnnualContribution(75, 'weekly')).toBe(3900)
    expect(getAnnualContribution(75, 'monthly')).toBe(900)
    expect(getAnnualContribution(150, 'biweekly')).toBe(3900)
  })

  it('estimates a completion date for weekly and monthly schedules', () => {
    expect(
      getEstimatedCompletionDate(480, 1200, 75, 'weekly', '2026-11-18'),
    ).toBe('2027-01-27')
    expect(
      getEstimatedCompletionDate(480, 1200, 75, 'monthly', '2026-11-18'),
    ).toBe('2027-09-18')
    expect(getEstimatedCompletionDate(1200, 1200, 75, 'weekly')).toBe(
      '2026-11-18',
    )
    expect(getEstimatedCompletionDate(0, 1200, 0, 'weekly')).toBeNull()
  })

  it('compares an estimate with the target date', () => {
    const weekly = getEstimatedCompletionDate(
      SUMMER_VACATION_GOAL.saved,
      SUMMER_VACATION_GOAL.target,
      SUMMER_AUTO_CONTRIBUTION.amount,
      'weekly',
    )
    const monthly = getEstimatedCompletionDate(
      SUMMER_VACATION_GOAL.saved,
      SUMMER_VACATION_GOAL.target,
      SUMMER_AUTO_CONTRIBUTION.amount,
      'monthly',
    )

    expect(weekly).not.toBeNull()
    expect(monthly).not.toBeNull()

    const weeklyDelta = getScheduleDelta(weekly ?? '', '2027-06-14')
    const monthlyDelta = getScheduleDelta(monthly ?? '', '2027-06-14')

    expect(weeklyDelta).toBeGreaterThan(0)
    expect(monthlyDelta).toBeLessThan(0)
    expect(formatScheduleDelta(weeklyDelta)).toContain('days ahead')
    expect(formatScheduleDelta(monthlyDelta)).toContain('days behind')
    expect(formatScheduleDelta(0)).toBe('Right on target')
  })

  it('derives the required monthly pace for a target date', () => {
    expect(getRequiredMonthlyContribution(720, '2027-06-14')).toBe(102.86)
    expect(getRequiredMonthlyContribution(0, '2027-06-14')).toBe(0)
  })

  it('calculates the next scheduled run', () => {
    expect(getNextRunDate('weekly')).toBe('2026-11-25')
    expect(getNextRunDate('biweekly')).toBe('2026-12-02')
    expect(getNextRunDate('monthly')).toBe('2026-12-01')
    expect(getNextRunDate('daily')).toBe('2026-11-19')
  })
})

describe('formatting helpers', () => {
  it('formats percentages without trailing zeroes', () => {
    expect(formatSavingsPercent(47.9268, 1)).toBe('47.9%')
    expect(formatSavingsPercent(50)).toBe('50%')
    expect(formatSavingsPercent(0)).toBe('0%')
  })

  it('sums currency in minor units', () => {
    expect(sumCurrency([0.1, 0.2])).toBe(0.3)
    expect(sumCurrency([4.65, 12.4, 200, 150])).toBe(367.05)
  })
})
