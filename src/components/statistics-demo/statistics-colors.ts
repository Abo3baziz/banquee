import { colors } from '../../styles/tokens.stylex'
import type { StatisticsCategoryId } from './statistics-demo-data'

/*
 * Category colors live outside the demo data module so the data stays free of
 * StyleX token imports and can be used by the unit tests without the compiler.
 */
const CATEGORY_COLORS: Record<StatisticsCategoryId, string> = {
  shopping: colors.primary,
  food: colors.primaryContainer,
  transportation: colors.outline,
  entertainment: colors.tertiaryContainer,
  bills: colors.secondary,
  healthcare: colors.tertiary,
}

export function getCategoryColor(id: StatisticsCategoryId): string {
  return CATEGORY_COLORS[id]
}
