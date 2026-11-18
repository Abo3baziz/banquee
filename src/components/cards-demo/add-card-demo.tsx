'use client'

import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors } from '../../styles/tokens.stylex'
import { DemoProcessing } from '../banking-demo/demo-feedback'
import type { DemoSequenceStage } from '../banking-demo/demo-sequence'
import { demoStyles } from '../banking-demo/demo-styles'
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
import { DemoCardStatusBadge, DemoCardView } from './cards-card-view'
import {
  NEW_CARD,
  NEW_CARD_DELIVERY,
  NEW_CARD_NUMBER,
  type DemoCard,
  type DemoCardKind,
} from '../../data/cards-demo-data'
import { cardsStyles } from './cards-styles'
import {
  formatExpiryLong,
  formatMaskedCardNumber,
  formatReviewCardNumber,
  getCardTypeLabel,
} from './cards-utils'

type AddCardStage = 'form' | 'review' | 'processing' | 'success'

const ADD_CARD_STAGES: readonly DemoSequenceStage<AddCardStage>[] = [
  { id: 'form', duration: 5400 },
  { id: 'review', duration: 3400 },
  { id: 'processing', duration: 2400 },
  { id: 'success', duration: 3800 },
]

type AddCardDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function AddCardDemo({ paused, reducedMotion }: AddCardDemoProps) {
  const { stage } = useDemoSequence(ADD_CARD_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait">
      {stage === 'form' ? <AddCardForm key="form" /> : null}
      {stage === 'review' ? <ReviewCard key="review" /> : null}
      {stage === 'processing' ? <CardProcessing key="processing" /> : null}
      {stage === 'success' ? <CardAdded key="success" /> : null}
    </AnimatePresence>
  )
}

function AddCardForm() {
  const hasSelectedCredit = useDelayedFlag(900)
  const cardNumber = useTypewriter(NEW_CARD_NUMBER.groups, {
    startDelay: 1250,
    charDelay: 55,
  })
  const cardholder = useTypewriter(NEW_CARD.cardholder, {
    startDelay: 2400,
    charDelay: 48,
  })
  const expiry = useTypewriter(NEW_CARD.expiry, {
    startDelay: 3150,
    charDelay: 120,
  })
  const hasCvv = useDelayedFlag(3400)

  const kind: DemoCardKind = hasSelectedCredit ? 'credit' : 'debit'
  const previewCard: DemoCard = { ...NEW_CARD, kind }

  return (
    <DemoScreen>
      <DemoHeader title="Order New Card" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.cardWrapWide)}>
          <DemoCardView card={previewCard} status="active" />
        </div>

        <div {...stylex.props(cardsStyles.typeToggle)}>
          {(
            [
              { id: 'debit', label: 'Debit Card', icon: Wallet },
              { id: 'credit', label: 'Credit Card', icon: CreditCard },
            ] as const
          ).map((option) => {
            const isActive = kind === option.id
            const Icon = option.icon

            return (
              <span
                key={option.id}
                {...stylex.props(
                  cardsStyles.typeTab,
                  isActive && cardsStyles.typeTabActive,
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="cards-demo-card-type"
                    {...stylex.props(cardsStyles.typePill)}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span {...stylex.props(cardsStyles.typeLabel)}>
                  <Icon aria-hidden="true" size={10} />
                </span>
                <span {...stylex.props(cardsStyles.typeLabel)}>
                  {option.label}
                </span>
              </span>
            )
          })}
        </div>

        <FormField
          label="Card Number"
          hint="Protected via Vault 256-bit"
          value={
            <>
              {cardNumber.text || '•••• •••• •••• ••••'}
              {!cardNumber.complete ? (
                <motion.span
                  {...stylex.props(cardsStyles.fieldCaret)}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                />
              ) : null}
            </>
          }
          mono
          placeholder={!cardNumber.text}
        />

        <FormField
          label="Cardholder Name"
          hint="As printed on the card"
          value={cardholder.text || 'Full name'}
          placeholder={!cardholder.text}
        />

        <div {...stylex.props(cardsStyles.twoColumn)}>
          <FormField
            label="Expiration Date"
            hint="MM/YY"
            value={expiry.text || '—'}
            placeholder={!expiry.text}
          />
          <FormField
            label="Security Code"
            hint="3 digits"
            value={hasCvv ? '•••' : '—'}
            placeholder={!hasCvv}
            mono
          />
        </div>

        <div {...stylex.props(cardsStyles.deliveryRow)}>
          <MapPin
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <div {...stylex.props(cardsStyles.deliveryBody)}>
            <div {...stylex.props(cardsStyles.deliveryTitle)}>
              Billing Address
            </div>
            <span {...stylex.props(cardsStyles.deliveryMeta)}>
              Same as primary account address · 1420 5th Ave, Seattle, WA
            </span>
          </div>
          <DemoChip>Primary</DemoChip>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Continue to Review"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={4.55}
          disabled={!cardNumber.complete}
        />
        <span {...stylex.props(cardsStyles.secureNote)}>
          <LockKeyhole aria-hidden="true" size={10} />
          <span>Instant micro-deposit authorization · No fee</span>
        </span>
      </div>
    </DemoScreen>
  )
}

type FormFieldProps = {
  label: string
  hint: string
  value: ReactNode
  mono?: boolean
  placeholder?: boolean
}

function FormField({
  label,
  hint,
  value,
  mono = false,
  placeholder = false,
}: FormFieldProps) {
  return (
    <div {...stylex.props(cardsStyles.field)}>
      <div {...stylex.props(cardsStyles.fieldHead)}>
        <span {...stylex.props(cardsStyles.fieldLabel)}>{label}</span>
        <span {...stylex.props(cardsStyles.fieldHint)}>{hint}</span>
      </div>
      <div {...stylex.props(cardsStyles.fieldValueRow)}>
        <span
          {...stylex.props(
            cardsStyles.fieldValue,
            mono && demoStyles.mono,
            placeholder && cardsStyles.fieldPlaceholder,
          )}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

function ReviewCard() {
  const rows = [
    {
      label: 'Card Type',
      value: `Physical ${getCardTypeLabel(NEW_CARD.kind)}`,
    },
    {
      label: 'Card Number',
      value: formatReviewCardNumber(
        NEW_CARD_NUMBER.firstFour,
        NEW_CARD_NUMBER.lastFour,
      ),
      mono: true,
    },
    { label: 'Cardholder', value: NEW_CARD.cardholder },
    { label: 'Expiration', value: formatExpiryLong(NEW_CARD.expiry) },
    { label: 'Linked Account', value: NEW_CARD.linkedAccount },
    { label: 'Issuance Fee', value: 'Free ($0.00)', highlight: true },
  ]

  return (
    <DemoScreen>
      <DemoHeader title="Order New Card" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.stepRow)}>
          <span {...stylex.props(cardsStyles.stepBadge)}>2</span>
          <span {...stylex.props(cardsStyles.stepText)}>
            Step 2 of 2 · Final verification
          </span>
          <DemoChip>Ready to issue</DemoChip>
        </div>

        <div {...stylex.props(cardsStyles.cardWrapWide)}>
          <DemoCardView card={NEW_CARD} status="active" />
        </div>

        <div {...stylex.props(cardsStyles.reviewCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>Card Details</span>
            <span {...stylex.props(cardsStyles.limitEdit)}>Edit</span>
          </div>
          <div {...stylex.props(cardsStyles.reviewRows)}>
            {rows.map((row) => (
              <DemoDetailRow
                key={row.label}
                label={row.label}
                value={row.value}
                mono={row.mono}
                highlight={row.highlight}
              />
            ))}
          </div>
        </div>

        <div {...stylex.props(cardsStyles.deliveryRow)}>
          <Truck
            aria-hidden="true"
            size={12}
            style={{ color: colors.primary, flexShrink: 0 }}
          />
          <div {...stylex.props(cardsStyles.deliveryBody)}>
            <div {...stylex.props(cardsStyles.deliveryTitle)}>
              Delivery Address
            </div>
            <span {...stylex.props(cardsStyles.deliveryMeta)}>
              {NEW_CARD_DELIVERY.address}
            </span>
          </div>
          <DemoChip>{NEW_CARD_DELIVERY.window}</DemoChip>
        </div>

        <div {...stylex.props(cardsStyles.secureNote)}>
          <ShieldCheck
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary }}
          />
          <span>256-bit PCI-DSS encrypted card tokenization</span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Confirm and Add Card"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
          pressAt={2.6}
        />
        <span {...stylex.props(cardsStyles.doneHint)}>
          No issuance fee · Cancel anytime
        </span>
      </div>
    </DemoScreen>
  )
}

function CardProcessing() {
  return (
    <DemoProcessing
      headerTitle="Order New Card"
      title="Issuing your new card..."
      description="Generating a secure card token and linking it to your Banquee account. This takes only a moment."
      amount={NEW_CARD.networkLabel}
      prefix=""
      amountLabel="New Card"
      recipientLabel="Linked to"
      recipientName="Banquee Main Checking"
      recipientMeta={`${NEW_CARD.cardholder} · •••• 4289`}
      accountLabel="Visa"
      badge="Issuing"
      steps={[
        {
          label: 'Validating card details',
          detail: 'Identity and billing address confirmed',
          state: 'complete',
        },
        {
          label: 'Generating secure card token',
          detail: 'PCI-DSS vault tokenization in progress',
          state: 'active',
        },
        {
          label: 'Linking to Banquee Checking',
          detail: 'Card will be ready for instant spending',
          state: 'pending',
        },
      ]}
      footer="Protected by 256-bit bank-grade encryption"
    />
  )
}

function CardAdded() {
  const rows = [
    { label: 'Card Type', value: getCardTypeLabel(NEW_CARD.kind) },
    {
      label: 'Card Number',
      value: formatMaskedCardNumber(NEW_CARD.lastFour),
      mono: true,
    },
    { label: 'Cardholder', value: NEW_CARD.cardholder },
    { label: 'Expiration', value: formatExpiryLong(NEW_CARD.expiry) },
    { label: 'Linked Account', value: NEW_CARD.linkedAccount },
  ]

  return (
    <DemoScreen>
      <DemoHeader title="Order New Card" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.successHero)}>
          <DemoSuccessCheck />
          <span {...stylex.props(cardsStyles.successTitle)}>
            Your new card has been added!
          </span>
          <span {...stylex.props(cardsStyles.successText)}>
            Your {NEW_CARD.networkLabel} card is active and ready for in-store
            tap-to-pay and online transactions.
          </span>
        </div>

        <div {...stylex.props(cardsStyles.cardWrap)}>
          <DemoCardView card={NEW_CARD} status="active" />
        </div>

        <div {...stylex.props(cardsStyles.reviewCard)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>Card Details</span>
            <DemoCardStatusBadge status={NEW_CARD.status} />
          </div>
          <div {...stylex.props(cardsStyles.reviewRows)}>
            {rows.map((row) => (
              <DemoDetailRow
                key={row.label}
                label={row.label}
                value={row.value}
                mono={row.mono}
              />
            ))}
          </div>
        </div>

        <div {...stylex.props(cardsStyles.walletRow)}>
          <Smartphone
            aria-hidden="true"
            size={15}
            style={{ color: colors.primary }}
          />
          <div {...stylex.props(cardsStyles.walletBody)}>
            <span {...stylex.props(cardsStyles.walletTitle)}>
              Add to digital wallet
            </span>
            <span {...stylex.props(cardsStyles.walletMeta)}>
              Apple Wallet &amp; Google Pay ready
            </span>
          </div>
          <DemoChip>
            <Check aria-hidden="true" size={9} />
            Ready
          </DemoChip>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="View My Cards"
          icon={<ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />}
        />
        <span {...stylex.props(cardsStyles.doneHint)}>
          Demo restarts automatically
        </span>
      </div>
    </DemoScreen>
  )
}
