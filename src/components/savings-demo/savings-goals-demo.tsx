'use client'

import * as stylex from '@stylexjs/stylex'
import {
  ArrowRight,
  Check,
  Coins,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors } from '../../styles/tokens.stylex'
import { DEMO_ACCOUNT, formatUsd } from '../banking-demo/demo-data'
import { DemoProcessing } from '../banking-demo/demo-feedback'
import type { DemoSequenceStage } from '../banking-demo/demo-sequence'
import { demoStyles } from '../banking-demo/demo-styles'
import { DemoTapIndicator } from '../banking-demo/demo-tap-indicator'
import {
  DemoChip,
  DemoDetailRow,
  DemoHeader,
  DemoPrimaryButton,
  DemoScreen,
  DemoSuccessCheck,
} from '../banking-demo/demo-ui'
import { useDelayedFlag } from '../banking-demo/use-delayed-flag'
import { useDemoSequence } from '../banking-demo/use-demo-sequence'
import { useTypewriter } from '../banking-demo/use-typewriter'
import { ProgressRing, SavingsProgressBar } from './savings-charts'
import {
  DEMO_SAVINGS_DEPOSIT,
  DEMO_SAVINGS_GOALS,
  EMERGENCY_FUND_CONTRIBUTIONS,
  EMERGENCY_FUND_GOAL,
  SPARE_CHANGE_PURCHASES,
  type SavingsGoal,
} from './savings-demo-data'
import { savingsStyles } from './savings-styles'
import {
  formatSavingsDate,
  formatSavingsPercent,
  formatScheduleDelta,
  formatShortDate,
  getDepositPreview,
  getEstimatedCompletionDate,
  getGoalContributions,
  getGoalSnapshot,
  getMilestones,
  getNextMilestone,
  getOverallProgress,
  getRemainingAmount,
  getScheduleDelta,
  getSpareChangeMonths,
} from './savings-utils'
import { SavingsContributionRow, SavingsGoalIcon } from './savings-ui'

type SavingsGoalsStage =
  'overview' | 'details' | 'addMoney' | 'processing' | 'success'

const SAVINGS_GOALS_STAGES: readonly DemoSequenceStage<SavingsGoalsStage>[] = [
  { id: 'overview', duration: 3200 },
  { id: 'details', duration: 3400 },
  { id: 'addMoney', duration: 3600 },
  { id: 'processing', duration: 2300 },
  { id: 'success', duration: 4400 },
]

type SavingsGoalsDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function SavingsGoalsDemo({
  paused,
  reducedMotion,
}: SavingsGoalsDemoProps) {
  const { stage } = useDemoSequence(SAVINGS_GOALS_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait">
      {stage === 'overview' ? <SavingsOverview key="overview" /> : null}
      {stage === 'details' ? <EmergencyGoalDetails key="details" /> : null}
      {stage === 'addMoney' ? <AddMoney key="add-money" /> : null}
      {stage === 'processing' ? <SavingsProcessing key="processing" /> : null}
      {stage === 'success' ? <DepositSuccess key="success" /> : null}
    </AnimatePresence>
  )
}

function SavingsOverview() {
  const overall = getOverallProgress(DEMO_SAVINGS_GOALS)
  const activeGoals = DEMO_SAVINGS_GOALS.filter(
    (goal) => getRemainingAmount(goal.target, goal.saved) > 0,
  )
  const spareChangeMonths = getSpareChangeMonths(SPARE_CHANGE_PURCHASES)
  const monthlyRoundUps =
    spareChangeMonths[spareChangeMonths.length - 1]?.amount ?? 0

  return (
    <DemoScreen>
      <DemoHeader title="My Savings" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.heroCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(savingsStyles.heroLabel)}>
              Total Savings
            </span>
            <DemoChip>
              <TrendingUp aria-hidden="true" size={9} />
              {activeGoals.length} active goals
            </DemoChip>
          </div>
          <span {...stylex.props(savingsStyles.heroValue)}>
            {formatUsd(overall.saved)}
          </span>
          <span {...stylex.props(savingsStyles.heroSub)}>
            Across {DEMO_SAVINGS_GOALS.length} dedicated goal vaults
          </span>
          <div {...stylex.props(savingsStyles.heroStats)}>
            <div {...stylex.props(savingsStyles.heroStat)}>
              <span {...stylex.props(savingsStyles.heroStatValue)}>
                {activeGoals.length}
              </span>
              <span {...stylex.props(savingsStyles.heroStatLabel)}>Active</span>
            </div>
            <div {...stylex.props(savingsStyles.heroStat)}>
              <span {...stylex.props(savingsStyles.heroStatValue)}>
                {formatUsd(overall.target)}
              </span>
              <span {...stylex.props(savingsStyles.heroStatLabel)}>Target</span>
            </div>
            <div {...stylex.props(savingsStyles.heroStat)}>
              <span {...stylex.props(savingsStyles.heroStatValue)}>
                {formatSavingsPercent(overall.progress, 1)}
              </span>
              <span {...stylex.props(savingsStyles.heroStatLabel)}>
                Overall
              </span>
            </div>
          </div>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>Savings Goals</span>
          <span {...stylex.props(demoStyles.link)}>
            View all ({DEMO_SAVINGS_GOALS.length})
          </span>
        </div>

        <div {...stylex.props(savingsStyles.goalList)}>
          {DEMO_SAVINGS_GOALS.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              highlighted={goal.id === 'emergency-fund'}
              delay={0.18 + index * 0.08}
            />
          ))}
        </div>

        <div {...stylex.props(savingsStyles.insightCard)}>
          <span {...stylex.props(demoStyles.iconCircleSmall)}>
            <Coins aria-hidden="true" size={12} />
          </span>
          <span {...stylex.props(savingsStyles.insightText)}>
            Spare-change round-ups are on. You saved{' '}
            {formatUsd(monthlyRoundUps)} from recent purchases this month.
          </span>
        </div>
      </div>
      <DemoTapIndicator x={50} y={47} contactDelay={2.4} />
    </DemoScreen>
  )
}

type GoalCardProps = {
  goal: SavingsGoal
  highlighted?: boolean
  delay?: number
}

function GoalCard({ goal, highlighted = false, delay = 0 }: GoalCardProps) {
  const snapshot = getGoalSnapshot(goal)

  return (
    <div
      {...stylex.props(
        savingsStyles.goalCard,
        highlighted && savingsStyles.goalCardHighlighted,
      )}
    >
      <div {...stylex.props(savingsStyles.goalHead)}>
        <div {...stylex.props(savingsStyles.goalIdentity)}>
          <SavingsGoalIcon icon={goal.icon} tone={goal.tone} />
          <div {...stylex.props(savingsStyles.goalBody)}>
            <span {...stylex.props(savingsStyles.goalName)}>{goal.name}</span>
            <span {...stylex.props(savingsStyles.goalCategory)}>
              {goal.category} · {formatSavingsDate(goal.targetDate)}
            </span>
          </div>
        </div>
        <span {...stylex.props(savingsStyles.goalPercent)}>
          {formatSavingsPercent(snapshot.progress)}
        </span>
      </div>
      <SavingsProgressBar
        value={snapshot.progress}
        delay={delay}
        markers={[{ percent: 50, reached: snapshot.progress >= 50 }]}
      />
      <div {...stylex.props(savingsStyles.goalFigures)}>
        <span {...stylex.props(savingsStyles.goalSaved)}>
          {formatUsd(goal.saved)}
        </span>
        <span {...stylex.props(savingsStyles.goalTarget)}>
          of {formatUsd(goal.target)}
        </span>
        <span {...stylex.props(demoStyles.grow)} />
        <span {...stylex.props(savingsStyles.goalRemaining)}>
          {snapshot.completed
            ? 'Goal reached'
            : `${formatUsd(snapshot.remaining)} left`}
        </span>
      </div>
    </div>
  )
}

function EmergencyGoalDetails() {
  const goal = EMERGENCY_FUND_GOAL
  const snapshot = getGoalSnapshot(goal)
  const contributions = getGoalContributions(
    EMERGENCY_FUND_CONTRIBUTIONS,
    goal.id,
  )
  const nextMilestone = getNextMilestone(goal.target, goal.saved)
  const estimate = getEstimatedCompletionDate(
    goal.saved,
    goal.target,
    goal.autoMonthly,
    'monthly',
  )
  const delta = estimate ? getScheduleDelta(estimate, goal.targetDate) : 0

  return (
    <DemoScreen>
      <DemoHeader title="Goal Details" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <div {...stylex.props(savingsStyles.goalIdentity)}>
            <SavingsGoalIcon icon={goal.icon} tone={goal.tone} size={14} />
            <div {...stylex.props(savingsStyles.goalBody)}>
              <span {...stylex.props(savingsStyles.goalName)}>{goal.name}</span>
              <span {...stylex.props(savingsStyles.goalCategory)}>
                {goal.category} · {goal.note}
              </span>
            </div>
          </div>
          <DemoChip>
            <ShieldCheck aria-hidden="true" size={9} />
            On Track
          </DemoChip>
        </div>

        <div {...stylex.props(savingsStyles.detailCard)}>
          <ProgressRing
            value={snapshot.progress}
            label={formatSavingsPercent(snapshot.progress)}
            caption="saved"
            size={88}
          />
          <div {...stylex.props(savingsStyles.detailFigures)}>
            <span {...stylex.props(savingsStyles.detailMuted)}>
              Current Saved
            </span>
            <span {...stylex.props(savingsStyles.detailAmount)}>
              {formatUsd(goal.saved)}
            </span>
            <span {...stylex.props(savingsStyles.detailMuted)}>
              of {formatUsd(goal.target)} target
            </span>
            <span {...stylex.props(savingsStyles.detailMuted)}>
              {formatUsd(snapshot.remaining)} remaining
            </span>
          </div>
          <div {...stylex.props(savingsStyles.detailSide)}>
            <span {...stylex.props(savingsStyles.detailMuted)}>
              Next milestone
            </span>
            <span {...stylex.props(savingsStyles.detailPercent)}>
              {nextMilestone ? `${nextMilestone.percent}%` : 'Complete'}
            </span>
            <span {...stylex.props(savingsStyles.detailMuted)}>
              {nextMilestone
                ? formatUsd(nextMilestone.amount)
                : formatUsd(goal.target)}
            </span>
          </div>
        </div>

        <DemoPrimaryButton
          label="Add Money to Emergency Fund"
          icon={<Plus aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={2.6}
        />

        <div {...stylex.props(savingsStyles.metaGrid)}>
          <div {...stylex.props(savingsStyles.metaBox)}>
            <span {...stylex.props(savingsStyles.metaLabel)}>Target Date</span>
            <span {...stylex.props(savingsStyles.metaValue)}>
              {formatSavingsDate(goal.targetDate)}
            </span>
          </div>
          <div {...stylex.props(savingsStyles.metaBox)}>
            <span {...stylex.props(savingsStyles.metaLabel)}>Monthly Pace</span>
            <span {...stylex.props(savingsStyles.metaValue)}>
              {formatUsd(goal.autoMonthly)} / mo
            </span>
          </div>
          <div {...stylex.props(savingsStyles.metaBox)}>
            <span {...stylex.props(savingsStyles.metaLabel)}>
              Estimated Finish
            </span>
            <span {...stylex.props(savingsStyles.metaValue)}>
              {estimate ? formatSavingsDate(estimate) : 'Set a pace'}
            </span>
          </div>
          <div {...stylex.props(savingsStyles.metaBox)}>
            <span {...stylex.props(savingsStyles.metaLabel)}>
              Pace vs Target
            </span>
            <span {...stylex.props(savingsStyles.metaValue)}>
              {formatScheduleDelta(delta)}
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>
            Recent Contributions
          </span>
          <span {...stylex.props(demoStyles.caption)}>
            {contributions.length} deposits
          </span>
        </div>
        <div {...stylex.props(savingsStyles.contributionList)}>
          {contributions.map((contribution) => (
            <SavingsContributionRow
              key={contribution.id}
              label={contribution.label}
              meta={`${formatShortDate(contribution.date)} · ${contribution.note}`}
              amount={contribution.amount}
              source={contribution.source}
            />
          ))}
        </div>
      </div>
    </DemoScreen>
  )
}

function AddMoney() {
  const goal = EMERGENCY_FUND_GOAL
  const amount = DEMO_SAVINGS_DEPOSIT.amount
  const { text, complete } = useTypewriter(String(amount), {
    startDelay: 450,
    charDelay: 130,
  })
  const showPreview = useDelayedFlag(1250)
  const preview = getDepositPreview(goal, amount)
  const displayedSaved = showPreview
    ? preview.updatedSaved
    : preview.previousSaved
  const displayedProgress = showPreview
    ? preview.updatedProgress
    : preview.previousProgress

  return (
    <DemoScreen>
      <DemoHeader title="Add Money" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.destinationCard)}>
          <SavingsGoalIcon icon={goal.icon} tone={goal.tone} size={13} />
          <div {...stylex.props(savingsStyles.destinationBody)}>
            <span {...stylex.props(savingsStyles.destinationTitle)}>
              Savings target
            </span>
            <span {...stylex.props(savingsStyles.destinationName)}>
              {goal.name}
            </span>
            <span {...stylex.props(savingsStyles.destinationMeta)}>
              {formatUsd(goal.saved)} of {formatUsd(goal.target)} ·{' '}
              {formatSavingsPercent(preview.previousProgress)} saved
            </span>
          </div>
          <span {...stylex.props(savingsStyles.destinationValue)}>
            {formatSavingsPercent(preview.previousProgress)}
          </span>
        </div>

        <div {...stylex.props(savingsStyles.amountCard)}>
          <div {...stylex.props(savingsStyles.amountHeader)}>
            <span {...stylex.props(demoStyles.label)}>Deposit Amount</span>
            <span {...stylex.props(demoStyles.caption)}>
              From Main Checking
            </span>
          </div>
          <div {...stylex.props(savingsStyles.amountDisplay)}>
            <span {...stylex.props(savingsStyles.amountPrefix)}>$</span>
            <span>{text || '0'}</span>
            {complete ? (
              <span {...stylex.props(savingsStyles.amountCents)}>.00</span>
            ) : (
              <motion.span
                {...stylex.props(savingsStyles.caret)}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
              />
            )}
          </div>
          <div {...stylex.props(savingsStyles.availableRow)}>
            <ShieldCheck
              aria-hidden="true"
              size={10}
              style={{ color: colors.primary }}
            />
            <span {...stylex.props(demoStyles.caption)}>
              Available {formatUsd(DEMO_ACCOUNT.balance)} · No fees
            </span>
          </div>
        </div>

        <div {...stylex.props(savingsStyles.presetRow)}>
          {DEMO_SAVINGS_DEPOSIT.amountOptions.map((option) => (
            <span
              key={option}
              {...stylex.props(
                savingsStyles.preset,
                option === amount && savingsStyles.presetActive,
              )}
            >
              +{formatUsd(option).replace('.00', '')}
            </span>
          ))}
          <span {...stylex.props(savingsStyles.preset)}>Custom</span>
        </div>

        <motion.div
          {...stylex.props(savingsStyles.previewCard)}
          initial={{ opacity: 0, y: 8 }}
          animate={showPreview ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
        >
          <div {...stylex.props(savingsStyles.previewHead)}>
            <span {...stylex.props(savingsStyles.previewLabel)}>
              After this deposit
            </span>
            {preview.crossedMilestone ? (
              <span
                {...stylex.props(
                  demoStyles.chip,
                  savingsStyles.previewMilestoneChip,
                )}
              >
                <Sparkles aria-hidden="true" size={9} />
                {preview.crossedMilestone}% milestone
              </span>
            ) : null}
          </div>
          <div {...stylex.props(savingsStyles.previewRow)}>
            <span {...stylex.props(savingsStyles.previewText)}>
              Emergency Fund
            </span>
            <span {...stylex.props(savingsStyles.previewValueStrong)}>
              {formatUsd(displayedSaved)}
            </span>
          </div>
          <SavingsProgressBar
            value={displayedProgress}
            delay={0.1}
            height={7}
            markers={getMilestones(goal.target, preview.updatedSaved).map(
              (milestone) => ({
                percent: milestone.percent,
                reached: milestone.reached,
              }),
            )}
          />
          <div {...stylex.props(savingsStyles.previewRow)}>
            <span {...stylex.props(savingsStyles.previewText)}>
              {formatSavingsPercent(preview.previousProgress)} →{' '}
              {formatSavingsPercent(preview.updatedProgress)}
            </span>
            <span {...stylex.props(savingsStyles.previewValue)}>
              {formatUsd(preview.remaining)} to go
            </span>
          </div>
        </motion.div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label={`Confirm Deposit of ${formatUsd(amount)}`}
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={2.85}
        />
        <span {...stylex.props(savingsStyles.successHint)}>
          Instant settlement · Secured by 256-bit encryption
        </span>
      </div>
    </DemoScreen>
  )
}

function SavingsProcessing() {
  const goal = EMERGENCY_FUND_GOAL
  const preview = getDepositPreview(goal, DEMO_SAVINGS_DEPOSIT.amount)

  return (
    <DemoProcessing
      headerTitle="Add Money"
      title="Adding money to your Emergency Fund..."
      description="Securely moving funds from checking into your goal vault. Please keep this screen open."
      amount={formatUsd(DEMO_SAVINGS_DEPOSIT.amount).replace('$', '')}
      prefix="$"
      amountLabel="Deposit Amount"
      recipientLabel="To Goal"
      recipientName={goal.name}
      recipientMeta={`Target ${formatUsd(goal.target)} · ${formatSavingsPercent(preview.updatedProgress)} after deposit`}
      accountLabel="From Checking"
      badge="Processing"
      steps={[
        {
          label: 'Deposit authorized',
          detail: 'Available funds confirmed in checking',
          state: 'complete',
        },
        {
          label: 'Moving money to goal vault',
          detail: 'Instant internal transfer',
          state: 'active',
        },
        {
          label: 'Updating goal progress',
          detail: `New saved balance ${formatUsd(preview.updatedSaved)}`,
          state: 'pending',
        },
      ]}
      footer="FDIC insured up to $250,000"
    />
  )
}

function DepositSuccess() {
  const goal = EMERGENCY_FUND_GOAL
  const preview = getDepositPreview(goal, DEMO_SAVINGS_DEPOSIT.amount)
  const showUpdated = useDelayedFlag(700)
  const hasCelebrated = useDelayedFlag(1500)
  const checkingBalance = DEMO_ACCOUNT.balance - DEMO_SAVINGS_DEPOSIT.amount
  const displayedProgress = showUpdated
    ? preview.updatedProgress
    : preview.previousProgress

  return (
    <DemoScreen>
      <DemoHeader title="Deposit Successful" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(savingsStyles.successHero)}>
          <DemoSuccessCheck />
          <span {...stylex.props(savingsStyles.successTitle)}>
            Money added to your Emergency Fund!
          </span>
          <span {...stylex.props(savingsStyles.successText)}>
            Deposit credited to your safety-net goal.
          </span>
          <motion.span
            {...stylex.props(savingsStyles.successAmount)}
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            +{formatUsd(DEMO_SAVINGS_DEPOSIT.amount)}
          </motion.span>
        </div>

        <div {...stylex.props(savingsStyles.successProgressCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Goal Progress
            </span>
            <DemoChip>
              <TrendingUp aria-hidden="true" size={9} />
              {formatSavingsPercent(preview.updatedProgress)} complete
            </DemoChip>
          </div>
          <SavingsProgressBar
            value={displayedProgress}
            delay={0.15}
            height={7}
            markers={getMilestones(goal.target, preview.updatedSaved).map(
              (milestone) => ({
                percent: milestone.percent,
                reached: milestone.reached,
              }),
            )}
          />
          <div {...stylex.props(savingsStyles.progressCompare)}>
            <span {...stylex.props(savingsStyles.progressWas)}>
              Previous {formatUsd(preview.previousSaved)} ·{' '}
              {formatSavingsPercent(preview.previousProgress)}
            </span>
            <span {...stylex.props(savingsStyles.progressNew)}>
              {formatUsd(preview.updatedSaved)} ·{' '}
              {formatSavingsPercent(preview.updatedProgress)}
            </span>
          </div>
          <span {...stylex.props(demoStyles.caption)}>
            {formatUsd(preview.remaining)} remaining to reach{' '}
            {formatUsd(goal.target)}
          </span>
        </div>

        <AnimatePresence>
          {hasCelebrated ? (
            <motion.div
              key="milestone"
              {...stylex.props(savingsStyles.milestoneCard)}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.1, 0.8, 0.2, 1] }}
            >
              <span
                aria-hidden="true"
                {...stylex.props(savingsStyles.milestoneGlow)}
              />
              <span {...stylex.props(savingsStyles.milestoneChip)}>
                <Trophy aria-hidden="true" size={9} />
                {preview.crossedMilestone}% milestone unlocked
              </span>
              <span {...stylex.props(savingsStyles.milestoneTitle)}>
                Halfway there!
              </span>
              <span {...stylex.props(savingsStyles.milestoneText)}>
                Your Emergency Fund just crossed the halfway mark. You saved
                your first {formatUsd(preview.updatedSaved)} of{' '}
                {formatUsd(goal.target)}.
              </span>
              <div {...stylex.props(savingsStyles.milestoneFigures)}>
                <div {...stylex.props(savingsStyles.milestoneFigure)}>
                  <span {...stylex.props(savingsStyles.milestoneValue)}>
                    {formatUsd(preview.updatedSaved)}
                  </span>
                  <span {...stylex.props(savingsStyles.milestoneLabel)}>
                    Saved
                  </span>
                </div>
                <div {...stylex.props(savingsStyles.milestoneFigure)}>
                  <span {...stylex.props(savingsStyles.milestoneValue)}>
                    {formatUsd(preview.remaining)}
                  </span>
                  <span {...stylex.props(savingsStyles.milestoneLabel)}>
                    To go
                  </span>
                </div>
                <div {...stylex.props(savingsStyles.milestoneFigure)}>
                  <span {...stylex.props(savingsStyles.milestoneValue)}>
                    {formatSavingsPercent(preview.updatedProgress)}
                  </span>
                  <span {...stylex.props(savingsStyles.milestoneLabel)}>
                    Complete
                  </span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div {...stylex.props(demoStyles.card, savingsStyles.receiptCard)}>
          <div {...stylex.props(demoStyles.row)}>
            <span {...stylex.props(demoStyles.iconCircleSmall)}>
              <Check aria-hidden="true" size={12} strokeWidth={3} />
            </span>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Transfer Receipt
            </span>
            <span {...stylex.props(demoStyles.grow)} />
            <span {...stylex.props(demoStyles.caption)}>Settled</span>
          </div>
          <div
            {...stylex.props(demoStyles.divider, savingsStyles.receiptDivider)}
          />
          <div {...stylex.props(savingsStyles.receiptRows)}>
            <DemoDetailRow
              label="Reference"
              value={DEMO_SAVINGS_DEPOSIT.reference}
              mono
            />
            <DemoDetailRow
              label="Updated Checking"
              value={formatUsd(checkingBalance)}
            />
            <DemoDetailRow label="Fee" value="Free ($0.00)" highlight />
          </div>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton label="Done" />
      </div>
    </DemoScreen>
  )
}
