'use client'

import * as stylex from '@stylexjs/stylex'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowDown,
  ArrowRight,
  Car,
  Clapperboard,
  Coffee,
  Fuel,
  Info,
  Laptop,
  Landmark,
  Repeat,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors } from '../../styles/tokens.stylex'
import { DEMO_ACCOUNT, formatUsd } from '../banking-demo/demo-data'
import type { DemoSequenceStage } from '../banking-demo/demo-sequence'
import { demoStyles } from '../banking-demo/demo-styles'
import { DemoTapIndicator } from '../banking-demo/demo-tap-indicator'
import { DemoChip, DemoHeader, DemoScreen } from '../banking-demo/demo-ui'
import { useDelayedFlag } from '../banking-demo/use-delayed-flag'
import { useDemoSequence } from '../banking-demo/use-demo-sequence'
import { MonthlyBars, SavingsProgressBar } from './savings-charts'
import {
  DEMO_ROUND_UP_PURCHASE_ID,
  SPARE_CHANGE_HISTORY,
  SPARE_CHANGE_NOTE,
  SPARE_CHANGE_PURCHASES,
  SPARE_CHANGE_SETTINGS,
  SUMMER_VACATION_GOAL,
  type SpareChangeIcon,
  type SpareChangePurchase,
} from './savings-demo-data'
import { savingsStyles } from './savings-styles'
import {
  formatMonthYear,
  formatSavingsPercent,
  getAverageMonthlySpareChange,
  getGoalProgress,
  getRoundUpEntry,
  getSpareChangeAnnualProjection,
  getSpareChangeMonths,
  sumMonthlySpareChange,
} from './savings-utils'
import { SavingsGoalIcon } from './savings-ui'

type SmartSavingsStage = 'overview' | 'roundUp' | 'activity' | 'summary'

const SMART_SAVINGS_STAGES: readonly DemoSequenceStage<SmartSavingsStage>[] = [
  { id: 'overview', duration: 5600 },
  { id: 'roundUp', duration: 6200 },
  { id: 'activity', duration: 6000 },
  { id: 'summary', duration: 6000 },
]

const PURCHASE_ICONS: Record<SpareChangeIcon, LucideIcon> = {
  coffee: Coffee,
  groceries: ShoppingBag,
  transport: Car,
  streaming: Clapperboard,
  shopping: ShoppingBag,
  tech: Laptop,
  fuel: Fuel,
}

type SmartSavingsDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function SmartSavingsDemo({
  paused,
  reducedMotion,
}: SmartSavingsDemoProps) {
  const { stage } = useDemoSequence(SMART_SAVINGS_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait">
      {stage === 'overview' ? <SmartOverview key="overview" /> : null}
      {stage === 'roundUp' ? <RoundUpInAction key="round-up" /> : null}
      {stage === 'activity' ? <SpareChangeActivity key="activity" /> : null}
      {stage === 'summary' ? <SmartSummary key="summary" /> : null}
    </AnimatePresence>
  )
}

function SmartOverview() {
  const months = getSpareChangeMonths(SPARE_CHANGE_PURCHASES)
  const total = sumMonthlySpareChange(months)
  const currentMonth = months[months.length - 1]?.amount ?? 0
  const destination = SUMMER_VACATION_GOAL
  const destinationProgress = getGoalProgress(
    destination.target,
    destination.saved,
  )
  const recent = SPARE_CHANGE_PURCHASES.slice(0, 4)

  return (
    <DemoScreen>
      <DemoHeader title="Smart Savings" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.heroCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(savingsStyles.heroLabel)}>
              Spare Change Saved
            </span>
            <DemoChip>
              <Repeat aria-hidden="true" size={9} />
              Round-ups on
            </DemoChip>
          </div>
          <span {...stylex.props(savingsStyles.heroValue)}>
            {formatUsd(total)}
          </span>
          <span {...stylex.props(savingsStyles.heroSub)}>
            +{formatUsd(currentMonth)} this month from{' '}
            {SPARE_CHANGE_PURCHASES.length} purchases
          </span>
        </div>

        <div {...stylex.props(savingsStyles.accountRow)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <Landmark aria-hidden="true" size={12} />
          </span>
          <div {...stylex.props(savingsStyles.accountBody)}>
            <span {...stylex.props(savingsStyles.accountName)}>
              Banquee Main Checking (•••• {DEMO_ACCOUNT.last4})
            </span>
            <span {...stylex.props(savingsStyles.accountMeta)}>
              Linked source · Available {formatUsd(DEMO_ACCOUNT.balance)}
            </span>
          </div>
          <span {...stylex.props(savingsStyles.accountTag)}>Source</span>
        </div>

        <div {...stylex.props(savingsStyles.destinationCard)}>
          <SavingsGoalIcon
            icon={destination.icon}
            tone={destination.tone}
            size={13}
          />
          <div {...stylex.props(savingsStyles.destinationBody)}>
            <span {...stylex.props(savingsStyles.destinationTitle)}>
              Destination vault
            </span>
            <span {...stylex.props(savingsStyles.destinationName)}>
              {destination.name}
            </span>
            <span {...stylex.props(savingsStyles.destinationMeta)}>
              {formatUsd(destination.saved)} of {formatUsd(destination.target)}
            </span>
          </div>
          <span {...stylex.props(savingsStyles.destinationValue)}>
            {formatSavingsPercent(destinationProgress)}
          </span>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>
            Recent Contributions
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {SPARE_CHANGE_PURCHASES.length} round-ups
          </span>
        </div>

        <div {...stylex.props(savingsStyles.activityList)}>
          {recent.map((purchase) => (
            <SpareChangeRow key={purchase.id} purchase={purchase} />
          ))}
        </div>

        <div {...stylex.props(savingsStyles.insightCard)}>
          <Info
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(savingsStyles.insightText)}>
            Every eligible card purchase is rounded up. The difference moves
            into your savings goal automatically.
          </span>
        </div>
      </div>
      <DemoTapIndicator x={50} y={44} contactDelay={5.4} />
    </DemoScreen>
  )
}

type SpareChangeRowProps = {
  purchase: SpareChangePurchase
}

function SpareChangeRow({ purchase }: SpareChangeRowProps) {
  const Icon = PURCHASE_ICONS[purchase.icon]
  const entry = getRoundUpEntry(
    purchase.amount,
    SPARE_CHANGE_SETTINGS.increment,
    SPARE_CHANGE_SETTINGS.multiplier,
  )

  return (
    <div {...stylex.props(savingsStyles.activityRow)}>
      <span {...stylex.props(savingsStyles.activityIcon)}>
        <Icon aria-hidden="true" size={11} />
      </span>
      <div {...stylex.props(savingsStyles.activityBody)}>
        <span {...stylex.props(savingsStyles.activityMerchant)}>
          {purchase.merchant}
        </span>
        <span {...stylex.props(savingsStyles.activityMeta)}>
          {purchase.category} · {purchase.when}
        </span>
      </div>
      <div {...stylex.props(savingsStyles.activityFigures)}>
        <span {...stylex.props(savingsStyles.activityOriginal)}>
          {formatUsd(purchase.amount)}
        </span>
        <span {...stylex.props(savingsStyles.activitySaved)}>
          +{formatUsd(entry.saved)}
        </span>
      </div>
    </div>
  )
}

function RoundUpInAction() {
  const purchase = SPARE_CHANGE_PURCHASES.find(
    (item) => item.id === DEMO_ROUND_UP_PURCHASE_ID,
  )
  const destination = SUMMER_VACATION_GOAL
  const hasRounded = useDelayedFlag(850)
  const hasTransferred = useDelayedFlag(2100)

  if (!purchase) {
    return null
  }

  const entry = getRoundUpEntry(
    purchase.amount,
    SPARE_CHANGE_SETTINGS.increment,
    SPARE_CHANGE_SETTINGS.multiplier,
  )
  const updatedSaved = destination.saved + entry.saved
  const updatedProgress = getGoalProgress(destination.target, updatedSaved)
  const ProgressIcon = PURCHASE_ICONS[purchase.icon]

  return (
    <DemoScreen>
      <DemoHeader title="Round-Up in Action" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.caption)}>
            Debit card ·•••• {DEMO_ACCOUNT.last4}
          </span>
          <DemoChip>
            <Sparkles aria-hidden="true" size={9} />
            Live simulation
          </DemoChip>
        </div>

        <div {...stylex.props(savingsStyles.roundUpCard)}>
          <div {...stylex.props(savingsStyles.purchaseRow)}>
            <span {...stylex.props(savingsStyles.purchaseIcon)}>
              <ProgressIcon aria-hidden="true" size={14} />
            </span>
            <div {...stylex.props(savingsStyles.purchaseBody)}>
              <span {...stylex.props(savingsStyles.purchaseMerchant)}>
                {purchase.merchant}
              </span>
              <span {...stylex.props(savingsStyles.purchaseMeta)}>
                {purchase.category} · {purchase.when}
              </span>
            </div>
            <span {...stylex.props(savingsStyles.purchaseAmount)}>
              -{formatUsd(purchase.amount)}
            </span>
          </div>
          <div {...stylex.props(savingsStyles.flowRow)}>
            <motion.span
              {...stylex.props(savingsStyles.flowArrow)}
              animate={hasRounded ? { y: [0, 3, 0] } : { y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowDown aria-hidden="true" size={12} strokeWidth={2.5} />
            </motion.span>
            <motion.span
              key={hasRounded ? 'rounded' : 'pending'}
              {...stylex.props(savingsStyles.flowText)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {hasRounded
                ? `Rounded to ${formatUsd(entry.rounded)}`
                : 'Authorizing purchase...'}
            </motion.span>
          </div>
          <motion.div
            {...stylex.props(savingsStyles.mathRow)}
            initial={{ opacity: 0, y: 6 }}
            animate={hasRounded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div {...stylex.props(savingsStyles.mathStep)}>
              <span {...stylex.props(savingsStyles.mathLabel)}>Original</span>
              <span {...stylex.props(savingsStyles.mathValue)}>
                {formatUsd(entry.amount)}
              </span>
            </div>
            <ArrowRight
              aria-hidden="true"
              size={11}
              {...stylex.props(savingsStyles.mathArrow)}
            />
            <div {...stylex.props(savingsStyles.mathStep)}>
              <span {...stylex.props(savingsStyles.mathLabel)}>Rounded</span>
              <span {...stylex.props(savingsStyles.mathValue)}>
                {formatUsd(entry.rounded)}
              </span>
            </div>
            <ArrowRight
              aria-hidden="true"
              size={11}
              {...stylex.props(savingsStyles.mathArrow)}
            />
            <div {...stylex.props(savingsStyles.mathStep)}>
              <span {...stylex.props(savingsStyles.mathLabel)}>Saved</span>
              <span
                {...stylex.props(
                  savingsStyles.mathValue,
                  savingsStyles.mathValueStrong,
                )}
              >
                +{formatUsd(entry.saved)}
              </span>
            </div>
          </motion.div>
        </div>

        <div {...stylex.props(savingsStyles.flowRow)}>
          <motion.span
            animate={
              hasTransferred ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }
            }
            transition={{
              repeat: hasTransferred ? Infinity : 0,
              duration: 1.4,
            }}
            {...stylex.props(savingsStyles.flowText)}
          >
            {hasTransferred
              ? `${formatUsd(entry.saved)} moved into savings`
              : 'Rounding up for savings'}
          </motion.span>
        </div>

        <motion.div
          {...stylex.props(savingsStyles.destinationCard)}
          animate={
            hasTransferred
              ? {
                  scale: [1, 1.015, 1],
                  boxShadow: `0 0 0 1px ${colors.primaryContainer}`,
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.45 }}
        >
          <SavingsGoalIcon
            icon={destination.icon}
            tone={destination.tone}
            size={13}
          />
          <div {...stylex.props(savingsStyles.destinationBody)}>
            <span {...stylex.props(savingsStyles.destinationTitle)}>
              Destination vault
            </span>
            <span {...stylex.props(savingsStyles.destinationName)}>
              {destination.name}
            </span>
            <span {...stylex.props(savingsStyles.destinationMeta)}>
              {formatUsd(destination.saved)} of {formatUsd(destination.target)}
            </span>
          </div>
          <motion.span
            key={hasTransferred ? 'updated' : 'current'}
            {...stylex.props(savingsStyles.destinationValue)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {hasTransferred
              ? formatUsd(updatedSaved)
              : formatUsd(destination.saved)}
          </motion.span>
        </motion.div>

        <SavingsProgressBar
          value={
            hasTransferred
              ? updatedProgress
              : getGoalProgress(destination.target, destination.saved)
          }
          height={6}
        />
        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.caption)}>
            Summer Vacation progress
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {formatSavingsPercent(
              hasTransferred
                ? updatedProgress
                : getGoalProgress(destination.target, destination.saved),
            )}
          </span>
        </div>

        <div {...stylex.props(savingsStyles.insightCard)}>
          <Info
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(savingsStyles.insightText)}>
            This is a simulated card purchase. No real money moves in this demo.
          </span>
        </div>
      </div>
      <DemoTapIndicator x={50} y={16} contactDelay={0.85} />
    </DemoScreen>
  )
}

function SpareChangeActivity() {
  const months = getSpareChangeMonths(SPARE_CHANGE_PURCHASES)
  const currentMonth = months[months.length - 1]
  const visible = SPARE_CHANGE_PURCHASES.slice(0, 5)

  return (
    <DemoScreen>
      <DemoHeader title="Spare Change Activity" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.totalRow)}>
          <span {...stylex.props(savingsStyles.totalLabel)}>
            {SPARE_CHANGE_PURCHASES.length} round-ups this month
          </span>
          <span {...stylex.props(savingsStyles.totalValue)}>
            +{formatUsd(currentMonth?.amount ?? 0)}
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Monthly Accumulation
            </span>
            <span {...stylex.props(demoStyles.caption)}>Jun – Nov 2026</span>
          </div>
          <MonthlyBars
            bars={months.map((month, index) => ({
              label: month.label,
              amount: month.amount,
              partial: index === months.length - 1,
            }))}
            delay={0.2}
            height={88}
          />
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>
              * Current month to date
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {formatUsd(sumMonthlySpareChange(months))} total
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>
            Round-Up History
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {visible.length} of {SPARE_CHANGE_PURCHASES.length}
          </span>
        </div>

        <div {...stylex.props(savingsStyles.activityList)}>
          {visible.map((purchase) => (
            <SpareChangeRow key={purchase.id} purchase={purchase} />
          ))}
        </div>

        <div {...stylex.props(savingsStyles.contributionRow)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <TrendingUp aria-hidden="true" size={12} />
          </span>
          <div {...stylex.props(savingsStyles.contributionBody)}>
            <span {...stylex.props(savingsStyles.contributionLabel)}>
              View savings summary
            </span>
            <span {...stylex.props(savingsStyles.contributionMeta)}>
              Actual savings and monthly estimates
            </span>
          </div>
          <ArrowRight
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary }}
          />
        </div>
      </div>
      <DemoTapIndicator x={50} y={68} contactDelay={5.8} />
    </DemoScreen>
  )
}

function SmartSummary() {
  const months = getSpareChangeMonths(SPARE_CHANGE_PURCHASES)
  const completedMonths = months.slice(0, -1)
  const total = sumMonthlySpareChange(months)
  const average = getAverageMonthlySpareChange(completedMonths)
  const annual = getSpareChangeAnnualProjection(completedMonths)
  const destination = SUMMER_VACATION_GOAL
  const destinationProgress = getGoalProgress(
    destination.target,
    destination.saved,
  )

  return (
    <DemoScreen>
      <DemoHeader title="Smart Savings Summary" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.heroCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(savingsStyles.heroLabel)}>
              Saved Through Spare Change
            </span>
            <DemoChip>
              <Repeat aria-hidden="true" size={9} />
              Actual
            </DemoChip>
          </div>
          <span {...stylex.props(savingsStyles.heroValue)}>
            {formatUsd(total)}
          </span>
          <span {...stylex.props(savingsStyles.heroSub)}>
            Since{' '}
            {formatMonthYear(
              `${SPARE_CHANGE_HISTORY[0]?.month ?? '2026-06'}-01`,
            )}{' '}
            · {months.length} months of round-ups
          </span>
        </div>

        <div {...stylex.props(savingsStyles.destinationCard)}>
          <SavingsGoalIcon
            icon={destination.icon}
            tone={destination.tone}
            size={13}
          />
          <div {...stylex.props(savingsStyles.destinationBody)}>
            <span {...stylex.props(savingsStyles.destinationTitle)}>
              Destination savings account
            </span>
            <span {...stylex.props(savingsStyles.destinationName)}>
              {destination.name}
            </span>
            <span {...stylex.props(savingsStyles.destinationMeta)}>
              {formatUsd(destination.saved)} of {formatUsd(destination.target)}
            </span>
          </div>
          <span {...stylex.props(savingsStyles.destinationValue)}>
            {formatSavingsPercent(destinationProgress)}
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.row)}>
            <span {...stylex.props(demoStyles.iconCircleSmall)}>
              <Repeat aria-hidden="true" size={12} />
            </span>
            <div {...stylex.props(demoStyles.grow)}>
              <span {...stylex.props(demoStyles.strongText)}>
                Automatic savings
              </span>
              <div {...stylex.props(demoStyles.caption)}>
                Round-ups on · destination {destination.name}
              </div>
            </div>
            <span {...stylex.props(savingsStyles.accountTag)}>Active</span>
          </div>
          <div
            {...stylex.props(demoStyles.divider, savingsStyles.receiptDivider)}
          />
          <div {...stylex.props(savingsStyles.paceRow)}>
            <div {...stylex.props(savingsStyles.paceItem)}>
              <span {...stylex.props(savingsStyles.paceLabel)}>
                Source account
              </span>
              <span {...stylex.props(savingsStyles.paceValue)}>
                Main Checking · {DEMO_ACCOUNT.last4}
              </span>
            </div>
            <div {...stylex.props(savingsStyles.paceItem)}>
              <span {...stylex.props(savingsStyles.paceLabel)}>Weekly cap</span>
              <span {...stylex.props(savingsStyles.paceValue)}>
                {formatUsd(SPARE_CHANGE_SETTINGS.weeklyCap)}
              </span>
            </div>
          </div>
        </div>

        <div
          {...stylex.props(
            savingsStyles.projectionCard,
            savingsStyles.projectionCardEstimate,
          )}
        >
          <div {...stylex.props(savingsStyles.projectionHead)}>
            <span {...stylex.props(savingsStyles.previewLabel)}>
              Projected Savings
            </span>
            <DemoChip tone="neutral">
              <TrendingUp aria-hidden="true" size={9} />
              Estimate
            </DemoChip>
          </div>
          <div {...stylex.props(savingsStyles.projectionGrid)}>
            <div {...stylex.props(savingsStyles.projectionCell)}>
              <span {...stylex.props(savingsStyles.projectionLabel)}>
                Estimated monthly
              </span>
              <span
                {...stylex.props(
                  savingsStyles.projectionValue,
                  savingsStyles.projectionValueEstimate,
                )}
              >
                {formatUsd(average)}
              </span>
            </div>
            <div {...stylex.props(savingsStyles.projectionCell)}>
              <span {...stylex.props(savingsStyles.projectionLabel)}>
                Annual projection
              </span>
              <span
                {...stylex.props(
                  savingsStyles.projectionValue,
                  savingsStyles.projectionValueEstimate,
                )}
              >
                {formatUsd(annual)}
              </span>
            </div>
          </div>
          <span {...stylex.props(savingsStyles.projectionNote)}>
            Based on the last {completedMonths.length} months of round-ups.
            Projections are estimates, not guaranteed returns.
          </span>
        </div>

        <div {...stylex.props(savingsStyles.insightCard)}>
          <Info
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(savingsStyles.insightText)}>
            {SPARE_CHANGE_NOTE}
          </span>
        </div>

        <div {...stylex.props(savingsStyles.totalRow)}>
          <span {...stylex.props(savingsStyles.totalLabel)}>
            Actual saved to date
          </span>
          <span {...stylex.props(savingsStyles.totalValue)}>
            {formatUsd(total)}
          </span>
        </div>
      </div>
    </DemoScreen>
  )
}
