'use client'

import * as stylex from '@stylexjs/stylex'
import {
  Car,
  Clapperboard,
  HeartPulse,
  ReceiptText,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { formatUsd } from '../banking-demo/demo-data'
import {
  type StatisticsCategory,
  type StatisticsCategoryId,
  type StatisticsTransaction,
  getCategoryLabel,
} from './statistics-demo-data'
import { getCategoryColor } from './statistics-colors'
import { ProgressBar } from './statistics-charts'
import { statisticsStyles } from './statistics-styles'
import { type BudgetStatus, formatPercent } from './statistics-utils'

const CATEGORY_ICONS: Record<StatisticsCategoryId, LucideIcon> = {
  shopping: ShoppingBag,
  food: UtensilsCrossed,
  transportation: Car,
  entertainment: Clapperboard,
  bills: ReceiptText,
  healthcare: HeartPulse,
}

const STATUS_LABELS: Record<BudgetStatus, string> = {
  'on-track': 'On track',
  approaching: 'Approaching limit',
  over: 'Over budget',
}

type CategoryIconProps = {
  id: StatisticsCategoryId
  size?: number
}

export function CategoryIcon({ id, size = 11 }: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[id]

  return <Icon aria-hidden="true" size={size} strokeWidth={2.2} />
}

type PeriodTabsProps = {
  periods: readonly { id: string; label: string }[]
  activeIndex: number
}

export function PeriodTabs({ periods, activeIndex }: PeriodTabsProps) {
  return (
    <div {...stylex.props(statisticsStyles.periodTabs)}>
      {periods.map((period, index) => {
        const isActive = index === activeIndex

        return (
          <span
            key={period.id}
            {...stylex.props(
              statisticsStyles.periodTab,
              isActive && statisticsStyles.periodTabActive,
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="statistics-period-active"
                {...stylex.props(statisticsStyles.periodPill)}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span {...stylex.props(statisticsStyles.periodTabLabel)}>
              {period.label}
            </span>
          </span>
        )
      })}
    </div>
  )
}

type CategoryBarRowProps = {
  category: StatisticsCategory
  amount: number
  share: number
  delay?: number
}

export function CategoryBarRow({
  category,
  amount,
  share,
  delay = 0,
}: CategoryBarRowProps) {
  return (
    <div {...stylex.props(statisticsStyles.categoryRow)}>
      <div {...stylex.props(statisticsStyles.categoryHead)}>
        <div {...stylex.props(statisticsStyles.categoryIdentity)}>
          <span
            {...stylex.props(statisticsStyles.categoryIcon)}
            style={{ color: getCategoryColor(category.id) }}
          >
            <CategoryIcon id={category.id} />
          </span>
          <span {...stylex.props(statisticsStyles.categoryLabel)}>
            {category.label}
          </span>
        </div>
        <div {...stylex.props(statisticsStyles.categoryFigures)}>
          <span {...stylex.props(statisticsStyles.categoryShare)}>
            {formatPercent(share)}
          </span>
          <span {...stylex.props(statisticsStyles.categoryAmount)}>
            {formatUsd(amount)}
          </span>
        </div>
      </div>
      <ProgressBar
        value={share}
        color={getCategoryColor(category.id)}
        delay={delay}
      />
    </div>
  )
}

type StatusChipProps = {
  status: BudgetStatus
}

export function StatusChip({ status }: StatusChipProps) {
  return (
    <span
      {...stylex.props(
        statisticsStyles.statusChip,
        status === 'on-track' && statisticsStyles.statusOnTrack,
        status === 'approaching' && statisticsStyles.statusApproaching,
        status === 'over' && statisticsStyles.statusOver,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

type TransactionRowProps = {
  transaction: StatisticsTransaction
  delay?: number
  showCategory?: boolean
}

export function TransactionRow({
  transaction,
  delay = 0,
  showCategory = false,
}: TransactionRowProps) {
  const meta = showCategory
    ? `${getCategoryLabel(transaction.category)} · ${transaction.date}`
    : `${transaction.date} · ${transaction.meta}`

  return (
    <motion.div
      {...stylex.props(statisticsStyles.transactionRow)}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.1, 0.8, 0.2, 1] }}
    >
      <span {...stylex.props(statisticsStyles.transactionIcon)}>
        <CategoryIcon id={transaction.category} size={11} />
      </span>
      <div {...stylex.props(statisticsStyles.transactionBody)}>
        <div {...stylex.props(statisticsStyles.transactionMerchant)}>
          {transaction.merchant}
        </div>
        <div {...stylex.props(statisticsStyles.transactionMeta)}>{meta}</div>
      </div>
      <span {...stylex.props(statisticsStyles.transactionAmount)}>
        -{formatUsd(transaction.amount)}
      </span>
    </motion.div>
  )
}
