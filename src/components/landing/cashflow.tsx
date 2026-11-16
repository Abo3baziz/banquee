import * as stylex from '@stylexjs/stylex'
import { Check, TrendingDown, TrendingUp } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

type ChartEntry = {
  earnings: number
  expenses: number
}

const YEAR_CHART: ChartEntry[] = [
  { earnings: 64, expenses: 36 },
  { earnings: 82, expenses: 55 },
  { earnings: 73, expenses: 45 },
  { earnings: 91, expenses: 64 },
  { earnings: 100, expenses: 73 },
  { earnings: 82, expenses: 41 },
]

const styles = stylex.create({
  section: {
    marginInline: 'auto',
    paddingBlock: spacing.xl,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  grid: {
    gap: spacing.xl,
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
  },
  cardColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 7',
    },
    minWidth: 0,
  },
  featureColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 5',
    },
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  card: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 48rem)': spacing.xl,
    },
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  cardHeader: {
    gap: spacing.md,
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 40rem)': 'center',
    },
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 40rem)': 'row',
    },
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.onSurfaceVariant,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 48rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginTop: spacing.xs,
  },
  periodSwitch: {
    padding: '0.25rem',
    borderRadius: radii.md,
    gap: spacing.xs,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    display: 'inline-flex',
    flexShrink: 0,
  },
  periodOption: {
    borderRadius: radii.sm,
    paddingBlock: '0.25rem',
    paddingInline: spacing.md,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    whiteSpace: 'nowrap',
  },
  periodOptionActive: {
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    color: colors.onSurface,
    fontWeight: 600,
  },
  metrics: {
    gap: spacing.md,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    marginBottom: spacing.lg,
  },
  metric: {
    padding: spacing.md,
    borderRadius: radii.md,
  },
  inflowMetric: {
    backgroundColor: colors.primaryTint,
  },
  outflowMetric: {
    backgroundColor: 'rgba(241, 223, 223, 0.45)',
  },
  metricLabel: {
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
  inflowLabel: {
    color: colors.primary,
  },
  outflowLabel: {
    color: colors.tertiary,
  },
  metricValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.6875rem',
    whiteSpace: 'nowrap',
    marginTop: spacing.xs,
  },
  metricBadge: {
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1rem',
    marginTop: spacing.xs,
  },
  inflowBadge: {
    color: colors.primary,
  },
  outflowBadge: {
    color: colors.secondary,
  },
  badgeIcon: {
    display: 'inline-block',
    marginInlineEnd: spacing.xs,
    verticalAlign: '-0.125rem',
  },
  chart: {
    gap: spacing.sm,
    paddingInline: spacing.xs,
    display: 'flex',
    height: '12.5rem',
    paddingTop: spacing.md,
  },
  barGroup: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
    height: '100%',
    minWidth: 0,
  },
  bars: {
    gap: '0.375rem',
    alignItems: 'flex-end',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  bar: {
    display: 'block',
    transitionDuration: '200ms',
    transitionProperty: 'background-color',
    borderTopLeftRadius: radii.sm,
    borderTopRightRadius: radii.sm,
    minHeight: '0.5rem',
    width: {
      default: '0.75rem',
      '@media (min-width: 48rem)': '1.25rem',
    },
  },
  earningsBar: {
    backgroundColor: {
      default: colors.primaryContainer,
      ':hover': colors.primary,
    },
  },
  activeEarningsBar: {
    backgroundColor: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
  },
  expensesBar: {
    backgroundColor: {
      default: colors.errorContainer,
      ':hover': colors.tertiaryContainer,
    },
  },
  activeExpensesBar: {
    backgroundColor: colors.tertiaryContainer,
  },
  monthLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
  activeMonthLabel: {
    color: colors.primary,
    fontWeight: 700,
  },
  legend: {
    gap: spacing.sm,
    columnGap: spacing.lg,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: spacing.xs,
    borderTopColor: 'rgba(217, 217, 217, 0.4)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  legendItem: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
  },
  legendDot: {
    borderRadius: radii.full,
    height: '0.75rem',
    width: '0.75rem',
  },
  earningsDot: {
    backgroundColor: colors.primary,
  },
  expensesDot: {
    backgroundColor: colors.tertiaryContainer,
  },
  legendLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
  featureTag: {
    color: colors.primary,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  featureTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 48rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    textWrap: 'balance',
    marginBottom: spacing.md,
  },
  featureDescription: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: spacing.lg,
  },
  bullets: {
    gap: spacing.md,
    display: 'flex',
    flexDirection: 'column',
  },
  bullet: {
    gap: spacing.md,
    alignItems: 'flex-start',
    display: 'flex',
  },
  bulletIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '2rem',
    marginTop: '0.125rem',
    width: '2rem',
  },
  bulletBody: {
    minWidth: 0,
  },
  bulletTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '1.5rem',
  },
  bulletDescription: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
})

export async function Cashflow() {
  const [t, locale] = await Promise.all([
    getTranslations('landing'),
    getLocale(),
  ])

  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    timeZone: 'UTC',
  })

  const months = YEAR_CHART.map((_, index) =>
    monthFormatter.format(new Date(Date.UTC(2025, index, 1))),
  )

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.cardColumn)}>
          <Reveal>
            <div {...stylex.props(styles.card)}>
              <div {...stylex.props(styles.cardHeader)}>
                <div>
                  <span {...stylex.props(styles.eyebrow)}>
                    {t('cashflow.eyebrow')}
                  </span>
                  <h2 {...stylex.props(styles.title)}>{t('cashflow.title')}</h2>
                </div>
                <div {...stylex.props(styles.periodSwitch)}>
                  <span
                    {...stylex.props(
                      styles.periodOption,
                      styles.periodOptionActive,
                    )}
                  >
                    {t('cashflow.periodYear')}
                  </span>
                  <span {...stylex.props(styles.periodOption)}>
                    {t('cashflow.periodMonth')}
                  </span>
                </div>
              </div>

              <div {...stylex.props(styles.metrics)}>
                <div {...stylex.props(styles.metric, styles.inflowMetric)}>
                  <span
                    {...stylex.props(styles.metricLabel, styles.inflowLabel)}
                  >
                    {t('cashflow.totalInflowLabel')}
                  </span>
                  <div {...stylex.props(styles.metricValue)}>
                    {t('cashflow.totalInflowValue')}
                  </div>
                  <div
                    {...stylex.props(styles.metricBadge, styles.inflowBadge)}
                  >
                    <TrendingUp
                      aria-hidden="true"
                      size={16}
                      {...stylex.props(styles.badgeIcon)}
                    />
                    <span>{t('cashflow.totalInflowBadge')}</span>
                  </div>
                </div>
                <div {...stylex.props(styles.metric, styles.outflowMetric)}>
                  <span
                    {...stylex.props(styles.metricLabel, styles.outflowLabel)}
                  >
                    {t('cashflow.totalOutflowLabel')}
                  </span>
                  <div {...stylex.props(styles.metricValue)}>
                    {t('cashflow.totalOutflowValue')}
                  </div>
                  <div
                    {...stylex.props(styles.metricBadge, styles.outflowBadge)}
                  >
                    <TrendingDown
                      aria-hidden="true"
                      size={16}
                      {...stylex.props(styles.badgeIcon)}
                    />
                    <span>{t('cashflow.totalOutflowBadge')}</span>
                  </div>
                </div>
              </div>

              <div
                role="img"
                aria-label={`${t('cashflow.chartLegend.earnings')}. ${t('cashflow.chartLegend.expenses')}.`}
                {...stylex.props(styles.chart)}
              >
                {YEAR_CHART.map((entry, index) => {
                  const isActive = index === YEAR_CHART.length - 1

                  return (
                    <div key={months[index]} {...stylex.props(styles.barGroup)}>
                      <div {...stylex.props(styles.bars)}>
                        <span
                          style={{ height: `${entry.earnings}%` }}
                          {...stylex.props(
                            styles.bar,
                            isActive
                              ? styles.activeEarningsBar
                              : styles.earningsBar,
                          )}
                        />
                        <span
                          style={{ height: `${entry.expenses}%` }}
                          {...stylex.props(
                            styles.bar,
                            isActive
                              ? styles.activeExpensesBar
                              : styles.expensesBar,
                          )}
                        />
                      </div>
                      <span
                        {...stylex.props(
                          styles.monthLabel,
                          isActive && styles.activeMonthLabel,
                        )}
                      >
                        {months[index]}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div {...stylex.props(styles.legend)}>
                <div {...stylex.props(styles.legendItem)}>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.legendDot, styles.earningsDot)}
                  />
                  <span {...stylex.props(styles.legendLabel)}>
                    {t('cashflow.chartLegend.earnings')}
                  </span>
                </div>
                <div {...stylex.props(styles.legendItem)}>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.legendDot, styles.expensesDot)}
                  />
                  <span {...stylex.props(styles.legendLabel)}>
                    {t('cashflow.chartLegend.expenses')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div {...stylex.props(styles.featureColumn)}>
          <Reveal delay={0.1}>
            <span {...stylex.props(styles.featureTag)}>
              {t('cashflow.featureTag')}
            </span>
            <h2 {...stylex.props(styles.featureTitle)}>
              {t('cashflow.featureTitle')}
            </h2>
            <p {...stylex.props(styles.featureDescription)}>
              {t('cashflow.featureDescription')}
            </p>
            <div {...stylex.props(styles.bullets)}>
              <div {...stylex.props(styles.bullet)}>
                <span {...stylex.props(styles.bulletIcon)}>
                  <Check aria-hidden="true" size={18} />
                </span>
                <div {...stylex.props(styles.bulletBody)}>
                  <h3 {...stylex.props(styles.bulletTitle)}>
                    {t('cashflow.bullet1Title')}
                  </h3>
                  <p {...stylex.props(styles.bulletDescription)}>
                    {t('cashflow.bullet1Desc')}
                  </p>
                </div>
              </div>
              <div {...stylex.props(styles.bullet)}>
                <span {...stylex.props(styles.bulletIcon)}>
                  <Check aria-hidden="true" size={18} />
                </span>
                <div {...stylex.props(styles.bulletBody)}>
                  <h3 {...stylex.props(styles.bulletTitle)}>
                    {t('cashflow.bullet2Title')}
                  </h3>
                  <p {...stylex.props(styles.bulletDescription)}>
                    {t('cashflow.bullet2Desc')}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
