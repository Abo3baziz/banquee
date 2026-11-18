import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'
import {
  COMPARE_CARDS,
  getCompareSections,
  type CompareValue,
} from './compare-data'

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
  unavailable: {
    color: 'rgba(62, 73, 70, 0.6)',
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
  const t = await getTranslations('compareCards')
  const sections = getCompareSections()
  const premiumIndex = COMPARE_CARDS.findIndex(
    (card) => card.tier === 'premium',
  )

  const renderValue = (value: CompareValue): ReactNode => {
    switch (value.kind) {
      case 'text':
        return /[0-9.]/.test(value.value) ? (
          <span dir="ltr">{value.value}</span>
        ) : (
          value.value
        )
      case 'cardType':
      case 'tier':
      case 'status':
        return t(`table.values.${value.value}`)
      case 'money':
        return <span dir="ltr">{formatUsd(value.value)}</span>
      case 'included':
        return (
          <span {...stylex.props(styles.included)}>
            <Check
              aria-hidden="true"
              size={16}
              {...stylex.props(styles.includedIcon)}
            />
            {t('table.values.included')}
          </span>
        )
      case 'unavailable':
        return (
          <span {...stylex.props(styles.unavailable)}>
            {t('table.values.notAvailable')}
          </span>
        )
    }
  }

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <h2 {...stylex.props(styles.visuallyHidden)}>
          {t('table.sectionTitle')}
        </h2>
        <div {...stylex.props(styles.scroll)}>
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
                          {t(`table.rows.${row.id}`)}
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
      </div>
    </section>
  )
}
