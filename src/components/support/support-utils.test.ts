import { CreditCard, ShieldCheck } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import {
  filterFaqCategories,
  normalizeQuery,
  type SupportFaqCategory,
} from './support-utils'

const categories: readonly SupportFaqCategory[] = [
  {
    key: 'cards',
    title: 'Cards',
    icon: CreditCard,
    items: [
      {
        key: 'q1',
        question: 'How do I freeze my card?',
        answer: 'Open the app and choose the Freeze Card option.',
      },
      {
        key: 'q2',
        question: 'How do I order an extra card?',
        answer: 'Select the additional card in the Cards section.',
      },
    ],
  },
  {
    key: 'account',
    title: 'Account',
    icon: ShieldCheck,
    items: [
      {
        key: 'q1',
        question: 'How do I verify my account?',
        answer: 'Submit the required identification documents.',
      },
      {
        key: 'q2',
        question: 'How do I cancel my account?',
        answer: 'Contact our support team to request cancellation.',
      },
    ],
  },
]

function visibleKeys(result: readonly SupportFaqCategory[]) {
  return result.map((category) => ({
    key: category.key,
    items: category.items.map((item) => item.key),
  }))
}

describe('normalizeQuery', () => {
  it('trims and lowercases the query', () => {
    expect(normalizeQuery('  Freeze  ')).toBe('freeze')
  })
})

describe('filterFaqCategories', () => {
  it('returns every category and item for an empty query', () => {
    expect(visibleKeys(filterFaqCategories(categories, ''))).toEqual([
      { key: 'cards', items: ['q1', 'q2'] },
      { key: 'account', items: ['q1', 'q2'] },
    ])
  })

  it('treats a whitespace-only query as no filtering', () => {
    expect(visibleKeys(filterFaqCategories(categories, '   '))).toEqual([
      { key: 'cards', items: ['q1', 'q2'] },
      { key: 'account', items: ['q1', 'q2'] },
    ])
  })

  it('matches questions case-insensitively', () => {
    expect(visibleKeys(filterFaqCategories(categories, 'FREEZE'))).toEqual([
      { key: 'cards', items: ['q1'] },
    ])
  })

  it('matches answers case-insensitively', () => {
    expect(
      visibleKeys(filterFaqCategories(categories, 'identification')),
    ).toEqual([{ key: 'account', items: ['q1'] }])
  })

  it('drops non-matching items from a matching category', () => {
    expect(visibleKeys(filterFaqCategories(categories, 'card'))).toEqual([
      { key: 'cards', items: ['q1', 'q2'] },
    ])
  })

  it('removes categories that have no matches', () => {
    const result = filterFaqCategories(categories, 'extra card')

    expect(result).toHaveLength(1)
    expect(result[0]?.key).toBe('cards')
  })

  it('returns no categories when nothing matches', () => {
    expect(filterFaqCategories(categories, 'mortgage rates')).toEqual([])
  })

  it('matches unicode text such as Arabic questions', () => {
    const arabicCategories: readonly SupportFaqCategory[] = [
      {
        key: 'personalDetails',
        title: 'التفاصيل الشخصية',
        icon: ShieldCheck,
        items: [
          {
            key: 'q1',
            question: 'كيف أغيّر عنوان حسابي؟',
            answer: 'افتح إعدادات الملف الشخصي وحدّث العنوان.',
          },
          {
            key: 'q2',
            question: 'أين أجد رقم التعريف الضريبي؟',
            answer: 'تجد الرقم في مستندات الحساب.',
          },
        ],
      },
    ]

    expect(visibleKeys(filterFaqCategories(arabicCategories, 'عنوان'))).toEqual(
      [{ key: 'personalDetails', items: ['q1'] }],
    )
    expect(
      visibleKeys(filterFaqCategories(arabicCategories, 'مستندات')),
    ).toEqual([{ key: 'personalDetails', items: ['q2'] }])
  })
})
