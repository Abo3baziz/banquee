export type StatisticsCategoryId =
  | 'shopping'
  | 'food'
  | 'transportation'
  | 'entertainment'
  | 'bills'
  | 'healthcare'

export type StatisticsCategory = {
  id: StatisticsCategoryId
  label: string
}

export const STATISTICS_CATEGORIES: readonly StatisticsCategory[] = [
  {
    id: 'shopping',
    label: 'Shopping',
  },
  {
    id: 'food',
    label: 'Food & Dining',
  },
  {
    id: 'transportation',
    label: 'Transportation',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
  },
  {
    id: 'bills',
    label: 'Bills & Utilities',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
  },
]

export type SpendingBreakdown = Record<StatisticsCategoryId, number>

export type StatisticsTransaction = {
  id: string
  merchant: string
  category: StatisticsCategoryId
  amount: number
  date: string
  meta: string
}

export type MonthlyReport = {
  id: string
  label: string
  compactLabel: string
  income: number
  spending: SpendingBreakdown
}

/*
 * Three months of report data. The newest month is the one shown as
 * "This Month" by the Spending Insights demo, so both demos share values.
 */
export const MONTHLY_REPORTS: readonly MonthlyReport[] = [
  {
    id: '2026-08',
    label: 'August 2026',
    compactLabel: 'Aug',
    income: 5600,
    spending: {
      shopping: 545,
      food: 455,
      transportation: 320,
      entertainment: 185,
      bills: 470,
      healthcare: 165,
    },
  },
  {
    id: '2026-09',
    label: 'September 2026',
    compactLabel: 'Sep',
    income: 5900,
    spending: {
      shopping: 520,
      food: 480,
      transportation: 340,
      entertainment: 210,
      bills: 470,
      healthcare: 190,
    },
  },
  {
    id: '2026-10',
    label: 'October 2026',
    compactLabel: 'Oct',
    income: 6200,
    spending: {
      shopping: 850,
      food: 420,
      transportation: 380,
      entertainment: 253.48,
      bills: 496.99,
      healthcare: 255,
    },
  },
]

export const CURRENT_MONTH = MONTHLY_REPORTS[MONTHLY_REPORTS.length - 1]
export const PREVIOUS_MONTH = MONTHLY_REPORTS[MONTHLY_REPORTS.length - 2]
export const EARLIEST_MONTH = MONTHLY_REPORTS[0]

export const WEEKLY_SPENDING: {
  current: SpendingBreakdown
  previous: SpendingBreakdown
} = {
  current: {
    shopping: 214,
    food: 96.4,
    transportation: 64,
    entertainment: 48.5,
    bills: 145,
    healthcare: 34.5,
  },
  previous: {
    shopping: 176,
    food: 92.4,
    transportation: 68,
    entertainment: 54,
    bills: 85,
    healthcare: 32,
  },
}

export const SPENDING_PERIODS = [
  {
    id: 'week',
    label: 'This Week',
    current: WEEKLY_SPENDING.current,
    previous: WEEKLY_SPENDING.previous,
    compareLabel: 'vs last week',
  },
  {
    id: 'month',
    label: 'This Month',
    current: CURRENT_MONTH.spending,
    previous: PREVIOUS_MONTH.spending,
    compareLabel: `vs ${PREVIOUS_MONTH.compactLabel}`,
  },
  {
    id: 'lastMonth',
    label: 'Last Month',
    current: PREVIOUS_MONTH.spending,
    previous: EARLIEST_MONTH.spending,
    compareLabel: `vs ${EARLIEST_MONTH.compactLabel}`,
  },
] as const

export type SpendingPeriod = (typeof SPENDING_PERIODS)[number]

/*
 * October transactions. Amounts per category add up to the October
 * breakdown in MONTHLY_REPORTS; the unit tests assert that.
 */
export const OCTOBER_TRANSACTIONS: readonly StatisticsTransaction[] = [
  // Shopping — $850.00
  {
    id: 'tx-best-buy',
    merchant: 'Best Buy',
    category: 'shopping',
    amount: 45,
    date: 'Oct 26',
    meta: 'Accessories · Card •• 4812',
  },
  {
    id: 'tx-etsy',
    merchant: 'Etsy',
    category: 'shopping',
    amount: 45,
    date: 'Oct 21',
    meta: 'Gifts · Online order',
  },
  {
    id: 'tx-target',
    merchant: 'Target',
    category: 'shopping',
    amount: 62.3,
    date: 'Oct 17',
    meta: 'Home · Card •• 1102',
  },
  {
    id: 'tx-apple',
    merchant: 'Apple Store',
    category: 'shopping',
    amount: 349,
    date: 'Oct 14',
    meta: 'Electronics · Card •• 4812',
  },
  {
    id: 'tx-zara',
    merchant: 'Zara Flagship',
    category: 'shopping',
    amount: 165.5,
    date: 'Oct 10',
    meta: 'Clothing · Card •• 4812',
  },
  {
    id: 'tx-amazon',
    merchant: 'Amazon Marketplace',
    category: 'shopping',
    amount: 98.2,
    date: 'Oct 06',
    meta: 'Home goods · Online order',
  },
  {
    id: 'tx-nike',
    merchant: 'Nike Store',
    category: 'shopping',
    amount: 85,
    date: 'Oct 02',
    meta: 'Footwear · In-store',
  },

  // Food & Dining — $420.00
  {
    id: 'tx-whole-foods',
    merchant: 'Whole Foods Market',
    category: 'food',
    amount: 54.2,
    date: 'Oct 27',
    meta: 'Groceries · Debit •• 1102',
  },
  {
    id: 'tx-starbucks',
    merchant: 'Starbucks Coffee',
    category: 'food',
    amount: 6.8,
    date: 'Oct 27',
    meta: 'Coffee · Apple Pay',
  },
  {
    id: 'tx-sweetgreen',
    merchant: 'Sweetgreen',
    category: 'food',
    amount: 22.5,
    date: 'Oct 25',
    meta: 'Lunch · Apple Pay',
  },
  {
    id: 'tx-blue-bottle',
    merchant: 'Blue Bottle Coffee',
    category: 'food',
    amount: 9.6,
    date: 'Oct 22',
    meta: 'Coffee · Apple Pay',
  },
  {
    id: 'tx-trader-joes',
    merchant: "Trader Joe's",
    category: 'food',
    amount: 78.4,
    date: 'Oct 19',
    meta: 'Groceries · Debit •• 1102',
  },
  {
    id: 'tx-osteria',
    merchant: 'Osteria Dinner',
    category: 'food',
    amount: 148.5,
    date: 'Oct 12',
    meta: 'Dining · Card •• 4812',
  },
  {
    id: 'tx-chipotle',
    merchant: 'Chipotle Catering',
    category: 'food',
    amount: 100,
    date: 'Oct 05',
    meta: 'Dining · Card •• 4812',
  },

  // Transportation — $380.00
  {
    id: 'tx-lyft',
    merchant: 'Lyft',
    category: 'transportation',
    amount: 18.2,
    date: 'Oct 27',
    meta: 'Ride · Apple Pay',
  },
  {
    id: 'tx-uber',
    merchant: 'Uber',
    category: 'transportation',
    amount: 24.8,
    date: 'Oct 23',
    meta: 'Ride · Apple Pay',
  },
  {
    id: 'tx-shell',
    merchant: 'Shell Station',
    category: 'transportation',
    amount: 52.4,
    date: 'Oct 20',
    meta: 'Fuel · Debit •• 1102',
  },
  {
    id: 'tx-parking',
    merchant: 'City Parking',
    category: 'transportation',
    amount: 16.6,
    date: 'Oct 16',
    meta: 'Parking · Card •• 4812',
  },
  {
    id: 'tx-auto-service',
    merchant: 'Auto Service',
    category: 'transportation',
    amount: 190,
    date: 'Oct 08',
    meta: 'Maintenance · Card •• 4812',
  },
  {
    id: 'tx-metro',
    merchant: 'Metro Card',
    category: 'transportation',
    amount: 78,
    date: 'Oct 01',
    meta: 'Transit · Auto-reload',
  },

  // Entertainment — $253.48
  {
    id: 'tx-spotify',
    merchant: 'Spotify',
    category: 'entertainment',
    amount: 10.99,
    date: 'Oct 26',
    meta: 'Music · Auto-pay',
  },
  {
    id: 'tx-steam',
    merchant: 'Steam',
    category: 'entertainment',
    amount: 24.5,
    date: 'Oct 24',
    meta: 'Games · PayPal',
  },
  {
    id: 'tx-netflix',
    merchant: 'Netflix',
    category: 'entertainment',
    amount: 15.99,
    date: 'Oct 22',
    meta: 'Streaming · Auto-pay',
  },
  {
    id: 'tx-cinema',
    merchant: 'Cinema Tickets',
    category: 'entertainment',
    amount: 32,
    date: 'Oct 18',
    meta: 'Movies · Card •• 4812',
  },
  {
    id: 'tx-concert',
    merchant: 'Concert',
    category: 'entertainment',
    amount: 145,
    date: 'Oct 11',
    meta: 'Live music · Card •• 4812',
  },
  {
    id: 'tx-museum',
    merchant: 'Museum',
    category: 'entertainment',
    amount: 25,
    date: 'Oct 09',
    meta: 'Culture · Card •• 1102',
  },

  // Bills & Utilities — $496.99
  {
    id: 'tx-conedison',
    merchant: 'ConEdison',
    category: 'bills',
    amount: 145,
    date: 'Oct 28',
    meta: 'Electric & gas · Auto-pay',
  },
  {
    id: 'tx-verizon',
    merchant: 'Verizon Wireless',
    category: 'bills',
    amount: 85,
    date: 'Oct 24',
    meta: 'Mobile · Auto-pay',
  },
  {
    id: 'tx-insurance',
    merchant: 'Renters Insurance',
    category: 'bills',
    amount: 128,
    date: 'Oct 15',
    meta: 'Insurance · Auto-pay',
  },
  {
    id: 'tx-adobe',
    merchant: 'Adobe Creative Cloud',
    category: 'bills',
    amount: 12,
    date: 'Oct 15',
    meta: 'Software · Auto-pay',
  },
  {
    id: 'tx-internet',
    merchant: 'Home Internet',
    category: 'bills',
    amount: 75,
    date: 'Oct 12',
    meta: 'Internet · Auto-pay',
  },
  {
    id: 'tx-icloud',
    merchant: 'iCloud+',
    category: 'bills',
    amount: 9.99,
    date: 'Oct 12',
    meta: 'Cloud storage · Auto-pay',
  },
  {
    id: 'tx-water',
    merchant: 'Water & Sewer',
    category: 'bills',
    amount: 42,
    date: 'Oct 08',
    meta: 'Utilities · Auto-pay',
  },

  // Healthcare — $255.00
  {
    id: 'tx-cvs',
    merchant: 'CVS Pharmacy',
    category: 'healthcare',
    amount: 34.5,
    date: 'Oct 25',
    meta: 'Pharmacy · Debit •• 1102',
  },
  {
    id: 'tx-dental',
    merchant: 'City Dental',
    category: 'healthcare',
    amount: 120,
    date: 'Oct 13',
    meta: 'Dental · Insurance',
  },
  {
    id: 'tx-vision',
    merchant: 'Vision Care',
    category: 'healthcare',
    amount: 55.5,
    date: 'Oct 07',
    meta: 'Optometry · Card •• 4812',
  },
  {
    id: 'tx-gym',
    merchant: 'Gym Membership',
    category: 'healthcare',
    amount: 45,
    date: 'Oct 05',
    meta: 'Fitness · Auto-pay',
  },
]

export type RecurringExpense = {
  id: string
  merchant: string
  category: StatisticsCategoryId
  amount: number
  frequency: string
  nextPayment: string
}

export const RECURRING_EXPENSES: readonly RecurringExpense[] = [
  {
    id: 'rec-netflix',
    merchant: 'Netflix Premium',
    category: 'entertainment',
    amount: 15.99,
    frequency: 'Monthly',
    nextPayment: 'Nov 22',
  },
  {
    id: 'rec-spotify',
    merchant: 'Spotify Family',
    category: 'entertainment',
    amount: 10.99,
    frequency: 'Monthly',
    nextPayment: 'Nov 26',
  },
  {
    id: 'rec-conedison',
    merchant: 'ConEdison Utilities',
    category: 'bills',
    amount: 145,
    frequency: 'Monthly',
    nextPayment: 'Nov 28',
  },
  {
    id: 'rec-verizon',
    merchant: 'Verizon Wireless',
    category: 'bills',
    amount: 85,
    frequency: 'Monthly',
    nextPayment: 'Dec 03',
  },
  {
    id: 'rec-gym',
    merchant: 'Gym Membership',
    category: 'healthcare',
    amount: 45,
    frequency: 'Monthly',
    nextPayment: 'Dec 05',
  },
  {
    id: 'rec-icloud',
    merchant: 'iCloud+ 2TB',
    category: 'bills',
    amount: 9.99,
    frequency: 'Monthly',
    nextPayment: 'Dec 12',
  },
]

export type CategoryBudget = {
  category: StatisticsCategoryId
  limit: number
}

export const FOOD_BUDGET = {
  limit: 600,
  updatedLimit: 750,
}

export const CATEGORY_BUDGETS: readonly CategoryBudget[] = [
  { category: 'shopping', limit: 1200 },
  { category: 'food', limit: FOOD_BUDGET.limit },
  { category: 'transportation', limit: 600 },
  { category: 'entertainment', limit: 500 },
  { category: 'bills', limit: 800 },
  { category: 'healthcare', limit: 400 },
]

export const BUDGET_CYCLE = {
  daysElapsed: 18,
  daysInCycle: 31,
}

export function getCategory(id: StatisticsCategoryId): StatisticsCategory {
  const category = STATISTICS_CATEGORIES.find((item) => item.id === id)

  if (!category) {
    throw new Error(`Unknown statistics category: ${id}`)
  }

  return category
}

export function getCategoryLabel(id: StatisticsCategoryId): string {
  return getCategory(id).label
}
