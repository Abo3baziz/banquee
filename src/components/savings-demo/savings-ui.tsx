'use client'

import * as stylex from '@stylexjs/stylex'
import type { LucideIcon } from 'lucide-react'
import {
  Coins,
  Laptop,
  Plane,
  Repeat,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { formatUsd } from '../banking-demo/demo-data'
import type {
  SavingsContributionSource,
  SavingsGoalIcon,
  SavingsGoalTone,
} from './savings-demo-data'
import { savingsStyles } from './savings-styles'

const GOAL_ICONS: Record<SavingsGoalIcon, LucideIcon> = {
  travel: Plane,
  shield: ShieldCheck,
  laptop: Laptop,
}

const SOURCE_ICONS: Record<SavingsContributionSource, LucideIcon> = {
  auto: Repeat,
  manual: Wallet,
  'round-up': Coins,
  interest: TrendingUp,
}

const SOURCE_LABELS: Record<SavingsContributionSource, string> = {
  auto: 'Auto',
  manual: 'Manual',
  'round-up': 'Round-up',
  interest: 'Interest',
}

type SavingsGoalIconProps = {
  icon: SavingsGoalIcon
  tone: SavingsGoalTone
  size?: number
  boxSize?: number
}

export function SavingsGoalIcon({
  icon,
  tone,
  size = 13,
  boxSize = 26,
}: SavingsGoalIconProps) {
  const Icon = GOAL_ICONS[icon]

  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        savingsStyles.goalIcon,
        tone === 'primary' && savingsStyles.goalIconPrimary,
        tone === 'blue' && savingsStyles.goalIconBlue,
        tone === 'purple' && savingsStyles.goalIconPurple,
      )}
      style={{ height: boxSize, width: boxSize }}
    >
      <Icon size={size} strokeWidth={2.2} />
    </span>
  )
}

type SavingsContributionRowProps = {
  label: string
  meta: string
  amount: number
  source: SavingsContributionSource
  showSource?: boolean
}

export function SavingsContributionRow({
  label,
  meta,
  amount,
  source,
  showSource = false,
}: SavingsContributionRowProps) {
  const Icon = SOURCE_ICONS[source]

  return (
    <div {...stylex.props(savingsStyles.contributionRow)}>
      <span
        {...stylex.props(
          savingsStyles.contributionIcon,
          source === 'auto' && savingsStyles.contributionIconAuto,
          source === 'round-up' && savingsStyles.contributionIconRoundUp,
          source === 'manual' && savingsStyles.contributionIconManual,
        )}
      >
        <Icon aria-hidden="true" size={10} strokeWidth={2.3} />
      </span>
      <div {...stylex.props(savingsStyles.contributionBody)}>
        <span {...stylex.props(savingsStyles.contributionLabel)}>{label}</span>
        <span {...stylex.props(savingsStyles.contributionMeta)}>
          {meta}
          {showSource ? ` · ${SOURCE_LABELS[source]}` : ''}
        </span>
      </div>
      <span {...stylex.props(savingsStyles.contributionAmount)}>
        +{formatUsd(amount)}
      </span>
    </div>
  )
}

type SavingsSourceBadgeProps = {
  source: SavingsContributionSource
}

export function SavingsSourceBadge({ source }: SavingsSourceBadgeProps) {
  return (
    <span
      {...stylex.props(
        savingsStyles.sourceBadge,
        source === 'auto' && savingsStyles.sourceBadgeAuto,
      )}
    >
      {SOURCE_LABELS[source]}
    </span>
  )
}
