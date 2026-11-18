'use client'

import { useEffect } from 'react'
import * as stylex from '@stylexjs/stylex'
import {
  Check,
  Download,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import { demoStyles } from './demo-styles'
import { formatUsd } from './demo-data'
import {
  DemoChip,
  DemoDetailRow,
  DemoHeader,
  DemoPrimaryButton,
  DemoScreen,
  DemoSpinner,
  DemoSuccessCheck,
} from './demo-ui'

type ProcessingStep = {
  label: string
  detail: string
  state: 'complete' | 'active' | 'pending'
}

type DemoProcessingProps = {
  headerTitle: string
  title: string
  description: string
  amount: string
  prefix: string
  amountLabel: string
  recipientLabel: string
  recipientName: string
  recipientMeta: string
  accountLabel: string
  steps: ProcessingStep[]
  footer: string
  badge: string
}

export function DemoProcessing({
  headerTitle,
  title,
  description,
  amount,
  prefix,
  amountLabel,
  recipientLabel,
  recipientName,
  recipientMeta,
  accountLabel,
  steps,
  footer,
  badge,
}: DemoProcessingProps) {
  return (
    <DemoScreen>
      <DemoHeader title={headerTitle} />
      <div {...stylex.props(demoStyles.body)}>
        <div {...stylex.props(styles.processingHero)}>
          <DemoSpinner size={36} />
          <span {...stylex.props(styles.processingTitle)}>{title}</span>
          <span {...stylex.props(styles.processingDescription)}>
            {description}
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.label)}>{amountLabel}</span>
            <DemoChip>{badge}</DemoChip>
          </div>
          <div {...stylex.props(styles.processingAmount)}>
            <span {...stylex.props(styles.amountPrefix)}>{prefix}</span>
            <span>{amount}</span>
          </div>
          <div {...stylex.props(styles.recipientRow)}>
            <span {...stylex.props(demoStyles.iconCircleSmall)}>
              <SendIcon />
            </span>
            <div {...stylex.props(demoStyles.grow)}>
              <div {...stylex.props(demoStyles.label)}>{recipientLabel}</div>
              <div {...stylex.props(demoStyles.strongText)}>
                {recipientName}
              </div>
              <div {...stylex.props(demoStyles.caption)}>{recipientMeta}</div>
            </div>
            <div {...stylex.props(styles.accountTag)}>
              <span {...stylex.props(demoStyles.caption)}>{accountLabel}</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(demoStyles.card, demoStyles.grow)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Security Pipeline
            </span>
            <span {...stylex.props(demoStyles.caption)}>Step 2 of 3</span>
          </div>
          <div {...stylex.props(styles.steps)}>
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                {...stylex.props(styles.step)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.25 + index * 0.3,
                  duration: 0.35,
                  ease: [0.1, 0.8, 0.2, 1],
                }}
              >
                <span
                  {...stylex.props(
                    styles.stepIcon,
                    step.state === 'complete' && styles.stepIconComplete,
                    step.state === 'active' && styles.stepIconActive,
                  )}
                >
                  {step.state === 'complete' ? (
                    <Check aria-hidden="true" size={11} strokeWidth={3} />
                  ) : null}
                  {step.state === 'active' ? (
                    <motion.span
                      {...stylex.props(styles.stepDot)}
                      animate={{ opacity: [1, 0.25, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    />
                  ) : null}
                  {step.state === 'pending' ? (
                    <span {...stylex.props(styles.stepDotPending)} />
                  ) : null}
                </span>
                <div {...stylex.props(demoStyles.grow)}>
                  <span {...stylex.props(styles.stepLabel)}>{step.label}</span>
                  <span {...stylex.props(demoStyles.caption)}>
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div {...stylex.props(styles.securityFooter)}>
          <ShieldCheck aria-hidden="true" size={12} />
          <span>{footer}</span>
        </div>
      </div>
    </DemoScreen>
  )
}

type DemoSuccessProps = {
  headerTitle: string
  title: string
  amount: string
  prefix: string
  counterpartyLabel: string
  counterpartyName: string
  counterpartyMeta: string
  reference: string
  fromBalance: number
  toBalance: number
  deltaLabel: string
  method: string
  fee: string
  note?: string
}

export function DemoSuccess({
  headerTitle,
  title,
  amount,
  prefix,
  counterpartyLabel,
  counterpartyName,
  counterpartyMeta,
  reference,
  fromBalance,
  toBalance,
  deltaLabel,
  method,
  fee,
  note,
}: DemoSuccessProps) {
  const shouldReduceMotion = useReducedMotion()
  const balance = useMotionValue(fromBalance)
  const balanceText = useTransform(balance, (value) => formatUsd(value))

  useEffect(() => {
    if (shouldReduceMotion) {
      balance.set(toBalance)
      return
    }

    const controls = animate(balance, toBalance, {
      delay: 0.6,
      duration: 1,
      ease: [0.1, 0.8, 0.2, 1],
    })

    return () => controls.stop()
  }, [balance, shouldReduceMotion, toBalance])

  const rows: {
    label: string
    value: string
    mono?: boolean
    highlight?: boolean
  }[] = [
    { label: counterpartyLabel, value: counterpartyName },
    { label: 'Reference', value: reference, mono: true },
    { label: 'Status', value: 'Completed', highlight: true },
    { label: 'Date & Time', value: 'Today, 14:32' },
    { label: 'Payment Method', value: method },
    { label: 'Transfer Fee', value: fee },
  ]

  if (note) {
    rows.push({ label: 'Transfer Note', value: note })
  }

  return (
    <DemoScreen>
      <DemoHeader title={headerTitle} />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(styles.successHero)}>
          <DemoSuccessCheck />
          <span {...stylex.props(styles.successTitle)}>{title}</span>
          <motion.div
            {...stylex.props(styles.successAmount)}
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.5,
              ease: [0.1, 0.8, 0.2, 1],
            }}
          >
            <span {...stylex.props(styles.successPrefix)}>{prefix}</span>
            {amount}
          </motion.div>
          <div {...stylex.props(styles.successMeta)}>
            <span {...stylex.props(demoStyles.caption)}>
              {counterpartyLabel}
            </span>
            <span {...stylex.props(demoStyles.strongText)}>
              {counterpartyName}
            </span>
            <span {...stylex.props(demoStyles.caption)}>
              {counterpartyMeta}
            </span>
          </div>
          <Sparkles
            aria-hidden="true"
            size={14}
            {...stylex.props(styles.spark)}
          />
        </div>

        <motion.div
          {...stylex.props(demoStyles.card)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div {...stylex.props(demoStyles.row)}>
            <span {...stylex.props(demoStyles.iconCircleSmall)}>
              <ReceiptText aria-hidden="true" size={13} />
            </span>
            <span {...stylex.props(demoStyles.sectionTitle)}>Receipt</span>
            <span {...stylex.props(demoStyles.grow)} />
            <Download aria-hidden="true" size={12} />
          </div>
          <div {...stylex.props(demoStyles.divider, styles.receiptDivider)} />
          <div {...stylex.props(styles.receiptRows)}>
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.06, duration: 0.3 }}
              >
                <DemoDetailRow
                  label={row.label}
                  value={row.value}
                  mono={row.mono}
                  highlight={row.highlight}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...stylex.props(styles.balanceCard)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <span {...stylex.props(styles.balanceLabel)}>Updated Balance</span>
          {shouldReduceMotion ? (
            <span {...stylex.props(styles.balanceValue)}>
              {formatUsd(toBalance)}
            </span>
          ) : (
            <motion.span {...stylex.props(styles.balanceValue)}>
              {balanceText}
            </motion.span>
          )}
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(styles.balanceWas)}>
              Was {formatUsd(fromBalance)}
            </span>
            <span {...stylex.props(styles.balanceDelta)}>{deltaLabel}</span>
          </div>
        </motion.div>

        <div {...stylex.props(demoStyles.grow)} />

        <DemoPrimaryButton label="Done" />
        <span {...stylex.props(styles.doneHint)}>
          Demo restarts automatically
        </span>
      </div>
    </DemoScreen>
  )
}

function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 13L13 3M13 3H6.5M13 3v6.5" />
    </svg>
  )
}

const styles = stylex.create({
  processingHero: {
    gap: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5rem',
  },
  processingTitle: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
    marginTop: '0.375rem',
  },
  processingDescription: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    lineHeight: '0.8125rem',
    textAlign: 'center',
    maxWidth: '14rem',
  },
  processingAmount: {
    marginBlock: '0.125rem',
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.75rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: '2rem',
  },
  amountPrefix: {
    color: colors.primary,
    marginInlineEnd: '0.0625rem',
  },
  recipientRow: {
    padding: '0.375rem',
    borderRadius: radii.md,
    gap: '0.5rem',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
  },
  accountTag: {
    textAlign: 'end',
  },
  steps: {
    gap: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.5rem',
  },
  step: {
    gap: '0.375rem',
    alignItems: 'flex-start',
    display: 'flex',
  },
  stepIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1rem',
    marginTop: '0.0625rem',
    width: '1rem',
  },
  stepIconComplete: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  stepIconActive: {
    backgroundColor: colors.primaryTint,
  },
  stepDot: {
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    height: '0.3125rem',
    width: '0.3125rem',
  },
  stepDotPending: {
    borderRadius: radii.full,
    backgroundColor: colors.outlineVariant,
    height: '0.25rem',
    width: '0.25rem',
  },
  stepLabel: {
    color: colors.onSurface,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
  },
  securityFooter: {
    gap: '0.25rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '0.75rem',
    textAlign: 'center',
  },
  successHero: {
    gap: '0.125rem',
    paddingBlock: '0.25rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    textAlign: 'center',
  },
  successTitle: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.9375rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
    textWrap: 'balance',
    marginTop: '0.25rem',
  },
  successAmount: {
    color: colors.primary,
    fontFamily: fonts.heading,
    fontSize: '2rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: '2.375rem',
  },
  successPrefix: {
    fontSize: '1.25rem',
  },
  successMeta: {
    gap: '0.0625rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  spark: {
    color: colors.primaryContainer,
    insetInlineEnd: '22%',
    position: 'absolute',
    top: '52%',
  },
  receiptDivider: {
    marginBlock: '0.375rem',
  },
  receiptRows: {
    gap: '0.3125rem',
    display: 'flex',
    flexDirection: 'column',
  },
  balanceCard: {
    padding: '0.625rem',
    borderRadius: radii.lg,
    gap: '0.125rem',
    backgroundColor: colors.primaryTint,
    display: 'flex',
    flexDirection: 'column',
  },
  balanceLabel: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    lineHeight: '0.75rem',
    textTransform: 'uppercase',
  },
  balanceValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: '1.5rem',
  },
  balanceWas: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
  },
  balanceDelta: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 700,
    lineHeight: '0.75rem',
  },
  doneHint: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
    textAlign: 'center',
  },
})
