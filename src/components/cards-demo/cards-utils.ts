import type {
  DemoCard,
  DemoCardKind,
  DemoCardLimit,
  DemoCardStatus,
} from '../../data/cards-demo-data'

export type LimitId = 'daily' | 'monthly'

export type LimitRow = {
  id: LimitId
  label: string
  limit: number
  spent: number
  remaining: number
  progress: number
  percentLabel: string
}

export type LimitOverrides = Partial<Record<LimitId, number>>

const MASKED_GROUP = '••••'

/** Remaining amount, floored at zero so over-limit usage stays readable. */
export function getRemainingAmount(limit: number, spent: number): number {
  return Math.max(0, limit - spent)
}

/** Usage as a percentage between 0 and 100, safe for a zero limit. */
export function getLimitProgress(limit: number, spent: number): number {
  if (limit <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, (spent / limit) * 100))
}

/** Compact one-decimal percentage with trailing `.0` removed. */
export function formatPercent(value: number): string {
  return `${Number(value.toFixed(1))}%`
}

export function formatMaskedCardNumber(lastFour: string): string {
  return `${MASKED_GROUP} ${MASKED_GROUP} ${MASKED_GROUP} ${lastFour}`
}

/** Partially masked number used by the Add Card review screen. */
export function formatReviewCardNumber(
  firstFour: string,
  lastFour: string,
): string {
  return `${firstFour} ${MASKED_GROUP} ${MASKED_GROUP} ${lastFour}`
}

/** Groups a typed card number into blocks of four while it is entered. */
export function formatCardNumberInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  const groups = digits.match(/.{1,4}/g)

  return groups ? groups.join(' ') : ''
}

/** Expands the short `MM/YY` display value to `MM/YYYY` for review rows. */
export function formatExpiryLong(expiry: string): string {
  const [month, year] = expiry.split('/')

  if (!month || !year) {
    return expiry
  }

  return `${month}/20${year}`
}

export function getCardTypeLabel(kind: DemoCardKind): string {
  return kind === 'credit' ? 'Credit Card' : 'Debit Card'
}

export function getCardStatusLabel(status: DemoCardStatus): string {
  return status === 'frozen' ? 'Frozen' : 'Active'
}

function getLimitRow(
  id: LimitId,
  label: string,
  data: DemoCardLimit,
  limitOverride?: number,
): LimitRow {
  const limit = limitOverride ?? data.limit
  const remaining = getRemainingAmount(limit, data.spent)
  const progress = getLimitProgress(limit, data.spent)

  return {
    id,
    label,
    limit,
    spent: data.spent,
    remaining,
    progress,
    percentLabel: formatPercent(progress),
  }
}

export function getLimitRows(
  card: DemoCard,
  overrides: LimitOverrides = {},
): LimitRow[] {
  return [
    getLimitRow(
      'daily',
      'Daily Spending Limit',
      card.dailyLimit,
      overrides.daily,
    ),
    getLimitRow(
      'monthly',
      'Monthly Spending Limit',
      card.monthlyLimit,
      overrides.monthly,
    ),
  ]
}

export function getLimitRowById(
  card: DemoCard,
  id: LimitId,
  overrides: LimitOverrides = {},
): LimitRow {
  const row = getLimitRows(card, overrides).find((item) => item.id === id)

  if (!row) {
    throw new Error(`Unknown limit row: ${id}`)
  }

  return row
}
