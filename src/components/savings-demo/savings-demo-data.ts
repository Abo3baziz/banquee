/*
 * Fixed demo day. Every derived date in the savings demo is calculated from
 * this value so the sequences stay deterministic between renders and tests.
 */
export const SAVINGS_DEMO_TODAY = '2026-11-18'

export type SavingsGoalId = 'summer-vacation' | 'emergency-fund' | 'new-laptop'

export type SavingsGoalIcon = 'travel' | 'shield' | 'laptop'
export type SavingsGoalTone = 'primary' | 'blue' | 'purple'

export type SavingsGoal = {
  id: SavingsGoalId
  name: string
  category: string
  icon: SavingsGoalIcon
  tone: SavingsGoalTone
  target: number
  saved: number
  targetDate: string
  autoMonthly: number
  note: string
}

export const DEMO_SAVINGS_GOALS: readonly SavingsGoal[] = [
  {
    id: 'summer-vacation',
    name: 'Summer Vacation',
    category: 'Travel & Vacation',
    icon: 'travel',
    tone: 'blue',
    target: 1200,
    saved: 480,
    targetDate: '2027-06-14',
    autoMonthly: 150,
    note: 'Round-ups linked',
  },
  {
    id: 'emergency-fund',
    name: 'Emergency Fund',
    category: 'Safety Net',
    icon: 'shield',
    tone: 'primary',
    target: 5000,
    saved: 2350,
    targetDate: '2027-09-30',
    autoMonthly: 300,
    note: 'Protected vault',
  },
  {
    id: 'new-laptop',
    name: 'New Laptop',
    category: 'Work & Tech',
    icon: 'laptop',
    tone: 'purple',
    target: 2000,
    saved: 1100,
    targetDate: '2027-03-20',
    autoMonthly: 125,
    note: 'Auto-save active',
  },
]

export const SUMMER_VACATION_GOAL = DEMO_SAVINGS_GOALS[0]
export const EMERGENCY_FUND_GOAL = DEMO_SAVINGS_GOALS[1]
export const NEW_LAPTOP_GOAL = DEMO_SAVINGS_GOALS[2]

export function getSavingsGoal(id: SavingsGoalId): SavingsGoal {
  const goal = DEMO_SAVINGS_GOALS.find((item) => item.id === id)

  if (!goal) {
    throw new Error(`Unknown savings goal: ${id}`)
  }

  return goal
}

export const DEMO_SAVINGS_DEPOSIT = {
  goalId: 'emergency-fund' as const,
  amount: 150,
  amountOptions: [50, 100, 150, 250] as const,
  memo: 'Peace of mind boost',
  reference: '#BQ-SAV-59281',
}

export type SavingsContributionSource =
  'auto' | 'manual' | 'round-up' | 'interest'

export type SavingsContribution = {
  id: string
  goalId: SavingsGoalId
  label: string
  date: string
  amount: number
  source: SavingsContributionSource
  note: string
}

/*
 * The Summer Vacation contributions add up to the goal's saved balance, so
 * the growth chart and the monthly breakdown are both derived from this list.
 */
export const SUMMER_VACATION_CONTRIBUTIONS: readonly SavingsContribution[] = [
  {
    id: 'summer-jun',
    goalId: 'summer-vacation',
    label: 'Auto-Contribution',
    date: '2026-06-15',
    amount: 60,
    source: 'auto',
    note: 'Monthly rule · June',
  },
  {
    id: 'summer-jul',
    goalId: 'summer-vacation',
    label: 'Manual Boost',
    date: '2026-07-20',
    amount: 65,
    source: 'manual',
    note: 'Payday top-up',
  },
  {
    id: 'summer-aug',
    goalId: 'summer-vacation',
    label: 'Auto-Contribution',
    date: '2026-08-15',
    amount: 85,
    source: 'auto',
    note: 'Monthly rule · August',
  },
  {
    id: 'summer-sep',
    goalId: 'summer-vacation',
    label: 'Manual Deposit',
    date: '2026-09-03',
    amount: 90,
    source: 'manual',
    note: 'From Main Checking',
  },
  {
    id: 'summer-oct',
    goalId: 'summer-vacation',
    label: 'Auto-Contribution',
    date: '2026-10-15',
    amount: 100,
    source: 'auto',
    note: 'Monthly rule · October',
  },
  {
    id: 'summer-nov',
    goalId: 'summer-vacation',
    label: 'Auto-Contribution',
    date: '2026-11-15',
    amount: 80,
    source: 'auto',
    note: 'Monthly rule · November',
  },
]

export const EMERGENCY_FUND_CONTRIBUTIONS: readonly SavingsContribution[] = [
  {
    id: 'emergency-nov-auto',
    goalId: 'emergency-fund',
    label: 'Auto-Contribution',
    date: '2026-11-15',
    amount: 150,
    source: 'auto',
    note: 'Monthly rule · November',
  },
  {
    id: 'emergency-nov-roundup',
    goalId: 'emergency-fund',
    label: 'Spare Change Round-up',
    date: '2026-11-12',
    amount: 12.4,
    source: 'round-up',
    note: '6 purchases pooled',
  },
  {
    id: 'emergency-nov-manual',
    goalId: 'emergency-fund',
    label: 'Manual Deposit',
    date: '2026-11-05',
    amount: 200,
    source: 'manual',
    note: 'From Main Checking',
  },
  {
    id: 'emergency-nov-seed',
    goalId: 'emergency-fund',
    label: 'Auto-Contribution',
    date: '2026-11-01',
    amount: 150,
    source: 'auto',
    note: 'Monthly rule · November',
  },
]

export type AutoContributionFrequency =
  'daily' | 'weekly' | 'biweekly' | 'monthly'

export type AutoContributionFrequencyOption = {
  id: AutoContributionFrequency
  label: string
  periodsPerYear: number
}

export const AUTO_CONTRIBUTION_FREQUENCIES: readonly AutoContributionFrequencyOption[] =
  [
    { id: 'daily', label: 'Daily', periodsPerYear: 365 },
    { id: 'weekly', label: 'Weekly', periodsPerYear: 52 },
    { id: 'biweekly', label: 'Bi-Weekly', periodsPerYear: 26 },
    { id: 'monthly', label: 'Monthly', periodsPerYear: 12 },
  ]

export const SUMMER_AUTO_CONTRIBUTION = {
  goalId: 'summer-vacation' as const,
  amount: 75,
  initialFrequency: 'monthly' as const,
  updatedFrequency: 'weekly' as const,
  amountOptions: [50, 75, 100, 150] as const,
  guardBalance: 500,
}

export type SpareChangeIcon =
  | 'coffee'
  | 'groceries'
  | 'transport'
  | 'streaming'
  | 'shopping'
  | 'tech'
  | 'fuel'

export type SpareChangePurchase = {
  id: string
  merchant: string
  category: string
  icon: SpareChangeIcon
  amount: number
  date: string
  when: string
}

export const SPARE_CHANGE_PURCHASES: readonly SpareChangePurchase[] = [
  {
    id: 'starbucks',
    merchant: 'Starbucks Reserve',
    category: 'Coffee & Dining',
    icon: 'coffee',
    amount: 4.65,
    date: '2026-11-18',
    when: 'Today',
  },
  {
    id: 'whole-foods',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    icon: 'groceries',
    amount: 54.2,
    date: '2026-11-17',
    when: 'Yesterday',
  },
  {
    id: 'uber',
    merchant: 'Uber',
    category: 'Transportation',
    icon: 'transport',
    amount: 18.2,
    date: '2026-11-16',
    when: 'Nov 16',
  },
  {
    id: 'netflix',
    merchant: 'Netflix',
    category: 'Streaming',
    icon: 'streaming',
    amount: 15.99,
    date: '2026-11-15',
    when: 'Nov 15',
  },
  {
    id: 'amazon',
    merchant: 'Amazon Marketplace',
    category: 'Shopping',
    icon: 'shopping',
    amount: 23.4,
    date: '2026-11-14',
    when: 'Nov 14',
  },
  {
    id: 'apple',
    merchant: 'Apple Store',
    category: 'Electronics',
    icon: 'tech',
    amount: 128.6,
    date: '2026-11-12',
    when: 'Nov 12',
  },
  {
    id: 'sweetgreen',
    merchant: 'Sweetgreen',
    category: 'Coffee & Dining',
    icon: 'coffee',
    amount: 12.75,
    date: '2026-11-10',
    when: 'Nov 10',
  },
  {
    id: 'shell',
    merchant: 'Shell Station',
    category: 'Fuel',
    icon: 'fuel',
    amount: 42.3,
    date: '2026-11-08',
    when: 'Nov 08',
  },
]

export const DEMO_ROUND_UP_PURCHASE_ID = 'starbucks'

export type SpareChangeMonth = {
  month: string
  label: string
  amount: number
}

/* Completed months only; the current month is derived from live purchases. */
export const SPARE_CHANGE_HISTORY: readonly SpareChangeMonth[] = [
  { month: '2026-06', label: 'Jun', amount: 5.6 },
  { month: '2026-07', label: 'Jul', amount: 6.25 },
  { month: '2026-08', label: 'Aug', amount: 5.95 },
  { month: '2026-09', label: 'Sep', amount: 6.4 },
  { month: '2026-10', label: 'Oct', amount: 7.1 },
]

export const SPARE_CHANGE_CURRENT_MONTH = {
  month: '2026-11',
  label: 'Nov',
}

export const SPARE_CHANGE_SETTINGS = {
  increment: 1,
  multiplier: 1,
  multiplierOptions: [1, 2, 3, 5] as const,
  destinationGoalId: 'summer-vacation' as const,
  guardBalance: 300,
  weeklyCap: 50,
}

export const AUTO_CONTRIBUTION_NOTE =
  'Estimates assume the selected schedule stays unchanged. This demo does not move real money.'

export const SPARE_CHANGE_NOTE =
  'Projections are estimates based on recent round-ups. Actual savings vary. This demo does not move real money.'
