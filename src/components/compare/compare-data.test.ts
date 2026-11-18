import { describe, expect, it } from 'vitest'
import {
  DEMO_CARDS,
  DEMO_CARDHOLDER,
  NEW_CARD,
} from '../../data/cards-demo-data'
import type {
  CompareRow,
  CompareSection,
  CompareSectionId,
  CompareValue,
} from './compare-data'
import {
  COMPARE_CARDS,
  formatEgp,
  formatRate,
  getCompareCardSummaries,
  getCompareSections,
} from './compare-data'

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

function getMoneyValues(sectionId: CompareSectionId, rowId: string): number[] {
  return getRow(sectionId, rowId).values.map((value) => {
    if (value.kind !== 'money') {
      throw new Error(`Expected a money value in ${sectionId}.${rowId}`)
    }

    return value.value
  })
}

function getKinds(
  sectionId: CompareSectionId,
  rowId: string,
): CompareValue['kind'][] {
  return getRow(sectionId, rowId).values.map((value) => value.kind)
}

describe('compare cards', () => {
  it('lists the three existing cards in display order', () => {
    expect(COMPARE_CARDS).toHaveLength(3)
    expect(COMPARE_CARDS.map((card) => card.id)).toEqual([
      'visa-debit',
      'mastercard-credit',
      'visa-credit-new',
    ])
    expect(COMPARE_CARDS).toEqual([DEMO_CARDS[0], DEMO_CARDS[1], NEW_CARD])
  })
})

describe('compare sections', () => {
  it('returns the six sections in a stable order', () => {
    const ids = getCompareSections().map((section) => section.id)

    expect(ids).toEqual([
      'cardOverview',
      'spendingLimits',
      'fees',
      'rewards',
      'paymentFeatures',
      'additionalTerms',
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

  it('keeps row ids unique across every section', () => {
    const rowIds = getCompareSections().flatMap((section) =>
      section.rows.map((row) => row.id),
    )

    expect(new Set(rowIds).size).toBe(rowIds.length)
  })

  it('lists the expected rows per section', () => {
    expect(getSection('cardOverview').rows.map((row) => row.id)).toEqual([
      'cardType',
      'paymentNetwork',
      'fundingSource',
      'currency',
      'cardStatus',
    ])
    expect(getSection('spendingLimits').rows.map((row) => row.id)).toEqual([
      'monthlyLimit',
      'dailyLimit',
      'atmDailyLimit',
      'internationalMonthlyLimit',
      'creditLimit',
      'minimumPayment',
    ])
    expect(getSection('fees').rows.map((row) => row.id)).toEqual([
      'annualFee',
      'foreignTransactionFee',
      'atmWithdrawalFee',
      'cardReplacementFee',
      'monthlyInterestRate',
    ])
    expect(getSection('rewards').rows.map((row) => row.id)).toEqual([
      'cashback',
      'pointsPerHundred',
      'welcomeBonus',
      'loungeAccess',
      'purchaseProtection',
    ])
    expect(getSection('paymentFeatures').rows.map((row) => row.id)).toEqual([
      'onlinePayments',
      'inStorePayments',
      'internationalPayments',
      'atmWithdrawals',
      'contactlessPayments',
      'mobileWallet',
      'emvChip',
    ])
    expect(getSection('additionalTerms').rows.map((row) => row.id)).toEqual([
      'gracePeriod',
      'interestFreePurchases',
      'spendingSource',
      'bestFor',
    ])
  })
})

describe('card overview rows', () => {
  it('derives the payment network from the card brand', () => {
    expect(getRow('cardOverview', 'paymentNetwork').values).toEqual([
      { kind: 'text', value: 'Visa' },
      { kind: 'text', value: 'Mastercard' },
      { kind: 'text', value: 'Visa' },
    ])
  })

  it('describes card type, funding source, and currency', () => {
    expect(getRow('cardOverview', 'cardType').values).toEqual([
      { kind: 'enum', value: 'debitCard' },
      { kind: 'enum', value: 'creditCard' },
      { kind: 'enum', value: 'creditCard' },
    ])
    expect(getRow('cardOverview', 'fundingSource').values).toEqual([
      { kind: 'enum', value: 'bankAccount' },
      { kind: 'enum', value: 'creditLine' },
      { kind: 'enum', value: 'creditLine' },
    ])
    expect(getRow('cardOverview', 'currency').values).toEqual([
      { kind: 'text', value: 'EGP' },
      { kind: 'text', value: 'EGP' },
      { kind: 'text', value: 'EGP' },
    ])
  })

  it('maps the active card status to the supported enum value', () => {
    expect(getRow('cardOverview', 'cardStatus').values).toEqual([
      { kind: 'enum', value: 'active' },
      { kind: 'enum', value: 'active' },
      { kind: 'enum', value: 'active' },
    ])
  })
})

describe('spending limit rows', () => {
  it('keeps the known money limits in card order', () => {
    expect(getMoneyValues('spendingLimits', 'monthlyLimit')).toEqual([
      50000, 100000, 75000,
    ])
    expect(getMoneyValues('spendingLimits', 'dailyLimit')).toEqual([
      10000, 25000, 20000,
    ])
    expect(getMoneyValues('spendingLimits', 'atmDailyLimit')).toEqual([
      20000, 15000, 15000,
    ])
    expect(
      getMoneyValues('spendingLimits', 'internationalMonthlyLimit'),
    ).toEqual([10000, 50000, 40000])
  })

  it('marks credit-only terms as not applicable for the debit card', () => {
    expect(getRow('spendingLimits', 'creditLimit').values).toEqual([
      { kind: 'na' },
      { kind: 'money', value: 150000 },
      { kind: 'money', value: 100000 },
    ])
    expect(getRow('spendingLimits', 'minimumPayment').values).toEqual([
      { kind: 'na' },
      { kind: 'percent', value: 5 },
      { kind: 'percent', value: 5 },
    ])
  })
})

describe('fee rows', () => {
  it('keeps the known money fees', () => {
    expect(getMoneyValues('fees', 'annualFee')).toEqual([150, 450, 350])
    expect(getMoneyValues('fees', 'atmWithdrawalFee')).toEqual([15, 30, 25])
    expect(getMoneyValues('fees', 'cardReplacementFee')).toEqual([75, 100, 100])
  })

  it('keeps the known percentage fees', () => {
    expect(getRow('fees', 'foreignTransactionFee').values).toEqual([
      { kind: 'percent', value: 3 },
      { kind: 'percent', value: 3 },
      { kind: 'percent', value: 2.5 },
    ])
  })

  it('keeps a zero interest rate as a real percentage', () => {
    expect(getRow('fees', 'monthlyInterestRate').values).toEqual([
      { kind: 'percent', value: 0 },
      { kind: 'percent', value: 3.5 },
      { kind: 'percent', value: 3.25 },
    ])
  })
})

describe('reward rows', () => {
  it('keeps the known cashback and points values', () => {
    expect(getRow('rewards', 'cashback').values).toEqual([
      { kind: 'percent', value: 0.5 },
      { kind: 'percent', value: 2 },
      { kind: 'percent', value: 1.5 },
    ])
    expect(getRow('rewards', 'pointsPerHundred').values).toEqual([
      { kind: 'points', value: 1 },
      { kind: 'points', value: 3 },
      { kind: 'points', value: 2 },
    ])
  })

  it('keeps a zero welcome bonus distinct from a missing term', () => {
    expect(getRow('rewards', 'welcomeBonus').values).toEqual([
      { kind: 'money', value: 0 },
      { kind: 'money', value: 1000 },
      { kind: 'money', value: 500 },
    ])
    expect(getRow('rewards', 'welcomeBonus').values[0].kind).not.toBe('na')
    expect(getRow('spendingLimits', 'creditLimit').values[0]).toEqual({
      kind: 'na',
    })
  })

  it('distinguishes included lounge visits from excluded access', () => {
    expect(getRow('rewards', 'loungeAccess').values).toEqual([
      { kind: 'notIncluded' },
      { kind: 'visits', value: 4 },
      { kind: 'visits', value: 2 },
    ])
  })

  it('maps purchase protection levels to enum values', () => {
    expect(getRow('rewards', 'purchaseProtection').values).toEqual([
      { kind: 'enum', value: 'basic' },
      { kind: 'enum', value: 'extended' },
      { kind: 'enum', value: 'standard' },
    ])
  })
})

describe('payment feature rows', () => {
  it('marks the everyday payment methods as supported', () => {
    expect(getKinds('paymentFeatures', 'onlinePayments')).toEqual([
      'supported',
      'supported',
      'supported',
    ])
    expect(getKinds('paymentFeatures', 'inStorePayments')).toEqual([
      'supported',
      'supported',
      'supported',
    ])
  })

  it('marks conditional availability with the star state', () => {
    expect(getKinds('paymentFeatures', 'internationalPayments')).toEqual([
      'supportedStar',
      'supportedStar',
      'supportedStar',
    ])
    expect(getKinds('paymentFeatures', 'atmWithdrawals')).toEqual([
      'supported',
      'supportedStar',
      'supportedStar',
    ])
    expect(getKinds('paymentFeatures', 'contactlessPayments')).toEqual([
      'supportedStar',
      'supportedStar',
      'supportedStar',
    ])
    expect(getKinds('paymentFeatures', 'mobileWallet')).toEqual([
      'supportedStar',
      'supportedStar',
      'supportedStar',
    ])
  })

  it('equips every card with an EMV chip', () => {
    expect(getRow('paymentFeatures', 'emvChip').values).toEqual([
      { kind: 'equipped' },
      { kind: 'equipped' },
      { kind: 'equipped' },
    ])
  })
})

describe('additional term rows', () => {
  it('applies the interest-free window only to credit cards', () => {
    expect(getRow('additionalTerms', 'gracePeriod').values).toEqual([
      { kind: 'na' },
      { kind: 'upToDays', value: 55 },
      { kind: 'upToDays', value: 50 },
    ])
    expect(getRow('additionalTerms', 'interestFreePurchases').values).toEqual([
      { kind: 'na' },
      { kind: 'upToDays', value: 55 },
      { kind: 'upToDays', value: 50 },
    ])
  })

  it('describes the spending source and intended use', () => {
    expect(getRow('additionalTerms', 'spendingSource').values).toEqual([
      { kind: 'enum', value: 'availableBalance' },
      { kind: 'enum', value: 'availableCredit' },
      { kind: 'enum', value: 'availableCredit' },
    ])
    expect(getRow('additionalTerms', 'bestFor').values).toEqual([
      { kind: 'enum', value: 'everydaySpending' },
      { kind: 'enum', value: 'flexibleCreditSpending' },
      { kind: 'enum', value: 'everydayCreditPurchases' },
    ])
  })
})

describe('compare card summaries', () => {
  it('reuses the same limits as the spending limit rows', () => {
    const summaries = getCompareCardSummaries()
    const monthlyLimits = getMoneyValues('spendingLimits', 'monthlyLimit')
    const dailyLimits = getMoneyValues('spendingLimits', 'dailyLimit')

    expect(summaries).toHaveLength(COMPARE_CARDS.length)
    summaries.forEach((summary, index) => {
      expect(summary.card).toBe(COMPARE_CARDS[index])
      expect(summary.monthlyLimit).toBe(monthlyLimits[index])
      expect(summary.dailyLimit).toBe(dailyLimits[index])
    })
  })
})

describe('compare formatting', () => {
  it('formats EGP amounts with thousands separators and no decimals', () => {
    expect(formatEgp(50000)).toBe('EGP 50,000')
    expect(formatEgp(0)).toBe('EGP 0')
    expect(formatEgp(150000)).toBe('EGP 150,000')
  })

  it('formats percentages without trailing zeros', () => {
    expect(formatRate(3)).toBe('3%')
    expect(formatRate(2.5)).toBe('2.5%')
    expect(formatRate(3.25)).toBe('3.25%')
    expect(formatRate(0)).toBe('0%')
  })
})

describe('sensitive data guard', () => {
  const sensitiveRowIds = [
    'cardNumber',
    'expiry',
    'cardholder',
    'linkedAccount',
  ]

  it('does not compare payment credentials', () => {
    const rowIds = getCompareSections().flatMap((section) =>
      section.rows.map((row) => row.id),
    )

    for (const id of sensitiveRowIds) {
      expect(rowIds).not.toContain(id)
    }
  })

  it('does not leak masked numbers, expiry dates, or the cardholder name', () => {
    const textValues = getCompareSections()
      .flatMap((section) => section.rows)
      .flatMap((row) => row.values)
      .filter(
        (value): value is Extract<CompareValue, { kind: 'text' }> =>
          value.kind === 'text',
      )
      .map((value) => value.value)

    for (const value of textValues) {
      expect(value).not.toContain('•')
      expect(value).not.toMatch(/\d{1,2}\/\d{2,4}/)
      expect(value).not.toContain(DEMO_CARDHOLDER)
    }
  })
})
