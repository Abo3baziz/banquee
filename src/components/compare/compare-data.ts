import type { DemoCard } from '../../data/cards-demo-data'
import { DEMO_CARDS, NEW_CARD } from '../../data/cards-demo-data'

/*
 * Comparison content for the /compare page. Card identity comes from the
 * existing demo card records; every other value is fictional sample data
 * supplied for illustration, not a verified bank or payment-network offer. The
 * table compares products and benefits only, so it never carries payment
 * credentials such as card numbers, expiry dates, or cardholder names. All
 * amounts are EGP.
 *
 * Row ids are stable keys: the UI maps `compareCards.table.rows.<id>` to its
 * own labels, so this module stays presentation-free. Money and percentage
 * values are raw numbers that the page formats for display.
 */

/** The three cards that exist in the application, in display order. */
export const COMPARE_CARDS: readonly DemoCard[] = [
  DEMO_CARDS[0],
  DEMO_CARDS[1],
  NEW_CARD,
]

export type CompareEnumValue =
  | 'debitCard'
  | 'creditCard'
  | 'bankAccount'
  | 'creditLine'
  | 'active'
  | 'basic'
  | 'extended'
  | 'standard'
  | 'availableBalance'
  | 'availableCredit'
  | 'everydaySpending'
  | 'flexibleCreditSpending'
  | 'everydayCreditPurchases'

export type CompareValue =
  | { kind: 'text'; value: string }
  | { kind: 'enum'; value: CompareEnumValue }
  | { kind: 'money'; value: number }
  | { kind: 'percent'; value: number }
  | { kind: 'na' }
  | { kind: 'supported' }
  | { kind: 'supportedStar' }
  | { kind: 'notIncluded' }
  | { kind: 'equipped' }
  | { kind: 'points'; value: number }
  | { kind: 'visits'; value: number }
  | { kind: 'upToDays'; value: number }

export type CompareRow = {
  /** Stable id; the UI maps it to compareCards.table.rows.<id> */
  id: string
  /** Exactly one value per entry in COMPARE_CARDS, same order. */
  values: readonly CompareValue[]
}

export type CompareSectionId =
  | 'cardOverview'
  | 'spendingLimits'
  | 'fees'
  | 'rewards'
  | 'paymentFeatures'
  | 'additionalTerms'

export type CompareSection = {
  id: CompareSectionId
  rows: readonly CompareRow[]
}

type CardId = 'visa-debit' | 'mastercard-credit' | 'visa-credit-new'

type Availability = 'supported' | 'supportedStar'

type CardTerms = {
  cardType: 'debitCard' | 'creditCard'
  fundingSource: 'bankAccount' | 'creditLine'
  monthlyLimit: number
  dailyLimit: number
  atmDailyLimit: number
  internationalMonthlyLimit: number
  creditLimit: number | null
  minimumPayment: number | null
  annualFee: number
  foreignTransactionFee: number
  atmWithdrawalFee: number
  cardReplacementFee: number
  monthlyInterestRate: number
  cashback: number
  pointsPerHundred: number
  /** A zero bonus is a real amount, not a missing term. */
  welcomeBonus: number
  /** `null` means lounge access is not included. */
  loungeVisits: number | null
  purchaseProtection: 'basic' | 'extended' | 'standard'
  atmWithdrawals: Availability
  /** `null` means the card has no interest-free window. */
  gracePeriodDays: number | null
  spendingSource: 'availableBalance' | 'availableCredit'
  bestFor:
    'everydaySpending' | 'flexibleCreditSpending' | 'everydayCreditPurchases'
}

const CURRENCY_CODE = 'EGP'

/*
 * Single source of truth for the sample terms. The section rows and the
 * overview summaries both read from this record, so a limit or fee is only
 * written once.
 */
const CARD_TERMS: Record<CardId, CardTerms> = {
  'visa-debit': {
    cardType: 'debitCard',
    fundingSource: 'bankAccount',
    monthlyLimit: 50000,
    dailyLimit: 10000,
    atmDailyLimit: 20000,
    internationalMonthlyLimit: 10000,
    creditLimit: null,
    minimumPayment: null,
    annualFee: 150,
    foreignTransactionFee: 3,
    atmWithdrawalFee: 15,
    cardReplacementFee: 75,
    monthlyInterestRate: 0,
    cashback: 0.5,
    pointsPerHundred: 1,
    welcomeBonus: 0,
    loungeVisits: null,
    purchaseProtection: 'basic',
    atmWithdrawals: 'supported',
    gracePeriodDays: null,
    spendingSource: 'availableBalance',
    bestFor: 'everydaySpending',
  },
  'mastercard-credit': {
    cardType: 'creditCard',
    fundingSource: 'creditLine',
    monthlyLimit: 100000,
    dailyLimit: 25000,
    atmDailyLimit: 15000,
    internationalMonthlyLimit: 50000,
    creditLimit: 150000,
    minimumPayment: 5,
    annualFee: 450,
    foreignTransactionFee: 3,
    atmWithdrawalFee: 30,
    cardReplacementFee: 100,
    monthlyInterestRate: 3.5,
    cashback: 2,
    pointsPerHundred: 3,
    welcomeBonus: 1000,
    loungeVisits: 4,
    purchaseProtection: 'extended',
    atmWithdrawals: 'supportedStar',
    gracePeriodDays: 55,
    spendingSource: 'availableCredit',
    bestFor: 'flexibleCreditSpending',
  },
  'visa-credit-new': {
    cardType: 'creditCard',
    fundingSource: 'creditLine',
    monthlyLimit: 75000,
    dailyLimit: 20000,
    atmDailyLimit: 15000,
    internationalMonthlyLimit: 40000,
    creditLimit: 100000,
    minimumPayment: 5,
    annualFee: 350,
    foreignTransactionFee: 2.5,
    atmWithdrawalFee: 25,
    cardReplacementFee: 100,
    monthlyInterestRate: 3.25,
    cashback: 1.5,
    pointsPerHundred: 2,
    welcomeBonus: 500,
    loungeVisits: 2,
    purchaseProtection: 'standard',
    atmWithdrawals: 'supportedStar',
    gracePeriodDays: 50,
    spendingSource: 'availableCredit',
    bestFor: 'everydayCreditPurchases',
  },
}

function isCardId(value: string): value is CardId {
  return Object.hasOwn(CARD_TERMS, value)
}

function getTerms(card: DemoCard): CardTerms {
  if (!isCardId(card.id)) {
    throw new Error(`Missing compare terms for card: ${card.id}`)
  }

  return CARD_TERMS[card.id]
}

function textValue(value: string): CompareValue {
  return { kind: 'text', value }
}

function enumValue(value: CompareEnumValue): CompareValue {
  return { kind: 'enum', value }
}

function moneyValue(value: number): CompareValue {
  return { kind: 'money', value }
}

function percentValue(value: number): CompareValue {
  return { kind: 'percent', value }
}

function pointsValue(value: number): CompareValue {
  return { kind: 'points', value }
}

function visitsValue(value: number): CompareValue {
  return { kind: 'visits', value }
}

function upToDaysValue(value: number): CompareValue {
  return { kind: 'upToDays', value }
}

function availabilityValue(value: Availability): CompareValue {
  return value === 'supported'
    ? { kind: 'supported' }
    : { kind: 'supportedStar' }
}

function cardValues(read: (card: DemoCard) => CompareValue): CompareValue[] {
  return COMPARE_CARDS.map(read)
}

function termsValues(read: (terms: CardTerms) => CompareValue): CompareValue[] {
  return COMPARE_CARDS.map((card) => read(getTerms(card)))
}

/** Product name without the tier suffix used by `networkLabel`. */
function getNetworkName(brand: DemoCard['brand']): string {
  return brand === 'visa' ? 'Visa' : 'Mastercard'
}

/*
 * Every demo card is active. The compare table has no frozen state, so the
 * mapping narrows to the only supported enum value instead of passing the
 * card status through.
 */
function getActiveStatus(status: DemoCard['status']): 'active' {
  if (status !== 'active') {
    throw new Error(`Compare data only supports active cards: ${status}`)
  }

  return 'active'
}

/** 'EGP 50,000' — thousands-separated, no decimals. */
export function formatEgp(value: number): string {
  return `${CURRENCY_CODE} ${value.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })}`
}

/** '3%', '2.5%', '3.25%' — trailing zeros trimmed, at most two decimals. */
export function formatRate(value: number): string {
  return `${Number(value.toFixed(2))}%`
}

function getCardOverviewRows(): readonly CompareRow[] {
  return [
    {
      id: 'cardType',
      values: termsValues((terms) => enumValue(terms.cardType)),
    },
    {
      id: 'paymentNetwork',
      values: cardValues((card) => textValue(getNetworkName(card.brand))),
    },
    {
      id: 'fundingSource',
      values: termsValues((terms) => enumValue(terms.fundingSource)),
    },
    {
      id: 'currency',
      values: cardValues(() => textValue(CURRENCY_CODE)),
    },
    {
      id: 'cardStatus',
      values: cardValues((card) => enumValue(getActiveStatus(card.status))),
    },
  ]
}

function getSpendingLimitRows(): readonly CompareRow[] {
  return [
    {
      id: 'monthlyLimit',
      values: termsValues((terms) => moneyValue(terms.monthlyLimit)),
    },
    {
      id: 'dailyLimit',
      values: termsValues((terms) => moneyValue(terms.dailyLimit)),
    },
    {
      id: 'atmDailyLimit',
      values: termsValues((terms) => moneyValue(terms.atmDailyLimit)),
    },
    {
      id: 'internationalMonthlyLimit',
      values: termsValues((terms) =>
        moneyValue(terms.internationalMonthlyLimit),
      ),
    },
    {
      id: 'creditLimit',
      values: termsValues((terms) =>
        terms.creditLimit === null
          ? { kind: 'na' }
          : moneyValue(terms.creditLimit),
      ),
    },
    {
      id: 'minimumPayment',
      values: termsValues((terms) =>
        terms.minimumPayment === null
          ? { kind: 'na' }
          : percentValue(terms.minimumPayment),
      ),
    },
  ]
}

function getFeeRows(): readonly CompareRow[] {
  return [
    {
      id: 'annualFee',
      values: termsValues((terms) => moneyValue(terms.annualFee)),
    },
    {
      id: 'foreignTransactionFee',
      values: termsValues((terms) => percentValue(terms.foreignTransactionFee)),
    },
    {
      id: 'atmWithdrawalFee',
      values: termsValues((terms) => moneyValue(terms.atmWithdrawalFee)),
    },
    {
      id: 'cardReplacementFee',
      values: termsValues((terms) => moneyValue(terms.cardReplacementFee)),
    },
    {
      id: 'monthlyInterestRate',
      values: termsValues((terms) => percentValue(terms.monthlyInterestRate)),
    },
  ]
}

function getRewardRows(): readonly CompareRow[] {
  return [
    {
      id: 'cashback',
      values: termsValues((terms) => percentValue(terms.cashback)),
    },
    {
      id: 'pointsPerHundred',
      values: termsValues((terms) => pointsValue(terms.pointsPerHundred)),
    },
    {
      id: 'welcomeBonus',
      values: termsValues((terms) => moneyValue(terms.welcomeBonus)),
    },
    {
      id: 'loungeAccess',
      values: termsValues((terms) =>
        terms.loungeVisits === null
          ? { kind: 'notIncluded' }
          : visitsValue(terms.loungeVisits),
      ),
    },
    {
      id: 'purchaseProtection',
      values: termsValues((terms) => enumValue(terms.purchaseProtection)),
    },
  ]
}

function getPaymentFeatureRows(): readonly CompareRow[] {
  return [
    {
      id: 'onlinePayments',
      values: cardValues(() => ({ kind: 'supported' })),
    },
    {
      id: 'inStorePayments',
      values: cardValues(() => ({ kind: 'supported' })),
    },
    {
      id: 'internationalPayments',
      values: cardValues(() => ({ kind: 'supportedStar' })),
    },
    {
      id: 'atmWithdrawals',
      values: termsValues((terms) => availabilityValue(terms.atmWithdrawals)),
    },
    {
      id: 'contactlessPayments',
      values: cardValues(() => ({ kind: 'supportedStar' })),
    },
    {
      id: 'mobileWallet',
      values: cardValues(() => ({ kind: 'supportedStar' })),
    },
    {
      id: 'emvChip',
      values: cardValues(() => ({ kind: 'equipped' })),
    },
  ]
}

/*
 * The sample terms give each card the same window for both the grace period
 * and interest-free purchases, so both rows read the single stored value.
 */
function getAdditionalTermRows(): readonly CompareRow[] {
  return [
    {
      id: 'gracePeriod',
      values: termsValues((terms) =>
        terms.gracePeriodDays === null
          ? { kind: 'na' }
          : upToDaysValue(terms.gracePeriodDays),
      ),
    },
    {
      id: 'interestFreePurchases',
      values: termsValues((terms) =>
        terms.gracePeriodDays === null
          ? { kind: 'na' }
          : upToDaysValue(terms.gracePeriodDays),
      ),
    },
    {
      id: 'spendingSource',
      values: termsValues((terms) => enumValue(terms.spendingSource)),
    },
    {
      id: 'bestFor',
      values: termsValues((terms) => enumValue(terms.bestFor)),
    },
  ]
}

export function getCompareSections(): readonly CompareSection[] {
  return [
    { id: 'cardOverview', rows: getCardOverviewRows() },
    { id: 'spendingLimits', rows: getSpendingLimitRows() },
    { id: 'fees', rows: getFeeRows() },
    { id: 'rewards', rows: getRewardRows() },
    { id: 'paymentFeatures', rows: getPaymentFeatureRows() },
    { id: 'additionalTerms', rows: getAdditionalTermRows() },
  ]
}

/** Headline facts for the overview tiles; limits reuse the table values. */
export type CompareCardSummary = {
  card: DemoCard
  monthlyLimit: number
  dailyLimit: number
}

export function getCompareCardSummaries(): readonly CompareCardSummary[] {
  return COMPARE_CARDS.map((card) => {
    const terms = getTerms(card)

    return {
      card,
      monthlyLimit: terms.monthlyLimit,
      dailyLimit: terms.dailyLimit,
    }
  })
}
