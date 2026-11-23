import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Check, X } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import {
  COMPARE_CARDS,
  formatRate,
  getCompareSections,
  type CompareValue,
} from './compare-data'
import { formatCurrency, getCurrencyCode } from '@/i18n/currency'

const styles = stylex.create({
  section: {
    paddingBlock: spacing.xl,
    width: '100%',
  },
  container: {
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  scroll: {
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLight,
    boxShadow:
      '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
    overflowX: 'auto',
  },
  /*
   * The scroll container is a focusable region so keyboard users can pan the
   * table horizontally on small screens (WCAG 2.1.1).
   */
  scrollFocus: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 2,
    },
    outlineStyle: {
      default: 'none',
      ':focus-visible': 'solid',
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 2,
    },
  },
  table: {
    borderCollapse: 'collapse',
    textAlign: 'start',
    minWidth: '64rem',
    width: '100%',
  },
  caption: {
    margin: -1,
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: 1,
    width: 1,
  },
  headLabel: {
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textAlign: 'start',
    textTransform: 'uppercase',
    minWidth: '13rem',
  },
  headCard: {
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    textAlign: 'center',
    minWidth: '15rem',
  },
  headName: {
    color: colors.onSurface,
    display: 'block',
    fontFamily: fonts.heading,
    fontSize: '0.9375rem',
    fontWeight: 700,
    lineHeight: '1.375rem',
  },
  headNumber: {
    color: colors.onSurfaceVariant,
    display: 'block',
    fontFamily: fonts.mono,
    fontSize: '0.6875rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    lineHeight: '1rem',
  },
  categoryCell: {
    paddingBlock: spacing.sm,
    paddingInline: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textAlign: 'start',
    textTransform: 'uppercase',
  },
  bodyRow: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceContainerLow,
    },
    transitionDuration: '150ms',
    transitionProperty: 'background-color',
  },
  rowLabel: {
    paddingBlock: '0.75rem',
    paddingInline: spacing.md,
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textAlign: 'start',
    whiteSpace: 'nowrap',
  },
  valueCell: {
    paddingBlock: '0.75rem',
    paddingInline: spacing.md,
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    textAlign: 'center',
  },
  cellLast: {
    borderBlockEndWidth: 0,
  },
  premiumCell: {
    backgroundColor: colors.primaryTint,
  },
  included: {
    gap: '0.375rem',
    alignItems: 'center',
    color: colors.onSurface,
    display: 'inline-flex',
    fontWeight: 600,
  },
  includedIcon: {
    color: colors.primary,
    flexShrink: 0,
  },
  dimmed: {
    color: 'rgba(62, 73, 70, 0.8)',
  },
  footnote: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    lineHeight: '1.125rem',
    marginBlockStart: spacing.sm,
    marginBottom: 0,
  },
  disclaimer: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    lineHeight: '1rem',
    marginBlockStart: spacing.xs,
    opacity: 0.75,
    marginBottom: 0,
  },
  visuallyHidden: {
    margin: -1,
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: 1,
    width: 1,
  },
})

export async function ComparisonTable() {
  const [t, locale] = await Promise.all([
    getTranslations('compareCards'),
    getLocale(),
  ])
  const sections = getCompareSections()
  const premiumIndex = COMPARE_CARDS.findIndex(
    (card) => card.tier === 'premium',
  )

  const renderValue = (value: CompareValue): ReactNode => {
    switch (value.kind) {
      case 'text':
        return /[0-9•]/.test(value.value) ? (
          <span dir="ltr">{value.value}</span>
        ) : (
          value.value
        )
      case 'enum':
        return t(`table.values.${value.value}`)
      case 'money':
        return formatCurrency(value.value, locale, { maximumFractionDigits: 0 })
      case 'currencyCode':
        return getCurrencyCode(locale)
      case 'percent':
        return <span dir="ltr">{formatRate(value.value)}</span>
      case 'na':
        return (
          <span {...stylex.props(styles.dimmed)}>{t('table.values.na')}</span>
        )
      case 'supported':
        return (
          <span {...stylex.props(styles.included)}>
            <Check
              aria-hidden="true"
              size={16}
              {...stylex.props(styles.includedIcon)}
            />
            {t('table.values.supported')}
          </span>
        )
      case 'supportedStar':
        return (
          <span {...stylex.props(styles.included)}>
            <Check
              aria-hidden="true"
              size={16}
              {...stylex.props(styles.includedIcon)}
            />
            {`${t('table.values.supported')}*`}
          </span>
        )
      case 'notIncluded':
        return (
          <span {...stylex.props(styles.included, styles.dimmed)}>
            <X
              aria-hidden="true"
              size={16}
              {...stylex.props(styles.includedIcon, styles.dimmed)}
            />
            {t('table.values.notIncluded')}
          </span>
        )
      case 'equipped':
        return (
          <span {...stylex.props(styles.included)}>
            <Check
              aria-hidden="true"
              size={16}
              {...stylex.props(styles.includedIcon)}
            />
            {t('table.values.equipped')}
          </span>
        )
      case 'points':
        return t('table.values.points', { count: value.value })
      case 'visits':
        return t('table.values.visits', { count: value.value })
      case 'upToDays':
        return t('table.values.upToDays', { count: value.value })
      default: {
        const exhaustive: never = value
        return exhaustive
      }
    }
  }

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <h2 {...stylex.props(styles.visuallyHidden)}>
          {t('table.sectionTitle')}
        </h2>
        <div
          role="region"
          aria-label={t('table.caption')}
          tabIndex={0}
          {...stylex.props(styles.scroll, styles.scrollFocus)}
        >
          <table {...stylex.props(styles.table)}>
            <caption {...stylex.props(styles.caption)}>
              {t('table.caption')}
            </caption>
            <thead>
              <tr>
                <th scope="col" {...stylex.props(styles.headLabel)}>
                  {t('table.headers.features')}
                </th>
                {COMPARE_CARDS.map((card, index) => (
                  <th
                    key={card.id}
                    scope="col"
                    {...stylex.props(
                      styles.headCard,
                      index === premiumIndex && styles.premiumCell,
                    )}
                  >
                    <span {...stylex.props(styles.headName)}>
                      {card.networkLabel}
                    </span>
                    <span dir="ltr" {...stylex.props(styles.headNumber)}>
                      •••• {card.lastFour}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            {sections.map((section, sectionIndex) => {
              const isLastSection = sectionIndex === sections.length - 1

              return (
                <tbody key={section.id}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={COMPARE_CARDS.length + 1}
                      {...stylex.props(styles.categoryCell)}
                    >
                      {t(`table.categories.${section.id}`)}
                    </th>
                  </tr>
                  {section.rows.map((row, rowIndex) => {
                    const isLastRow =
                      isLastSection && rowIndex === section.rows.length - 1

                    return (
                      <tr key={row.id} {...stylex.props(styles.bodyRow)}>
                        <th
                          scope="row"
                          {...stylex.props(
                            styles.rowLabel,
                            isLastRow && styles.cellLast,
                          )}
                        >
                          {t(`table.rows.${row.id}`, {
                            currency: getCurrencyCode(locale),
                          })}
                        </th>
                        {row.values.map((value, index) => (
                          <td
                            key={`${row.id}-${index}`}
                            {...stylex.props(
                              styles.valueCell,
                              index === premiumIndex && styles.premiumCell,
                              isLastRow && styles.cellLast,
                            )}
                          >
                            {renderValue(value)}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              )
            })}
          </table>
        </div>
        <p {...stylex.props(styles.footnote)}>{t('table.footnote')}</p>
        <p {...stylex.props(styles.disclaimer)}>{t('table.disclaimer')}</p>
      </div>
    </section>
  )
}
