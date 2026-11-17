import * as stylex from '@stylexjs/stylex'
import {
  Brain,
  ChartColumn,
  ChartLine,
  ChartPie,
  CreditCard,
  Flag,
  ReceiptText,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

type FeatureItem = {
  title: string
  description: string
  icon: LucideIcon
}

type FeatureRowProps = {
  eyebrow: string
  title: string
  description: string
  items: FeatureItem[]
  reversed?: boolean
  background: 'white' | 'surface'
}

const styles = stylex.create({
  section: {
    width: '100%',
  },
  white: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  surface: {
    backgroundColor: colors.surface,
  },
  container: {
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
    gap: {
      default: spacing.xl,
      '@media (min-width: 64rem)': '4rem',
    },
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
  },
  copyColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    display: 'flex',
    flexDirection: 'column',
    order: 1,
    minWidth: 0,
  },
  copyColumnReversed: {
    order: {
      '@media (min-width: 64rem)': 2,
    },
  },
  visualColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 6',
    },
    display: 'flex',
    justifyContent: 'center',
    order: 2,
    minWidth: 0,
  },
  visualColumnReversed: {
    order: {
      '@media (min-width: 64rem)': 1,
    },
  },
  /*
   * The phone mockups shown in this area are implemented separately.
   * Keep the slot reserved so adding them later does not shift the layout.
   */
  visualSlot: {
    maxWidth: '20.9375rem',
    minHeight: {
      default: 0,
      '@media (min-width: 64rem)': '36.25rem',
    },
    width: '100%',
  },
  badge: {
    borderRadius: radii.full,
    gap: spacing.sm,
    paddingBlock: '0.375rem',
    paddingInline: '0.75rem',
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.md,
  },
  badgeDot: {
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    flexShrink: 0,
    height: 6,
    width: 6,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 600,
    letterSpacing: '0.025em',
    lineHeight: '1.125rem',
  },
  headline: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.875rem',
      '@media (min-width: 40rem)': '2.25rem',
      '@media (min-width: 64rem)': '3rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.12,
    textWrap: 'balance',
    marginBottom: spacing.md,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    marginBottom: spacing.xl,
  },
  items: {
    gap: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    padding: '0.875rem',
    borderRadius: radii.lg,
    gap: spacing.md,
    alignItems: 'flex-start',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surface,
    },
    display: 'flex',
    transitionDuration: '200ms',
    transitionProperty: 'background-color',
  },
  itemIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '2.75rem',
    width: '2.75rem',
  },
  itemBody: {
    minWidth: 0,
  },
  itemTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  itemDescription: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    marginTop: '0.125rem',
  },
})

function FeatureRow({
  eyebrow,
  title,
  description,
  items,
  reversed = false,
  background,
}: FeatureRowProps) {
  return (
    <section
      {...stylex.props(
        styles.section,
        background === 'white' ? styles.white : styles.surface,
      )}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid)}>
          <div
            {...stylex.props(
              styles.copyColumn,
              reversed && styles.copyColumnReversed,
            )}
          >
            <Reveal>
              <div {...stylex.props(styles.badge)}>
                <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
                <span {...stylex.props(styles.badgeText)}>{eyebrow}</span>
              </div>
              <h2 {...stylex.props(styles.headline)}>{title}</h2>
              <p {...stylex.props(styles.description)}>{description}</p>
              <div {...stylex.props(styles.items)}>
                {items.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} {...stylex.props(styles.item)}>
                      <span {...stylex.props(styles.itemIcon)}>
                        <Icon aria-hidden="true" size={22} />
                      </span>
                      <div {...stylex.props(styles.itemBody)}>
                        <h3 {...stylex.props(styles.itemTitle)}>
                          {item.title}
                        </h3>
                        <p {...stylex.props(styles.itemDescription)}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          <div
            {...stylex.props(
              styles.visualColumn,
              reversed && styles.visualColumnReversed,
            )}
          >
            <Reveal delay={0.1}>
              <div aria-hidden="true" {...stylex.props(styles.visualSlot)} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function FeaturesSections() {
  const t = await getTranslations('featuresPage')

  const rows: FeatureRowProps[] = [
    {
      eyebrow: t('featureSendReceive.eyebrow'),
      title: t('featureSendReceive.title'),
      description: t('featureSendReceive.description'),
      background: 'white',
      items: [
        {
          title: t('featureSendReceive.items.transfersTitle'),
          description: t('featureSendReceive.items.transfersDesc'),
          icon: Zap,
        },
        {
          title: t('featureSendReceive.items.paymentsTitle'),
          description: t('featureSendReceive.items.paymentsDesc'),
          icon: ShieldCheck,
        },
        {
          title: t('featureSendReceive.items.historyTitle'),
          description: t('featureSendReceive.items.historyDesc'),
          icon: ReceiptText,
        },
      ],
    },
    {
      eyebrow: t('featureManageCards.eyebrow'),
      title: t('featureManageCards.title'),
      description: t('featureManageCards.description'),
      background: 'surface',
      reversed: true,
      items: [
        {
          title: t('featureManageCards.items.virtualTitle'),
          description: t('featureManageCards.items.virtualDesc'),
          icon: CreditCard,
        },
        {
          title: t('featureManageCards.items.spendingTitle'),
          description: t('featureManageCards.items.spendingDesc'),
          icon: SlidersHorizontal,
        },
        {
          title: t('featureManageCards.items.paymentsTitle'),
          description: t('featureManageCards.items.paymentsDesc'),
          icon: Shield,
        },
      ],
    },
    {
      eyebrow: t('featureControlMoney.eyebrow'),
      title: t('featureControlMoney.title'),
      description: t('featureControlMoney.description'),
      background: 'white',
      items: [
        {
          title: t('featureControlMoney.items.insightsTitle'),
          description: t('featureControlMoney.items.insightsDesc'),
          icon: ChartLine,
        },
        {
          title: t('featureControlMoney.items.monthlyTitle'),
          description: t('featureControlMoney.items.monthlyDesc'),
          icon: ChartColumn,
        },
        {
          title: t('featureControlMoney.items.expenseTitle'),
          description: t('featureControlMoney.items.expenseDesc'),
          icon: Target,
        },
      ],
    },
    {
      eyebrow: t('featureOrganizeSavings.eyebrow'),
      title: t('featureOrganizeSavings.title'),
      description: t('featureOrganizeSavings.description'),
      background: 'surface',
      reversed: true,
      items: [
        {
          title: t('featureOrganizeSavings.items.goalsTitle'),
          description: t('featureOrganizeSavings.items.goalsDesc'),
          icon: Flag,
        },
        {
          title: t('featureOrganizeSavings.items.progressTitle'),
          description: t('featureOrganizeSavings.items.progressDesc'),
          icon: ChartPie,
        },
        {
          title: t('featureOrganizeSavings.items.smartPlanningTitle'),
          description: t('featureOrganizeSavings.items.smartPlanningDesc'),
          icon: Brain,
        },
      ],
    },
  ]

  return (
    <>
      {rows.map((row) => (
        <FeatureRow key={row.title} {...row} />
      ))}
    </>
  )
}
