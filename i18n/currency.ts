import { routing } from './routing'

/**
 * Display currency per application language. Monetary values always follow
 * the selected language, never the visitor's location or browser settings.
 */
export type AppLocale = (typeof routing.locales)[number]

export type CurrencyConfig = {
  /** BCP 47 locale handed to `Intl.NumberFormat`. */
  locale: string
  /** ISO 4217 code displayed for this language. */
  currency: string
  /** Compact indicator for amount inputs; matches the formatted symbol. */
  symbol: string
}

export const CURRENCY_CONFIG = {
  en: { locale: 'en-US', currency: 'USD', symbol: '$' },
  de: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
  es: { locale: 'es-ES', currency: 'EUR', symbol: '€' },
  ar: { locale: 'ar-SA', currency: 'SAR', symbol: 'ر.س.' },
} as const satisfies Record<AppLocale, CurrencyConfig>

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value)
}

/** Currency for an application language; unknown values fall back to English. */
export function getCurrencyConfig(locale: string): CurrencyConfig {
  return isAppLocale(locale) ? CURRENCY_CONFIG[locale] : CURRENCY_CONFIG.en
}

/** ISO 4217 code for an application language, e.g. `SAR` for Arabic. */
export function getCurrencyCode(locale: string): string {
  return getCurrencyConfig(locale).currency
}

export type CurrencyFormatOptions = {
  /** Smallest number of fraction digits to show. Defaults to the maximum. */
  minimumFractionDigits?: number
  /** Largest number of fraction digits to show. Money defaults to 2. */
  maximumFractionDigits?: number
  /** `'always'` prefixes positive amounts with a plus sign, for inflows. */
  signDisplay?: 'auto' | 'always' | 'never' | 'exceptZero'
}

const formatterCache = new Map<string, Intl.NumberFormat>()

function getFormatter(config: CurrencyConfig, options: CurrencyFormatOptions) {
  const maximumFractionDigits = options.maximumFractionDigits ?? 2
  const minimumFractionDigits = Math.min(
    options.minimumFractionDigits ?? maximumFractionDigits,
    maximumFractionDigits,
  )
  const signDisplay = options.signDisplay ?? 'auto'
  const cacheKey = [
    config.locale,
    config.currency,
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
  ].join('|')

  let formatter = formatterCache.get(cacheKey)

  if (!formatter) {
    formatter = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits,
      maximumFractionDigits,
      signDisplay,
    })
    formatterCache.set(cacheKey, formatter)
  }

  return formatter
}

/**
 * Formats a monetary amount in the currency of the given application
 * language, using `Intl.NumberFormat`. Amounts are demo values: switching
 * the language changes the displayed currency, not the underlying number.
 * Values that are not finite numbers format as zero.
 */
export function formatCurrency(
  amount: number | null | undefined,
  locale: string,
  options: CurrencyFormatOptions = {},
): string {
  const config = getCurrencyConfig(locale)
  const formatter = getFormatter(config, options)
  const safeAmount =
    typeof amount === 'number' && Number.isFinite(amount) ? amount : 0

  return formatter.format(Object.is(safeAmount, -0) ? 0 : safeAmount)
}
