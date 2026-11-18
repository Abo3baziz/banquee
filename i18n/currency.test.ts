import { describe, expect, it } from 'vitest'
import {
  CURRENCY_CONFIG,
  formatCurrency,
  getCurrencyCode,
  getCurrencyConfig,
} from './currency'

describe('getCurrencyConfig', () => {
  it('maps every application language to its display currency', () => {
    expect(getCurrencyConfig('en')).toEqual({
      locale: 'en-US',
      currency: 'USD',
      symbol: '$',
    })
    expect(getCurrencyConfig('de')).toEqual({
      locale: 'de-DE',
      currency: 'EUR',
      symbol: '€',
    })
    expect(getCurrencyConfig('es')).toEqual({
      locale: 'es-ES',
      currency: 'EUR',
      symbol: '€',
    })
    expect(getCurrencyConfig('ar')).toEqual({
      locale: 'ar-SA',
      currency: 'SAR',
      symbol: 'ر.س.',
    })
  })

  it('falls back to English for unknown locales', () => {
    expect(getCurrencyConfig('fr')).toBe(CURRENCY_CONFIG.en)
    expect(getCurrencyCode('')).toBe('USD')
  })

  it('covers every supported routing locale', () => {
    expect(Object.keys(CURRENCY_CONFIG).sort()).toEqual([
      'ar',
      'de',
      'en',
      'es',
    ])
  })
})

describe('formatCurrency', () => {
  it('formats US dollars for English', () => {
    expect(formatCurrency(1250, 'en')).toBe('$1,250.00')
    expect(formatCurrency(0, 'en')).toBe('$0.00')
  })

  it('formats euros for Spanish and German', () => {
    expect(formatCurrency(1250, 'de')).toBe('1.250,00\u00a0€')
    expect(formatCurrency(1250, 'es')).toBe('1250,00\u00a0€')
    expect(formatCurrency(12500, 'es')).toBe('12.500,00\u00a0€')
  })

  it('formats Saudi riyals with Arabic numerals for Arabic', () => {
    const formatted = formatCurrency(1250, 'ar')

    expect(formatted).toContain('ر.س.')
    expect(formatted).toContain('١٬٢٥٠٫٠٠')
  })

  it('formats invalid amounts as zero instead of throwing', () => {
    expect(formatCurrency(null, 'en')).toBe('$0.00')
    expect(formatCurrency(undefined, 'en')).toBe('$0.00')
    expect(formatCurrency(Number.NaN, 'en')).toBe('$0.00')
    expect(formatCurrency(Number.POSITIVE_INFINITY, 'en')).toBe('$0.00')
    expect(formatCurrency(-0, 'en')).toBe('$0.00')
  })

  it('places the sign through the locale formatter', () => {
    expect(formatCurrency(-450, 'en')).toBe('-$450.00')
    expect(formatCurrency(450, 'en', { signDisplay: 'always' })).toBe(
      '+$450.00',
    )
    expect(formatCurrency(-450, 'en', { signDisplay: 'always' })).toBe(
      '-$450.00',
    )
  })

  it('drops cents when asked for whole amounts only', () => {
    expect(formatCurrency(799, 'en', { maximumFractionDigits: 0 })).toBe('$799')
    expect(formatCurrency(3410, 'ar', { maximumFractionDigits: 0 })).toContain(
      '٣٬٤١٠',
    )
  })
})
