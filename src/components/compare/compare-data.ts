import type { BankCardTier } from '../banking-card'
import type { DemoCard } from '../cards-demo/cards-demo-data'
import { DEMO_CARDS, NEW_CARD } from '../cards-demo/cards-demo-data'
import {
  formatExpiryLong,
  formatMaskedCardNumber,
  getRemainingAmount,
} from '../cards-demo/cards-utils'

/*
 * Comparison data for the /compare page. Row ids are stable keys: the UI maps
 * `compareCards.table.rows.<id>` to its own labels, so this module stays
 * presentation-free. Money values are raw numbers that the UI formats.
 */

/** The three cards that exist in the application, in display order. */
export const COMPARE_CARDS: readonly DemoCard[] = [
  DEMO_CARDS[0],
  DEMO_CARDS[1],
  NEW_CARD,
]

export type CompareValue =
  | { kind: 'text'; value: string }
  | { kind: 'cardType'; value: 'debit' | 'credit' }
  | { kind: 'tier'; value: BankCardTier }
  | { kind: 'status'; value: 'active' | 'frozen' }
  | { kind: 'money'; value: number }
  | { kind: 'included' }
  | { kind: 'unavailable' }

export type CompareRow = {
  /** Stable id mapped to a translation key by the UI. */
  id: string
  /** Exactly one value per entry in COMPARE_CARDS, in the same order. */
  values: readonly CompareValue[]
}

export type CompareSectionId =
  'cardDetails' | 'spendingLimits' | 'cardFeatures' | 'pricing'

export type CompareSection = {
  id: CompareSectionId
  rows: readonly CompareRow[]
}

/** Network name without the product suffix used by `networkLabel`. */
function getNetworkLabel(brand: DemoCard['brand']): string {
  return brand === 'visa' ? 'Visa' : 'Mastercard'
}

function textValues(read: (card: DemoCard) => string): CompareValue[] {
  return COMPARE_CARDS.map((card): CompareValue => ({
    kind: 'text',
    value: read(card),
  }))
}

function moneyValues(read: (card: DemoCard) => number): CompareValue[] {
  return COMPARE_CARDS.map((card): CompareValue => ({
    kind: 'money',
    value: read(card),
  }))
}

function includedValues(): CompareValue[] {
  return COMPARE_CARDS.map((): CompareValue => ({ kind: 'included' }))
}

function unavailableValues(): CompareValue[] {
  return COMPARE_CARDS.map((): CompareValue => ({ kind: 'unavailable' }))
}

function getCardDetailsRows(): readonly CompareRow[] {
  return [
    {
      id: 'network',
      values: textValues((card) => getNetworkLabel(card.brand)),
    },
    {
      id: 'cardType',
      values: COMPARE_CARDS.map((card): CompareValue => ({
        kind: 'cardType',
        value: card.kind,
      })),
    },
    {
      id: 'tier',
      values: COMPARE_CARDS.map((card): CompareValue => ({
        kind: 'tier',
        value: card.tier,
      })),
    },
    {
      id: 'status',
      values: COMPARE_CARDS.map((card): CompareValue => ({
        kind: 'status',
        value: card.status,
      })),
    },
    {
      id: 'cardNumber',
      values: textValues((card) => formatMaskedCardNumber(card.lastFour)),
    },
    {
      id: 'expiry',
      values: textValues((card) => formatExpiryLong(card.expiry)),
    },
    {
      id: 'cardholder',
      values: textValues((card) => card.cardholder),
    },
    {
      id: 'linkedAccount',
      values: textValues((card) => card.linkedAccount),
    },
  ]
}

function getSpendingLimitRows(): readonly CompareRow[] {
  return [
    {
      id: 'dailyLimit',
      values: moneyValues((card) => card.dailyLimit.limit),
    },
    {
      id: 'dailySpent',
      values: moneyValues((card) => card.dailyLimit.spent),
    },
    {
      id: 'monthlyLimit',
      values: moneyValues((card) => card.monthlyLimit.limit),
    },
    {
      id: 'monthlySpent',
      values: moneyValues((card) => card.monthlyLimit.spent),
    },
    {
      id: 'monthlyRemaining',
      values: moneyValues((card) =>
        getRemainingAmount(card.monthlyLimit.limit, card.monthlyLimit.spent),
      ),
    },
  ]
}

function getCardFeatureRows(): readonly CompareRow[] {
  return [
    { id: 'contactless', values: includedValues() },
    { id: 'freezeCard', values: includedValues() },
    { id: 'adjustableLimits', values: includedValues() },
  ]
}

/*
 * The demo does not store fees or rewards, so these rows stay marked as
 * unavailable instead of inventing numbers.
 */
function getPricingRows(): readonly CompareRow[] {
  return [
    { id: 'annualFee', values: unavailableValues() },
    { id: 'rewards', values: unavailableValues() },
    { id: 'foreignTransactionFee', values: unavailableValues() },
  ]
}

export function getCompareSections(): readonly CompareSection[] {
  return [
    { id: 'cardDetails', rows: getCardDetailsRows() },
    { id: 'spendingLimits', rows: getSpendingLimitRows() },
    { id: 'cardFeatures', rows: getCardFeatureRows() },
    { id: 'pricing', rows: getPricingRows() },
  ]
}
