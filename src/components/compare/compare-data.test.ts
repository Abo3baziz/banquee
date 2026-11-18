import { describe, expect, it } from 'vitest'
import { DEMO_CARDS, NEW_CARD } from '../cards-demo/cards-demo-data'
import type {
  CompareRow,
  CompareSection,
  CompareSectionId,
} from './compare-data'
import { COMPARE_CARDS, getCompareSections } from './compare-data'

function getSection(id: CompareSectionId): CompareSection {
  const section = getCompareSections().find((item) => item.id === id)

  if (!section) {
    throw new Error(`Missing compare section: ${id}`)
  }

  return section
}

function getRow(sectionId: CompareSectionId, rowId: string): CompareRow {
  const row = getSection(sectionId).rows.find((item) => item.id === rowId)

  if (!row) {
    throw new Error(`Missing compare row: ${sectionId}.${rowId}`)
  }

  return row
}

function getTextValues(sectionId: CompareSectionId, rowId: string): string[] {
  return getRow(sectionId, rowId).values.map((value) => {
    if (value.kind !== 'text') {
      throw new Error(`Expected a text value in ${sectionId}.${rowId}`)
    }

    return value.value
  })
}

function getMoneyValues(sectionId: CompareSectionId, rowId: string): number[] {
  return getRow(sectionId, rowId).values.map((value) => {
    if (value.kind !== 'money') {
      throw new Error(`Expected a money value in ${sectionId}.${rowId}`)
    }

    return value.value
  })
}

describe('compare cards', () => {
  it('lists the three existing cards in display order', () => {
    expect(COMPARE_CARDS).toHaveLength(3)
    expect(COMPARE_CARDS.map((card) => card.id)).toEqual([
      'visa-debit',
      'mastercard-credit',
      'visa-credit-new',
    ])
    expect(COMPARE_CARDS.map((card) => card.lastFour)).toEqual([
      '4582',
      '8921',
      '3491',
    ])
    expect(COMPARE_CARDS).toEqual([DEMO_CARDS[0], DEMO_CARDS[1], NEW_CARD])
  })
})

describe('compare sections', () => {
  it('returns the four sections in a stable order', () => {
    const ids = getCompareSections().map((section) => section.id)

    expect(ids).toEqual([
      'cardDetails',
      'spendingLimits',
      'cardFeatures',
      'pricing',
    ])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('aligns every row with the three cards', () => {
    for (const section of getCompareSections()) {
      for (const row of section.rows) {
        expect(row.values).toHaveLength(3)
        expect(row.values).toHaveLength(COMPARE_CARDS.length)
      }
    }
  })

  it('keeps row ids unique so they map to distinct message keys', () => {
    const rowIds = getCompareSections().flatMap((section) =>
      section.rows.map((row) => row.id),
    )

    expect(new Set(rowIds).size).toBe(rowIds.length)
  })

  it('lists the expected rows per section', () => {
    expect(getSection('cardDetails').rows.map((row) => row.id)).toEqual([
      'network',
      'cardType',
      'tier',
      'status',
      'cardNumber',
      'expiry',
      'cardholder',
      'linkedAccount',
    ])
    expect(getSection('spendingLimits').rows.map((row) => row.id)).toEqual([
      'dailyLimit',
      'dailySpent',
      'monthlyLimit',
      'monthlySpent',
      'monthlyRemaining',
    ])
    expect(getSection('cardFeatures').rows.map((row) => row.id)).toEqual([
      'contactless',
      'freezeCard',
      'adjustableLimits',
    ])
    expect(getSection('pricing').rows.map((row) => row.id)).toEqual([
      'annualFee',
      'rewards',
      'foreignTransactionFee',
    ])
  })
})

describe('card details rows', () => {
  it('derives the network name from the brand', () => {
    expect(getTextValues('cardDetails', 'network')).toEqual([
      'Visa',
      'Mastercard',
      'Visa',
    ])
  })

  it('derives type, tier, and status from the card data', () => {
    expect(getRow('cardDetails', 'cardType').values).toEqual([
      { kind: 'cardType', value: 'debit' },
      { kind: 'cardType', value: 'credit' },
      { kind: 'cardType', value: 'credit' },
    ])
    expect(getRow('cardDetails', 'tier').values).toEqual([
      { kind: 'tier', value: 'standard' },
      { kind: 'tier', value: 'premium' },
      { kind: 'tier', value: 'standard' },
    ])
    expect(getRow('cardDetails', 'status').values).toEqual([
      { kind: 'status', value: 'active' },
      { kind: 'status', value: 'active' },
      { kind: 'status', value: 'active' },
    ])
  })

  it('masks card numbers while keeping each last four', () => {
    const values = getTextValues('cardDetails', 'cardNumber')

    expect(values).toEqual(
      COMPARE_CARDS.map((card) => `•••• •••• •••• ${card.lastFour}`),
    )
    COMPARE_CARDS.forEach((card, index) => {
      expect(values[index].endsWith(card.lastFour)).toBe(true)
    })
  })

  it('formats expiry and copies cardholder details', () => {
    expect(getTextValues('cardDetails', 'expiry')).toEqual([
      '09/2028',
      '11/2027',
      '08/2029',
    ])
    expect(getTextValues('cardDetails', 'cardholder')).toEqual(
      COMPARE_CARDS.map((card) => card.cardholder),
    )
    expect(getTextValues('cardDetails', 'linkedAccount')).toEqual(
      COMPARE_CARDS.map((card) => card.linkedAccount),
    )
  })
})

describe('spending limit rows', () => {
  it('maps limit and spending money values from the card data', () => {
    expect(getMoneyValues('spendingLimits', 'dailyLimit')).toEqual([
      2000, 1500, 3000,
    ])
    expect(getMoneyValues('spendingLimits', 'dailySpent')).toEqual([
      650, 320, 0,
    ])
    expect(getMoneyValues('spendingLimits', 'monthlyLimit')).toEqual([
      10000, 8000, 12000,
    ])
    expect(getMoneyValues('spendingLimits', 'monthlySpent')).toEqual([
      3450, 2100, 0,
    ])
  })

  it('derives the monthly remaining amount', () => {
    expect(getMoneyValues('spendingLimits', 'monthlyRemaining')).toEqual([
      6550, 5900, 12000,
    ])
  })

  it('keeps the known visa debit limits', () => {
    expect(getMoneyValues('spendingLimits', 'dailyLimit')[0]).toBe(2000)
    expect(getMoneyValues('spendingLimits', 'dailySpent')[0]).toBe(650)
    expect(getMoneyValues('spendingLimits', 'monthlyRemaining')[0]).toBe(6550)
  })
})

describe('feature and pricing rows', () => {
  it('marks implemented features as included on every card', () => {
    for (const row of getSection('cardFeatures').rows) {
      expect(row.values).toEqual([
        { kind: 'included' },
        { kind: 'included' },
        { kind: 'included' },
      ])
    }
  })

  it('marks untracked pricing attributes as unavailable', () => {
    for (const row of getSection('pricing').rows) {
      expect(row.values).toEqual([
        { kind: 'unavailable' },
        { kind: 'unavailable' },
        { kind: 'unavailable' },
      ])
    }
  })
})
