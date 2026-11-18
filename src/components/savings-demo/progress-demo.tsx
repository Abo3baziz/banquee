'use client'

import * as stylex from '@stylexjs/stylex'
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  CircleCheck,
  Coins,
  Info,
  Repeat,
  TrendingUp,
  Wallet,
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
import {
  BalanceGrowthChart,
  MilestoneTrack,
  MonthlyBars,
  ProgressRing,
  SavingsProgressBar,
} from './savings-charts'
import {
  AUTO_CONTRIBUTION_FREQUENCIES,
  AUTO_CONTRIBUTION_NOTE,
  SUMMER_AUTO_CONTRIBUTION,
  SUMMER_VACATION_CONTRIBUTIONS,
  SUMMER_VACATION_GOAL,
  type AutoContributionFrequency,
} from './savings-demo-data'
import { savingsStyles } from './savings-styles'
import {
  formatMonthYear,
  formatSavingsDate,
  formatSavingsPercent,
  formatScheduleDelta,
  getAnnualContribution,
  getBalanceGrowth,
  getEstimatedCompletionDate,
  getGoalContributions,
  getGoalSnapshot,
  getMilestones,
  getMonthlyTotals,
  getNextRunDate,
  getPeriodsPerYear,
  getRequiredMonthlyContribution,
  getScheduleDelta,
  sumContributions,
} from './savings-utils'
import { SavingsGoalIcon, SavingsSourceBadge } from './savings-ui'

type ProgressStage = 'progress' | 'history' | 'auto'

const PROGRESS_STAGES: readonly DemoSequenceStage<ProgressStage>[] = [
  { id: 'progress', duration: 6500 },
  { id: 'history', duration: 6000 },
  { id: 'auto', duration: 6500 },
]

/** When auto-contributions switches from monthly to weekly, in milliseconds. */
const FREQUENCY_CHANGE_AT_MS = 2000

type ProgressDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function ProgressDemo({ paused, reducedMotion }: ProgressDemoProps) {
  const { stage } = useDemoSequence(PROGRESS_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait">
      {stage === 'progress' ? <GoalProgress key="progress" /> : null}
      {stage === 'history' ? <ContributionHistory key="history" /> : null}
      {stage === 'auto' ? <AutoContributions key="auto" /> : null}
    </AnimatePresence>
  )
}

function GoalProgress() {
  const goal = SUMMER_VACATION_GOAL
  const snapshot = getGoalSnapshot(goal)
  const growth = getBalanceGrowth(SUMMER_VACATION_CONTRIBUTIONS)
  const milestones = getMilestones(goal.target, goal.saved)
  const estimate = getEstimatedCompletionDate(
    goal.saved,
    goal.target,
    goal.autoMonthly,
    'monthly',
  )
  const delta = estimate ? getScheduleDelta(estimate, goal.targetDate) : 0
  const requiredMonthly = getRequiredMonthlyContribution(
    snapshot.remaining,
    goal.targetDate,
  )

  return (
    <DemoScreen>
      <DemoHeader title="Progress Tracking" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <div {...stylex.props(savingsStyles.goalIdentity)}>
            <SavingsGoalIcon icon={goal.icon} tone={goal.tone} size={14} />
            <div {...stylex.props(savingsStyles.goalBody)}>
              <span {...stylex.props(savingsStyles.goalName)}>{goal.name}</span>
              <span {...stylex.props(savingsStyles.goalCategory)}>
                {goal.category} · Target {formatSavingsDate(goal.targetDate)}
              </span>
            </div>
          </div>
          <DemoChip>
            <CircleCheck aria-hidden="true" size={9} />
            On Track
          </DemoChip>
        </div>

        <div {...stylex.props(savingsStyles.progressHero)}>
          <ProgressRing
            value={snapshot.progress}
            label={formatSavingsPercent(snapshot.progress)}
            caption="reached"
            size={92}
          />
          <div {...stylex.props(savingsStyles.progressFigures)}>
            <span {...stylex.props(savingsStyles.progressTitle)}>
              {formatUsd(goal.saved)} saved
            </span>
            <span {...stylex.props(savingsStyles.progressTarget)}>
              of {formatUsd(goal.target)} target
            </span>
            <span {...stylex.props(savingsStyles.progressAmount)}>
              {formatUsd(snapshot.remaining)}
            </span>
            <span {...stylex.props(savingsStyles.progressTarget)}>
              still to go
            </span>
            <div {...stylex.props(savingsStyles.progressMeta)}>
              <DemoChip>
                <CalendarClock aria-hidden="true" size={9} />
                Est. {estimate ? formatMonthYear(estimate) : 'Set a pace'}
              </DemoChip>
              {estimate ? (
                <span {...stylex.props(demoStyles.caption)}>
                  {formatScheduleDelta(delta)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <SavingsProgressBar
          value={snapshot.progress}
          height={7}
          markers={milestones.map((milestone) => ({
            percent: milestone.percent,
            reached: milestone.reached,
          }))}
        />
        <MilestoneTrack
          items={[
            { percent: 0, label: 'Start', reached: true },
            {
              percent: 25,
              label: formatUsd(milestones[0]?.amount ?? 0),
              reached: milestones[0]?.reached ?? false,
            },
            { percent: 40, label: 'Today', reached: true },
            {
              percent: 50,
              label: formatUsd(milestones[1]?.amount ?? 0),
              reached: milestones[1]?.reached ?? false,
            },
            {
              percent: 100,
              label: formatUsd(goal.target),
              reached: milestones[3]?.reached ?? false,
            },
          ]}
        />

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Balance Growth
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              Last {growth.values.length - 1} months
            </span>
          </div>
          <BalanceGrowthChart
            values={growth.values}
            labels={growth.labels}
            delay={0.25}
            height={84}
          />
          <div {...stylex.props(savingsStyles.paceRow)}>
            <div {...stylex.props(savingsStyles.paceItem)}>
              <span {...stylex.props(savingsStyles.paceLabel)}>
                Actual pace
              </span>
              <span {...stylex.props(savingsStyles.paceValue)}>
                {formatUsd(goal.autoMonthly)} / mo
              </span>
            </div>
            <div {...stylex.props(savingsStyles.paceItem)}>
              <span {...stylex.props(savingsStyles.paceLabel)}>
                Required pace
              </span>
              <span {...stylex.props(savingsStyles.paceValue)}>
                {formatUsd(requiredMonthly)} / mo
              </span>
            </div>
            <DemoChip>
              <TrendingUp aria-hidden="true" size={9} />
              On track
            </DemoChip>
          </div>
        </div>

        <div {...stylex.props(savingsStyles.contributionRow)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <Coins aria-hidden="true" size={12} />
          </span>
          <div {...stylex.props(savingsStyles.contributionBody)}>
            <span {...stylex.props(savingsStyles.contributionLabel)}>
              View contribution history
            </span>
            <span {...stylex.props(savingsStyles.contributionMeta)}>
              {
                getGoalContributions(SUMMER_VACATION_CONTRIBUTIONS, goal.id)
                  .length
              }{' '}
              deposits this goal
            </span>
          </div>
          <ArrowRight
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary }}
          />
        </div>
      </div>
      <DemoTapIndicator x={50} y={69} contactDelay={6.3} />
    </DemoScreen>
  )
}

function ContributionHistory() {
  const goal = SUMMER_VACATION_GOAL
  const contributions = getGoalContributions(
    SUMMER_VACATION_CONTRIBUTIONS,
    goal.id,
  )
  const months = getMonthlyTotals(contributions)
  const total = sumContributions(contributions)

  return (
    <DemoScreen>
      <DemoHeader title="Contribution History" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <div {...stylex.props(savingsStyles.historySummary)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              {contributions.length} deposits
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              · {formatUsd(total)} total
            </span>
          </div>
          <DemoChip>
            <Repeat aria-hidden="true" size={9} />
            Auto-save
          </DemoChip>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Monthly Savings
            </span>
            <span {...stylex.props(demoStyles.caption)}>Jun – Nov 2026</span>
          </div>
          <MonthlyBars
            bars={months.map((month) => ({
              label: month.label,
              amount: month.amount,
            }))}
            delay={0.2}
            height={88}
          />
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>Timeline</span>
          <span {...stylex.props(demoStyles.caption)}>Newest first</span>
        </div>

        <div {...stylex.props(savingsStyles.timelineList)}>
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.id}
              {...stylex.props(savingsStyles.timelineRow)}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
            >
              <span
                {...stylex.props(
                  savingsStyles.timelineIcon,
                  contribution.source === 'manual' &&
                    savingsStyles.timelineIconManual,
                )}
              >
                {contribution.source === 'manual' ? (
                  <Wallet aria-hidden="true" size={10} />
                ) : (
                  <Repeat aria-hidden="true" size={10} />
                )}
              </span>
              <div {...stylex.props(savingsStyles.timelineBody)}>
                <span {...stylex.props(savingsStyles.timelineLabel)}>
                  {contribution.label}
                </span>
                <span {...stylex.props(savingsStyles.timelineMeta)}>
                  {formatSavingsDate(contribution.date)} · {contribution.note}
                </span>
              </div>
              <SavingsSourceBadge source={contribution.source} />
              <span {...stylex.props(savingsStyles.timelineAmount)}>
                +{formatUsd(contribution.amount)}
              </span>
            </motion.div>
          ))}
        </div>

        <div {...stylex.props(savingsStyles.contributionRow)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <Repeat aria-hidden="true" size={12} />
          </span>
          <div {...stylex.props(savingsStyles.contributionBody)}>
            <span {...stylex.props(savingsStyles.contributionLabel)}>
              Configure auto-contributions
            </span>
            <span {...stylex.props(savingsStyles.contributionMeta)}>
              Set the recurring amount and frequency
            </span>
          </div>
          <ChevronRight
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary }}
          />
        </div>
      </div>
      <DemoTapIndicator x={50} y={72} contactDelay={5.8} />
    </DemoScreen>
  )
}

function AutoContributions() {
  const goal = SUMMER_VACATION_GOAL
  const snapshot = getGoalSnapshot(goal)
  const enabled = useDelayedFlag(900)
  const weekly = useDelayedFlag(FREQUENCY_CHANGE_AT_MS)
  const frequency: AutoContributionFrequency = weekly ? 'weekly' : 'monthly'
  const amount = SUMMER_AUTO_CONTRIBUTION.amount
  const annual = getAnnualContribution(amount, frequency)
  const estimate = getEstimatedCompletionDate(
    goal.saved,
    goal.target,
    amount,
    frequency,
  )
  const delta = estimate ? getScheduleDelta(estimate, goal.targetDate) : 0
  const nextRun = getNextRunDate(frequency)
  const periodsPerYear = getPeriodsPerYear(frequency)

  return (
    <DemoScreen>
      <DemoHeader title="Auto-Contributions" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.destinationCard)}>
          <SavingsGoalIcon icon={goal.icon} tone={goal.tone} size={13} />
          <div {...stylex.props(savingsStyles.destinationBody)}>
            <span {...stylex.props(savingsStyles.destinationTitle)}>
              Recurring schedule
            </span>
            <span {...stylex.props(savingsStyles.destinationName)}>
              {goal.name}
            </span>
            <span {...stylex.props(savingsStyles.destinationMeta)}>
              {formatUsd(goal.saved)} of {formatUsd(goal.target)} ·{' '}
              {formatUsd(snapshot.remaining)} to go
            </span>
          </div>
          <span {...stylex.props(savingsStyles.destinationValue)}>
            {formatSavingsPercent(snapshot.progress)}
          </span>
        </div>

        <div {...stylex.props(savingsStyles.toggleRow)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <Repeat aria-hidden="true" size={12} />
          </span>
          <div {...stylex.props(savingsStyles.toggleBody)}>
            <span {...stylex.props(savingsStyles.toggleTitle)}>
              Automatic Contributions
            </span>
            <span {...stylex.props(savingsStyles.toggleMeta)}>
              {enabled
                ? 'On · transfers start on the next run'
                : 'Move money from checking on a set cadence'}
            </span>
          </div>
          <div
            {...stylex.props(
              savingsStyles.toggleTrack,
              enabled && savingsStyles.toggleTrackOn,
            )}
          >
            <motion.span
              {...stylex.props(savingsStyles.toggleKnob)}
              animate={{ x: enabled ? 16 : 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          </div>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>
            Recurring Amount
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {formatUsd(amount)} per transfer
          </span>
        </div>
        <div {...stylex.props(savingsStyles.presetRow)}>
          {SUMMER_AUTO_CONTRIBUTION.amountOptions.map((option) => (
            <span
              key={option}
              {...stylex.props(
                savingsStyles.preset,
                option === amount && savingsStyles.presetActive,
              )}
            >
              {formatUsd(option).replace('.00', '')}
            </span>
          ))}
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>Frequency</span>
          <span {...stylex.props(demoStyles.caption)}>
            {enabled ? 'Schedule updates live' : 'Choose a cadence'}
          </span>
        </div>
        <div {...stylex.props(savingsStyles.freqTabs)}>
          {AUTO_CONTRIBUTION_FREQUENCIES.map((option) => {
            const isActive = option.id === frequency

            return (
              <span
                key={option.id}
                {...stylex.props(
                  savingsStyles.freqTab,
                  isActive && savingsStyles.freqTabActive,
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="savings-auto-frequency"
                    {...stylex.props(savingsStyles.freqPill)}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span {...stylex.props(savingsStyles.freqLabel)}>
                  {option.label}
                </span>
              </span>
            )
          })}
        </div>

        <div {...stylex.props(savingsStyles.accountRow)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <Wallet aria-hidden="true" size={12} />
          </span>
          <div {...stylex.props(savingsStyles.accountBody)}>
            <span {...stylex.props(savingsStyles.accountName)}>
              Banquee Main Checking (•••• {DEMO_ACCOUNT.last4})
            </span>
            <span {...stylex.props(savingsStyles.accountMeta)}>
              Next run {formatSavingsDate(nextRun)} · Available{' '}
              {formatUsd(DEMO_ACCOUNT.balance)}
            </span>
          </div>
          <span {...stylex.props(savingsStyles.accountTag)}>Primary</span>
        </div>

        <div {...stylex.props(savingsStyles.projectionCard)}>
          <div {...stylex.props(savingsStyles.projectionHead)}>
            <span {...stylex.props(savingsStyles.previewLabel)}>
              Projected Impact
            </span>
            <DemoChip>
              <TrendingUp aria-hidden="true" size={9} />
              Estimate
            </DemoChip>
          </div>
          <div {...stylex.props(savingsStyles.projectionGrid)}>
            <div {...stylex.props(savingsStyles.projectionCell)}>
              <span {...stylex.props(savingsStyles.projectionLabel)}>
                Annual additions
              </span>
              <motion.span
                key={`annual-${frequency}`}
                {...stylex.props(savingsStyles.projectionValue)}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formatUsd(annual)}
              </motion.span>
            </div>
            <div {...stylex.props(savingsStyles.projectionCell)}>
              <span {...stylex.props(savingsStyles.projectionLabel)}>
                Estimated completion
              </span>
              <motion.span
                key={`estimate-${frequency}`}
                {...stylex.props(savingsStyles.projectionValue)}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {estimate ? formatSavingsDate(estimate) : '—'}
              </motion.span>
            </div>
          </div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(savingsStyles.projectionNote)}>
              {formatUsd(amount)} × {periodsPerYear}{' '}
              {frequency === 'weekly' ? 'weeks' : 'months'} · target{' '}
              {formatSavingsDate(goal.targetDate)}
            </span>
            <DemoChip tone={weekly ? 'primary' : 'neutral'}>
              {formatScheduleDelta(delta)}
            </DemoChip>
          </div>
        </div>

        <div {...stylex.props(savingsStyles.insightCard)}>
          <Info
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(savingsStyles.insightText)}>
            {AUTO_CONTRIBUTION_NOTE}
          </span>
        </div>
      </div>
      <DemoTapIndicator x={88} y={21} contactDelay={0.9} />
      <DemoTapIndicator
        x={43.7}
        y={39.1}
        contactDelay={FREQUENCY_CHANGE_AT_MS / 1000}
      />
    </DemoScreen>
  )
}
