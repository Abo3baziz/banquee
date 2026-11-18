'use client'

import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import {
  type CurrencyFormatOptions,
  formatCurrency as formatCurrencyForLocale,
  getCurrencyConfig,
} from '@/i18n/currency'

export type Currency = {
  /** Active application language, e.g. `ar`. */
  locale: string
  /** ISO 4217 code for the active language, e.g. `SAR`. */
  currency: string
  /** Compact indicator for amount inputs, e.g. `ر.س.`. */
  symbol: string
  /**
   * Formats a monetary amount in the currency of the active application
   * language. Switching the language re-renders every formatted value
   * without a page refresh.
   */
  formatCurrency: (
    amount: number | null | undefined,
    options?: CurrencyFormatOptions,
  ) => string
}

/**
 * Currency state for the active application language. The hook reads the
 * locale from the next-intl context, so every component below
 * `NextIntlClientProvider` stays in sync with the language switcher.
 */
export function useCurrency(): Currency {
  const locale = useLocale()

  return useMemo(() => {
    const config = getCurrencyConfig(locale)

    return {
      locale,
      currency: config.currency,
      symbol: config.symbol,
      formatCurrency: (amount, options) =>
        formatCurrencyForLocale(amount, locale, options),
    }
  }, [locale])
}
