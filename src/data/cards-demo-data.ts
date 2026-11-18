import type { BankCardTier } from '../components/banking-card'

export type DemoCardKind = 'debit' | 'credit'
export type DemoCardBrand = 'visa' | 'mastercard'
export type DemoCardStatus = 'active' | 'frozen'

export type DemoCardLimit = {
  limit: number
  spent: number
}

export type DemoCard = {
  id: string
  kind: DemoCardKind
  brand: DemoCardBrand
  networkLabel: string
  tier: BankCardTier
  lastFour: string
  cardholder: string
  expiry: string
  status: DemoCardStatus
  linkedAccount: string
  dailyLimit: DemoCardLimit
  monthlyLimit: DemoCardLimit
}

export const DEMO_CARDHOLDER = 'Ahmed Abdelaziz'

/*
 * Both cards use the shared banking-card themes: the Visa Debit keeps the
 * light standard treatment, the Mastercard uses the dark premium treatment
 * shown for the second card in the card management designs.
 */
export const DEMO_CARDS: readonly DemoCard[] = [
  {
    id: 'visa-debit',
    kind: 'debit',
    brand: 'visa',
    networkLabel: 'Visa Debit',
    tier: 'standard',
    lastFour: '4582',
    cardholder: DEMO_CARDHOLDER,
    expiry: '09/28',
    status: 'active',
    linkedAccount: 'Banquee Main Checking (•••• 4289)',
    dailyLimit: { limit: 2000, spent: 650 },
    monthlyLimit: { limit: 10000, spent: 3450 },
  },
  {
    id: 'mastercard-credit',
    kind: 'credit',
    brand: 'mastercard',
    networkLabel: 'Mastercard Credit',
    tier: 'premium',
    lastFour: '8921',
    cardholder: DEMO_CARDHOLDER,
    expiry: '11/27',
    status: 'active',
    linkedAccount: 'Banquee Main Checking (•••• 4289)',
    dailyLimit: { limit: 1500, spent: 320 },
    monthlyLimit: { limit: 8000, spent: 2100 },
  },
]

export const PRIMARY_CARD = DEMO_CARDS[0]
export const SECONDARY_CARD = DEMO_CARDS[1]

export const FREEZE_CARD = PRIMARY_CARD
export const LIMITS_CARD = PRIMARY_CARD

export const UPDATED_DAILY_LIMIT = 2500
export const DAILY_LIMIT_TIER_MAX = 15000

/*
 * Fictional card number for the Add Card demo. Only the grouped value is
 * typed into the simulated form; every card visual stays masked.
 */
export const NEW_CARD_NUMBER = {
  digits: '4532841299343491',
  groups: '4532 8412 9934 3491',
  firstFour: '4532',
  lastFour: '3491',
}

export const NEW_CARD: DemoCard = {
  id: 'visa-credit-new',
  kind: 'credit',
  brand: 'visa',
  networkLabel: 'Visa Credit',
  tier: 'standard',
  lastFour: NEW_CARD_NUMBER.lastFour,
  cardholder: DEMO_CARDHOLDER,
  expiry: '08/29',
  status: 'active',
  linkedAccount: 'Banquee Main Checking (•••• 4289)',
  dailyLimit: { limit: 3000, spent: 0 },
  monthlyLimit: { limit: 12000, spent: 0 },
}

export const NEW_CARD_DELIVERY = {
  address: '742 Evergreen Terrace, Brooklyn, NY',
  window: '3–5 days',
}

export type DemoCardActivity = {
  id: 'netflix' | 'coffee' | 'apple'
  merchant: string
  category: string
  when: string
  amount: number
}

export const CARD_ACTIVITY: readonly DemoCardActivity[] = [
  {
    id: 'netflix',
    merchant: 'Netflix Subscription',
    category: 'Entertainment',
    when: 'Today',
    amount: 15.99,
  },
  {
    id: 'coffee',
    merchant: 'Starbucks Reserve',
    category: 'Coffee & Food',
    when: 'Yesterday',
    amount: 6.8,
  },
  {
    id: 'apple',
    merchant: 'Apple Store Online',
    category: 'Electronics',
    when: 'Oct 14',
    amount: 129,
  },
]
