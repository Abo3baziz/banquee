import { describe, expect, it } from 'vitest'
import {
  DEMO_CARDS,
  LIMITS_CARD,
  NEW_CARD,
  NEW_CARD_NUMBER,
  PRIMARY_CARD,
  SECONDARY_CARD,
  UPDATED_DAILY_LIMIT,
} from '../../data/cards-demo-data'
import {
  formatCardNumberInput,
  formatExpiryLong,
  formatMaskedCardNumber,
  formatPercent,
  formatReviewCardNumber,
  getCardStatusLabel,
  getCardTypeLabel,
  getLimitProgress,
  getLimitRowById,
  getLimitRows,
  getRemainingAmount,
} from './cards-utils'

describe('cards demo data', () => {
  it('keeps both cards on the same cardholder', () => {
    expect(PRIMARY_CARD.lastFour).toBe('4582')
    expect(PRIMARY_CARD.networkLabel).toBe('Visa Debit')
    expect(SECONDARY_CARD.lastFour).toBe('8921')
    expect(SECONDARY_CARD.networkLabel).toBe('Mastercard Credit')
    expect(DEMO_CARDS).toHaveLength(2)
  })

  it('keeps the new card number fictional and consistent', () => {
    expect(NEW_CARD_NUMBER.digits).toHaveLength(16)
    expect(NEW_CARD_NUMBER.digits.startsWith(NEW_CARD_NUMBER.firstFour)).toBe(
      true,
    )
    expect(NEW_CARD_NUMBER.digits.endsWith(NEW_CARD_NUMBER.lastFour)).toBe(true)
    expect(NEW_CARD_NUMBER.groups.replaceAll(' ', '')).toBe(
      NEW_CARD_NUMBER.digits,
    )
    expect(NEW_CARD.lastFour).toBe(NEW_CARD_NUMBER.lastFour)
    expect(NEW_CARD.kind).toBe('credit')
  })
})

describe('limit helpers', () => {
  it('derives the daily and monthly rows from card data', () => {
    const [daily, monthly] = getLimitRows(LIMITS_CARD)

    expect(daily).toMatchObject({
      limit: 2000,
      spent: 650,
      remaining: 1350,
      progress: 32.5,
      percentLabel: '32.5%',
    })
    expect(monthly).toMatchObject({
      limit: 10000,
      spent: 3450,
      remaining: 6550,
      progress: 34.5,
      percentLabel: '34.5%',
    })
  })

  it('recalculates the daily row for the updated limit', () => {
    const daily = getLimitRowById(LIMITS_CARD, 'daily', {
      daily: UPDATED_DAILY_LIMIT,
    })

    expect(daily.limit).toBe(2500)
    expect(daily.remaining).toBe(1850)
    expect(daily.progress).toBe(26)
    expect(daily.percentLabel).toBe('26%')
  })

  it('handles a zero limit and over-limit spending safely', () => {
    expect(getLimitProgress(0, 650)).toBe(0)
    expect(getRemainingAmount(0, 650)).toBe(0)
    expect(getRemainingAmount(2000, 2400)).toBe(0)
    expect(getLimitProgress(500, 900)).toBe(100)
  })

  it('formats percentages without trailing zeroes', () => {
    expect(formatPercent(32.5)).toBe('32.5%')
    expect(formatPercent(26)).toBe('26%')
    expect(formatPercent(0)).toBe('0%')
  })
})

describe('display helpers', () => {
  it('masks card numbers everywhere except the review prefix', () => {
    expect(formatMaskedCardNumber('4582')).toBe('•••• •••• •••• 4582')
    expect(formatReviewCardNumber('4532', '3491')).toBe('4532 •••• •••• 3491')
  })

  it('groups typed card numbers into blocks of four', () => {
    expect(formatCardNumberInput(NEW_CARD_NUMBER.groups)).toBe(
      NEW_CARD_NUMBER.groups,
    )
    expect(formatCardNumberInput('4532841299343491')).toBe(
      NEW_CARD_NUMBER.groups,
    )
    expect(formatCardNumberInput('4532-8412-9934-3491')).toBe(
      NEW_CARD_NUMBER.groups,
    )
    expect(formatCardNumberInput('')).toBe('')
  })

  it('expands the short expiry for review details', () => {
    expect(formatExpiryLong('08/29')).toBe('08/2029')
    expect(formatExpiryLong('invalid')).toBe('invalid')
  })

  it('labels card types and statuses consistently', () => {
    expect(getCardTypeLabel('debit')).toBe('Debit Card')
    expect(getCardTypeLabel('credit')).toBe('Credit Card')
    expect(getCardStatusLabel('active')).toBe('Active')
    expect(getCardStatusLabel('frozen')).toBe('Frozen')
  })
})
