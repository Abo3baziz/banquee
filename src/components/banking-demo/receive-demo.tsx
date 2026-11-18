'use client'

import * as stylex from '@stylexjs/stylex'
import {
  ArrowDownLeft,
  ArrowDownToLine,
  BellRing,
  Check,
  Copy,
  Link2,
  QrCode,
  ShieldCheck,
  Verified,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import { DEMO_ACCOUNT, DEMO_RECEIVE } from './demo-data'
import { DemoProcessing, DemoSuccess } from './demo-feedback'
import type { DemoSequenceStage } from './demo-sequence'
import { demoStyles } from './demo-styles'
import { DemoTapIndicator } from './demo-tap-indicator'
import {
  DemoAvatar,
  DemoChip,
  DemoHeader,
  DemoQrCode,
  DemoScreen,
} from './demo-ui'
import { useDelayedFlag } from './use-delayed-flag'
import { useDemoSequence } from './use-demo-sequence'

type ReceiveStage = 'details' | 'incoming' | 'processing' | 'success'

const RECEIVE_STAGES: readonly DemoSequenceStage<ReceiveStage>[] = [
  { id: 'details', duration: 2800 },
  { id: 'incoming', duration: 3200 },
  { id: 'processing', duration: 2200 },
  { id: 'success', duration: 3600 },
]

const RECEIVED_AMOUNT = Number(DEMO_RECEIVE.amount)
const RECEIVE_BALANCE = DEMO_ACCOUNT.balance + RECEIVED_AMOUNT

type ReceiveDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function ReceiveDemo({ paused, reducedMotion }: ReceiveDemoProps) {
  const { stage } = useDemoSequence(RECEIVE_STAGES, {
    paused,
    disabled: reducedMotion,
  })
  const balance = stage === 'success' ? RECEIVE_BALANCE : DEMO_ACCOUNT.balance

  return (
    <AnimatePresence mode="wait" initial={false}>
      {stage === 'details' ? <ReceiveDetails key="details" /> : null}
      {stage === 'incoming' ? <IncomingTransfer key="incoming" /> : null}
      {stage === 'processing' ? <ReceiveProcessing key="processing" /> : null}
      {stage === 'success' ? (
        <DemoSuccess
          key="success"
          headerTitle="Receive Money"
          title="Money received successfully!"
          amount="850.00"
          prefix="+$"
          counterpartyLabel="Received from"
          counterpartyName={DEMO_RECEIVE.sender.name}
          counterpartyMeta={DEMO_RECEIVE.sender.bank}
          reference={DEMO_RECEIVE.reference}
          fromBalance={DEMO_ACCOUNT.balance}
          toBalance={balance}
          deltaLabel="+$850.00"
          method="Banquee Main Checking (•••• 4289)"
          fee="Free ($0.00)"
          note={DEMO_RECEIVE.memo}
        />
      ) : null}
    </AnimatePresence>
  )
}

function ReceiveDetails() {
  return (
    <DemoScreen>
      <DemoHeader title="Receive Money" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.row)}>
            <DemoAvatar initials="PG" size={34} />
            <div {...stylex.props(demoStyles.grow)}>
              <div {...stylex.props(demoStyles.row)}>
                <span {...stylex.props(demoStyles.strongText)}>
                  {DEMO_RECEIVE.accountHolder}
                </span>
                <Verified
                  aria-hidden="true"
                  size={11}
                  {...stylex.props(styles.verified)}
                />
              </div>
              <span {...stylex.props(demoStyles.caption)}>
                Banquee Checking • {DEMO_ACCOUNT.last4}
              </span>
            </div>
            <DemoChip>Primary</DemoChip>
          </div>
          <div {...stylex.props(demoStyles.divider, styles.detailsDivider)} />
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>Available Balance</span>
            <span {...stylex.props(styles.availableBalance)}>
              $
              {DEMO_ACCOUNT.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(styles.qrHeader)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>Your QR Code</span>
            <QrCode aria-hidden="true" size={13} />
          </div>
          <div {...stylex.props(styles.qrArea)}>
            <DemoQrCode />
          </div>
          <p {...stylex.props(styles.qrHint)}>
            Scan with any banking app or the Banquee camera to pay directly.
          </p>
          <div {...stylex.props(styles.qrActions)}>
            <span {...stylex.props(styles.qrAction)}>
              <Link2 aria-hidden="true" size={11} />
              Copy Link
            </span>
            <span {...stylex.props(styles.qrAction)}>
              <ArrowDownToLine aria-hidden="true" size={11} />
              Save Code
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>Bank Details</span>
            <span {...stylex.props(demoStyles.caption)}>USD · Fedwire</span>
          </div>
          <div {...stylex.props(styles.bankRows)}>
            {[
              { label: 'Account Number', value: DEMO_RECEIVE.accountNumber },
              { label: 'IBAN', value: DEMO_RECEIVE.iban },
              { label: 'SWIFT / BIC', value: 'BQEEUS33' },
            ].map((row) => (
              <div key={row.label} {...stylex.props(demoStyles.rowBetween)}>
                <div {...stylex.props(demoStyles.grow)}>
                  <span {...stylex.props(demoStyles.caption)}>{row.label}</span>
                  <div
                    dir="ltr"
                    {...stylex.props(styles.bankValue, demoStyles.mono)}
                  >
                    {row.value}
                  </div>
                </div>
                <span {...stylex.props(styles.copyButton)}>
                  <Copy aria-hidden="true" size={11} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div {...stylex.props(styles.instantNote)}>
          <ZapIcon />
          <span>
            Payments via Banquee ID or QR code arrive instantly with zero fees.
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Activity Highlights
            </span>
            <span {...stylex.props(demoStyles.caption)}>Auto-credited</span>
          </div>
          <div {...stylex.props(styles.activity)}>
            <div {...stylex.props(demoStyles.row)}>
              <span {...stylex.props(demoStyles.iconCircleSmall)}>
                <ArrowDownLeft aria-hidden="true" size={12} />
              </span>
              <div>
                <span {...stylex.props(demoStyles.strongText)}>
                  {DEMO_RECEIVE.sender.name}
                </span>
                <div {...stylex.props(demoStyles.caption)}>
                  Yesterday • Direct Deposit
                </div>
              </div>
            </div>
            <span {...stylex.props(styles.activityAmount)}>+$250.00</span>
          </div>
        </div>
      </div>
    </DemoScreen>
  )
}

function IncomingTransfer() {
  const settled = useDelayedFlag(1900)

  return (
    <DemoScreen>
      <DemoHeader title="Receive Money" />
      <div {...stylex.props(demoStyles.body)}>
        <motion.div
          {...stylex.props(styles.notification)}
          initial={{ opacity: 0, y: -26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.45, ease: [0.1, 0.8, 0.2, 1] }}
        >
          <span {...stylex.props(styles.notificationIcon)}>
            <BellRing aria-hidden="true" size={14} />
          </span>
          <div {...stylex.props(demoStyles.grow)}>
            <span {...stylex.props(styles.notificationLabel)}>
              Incoming Instant Transfer
            </span>
            <span {...stylex.props(demoStyles.strongText)}>
              {DEMO_RECEIVE.sender.name}
            </span>
          </div>
          <motion.span
            {...stylex.props(styles.notificationAmount)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            +$850.00
          </motion.span>
        </motion.div>

        <motion.div
          {...stylex.props(styles.incomingCard)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
        >
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>Transfer Amount</span>
            <motion.span
              animate={{
                backgroundColor: settled
                  ? colors.primary
                  : colors.surfaceContainerHigh,
                color: settled ? colors.onPrimary : colors.onSurfaceVariant,
              }}
              transition={{ duration: 0.35 }}
              {...stylex.props(styles.statusChip)}
            >
              {settled ? 'Settled' : 'In Transit'}
            </motion.span>
          </div>
          <div {...stylex.props(styles.incomingAmount)}>+$850.00</div>
          <span {...stylex.props(demoStyles.caption)}>
            Instant transfer from {DEMO_RECEIVE.sender.name}
          </span>
          <div {...stylex.props(demoStyles.divider, styles.incomingDivider)} />
          <div {...stylex.props(styles.incomingRows)}>
            <div {...stylex.props(demoStyles.rowBetween)}>
              <span {...stylex.props(demoStyles.caption)}>Sender</span>
              <span {...stylex.props(demoStyles.strongText)}>
                {DEMO_RECEIVE.sender.name}
              </span>
            </div>
            <div {...stylex.props(demoStyles.rowBetween)}>
              <span {...stylex.props(demoStyles.caption)}>Bank</span>
              <span {...stylex.props(demoStyles.strongText)}>
                {DEMO_RECEIVE.sender.bank}
              </span>
            </div>
            <div {...stylex.props(demoStyles.rowBetween)}>
              <span {...stylex.props(demoStyles.caption)}>Corridor</span>
              <span {...stylex.props(demoStyles.strongText)}>
                Banquee Instant
              </span>
            </div>
          </div>
        </motion.div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>Reference Memo</span>
            <span {...stylex.props(demoStyles.caption)}>Just now</span>
          </div>
          <motion.div
            {...stylex.props(styles.memo)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.35 }}
          >
            {DEMO_RECEIVE.memo}
          </motion.div>
          <div {...stylex.props(styles.clearingRow)}>
            <ShieldCheck aria-hidden="true" size={11} />
            <span>
              {settled
                ? 'Funds cleared and added to your available balance.'
                : 'Awaiting automatic ledger settlement (est. < 15s).'}
            </span>
          </div>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <motion.div
          {...stylex.props(demoStyles.primaryButton)}
          animate={{ scale: [1, 0.965, 1] }}
          transition={{ delay: 2.5, duration: 0.45, times: [0, 0.35, 1] }}
        >
          <span>Acknowledge &amp; View Details</span>
          <Check aria-hidden="true" size={14} strokeWidth={2.6} />
        </motion.div>
      </div>
      <DemoTapIndicator x={22} y={92} delay={2.45} />
    </DemoScreen>
  )
}

function ReceiveProcessing() {
  return (
    <DemoProcessing
      headerTitle="Receive Money"
      title="Receiving your payment..."
      description="Depositing $850.00 from Sarah Johnson directly into your Banquee Checking account."
      amount="850.00"
      prefix="+$"
      amountLabel="Incoming Amount"
      recipientLabel="From"
      recipientName={DEMO_RECEIVE.sender.name}
      recipientMeta={DEMO_RECEIVE.sender.bank}
      accountLabel="Banquee Checking"
      badge="In Transit"
      steps={[
        {
          label: 'Clearing network authorization',
          detail: 'Validated via instant settlement',
          state: 'complete',
        },
        {
          label: 'Crediting ledger account',
          detail: 'Allocating vault reserve tokens',
          state: 'active',
        },
        {
          label: 'Updating available balance',
          detail: 'Ready for instant spend & transfers',
          state: 'pending',
        },
      ]}
      footer="Protected by the Banquee insured escrow network"
    />
  )
}

function ZapIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="currentColor"
    >
      <path d="M9.2 1L3 9.2h3.2L6.8 15 13 6.8H9.8L9.2 1z" />
    </svg>
  )
}

const styles = stylex.create({
  verified: {
    color: colors.primary,
    flexShrink: 0,
  },
  detailsDivider: {
    marginBlock: '0.5rem',
  },
  availableBalance: {
    color: colors.primary,
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  qrHeader: {
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    justifyContent: 'space-between',
  },
  qrArea: {
    paddingBlock: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  qrHint: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.75rem',
    textAlign: 'center',
  },
  qrActions: {
    gap: '0.375rem',
    display: 'flex',
    marginTop: '0.5rem',
  },
  qrAction: {
    borderRadius: radii.md,
    gap: '0.25rem',
    paddingBlock: '0.375rem',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    color: colors.onSurface,
    display: 'flex',
    flexGrow: 1,
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 600,
    justifyContent: 'center',
    lineHeight: '0.75rem',
  },
  bankRows: {
    gap: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.375rem',
  },
  bankValue: {
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.5625rem',
    fontWeight: 600,
    lineHeight: '0.8125rem',
  },
  copyButton: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1.25rem',
    width: '1.25rem',
  },
  instantNote: {
    gap: '0.375rem',
    paddingInline: '0.125rem',
    alignItems: 'center',
    color: colors.primary,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 600,
    lineHeight: '0.75rem',
  },
  activity: {
    gap: '0.5rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.375rem',
  },
  activityAmount: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    lineHeight: '0.875rem',
  },
  notification: {
    padding: '0.5rem',
    borderColor: colors.primaryContainer,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: '0.5rem',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 6px 16px rgba(0, 107, 92, 0.14)',
    display: 'flex',
  },
  notificationIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primary,
    color: colors.onPrimary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1.625rem',
    width: '1.625rem',
  },
  notificationLabel: {
    color: colors.primary,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    lineHeight: '0.6875rem',
    textTransform: 'uppercase',
  },
  notificationAmount: {
    color: colors.primary,
    flexShrink: 0,
    fontFamily: fonts.heading,
    fontSize: '0.9375rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  incomingCard: {
    padding: '0.625rem',
    borderRadius: radii.lg,
    backgroundColor: colors.primaryTint,
    boxShadow: 'inset 0 0 0 1px rgba(0, 107, 92, 0.14)',
  },
  statusChip: {
    borderRadius: radii.full,
    paddingBlock: '0.125rem',
    paddingInline: '0.375rem',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 700,
    lineHeight: '0.6875rem',
  },
  incomingAmount: {
    color: colors.primary,
    fontFamily: fonts.heading,
    fontSize: '1.75rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: '2rem',
  },
  incomingDivider: {
    marginBlock: '0.375rem',
  },
  incomingRows: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
  },
  memo: {
    marginBlock: '0.25rem',
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    lineHeight: '0.875rem',
  },
  clearingRow: {
    gap: '0.25rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.75rem',
  },
})
