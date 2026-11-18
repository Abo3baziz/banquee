'use client'

import * as stylex from '@stylexjs/stylex'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  Check,
  CircleCheck,
  CreditCard,
  Gauge,
  Info,
  Pencil,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'
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
import { DemoCardStatusBadge } from './cards-card-view'
import {
  DAILY_LIMIT_TIER_MAX,
  LIMITS_CARD,
  UPDATED_DAILY_LIMIT,
} from '../../data/cards-demo-data'
import { CardProgress } from './cards-progress'
import { cardsStyles } from './cards-styles'
import {
  formatPercent,
  getLimitRowById,
  getLimitRows,
  type LimitRow,
} from './cards-utils'

type LimitsStage = 'overview' | 'edit' | 'success' | 'updated'

const LIMIT_STAGES: readonly DemoSequenceStage<LimitsStage>[] = [
  { id: 'overview', duration: 4200 },
  { id: 'edit', duration: 4600 },
  { id: 'success', duration: 3400 },
  { id: 'updated', duration: 3200 },
]

const PRESET_LIMITS = [
  1500,
  LIMITS_CARD.dailyLimit.limit,
  UPDATED_DAILY_LIMIT,
  5000,
] as const

type SpendingLimitsDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function SpendingLimitsDemo({
  paused,
  reducedMotion,
}: SpendingLimitsDemoProps) {
  const { stage } = useDemoSequence(LIMIT_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  /*
   * The edited story plays out once per loop: the last stage shows the updated
   * overview, then the next cycle starts again from the original $2,000 limit.
   */
  return (
    <AnimatePresence mode="wait" initial={false}>
      {stage === 'overview' ? <LimitsOverview key="overview" /> : null}
      {stage === 'edit' ? <EditLimits key="edit" /> : null}
      {stage === 'success' ? <LimitsUpdated key="success" /> : null}
      {stage === 'updated' ? (
        <LimitsOverview
          key="updated"
          dailyLimit={UPDATED_DAILY_LIMIT}
          updated
        />
      ) : null}
    </AnimatePresence>
  )
}

type LimitsOverviewProps = {
  dailyLimit?: number
  updated?: boolean
}

function LimitsOverview({
  dailyLimit = LIMITS_CARD.dailyLimit.limit,
  updated = false,
}: LimitsOverviewProps) {
  const [daily, monthly] = getLimitRows(LIMITS_CARD, { daily: dailyLimit })

  return (
    <DemoScreen>
      <DemoHeader title="Card Limits" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.caption)}>Active Protections</span>
          {updated ? (
            <DemoChip>
              <TrendingUp aria-hidden="true" size={9} />
              Updated just now
            </DemoChip>
          ) : (
            <DemoChip>
              <ShieldCheck aria-hidden="true" size={9} />
              Protection on
            </DemoChip>
          )}
        </div>

        <div {...stylex.props(cardsStyles.identityCard)}>
          <span {...stylex.props(cardsStyles.identityIcon)}>
            <CreditCard aria-hidden="true" size={16} />
          </span>
          <div {...stylex.props(demoStyles.grow)}>
            <div {...stylex.props(cardsStyles.identityName)}>
              {LIMITS_CARD.networkLabel} ···· {LIMITS_CARD.lastFour}
            </div>
            <span {...stylex.props(cardsStyles.identityMeta)}>
              {LIMITS_CARD.cardholder} · Exp {LIMITS_CARD.expiry}
            </span>
          </div>
          <DemoCardStatusBadge status={LIMITS_CARD.status} />
        </div>

        <LimitCard
          row={daily}
          icon={CalendarDays}
          caption="Resets 00:00 EST"
          footer={`${formatUsd(daily.remaining)} remaining today`}
          delay={0.15}
        />
        <LimitCard
          row={monthly}
          icon={CalendarRange}
          caption="Cycle: 1st – 31st"
          footer={`${formatUsd(monthly.remaining)} remaining this month`}
          delay={0.3}
        />

        <div {...stylex.props(cardsStyles.infoCard)}>
          <Info
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(cardsStyles.infoText)}>
            Limits reset automatically at 00:00 midnight EST. Offline
            contactless transactions are subject to the daily cap.
          </span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label={updated ? 'Limits are up to date' : 'Edit Limits'}
          icon={
            updated ? (
              <Check aria-hidden="true" size={14} />
            ) : (
              <Pencil aria-hidden="true" size={13} />
            )
          }
          pressAt={updated ? undefined : 3.4}
        />
        <span {...stylex.props(cardsStyles.doneHint)}>
          {updated
            ? 'New daily limit active on every device'
            : 'Changes take effect instantly'}
        </span>
      </div>
      {updated ? null : <DemoTapIndicator x={50} y={92} delay={3.25} />}
    </DemoScreen>
  )
}

type LimitCardProps = {
  row: LimitRow
  icon: LucideIcon
  caption: string
  footer: string
  delay: number
}

function LimitCard({
  row,
  icon: Icon,
  caption,
  footer,
  delay,
}: LimitCardProps) {
  return (
    <div {...stylex.props(cardsStyles.limitCard)}>
      <div {...stylex.props(cardsStyles.limitHead)}>
        <div {...stylex.props(cardsStyles.limitIdentity)}>
          <span {...stylex.props(cardsStyles.limitIcon)}>
            <Icon aria-hidden="true" size={12} />
          </span>
          <div>
            <div {...stylex.props(cardsStyles.limitTitle)}>{row.label}</div>
            <span {...stylex.props(cardsStyles.limitCaption)}>{caption}</span>
          </div>
        </div>
        <span {...stylex.props(cardsStyles.limitEdit)}>Edit</span>
      </div>

      <div {...stylex.props(cardsStyles.limitFigures)}>
        <span {...stylex.props(cardsStyles.limitValue)}>
          {formatUsd(row.limit)}
        </span>
        <span {...stylex.props(cardsStyles.limitInline)}>
          {formatUsd(row.spent)} spent ({row.percentLabel})
        </span>
      </div>

      <CardProgress value={row.progress} delay={delay} />

      <div {...stylex.props(cardsStyles.limitFooter)}>
        <CircleCheck aria-hidden="true" size={10} />
        <span>{footer}</span>
      </div>
    </div>
  )
}

function EditLimits() {
  const hasCleared = useDelayedFlag(600)
  const { text, complete } = useTypewriter(String(UPDATED_DAILY_LIMIT), {
    startDelay: 900,
    charDelay: 240,
  })
  const currentLimit = LIMITS_CARD.dailyLimit.limit
  const typedLimit = Number(text)
  const previewLimit = complete ? typedLimit : currentLimit
  const preview = getLimitRowById(LIMITS_CARD, 'daily', {
    daily: previewLimit,
  })
  const displayValue = text || (hasCleared ? '' : String(currentLimit))

  return (
    <DemoScreen>
      <DemoHeader title="Card Limits" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.identityCard)}>
          <span {...stylex.props(cardsStyles.identityIcon)}>
            <Gauge aria-hidden="true" size={16} />
          </span>
          <div {...stylex.props(demoStyles.grow)}>
            <div {...stylex.props(cardsStyles.identityName)}>
              {LIMITS_CARD.networkLabel} ···· {LIMITS_CARD.lastFour}
            </div>
            <span {...stylex.props(cardsStyles.identityMeta)}>
              Daily spending limit
            </span>
          </div>
          <DemoChip>Editing</DemoChip>
        </div>

        <div {...stylex.props(cardsStyles.field)}>
          <div {...stylex.props(cardsStyles.fieldHead)}>
            <span {...stylex.props(cardsStyles.fieldLabel)}>
              Daily Spending Limit
            </span>
            <span {...stylex.props(cardsStyles.fieldHint)}>
              Tier 1 · Max {formatUsd(DAILY_LIMIT_TIER_MAX)}/day
            </span>
          </div>
          <div {...stylex.props(cardsStyles.fieldValueRow)}>
            <span {...stylex.props(cardsStyles.fieldAmount)}>
              <span {...stylex.props(cardsStyles.fieldPrefix)}>$</span>
              {displayValue}
              {!complete ? (
                <motion.span
                  {...stylex.props(cardsStyles.fieldCaret)}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                />
              ) : null}
            </span>
          </div>
          <span {...stylex.props(cardsStyles.fieldHint)}>
            Current limit: {formatUsd(currentLimit)}
          </span>
        </div>

        <div {...stylex.props(cardsStyles.presetRow)}>
          {PRESET_LIMITS.map((value) => {
            const isSelected = complete
              ? value === typedLimit
              : value === currentLimit

            return (
              <span
                key={value}
                {...stylex.props(
                  cardsStyles.preset,
                  isSelected && cardsStyles.presetActive,
                )}
              >
                ${value.toLocaleString('en-US')}
              </span>
            )
          })}
        </div>

        <motion.div
          {...stylex.props(cardsStyles.limitCard)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              New Daily Preview
            </span>
            <DemoChip>{preview.percentLabel} used</DemoChip>
          </div>
          <div {...stylex.props(cardsStyles.limitFigures)}>
            <span {...stylex.props(cardsStyles.limitValue)}>
              {formatUsd(preview.limit)}
            </span>
            <span {...stylex.props(cardsStyles.limitInline)}>
              {formatUsd(preview.spent)} spent
            </span>
          </div>
          <CardProgress value={preview.progress} delay={0.15} />
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(cardsStyles.limitCaption)}>
              Remaining after update
            </span>
            <span {...stylex.props(cardsStyles.limitValue)}>
              {formatUsd(preview.remaining)}
            </span>
          </div>
        </motion.div>

        <div {...stylex.props(cardsStyles.infoCard)}>
          <ShieldCheck
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <span {...stylex.props(cardsStyles.infoText)}>
            New limits take effect immediately. Lowering a limit does not
            disrupt pre-authorized recurring subscriptions.
          </span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Save Changes"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={3.5}
          disabled={!complete}
        />
      </div>
      <DemoTapIndicator x={50} y={92} delay={3.4} />
    </DemoScreen>
  )
}

function LimitsUpdated() {
  const updated = getLimitRowById(LIMITS_CARD, 'daily', {
    daily: UPDATED_DAILY_LIMIT,
  })
  const previous = getLimitRowById(LIMITS_CARD, 'daily')

  return (
    <DemoScreen>
      <DemoHeader title="Card Limits" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.successHero)}>
          <DemoSuccessCheck />
          <span {...stylex.props(cardsStyles.successTitle)}>
            Spending limits updated!
          </span>
          <motion.div
            {...stylex.props(cardsStyles.successAmount)}
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.5,
              ease: [0.1, 0.8, 0.2, 1],
            }}
          >
            {formatUsd(updated.limit)}
          </motion.div>
          <span {...stylex.props(cardsStyles.successAmountLabel)}>
            New daily limit
          </span>
          <span {...stylex.props(cardsStyles.successText)}>
            Your new thresholds are active immediately across all devices and
            digital wallets.
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Limit Summary
            </span>
            <DemoChip>
              <Check aria-hidden="true" size={9} />
              Active
            </DemoChip>
          </div>
          <div {...stylex.props(cardsStyles.reviewRows)}>
            <DemoDetailRow
              label="Previous daily limit"
              value={formatUsd(previous.limit)}
            />
            <DemoDetailRow
              label="New daily limit"
              value={formatUsd(updated.limit)}
              highlight
            />
            <DemoDetailRow
              label="Spent today"
              value={formatUsd(updated.spent)}
            />
            <DemoDetailRow
              label="Remaining today"
              value={formatUsd(updated.remaining)}
              highlight
            />
            <DemoDetailRow label="Monthly limit" value="Unchanged" />
          </div>
        </div>

        <div {...stylex.props(cardsStyles.limitCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>
              Updated daily usage
            </span>
            <span {...stylex.props(cardsStyles.limitInline)}>
              {formatPercent(updated.progress)} used
            </span>
          </div>
          <CardProgress value={updated.progress} delay={0.35} height={6} />
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(cardsStyles.limitCaption)}>
              {formatUsd(updated.spent)} spent
            </span>
            <span {...stylex.props(cardsStyles.limitCaption)}>
              {formatUsd(updated.remaining)} remaining
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton label="Done" />
        <span {...stylex.props(cardsStyles.doneHint)}>
          Overview updates next, then the demo restarts
        </span>
      </div>
    </DemoScreen>
  )
}
