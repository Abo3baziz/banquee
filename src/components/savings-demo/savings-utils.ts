import {
  AUTO_CONTRIBUTION_FREQUENCIES,
  SAVINGS_DEMO_TODAY,
  SPARE_CHANGE_CURRENT_MONTH,
  SPARE_CHANGE_HISTORY,
  SPARE_CHANGE_SETTINGS,
  type AutoContributionFrequency,
  type SavingsContribution,
  type SavingsGoal,
  type SavingsGoalId,
  type SpareChangeMonth,
  type SpareChangePurchase,
} from './savings-demo-data'

export const SAVINGS_MILESTONES = [25, 50, 75, 100] as const

const DAY_MS = 86_400_000

export type SavingsSnapshot = {
  goal: SavingsGoal
  remaining: number
  progress: number
  percentLabel: string
  completed: boolean
}

export type OverallSavingsProgress = {
  saved: number
  target: number
  remaining: number
  progress: number
}

export type DepositPreview = {
  previousSaved: number
  updatedSaved: number
  previousProgress: number
  updatedProgress: number
  remaining: number
  previousRemaining: number
  crossedMilestone: number | null
}

export type RoundUpEntry = {
  amount: number
  rounded: number
  change: number
  saved: number
}

export type MonthlyTotal = {
  month: string
  label: string
  amount: number
}

export type BalancePoint = {
  label: string
  value: number
}

export type BalanceGrowthSeries = {
  labels: string[]
  values: number[]
  points: BalancePoint[]
}

export type Milestone = {
  percent: number
  amount: number
  reached: boolean
}

/** Rounds currency to minor units so repeated sums stay exact. */
export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function sumCurrency(values: readonly number[]): number {
  return (
    values.reduce((total, value) => total + Math.round(value * 100), 0) / 100
  )
}

/** Remaining goal amount, floored at zero when a goal is over-funded. */
export function getRemainingAmount(target: number, saved: number): number {
  return roundCurrency(Math.max(0, target - saved))
}

/** Goal completion between 0 and 100, safe for a zero target. */
export function getGoalProgress(target: number, saved: number): number {
  if (target <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, (saved / target) * 100))
}

export function getGoalSnapshot(goal: SavingsGoal): SavingsSnapshot {
  const remaining = getRemainingAmount(goal.target, goal.saved)
  const progress = getGoalProgress(goal.target, goal.saved)

  return {
    goal,
    remaining,
    progress,
    percentLabel: formatSavingsPercent(progress),
    completed: remaining === 0,
  }
}

export function getOverallProgress(
  goals: readonly SavingsGoal[],
): OverallSavingsProgress {
  const saved = sumCurrency(goals.map((goal) => goal.saved))
  const target = sumCurrency(goals.map((goal) => goal.target))

  return {
    saved,
    target,
    remaining: getRemainingAmount(target, saved),
    progress: getGoalProgress(target, saved),
  }
}

export function getGoalContributions(
  contributions: readonly SavingsContribution[],
  goalId: SavingsGoalId,
): SavingsContribution[] {
  return contributions
    .filter((contribution) => contribution.goalId === goalId)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function sumContributions(
  contributions: readonly SavingsContribution[],
): number {
  return sumCurrency(contributions.map((contribution) => contribution.amount))
}

export function getDepositPreview(
  goal: SavingsGoal,
  amount: number,
): DepositPreview {
  const previousSaved = goal.saved
  const updatedSaved = roundCurrency(previousSaved + Math.max(0, amount))
  const previousProgress = getGoalProgress(goal.target, previousSaved)
  const updatedProgress = getGoalProgress(goal.target, updatedSaved)

  return {
    previousSaved,
    updatedSaved,
    previousProgress,
    updatedProgress,
    remaining: getRemainingAmount(goal.target, updatedSaved),
    previousRemaining: getRemainingAmount(goal.target, previousSaved),
    crossedMilestone: getCrossedMilestone(
      goal.target,
      previousSaved,
      updatedSaved,
    ),
  }
}

export function getMilestoneAmount(target: number, percent: number): number {
  return roundCurrency((target * percent) / 100)
}

export function getMilestones(target: number, saved: number): Milestone[] {
  const progress = getGoalProgress(target, saved)

  return SAVINGS_MILESTONES.map((percent) => ({
    percent,
    amount: getMilestoneAmount(target, percent),
    reached: progress >= percent,
  }))
}

export function getNextMilestone(
  target: number,
  saved: number,
): Milestone | null {
  return (
    getMilestones(target, saved).find((milestone) => !milestone.reached) ?? null
  )
}

/** Highest milestone crossed between two saved balances, if any. */
export function getCrossedMilestone(
  target: number,
  before: number,
  after: number,
): number | null {
  if (target <= 0) {
    return null
  }

  const beforeProgress = getGoalProgress(target, before)
  const afterProgress = getGoalProgress(target, after)
  const crossed = SAVINGS_MILESTONES.filter(
    (percent) => beforeProgress < percent && afterProgress >= percent,
  )

  return crossed.length > 0 ? crossed[crossed.length - 1] : null
}

/** Rounds a purchase up to the next increment. */
export function roundUp(amount: number, increment = 1): number {
  if (increment <= 0) {
    return roundCurrency(amount)
  }

  return roundCurrency(Math.ceil(amount / increment) * increment)
}

/** Difference between a rounded purchase and its original amount. */
export function spareChange(amount: number, increment = 1): number {
  return roundCurrency(roundUp(amount, increment) - amount)
}

export function getRoundUpEntry(
  amount: number,
  increment = SPARE_CHANGE_SETTINGS.increment,
  multiplier = SPARE_CHANGE_SETTINGS.multiplier,
): RoundUpEntry {
  const change = spareChange(amount, increment)
  const safeMultiplier = Math.max(1, multiplier)

  return {
    amount: roundCurrency(amount),
    rounded: roundUp(amount, increment),
    change,
    saved: roundCurrency(change * safeMultiplier),
  }
}

export function sumSpareChange(
  purchases: readonly SpareChangePurchase[],
  increment = SPARE_CHANGE_SETTINGS.increment,
): number {
  return sumCurrency(
    purchases.map((purchase) => spareChange(purchase.amount, increment)),
  )
}

/** Completed months plus the current month, whose total comes from purchases. */
export function getSpareChangeMonths(
  purchases: readonly SpareChangePurchase[],
  history: readonly SpareChangeMonth[] = SPARE_CHANGE_HISTORY,
): SpareChangeMonth[] {
  return [
    ...history,
    {
      month: SPARE_CHANGE_CURRENT_MONTH.month,
      label: SPARE_CHANGE_CURRENT_MONTH.label,
      amount: sumSpareChange(purchases),
    },
  ]
}

export function sumMonthlySpareChange(
  months: readonly SpareChangeMonth[],
): number {
  return sumCurrency(months.map((month) => month.amount))
}

export function getAverageMonthlySpareChange(
  months: readonly SpareChangeMonth[],
): number {
  if (months.length === 0) {
    return 0
  }

  return roundCurrency(sumMonthlySpareChange(months) / months.length)
}

export function getSpareChangeAnnualProjection(
  months: readonly SpareChangeMonth[],
): number {
  return roundCurrency(getAverageMonthlySpareChange(months) * 12)
}

/** Groups contributions into ascending monthly totals. */
export function getMonthlyTotals(
  contributions: readonly SavingsContribution[],
): MonthlyTotal[] {
  const totals = new Map<string, number>()

  for (const contribution of contributions) {
    const month = contribution.date.slice(0, 7)
    const current = totals.get(month) ?? 0
    totals.set(month, roundCurrency(current + contribution.amount))
  }

  return [...totals.entries()]
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([month, amount]) => ({
      month,
      label: formatMonthShort(month),
      amount: roundCurrency(amount),
    }))
}

/** Cumulative balance after each month, starting from zero. */
export function getBalanceGrowth(
  contributions: readonly SavingsContribution[],
): BalanceGrowthSeries {
  const monthly = getMonthlyTotals(contributions)
  const points: BalancePoint[] = [{ label: 'Start', value: 0 }]
  let running = 0

  for (const month of monthly) {
    running = roundCurrency(running + month.amount)
    points.push({ label: month.label, value: running })
  }

  return {
    labels: points.map((point) => point.label),
    values: points.map((point) => point.value),
    points,
  }
}

export function getPeriodsPerYear(
  frequency: AutoContributionFrequency,
): number {
  const option = AUTO_CONTRIBUTION_FREQUENCIES.find(
    (item) => item.id === frequency,
  )

  return option?.periodsPerYear ?? 12
}

export function getAnnualContribution(
  amount: number,
  frequency: AutoContributionFrequency,
): number {
  return roundCurrency(amount * getPeriodsPerYear(frequency))
}

/** Estimated completion date for a fixed contribution schedule. */
export function getEstimatedCompletionDate(
  saved: number,
  target: number,
  amount: number,
  frequency: AutoContributionFrequency,
  from = SAVINGS_DEMO_TODAY,
): string | null {
  const remaining = getRemainingAmount(target, saved)

  if (remaining <= 0) {
    return from
  }

  if (amount <= 0) {
    return null
  }

  const periods = Math.ceil(remaining / amount)
  const start = parseIsoDate(from)

  if (frequency === 'monthly') {
    return toIsoDate(addMonths(start, periods))
  }

  const daysPerPeriod =
    frequency === 'daily' ? 1 : frequency === 'weekly' ? 7 : 14

  return toIsoDate(addDays(start, periods * daysPerPeriod))
}

/** Whole days between two ISO dates. Positive when the first is earlier. */
export function getDaysBetween(from: string, to: string): number {
  return Math.round(
    (parseIsoDate(from).getTime() - parseIsoDate(to).getTime()) / DAY_MS,
  )
}

/** Days ahead of (positive) or behind (negative) a target date. */
export function getScheduleDelta(estimated: string, target: string): number {
  return getDaysBetween(target, estimated)
}

export function formatScheduleDelta(daysAhead: number): string {
  if (daysAhead === 0) {
    return 'Right on target'
  }

  return `${Math.abs(daysAhead)} days ${daysAhead > 0 ? 'ahead' : 'behind'}`
}

export function getRequiredMonthlyContribution(
  remaining: number,
  targetDate: string,
  from = SAVINGS_DEMO_TODAY,
): number {
  if (remaining <= 0) {
    return 0
  }

  const days = Math.max(1, getDaysBetween(targetDate, from))
  const months = Math.max(1, Math.ceil(days / 30.4375))

  return roundCurrency(remaining / months)
}

export function getNextRunDate(
  frequency: AutoContributionFrequency,
  from = SAVINGS_DEMO_TODAY,
): string {
  const start = parseIsoDate(from)

  switch (frequency) {
    case 'daily':
      return toIsoDate(addDays(start, 1))
    case 'weekly':
      return toIsoDate(addDays(start, 7))
    case 'biweekly':
      return toIsoDate(addDays(start, 14))
    case 'monthly': {
      const nextMonth = addMonths(start, 1)
      nextMonth.setUTCDate(1)
      return toIsoDate(nextMonth)
    }
  }
}

/** Compact percentage without trailing zeroes. */
export function formatSavingsPercent(
  value: number,
  fractionDigits = 1,
): string {
  return `${Number(value.toFixed(fractionDigits))}%`
}

export function formatSavingsDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseIsoDate(iso))
}

export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseIsoDate(iso))
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parseIsoDate(iso))
}

export function formatMonthShort(month: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${month}-01T00:00:00.000Z`))
}

function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)

  return new Date(Date.UTC(year, month - 1, day))
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS)
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime())
  const day = result.getUTCDate()

  result.setUTCDate(1)
  result.setUTCMonth(result.getUTCMonth() + months)

  const daysInMonth = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate()

  result.setUTCDate(Math.min(day, daysInMonth))

  return result
}
