import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCurrency } from './use-currency'

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
}))

import { useLocale } from 'next-intl'

describe('useCurrency', () => {
  it('derives the currency from the active application language', () => {
    vi.mocked(useLocale).mockReturnValue('ar')
    const { result } = renderHook(() => useCurrency())

    expect(result.current.locale).toBe('ar')
    expect(result.current.currency).toBe('SAR')
    expect(result.current.symbol).toBe('ر.س.')
    expect(result.current.formatCurrency(450)).toContain('ر.س.')
  })

  it('formats amounts in the currency of the active language', () => {
    vi.mocked(useLocale).mockReturnValue('en')
    const { result } = renderHook(() => useCurrency())

    expect(result.current.currency).toBe('USD')
    expect(result.current.formatCurrency(1250)).toBe('$1,250.00')
    expect(
      result.current.formatCurrency(450, { signDisplay: 'always' }),
    ).toBe('+$450.00')
  })

  it('keeps a stable formatter unless the language changes', () => {
    vi.mocked(useLocale).mockReturnValue('en')
    const { result, rerender } = renderHook(() => useCurrency())
    const initial = result.current

    rerender()

    expect(result.current).toStrictEqual(initial)
    expect(result.current.formatCurrency).toBe(initial.formatCurrency)

    vi.mocked(useLocale).mockReturnValue('de')
    rerender()

    expect(result.current.formatCurrency).not.toBe(initial.formatCurrency)
    expect(result.current.formatCurrency(1250)).toBe('1.250,00\u00a0€')
  })
})
