'use client'

import * as stylex from '@stylexjs/stylex'
import {
  ArrowDownLeft,
  ArrowRight,
  Check,
  EllipsisVertical,
  Fingerprint,
  Laptop,
  LockKeyhole,
  Search,
  ShoppingBag,
  Verified,
  Wallet,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCurrency } from '../../hooks/use-currency'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import {
  DEMO_ACCOUNT,
  DEMO_ACTIVITY,
  DEMO_RECIPIENTS,
  DEMO_SEND,
} from './demo-data'
import { DemoProcessing, DemoSuccess } from './demo-feedback'
import type { DemoSequenceStage } from './demo-sequence'
import { demoStyles } from './demo-styles'
import {
  DemoFingerGesture,
  DemoTapIndicator,
  demoButtonFinger,
} from './demo-tap-indicator'
import {
  DemoAvatar,
  DemoChip,
  DemoHeader,
  DemoPrimaryButton,
  DemoScreen,
} from './demo-ui'
import { useDelayedFlag } from './use-delayed-flag'
import { useDemoSequence } from './use-demo-sequence'
import { useTypewriter } from './use-typewriter'

type SendStage =
  'overview' | 'recipients' | 'amount' | 'review' | 'processing' | 'success'

const SEND_STAGES: readonly DemoSequenceStage<SendStage>[] = [
  { id: 'overview', duration: 2300 },
  { id: 'recipients', duration: 2700 },
  { id: 'amount', duration: 3400 },
  { id: 'review', duration: 3000 },
  { id: 'processing', duration: 2200 },
  { id: 'success', duration: 3500 },
]

const SENT_AMOUNT = Number(DEMO_SEND.amount)

/** Milliseconds after the stage starts when the Sarah row becomes selected. */
const RECIPIENT_SELECTED_AT_MS = 1150
/** Seconds after the stage starts when the confirm button is pressed. */
const CONFIRM_PRESS_AT = 2.2

type SendDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function SendDemo({ paused, reducedMotion }: SendDemoProps) {
  const { stage } = useDemoSequence(SEND_STAGES, {
    paused,
    disabled: reducedMotion,
  })
  const balance =
    stage === 'success'
      ? DEMO_ACCOUNT.balance - SENT_AMOUNT
      : DEMO_ACCOUNT.balance

  return (
    <AnimatePresence mode="wait">
      {stage === 'overview' ? <SendOverview key="overview" /> : null}
      {stage === 'recipients' ? <SelectRecipient key="recipients" /> : null}
      {stage === 'amount' ? <AmountEntry key="amount" /> : null}
      {stage === 'review' ? <TransferReview key="review" /> : null}
      {stage === 'processing' ? <SendProcessing key="processing" /> : null}
      {stage === 'success' ? (
        <DemoSuccess
          key="success"
          headerTitle="Send Money"
          title="Transfer sent successfully!"
          amount={SENT_AMOUNT}
          counterpartyLabel="Sent to"
          counterpartyName={DEMO_SEND.recipient.name}
          counterpartyMeta={DEMO_SEND.recipient.bank}
          reference={DEMO_SEND.reference}
          fromBalance={DEMO_ACCOUNT.balance}
          toBalance={balance}
          delta={-SENT_AMOUNT}
          method="Main Checking (•••• 4289)"
          feeAmount={0}
          note={DEMO_SEND.note}
        />
      ) : null}
    </AnimatePresence>
  )
}

function SendOverview() {
  const { formatCurrency, symbol } = useCurrency()

  return (
    <DemoScreen>
      <DemoHeader title="Send Money" />
      <div {...stylex.props(demoStyles.body)}>
        <div {...stylex.props(demoStyles.mutedCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <div {...stylex.props(demoStyles.row)}>
              <span {...stylex.props(demoStyles.iconCircleSmall)}>
                <Wallet aria-hidden="true" size={13} />
              </span>
              <div {...stylex.props(demoStyles.grow)}>
                <span {...stylex.props(demoStyles.caption)}>From Account</span>
                <div
                  {...stylex.props(demoStyles.strongText, demoStyles.truncate)}
                >
                  {DEMO_ACCOUNT.name} (••{DEMO_ACCOUNT.last4})
                </div>
              </div>
            </div>
            <div {...stylex.props(styles.accountAmount)}>
              <span {...stylex.props(styles.accountBalance)}>
                {formatCurrency(DEMO_ACCOUNT.balance)}
              </span>
              <span {...stylex.props(demoStyles.caption)}>Available</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.amountBlock)}>
          <DemoChip>
            <Verified aria-hidden="true" size={9} />
            No FX Fee
          </DemoChip>
          <div {...stylex.props(styles.amount)}>
            <span {...stylex.props(styles.amountSymbol)}>{symbol}</span>
            450.00
          </div>
          <span {...stylex.props(demoStyles.caption)}>
            Instant free transfer · Arrives in seconds
          </span>
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>
              Frequent Recipients
            </span>
            <span {...stylex.props(demoStyles.link)}>Search</span>
          </div>
          <div {...stylex.props(styles.recipientStrip)}>
            {DEMO_RECIPIENTS.map((recipient, index) => (
              <div key={recipient.id} {...stylex.props(styles.recipient)}>
                <DemoAvatar
                  initials={recipient.initials}
                  tone={recipient.tone}
                  size={34}
                  ring={index === 0}
                />
                <span
                  {...stylex.props(
                    styles.recipientName,
                    index === 0 && styles.recipientNameActive,
                  )}
                >
                  {recipient.name.split(' ')[0]} {recipient.name[0]}
                </span>
              </div>
            ))}
            <div {...stylex.props(styles.recipient)}>
              <span {...stylex.props(styles.addRecipient)}>
                <span aria-hidden="true">+</span>
              </span>
              <span {...stylex.props(styles.recipientName)}>Add New</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(demoStyles.mutedCard)}>
          <div {...stylex.props(demoStyles.row)}>
            <span {...stylex.props(demoStyles.iconCircleSmall)}>
              <Check aria-hidden="true" size={13} strokeWidth={3} />
            </span>
            <div {...stylex.props(demoStyles.grow)}>
              <div {...stylex.props(demoStyles.row)}>
                <span {...stylex.props(demoStyles.strongText)}>
                  {DEMO_SEND.recipient.name}
                </span>
                <Verified
                  aria-hidden="true"
                  size={11}
                  {...stylex.props(styles.verified)}
                />
              </div>
              <span {...stylex.props(demoStyles.caption)}>
                {DEMO_SEND.recipient.meta} • **** 8821
              </span>
            </div>
            <EllipsisVertical
              aria-hidden="true"
              size={14}
              {...stylex.props(styles.mutedIcon)}
            />
          </div>
        </div>

        <div {...stylex.props(demoStyles.primaryButton)}>
          <span>Send Funds Instantly</span>
          <ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Recent Activity
            </span>
            <span {...stylex.props(demoStyles.link)}>View All</span>
          </div>
          <div {...stylex.props(styles.activityList)}>
            {DEMO_ACTIVITY.map((activity) => (
              <div key={activity.id} {...stylex.props(styles.activity)}>
                <div {...stylex.props(demoStyles.row)}>
                  <span
                    {...stylex.props(
                      demoStyles.iconCircle,
                      activity.id === 'apple' && styles.activityNeutral,
                      activity.id === 'amazon' && styles.activityTertiary,
                    )}
                  >
                    {activity.id === 'apple' ? (
                      <Laptop aria-hidden="true" size={13} />
                    ) : null}
                    {activity.id === 'sarah' ? (
                      <ArrowDownLeft aria-hidden="true" size={13} />
                    ) : null}
                    {activity.id === 'amazon' ? (
                      <ShoppingBag aria-hidden="true" size={13} />
                    ) : null}
                  </span>
                  <div>
                    <div {...stylex.props(demoStyles.strongText)}>
                      {activity.name}
                    </div>
                    <div {...stylex.props(styles.activityMeta)}>
                      <span>{activity.meta}</span>
                      <span aria-hidden="true">•</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
                <div {...stylex.props(styles.activityAmountGroup)}>
                  <span
                    {...stylex.props(
                      styles.activityAmount,
                      activity.id === 'sarah' && demoStyles.detailValuePrimary,
                    )}
                  >
                    {formatCurrency(activity.amount, {
                      signDisplay: 'always',
                    })}
                  </span>
                  <span {...stylex.props(demoStyles.caption)}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoScreen>
  )
}

function SelectRecipient() {
  const hasSelected = useDelayedFlag(RECIPIENT_SELECTED_AT_MS)
  const selected = hasSelected ? 'sarah' : null

  const selectedRecipient = DEMO_RECIPIENTS.find(
    (recipient) => recipient.id === selected,
  )

  return (
    <DemoScreen>
      <DemoHeader title="Send Money" />
      <div {...stylex.props(demoStyles.body)}>
        <div {...stylex.props(styles.searchBar)}>
          <Search aria-hidden="true" size={13} />
          <span>Search name, bank or email</span>
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.caption)}>Frequent Contacts</span>
            <span {...stylex.props(demoStyles.link)}>View recent</span>
          </div>
          <div {...stylex.props(styles.frequentRow)}>
            {DEMO_RECIPIENTS.map((recipient) => (
              <div key={recipient.id} {...stylex.props(styles.recipient)}>
                <DemoAvatar
                  initials={recipient.initials}
                  tone={recipient.tone}
                  size={32}
                />
                <span {...stylex.props(styles.recipientName)}>
                  {recipient.name.split(' ')[0]}
                </span>
              </div>
            ))}
            <div {...stylex.props(styles.recipient)}>
              <span {...stylex.props(styles.addRecipient)}>
                <span aria-hidden="true">+</span>
              </span>
              <span {...stylex.props(styles.recipientName)}>New</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.sectionTitle)}>
            All Contacts (4)
          </span>
          <span {...stylex.props(demoStyles.caption)}>Sorted by recent</span>
        </div>

        <div {...stylex.props(styles.contactList)}>
          {DEMO_RECIPIENTS.map((recipient) => {
            const isSelected = recipient.id === selected

            return (
              <motion.div
                key={recipient.id}
                {...stylex.props(
                  styles.contactRow,
                  isSelected && styles.contactRowSelected,
                )}
                animate={{
                  backgroundColor: isSelected
                    ? colors.primaryTint
                    : 'rgba(255, 255, 255, 0)',
                }}
                transition={{ duration: 0.3 }}
              >
                <DemoAvatar
                  initials={recipient.initials}
                  tone={recipient.tone}
                  size={28}
                />
                <div {...stylex.props(demoStyles.grow)}>
                  <div {...stylex.props(demoStyles.row)}>
                    <span {...stylex.props(demoStyles.strongText)}>
                      {recipient.name}
                    </span>
                    <Verified
                      aria-hidden="true"
                      size={10}
                      {...stylex.props(styles.verified)}
                    />
                  </div>
                  <span {...stylex.props(demoStyles.caption)}>
                    {recipient.bank} • {recipient.meta}
                  </span>
                </div>
                <span
                  {...stylex.props(
                    styles.selectCircle,
                    isSelected && styles.selectCircleActive,
                  )}
                >
                  {isSelected ? (
                    <Check aria-hidden="true" size={10} strokeWidth={3} />
                  ) : null}
                </span>
              </motion.div>
            )
          })}
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <div
          {...stylex.props(
            demoStyles.primaryButton,
            !selectedRecipient && styles.primaryButtonIdle,
          )}
        >
          <span>
            {selectedRecipient
              ? `Continue with ${selectedRecipient.name}`
              : 'Select a recipient'}
          </span>
          <ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />
        </div>
      </div>
      {/*
       * A contact row is not a primary button, so the gesture is standalone.
       * The fingertip lands in the middle of the Sarah row at the exact moment
       * the row highlights.
       */}
      <DemoTapIndicator
        x={40}
        y={34}
        contactDelay={RECIPIENT_SELECTED_AT_MS / 1000}
      />
    </DemoScreen>
  )
}

function AmountEntry() {
  const { formatCurrency, symbol } = useCurrency()
  const { text, complete } = useTypewriter(DEMO_SEND.amount, {
    startDelay: 500,
    charDelay: 115,
  })

  return (
    <DemoScreen>
      <DemoHeader title="Send Money" />
      <div {...stylex.props(demoStyles.body)}>
        <div {...stylex.props(styles.selectedRecipient)}>
          <DemoAvatar
            initials={DEMO_SEND.recipient.initials}
            tone={DEMO_SEND.recipient.tone}
            size={30}
          />
          <div {...stylex.props(demoStyles.grow)}>
            <div {...stylex.props(demoStyles.row)}>
              <span {...stylex.props(demoStyles.strongText)}>
                {DEMO_SEND.recipient.name}
              </span>
              <Verified
                aria-hidden="true"
                size={10}
                {...stylex.props(styles.verified)}
              />
            </div>
            <span {...stylex.props(demoStyles.caption)}>
              {DEMO_SEND.recipient.bank}
            </span>
          </div>
          <span {...stylex.props(demoStyles.link)}>Change</span>
        </div>

        <div {...stylex.props(styles.entryBlock)}>
          <div {...stylex.props(styles.entryAmount)}>
            <span {...stylex.props(styles.entrySymbol)}>{symbol}</span>
            <span {...stylex.props(demoStyles.number)}>
              {text || '0'}
              {!complete ? (
                <motion.span
                  {...stylex.props(styles.caret)}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                />
              ) : null}
            </span>
          </div>
          <span {...stylex.props(demoStyles.caption)}>
            Available: {formatCurrency(DEMO_ACCOUNT.balance)}
          </span>
        </div>

        <motion.div
          {...stylex.props(styles.feeRow)}
          initial={{ opacity: 0, y: 5 }}
          animate={complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div {...stylex.props(demoStyles.row)}>
            <Zap aria-hidden="true" size={10} {...stylex.props(styles.zap)} />
            <span {...stylex.props(demoStyles.caption)}>Transfer Fee:</span>
            <span {...stylex.props(styles.feeValue)}>{formatCurrency(0)}</span>
            <span {...stylex.props(demoStyles.caption)}>(Free Instant)</span>
          </div>
          <div {...stylex.props(styles.totalRow)}>
            <span {...stylex.props(demoStyles.caption)}>Total</span>
            <motion.span
              key={complete ? 'complete' : 'pending'}
              {...stylex.props(demoStyles.strongText)}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {complete ? formatCurrency(SENT_AMOUNT) : formatCurrency(0)}
            </motion.span>
          </div>
        </motion.div>

        <div {...stylex.props(styles.keypad)}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '•', '0', '⌫'].map(
            (key) => (
              <span key={key} {...stylex.props(styles.key)}>
                {key}
              </span>
            ),
          )}
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Continue to Review"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={2.4}
        />
      </div>
    </DemoScreen>
  )
}

function TransferReview() {
  const { formatCurrency } = useCurrency()
  const rows = [
    {
      label: 'Recipient',
      value: `${DEMO_SEND.recipient.name} · ${DEMO_SEND.recipient.bank}`,
    },
    {
      label: 'From Account',
      value: 'Banquee Main Checking · 4289',
    },
    { label: 'Transfer Amount', value: formatCurrency(SENT_AMOUNT) },
    { label: 'Transfer Fee', value: formatCurrency(0), highlight: true },
    { label: 'Estimated Delivery', value: DEMO_SEND.delivery },
    { label: 'Transfer Note', value: DEMO_SEND.note },
  ]

  return (
    <DemoScreen>
      <DemoHeader title="Send Money" />
      <div {...stylex.props(demoStyles.body)}>
        <motion.div
          {...stylex.props(styles.reviewHero)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div {...stylex.props(demoStyles.rowBetween)}>
            <DemoChip>
              <Zap aria-hidden="true" size={9} />
              Zero Fee
            </DemoChip>
            <span {...stylex.props(demoStyles.caption)}>Ready instantly</span>
          </div>
          <div {...stylex.props(styles.reviewHeroBody)}>
            <span {...stylex.props(demoStyles.caption)}>Sending</span>
            <span {...stylex.props(styles.reviewRecipient)}>
              {DEMO_SEND.recipient.name}
            </span>
          </div>
          <div {...stylex.props(styles.reviewTotal)}>
            {formatCurrency(SENT_AMOUNT)}
          </div>
        </motion.div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(styles.reviewRows)}>
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + index * 0.06,
                  duration: 0.3,
                }}
              >
                <div {...stylex.props(demoStyles.rowBetween)}>
                  <span {...stylex.props(demoStyles.detailLabel)}>
                    {row.label}
                  </span>
                  <span
                    {...stylex.props(
                      demoStyles.detailValue,
                      row.highlight && demoStyles.detailValuePrimary,
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              </motion.div>
            ))}
            <div {...stylex.props(demoStyles.divider)} />
            <div {...stylex.props(demoStyles.rowBetween)}>
              <span {...stylex.props(demoStyles.strongText)}>
                Total to Deduct
              </span>
              <span {...stylex.props(styles.reviewDeduct)}>
                {formatCurrency(SENT_AMOUNT)}
              </span>
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.encryptionRow)}>
          <LockKeyhole aria-hidden="true" size={11} />
          <span>256-bit encrypted · Protected by Banquee SafePay</span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        {/*
         * The button is a custom layout with the fingerprint icon leading the
         * label, so it cannot be a DemoPrimaryButton. It renders the shared
         * gesture itself with the button placement preset.
         */}
        <motion.div
          {...stylex.props(demoStyles.primaryButton, styles.confirmButton)}
          animate={{ scale: [1, 0.965, 1] }}
          transition={{
            delay: CONFIRM_PRESS_AT,
            duration: 0.45,
            times: [0, 0.35, 1],
          }}
        >
          <Fingerprint aria-hidden="true" size={15} />
          <span>Confirm &amp; Send {formatCurrency(SENT_AMOUNT)}</span>
          <DemoFingerGesture
            x={50}
            y={50}
            contactAt={CONFIRM_PRESS_AT}
            angle={demoButtonFinger.angle}
            size={demoButtonFinger.size}
            entryX={demoButtonFinger.entryX}
            entryY={demoButtonFinger.entryY}
          />
        </motion.div>
        <span {...stylex.props(styles.confirmHint)}>
          FaceID or biometric confirmation
        </span>
      </div>
    </DemoScreen>
  )
}

export function SendProcessing() {
  const { formatCurrency } = useCurrency()

  return (
    <DemoProcessing
      headerTitle="Send Money"
      title="Sending your payment..."
      description="Securely communicating with the recipient bank network. Please do not close the app."
      amount={formatCurrency(SENT_AMOUNT)}
      prefix=""
      amountLabel="Transfer Amount"
      recipientLabel="To"
      recipientName={DEMO_SEND.recipient.name}
      recipientMeta={DEMO_SEND.recipient.bank}
      accountLabel="Banquee Checking"
      badge="Verifying ledger..."
      steps={[
        {
          label: 'Identity verified',
          detail: 'Biometric clearance confirmed',
          state: 'complete',
        },
        {
          label: 'Initiating corridor transfer',
          detail: 'Routing via instant payment network',
          state: 'active',
        },
        {
          label: 'Updating recipient balance',
          detail: 'Instant ledger settlement',
          state: 'pending',
        },
      ]}
      footer="End-to-end 256-bit encrypted transaction"
    />
  )
}

const styles = stylex.create({
  accountAmount: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  accountBalance: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    lineHeight: '0.9375rem',
  },
  amountBlock: {
    gap: '0.25rem',
    paddingBlock: '0.125rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  amount: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '2.5rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: '2.75rem',
  },
  amountSymbol: {
    color: colors.primaryContainer,
    fontSize: '1.5rem',
    marginInlineEnd: '0.125rem',
  },
  recipientStrip: {
    gap: '0.625rem',
    alignItems: 'flex-start',
    display: 'flex',
    paddingTop: '0.375rem',
  },
  recipient: {
    gap: '0.1875rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: '2.75rem',
  },
  recipientName: {
    overflow: 'hidden',
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '3.25rem',
  },
  recipientNameActive: {
    color: colors.onSurface,
    fontWeight: 600,
  },
  addRecipient: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurface,
    display: 'flex',
    fontSize: '0.875rem',
    justifyContent: 'center',
    lineHeight: 1,
    height: '2.125rem',
    width: '2.125rem',
  },
  verified: {
    color: colors.primary,
    flexShrink: 0,
  },
  mutedIcon: {
    color: colors.onSurfaceVariant,
    flexShrink: 0,
  },
  activityList: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.25rem',
  },
  activity: {
    padding: '0.375rem',
    borderRadius: radii.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'space-between',
  },
  activityNeutral: {
    backgroundColor: colors.surfaceContainerHigh,
    color: colors.onSurfaceVariant,
  },
  activityTertiary: {
    backgroundColor: 'rgba(241, 223, 223, 0.5)',
    color: colors.tertiary,
  },
  activityMeta: {
    gap: '0.1875rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
  },
  activityAmountGroup: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  activityAmount: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    lineHeight: '0.875rem',
  },
  searchBar: {
    borderRadius: radii.md,
    gap: '0.375rem',
    paddingBlock: '0.4375rem',
    paddingInline: '0.625rem',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 500,
    lineHeight: '0.75rem',
  },
  frequentRow: {
    gap: '0.625rem',
    display: 'flex',
    paddingTop: '0.375rem',
  },
  contactList: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
  },
  contactRow: {
    padding: '0.375rem',
    borderRadius: radii.md,
    gap: '0.5rem',
    alignItems: 'center',
    display: 'flex',
  },
  contactRowSelected: {
    boxShadow: `inset 0 0 0 1px ${colors.primaryContainer}`,
  },
  selectCircle: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    color: colors.surfaceLight,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1.125rem',
    width: '1.125rem',
  },
  selectCircleActive: {
    backgroundColor: colors.primary,
  },
  primaryButtonIdle: {
    backgroundColor: colors.surfaceContainerHigh,
    color: colors.onSurfaceVariant,
  },
  selectedRecipient: {
    padding: '0.5rem',
    borderRadius: radii.md,
    gap: '0.5rem',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    display: 'flex',
  },
  entryBlock: {
    gap: '0.125rem',
    paddingBlock: '0.375rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  entryAmount: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '2.25rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.04em',
    lineHeight: '2.625rem',
  },
  entrySymbol: {
    color: colors.primaryContainer,
    fontSize: '1.25rem',
    marginInlineEnd: '0.125rem',
  },
  caret: {
    backgroundColor: colors.primary,
    display: 'inline-block',
    marginInlineStart: '1px',
    verticalAlign: '-0.125rem',
    height: '1.75rem',
    width: 2,
  },
  feeRow: {
    borderRadius: radii.md,
    gap: '0.1875rem',
    paddingBlock: '0.375rem',
    paddingInline: '0.625rem',
    backgroundColor: colors.primaryTint,
    display: 'flex',
    flexDirection: 'column',
  },
  zap: {
    color: colors.primary,
  },
  feeValue: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.5625rem',
    fontWeight: 700,
    lineHeight: '0.75rem',
  },
  totalRow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderTopColor: 'rgba(0, 107, 92, 0.12)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: '0.1875rem',
  },
  keypad: {
    gap: '0.25rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    marginTop: '0.125rem',
  },
  key: {
    borderRadius: radii.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    color: colors.onSurface,
    display: 'flex',
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 600,
    justifyContent: 'center',
    lineHeight: 1,
    height: '1.875rem',
  },
  reviewHero: {
    padding: '0.75rem',
    borderRadius: radii.lg,
    gap: '0.375rem',
    backgroundColor: colors.primaryTint,
    display: 'flex',
    flexDirection: 'column',
  },
  reviewHeroBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  reviewRecipient: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  reviewTotal: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.75rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: '2rem',
  },
  reviewRows: {
    gap: '0.3125rem',
    display: 'flex',
    flexDirection: 'column',
  },
  reviewDeduct: {
    color: colors.primary,
    fontFamily: fonts.heading,
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  encryptionRow: {
    gap: '0.25rem',
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '0.75rem',
  },
  confirmButton: {
    gap: '0.375rem',
    position: 'relative',
  },
  confirmHint: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
    textAlign: 'center',
  },
})
