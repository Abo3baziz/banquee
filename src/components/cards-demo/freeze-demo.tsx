'use client'

import * as stylex from '@stylexjs/stylex'
import type { LucideIcon } from 'lucide-react'
import {
  Check,
  Coffee,
  CreditCard,
  Eye,
  Laptop,
  Lock,
  LockOpen,
  Play,
  Plus,
  Settings2,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Snowflake,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { colors } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'
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
import { DemoCardStatusBadge, DemoCardView } from './cards-card-view'
import {
  CARD_ACTIVITY,
  FREEZE_CARD,
  SECONDARY_CARD,
  type DemoCardStatus,
} from '../../data/cards-demo-data'
import { cardsStyles } from './cards-styles'
import { formatMaskedCardNumber, getCardStatusLabel } from './cards-utils'

type FreezeStage = 'myCards' | 'confirm' | 'processing' | 'frozen' | 'unfreeze'

const FREEZE_STAGES: readonly DemoSequenceStage<FreezeStage>[] = [
  { id: 'myCards', duration: 3400 },
  { id: 'confirm', duration: 3000 },
  { id: 'processing', duration: 2300 },
  { id: 'frozen', duration: 3400 },
  { id: 'unfreeze', duration: 3700 },
]

const ACTIVITY_ICONS: Record<(typeof CARD_ACTIVITY)[number]['id'], LucideIcon> =
  {
    netflix: Play,
    coffee: Coffee,
    apple: Laptop,
  }

type FreezeDemoProps = {
  paused: boolean
  reducedMotion: boolean
}

export function FreezeDemo({ paused, reducedMotion }: FreezeDemoProps) {
  const { stage } = useDemoSequence(FREEZE_STAGES, {
    paused,
    disabled: reducedMotion,
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      {stage === 'myCards' ? <MyCards key="my-cards" /> : null}
      {stage === 'confirm' ? <FreezeConfirmation key="confirm" /> : null}
      {stage === 'processing' ? <FreezeProcessing key="processing" /> : null}
      {stage === 'frozen' ? <FrozenSuccess key="frozen" /> : null}
      {stage === 'unfreeze' ? <UnfreezeCard key="unfreeze" /> : null}
    </AnimatePresence>
  )
}

function MyCards() {
  return (
    <DemoScreen>
      <DemoHeader title="My Cards" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(demoStyles.rowBetween)}>
          <span {...stylex.props(demoStyles.caption)}>
            Manage your cards in one place.
          </span>
          <DemoChip>
            <Plus aria-hidden="true" size={9} />
            Add Card
          </DemoChip>
        </div>

        <AutoSwipeCarousel />

        <div {...stylex.props(cardsStyles.quickActions)}>
          <QuickAction icon={Snowflake} label="Freeze Card" highlighted />
          <QuickAction icon={Eye} label="View Details" />
          <QuickAction icon={Settings2} label="Settings" />
          <QuickAction icon={SlidersHorizontal} label="Limits" />
        </div>

        <div>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>
              Recent Activity
            </span>
            <span {...stylex.props(demoStyles.caption)}>All cards</span>
          </div>
          <div {...stylex.props(cardsStyles.activityList)}>
            {CARD_ACTIVITY.map((activity) => {
              const Icon = ACTIVITY_ICONS[activity.id]

              return (
                <div key={activity.id} {...stylex.props(cardsStyles.activity)}>
                  <div {...stylex.props(cardsStyles.activityBody)}>
                    <span {...stylex.props(cardsStyles.activityIcon)}>
                      <Icon aria-hidden="true" size={11} />
                    </span>
                    <div>
                      <span {...stylex.props(cardsStyles.activityName)}>
                        {activity.merchant}
                      </span>
                      <div {...stylex.props(cardsStyles.activityMeta)}>
                        {activity.category} · {activity.when}
                      </div>
                    </div>
                  </div>
                  <span {...stylex.props(cardsStyles.activityAmount)}>
                    -{formatUsd(activity.amount)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <span {...stylex.props(demoStyles.link, cardsStyles.viewAll)}>
          View all card transactions
        </span>
      </div>
      <DemoTapIndicator x={16} y={53} delay={2.2} />
    </DemoScreen>
  )
}

function AutoSwipeCarousel() {
  const hasSwiped = useDelayedFlag(1000)
  const hasReturned = useDelayedFlag(2100)
  const activeIndex = hasSwiped && !hasReturned ? 1 : 0

  return <CardsCarousel activeIndex={activeIndex} />
}

function CardsCarousel({ activeIndex }: { activeIndex: number }) {
  const activeCard = activeIndex === 0 ? FREEZE_CARD : SECONDARY_CARD

  return (
    <>
      <div {...stylex.props(cardsStyles.carousel)}>
        <motion.div
          {...stylex.props(cardsStyles.carouselTrack)}
          animate={{ x: `${activeIndex * -100}%` }}
          transition={{ duration: 0.55, ease: [0.1, 0.8, 0.2, 1] }}
        >
          {[FREEZE_CARD, SECONDARY_CARD].map((card) => (
            <div key={card.id} {...stylex.props(cardsStyles.carouselSlide)}>
              <DemoCardView card={card} status={card.status} />
            </div>
          ))}
        </motion.div>
      </div>

      <div {...stylex.props(cardsStyles.dots)}>
        {[FREEZE_CARD, SECONDARY_CARD].map((card, index) => (
          <motion.span
            key={card.id}
            {...stylex.props(
              cardsStyles.dot,
              index === activeIndex && cardsStyles.dotActive,
            )}
            animate={{ scale: index === activeIndex ? 1 : 0.9 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      <div {...stylex.props(cardsStyles.cardMeta)}>
        <div {...stylex.props(cardsStyles.cardMetaBody)}>
          <span {...stylex.props(cardsStyles.cardName)}>
            {activeCard.networkLabel}
          </span>
          <span {...stylex.props(cardsStyles.cardSub)}>
            {formatMaskedCardNumber(activeCard.lastFour)} · Exp{' '}
            {activeCard.expiry}
          </span>
        </div>
        <DemoCardStatusBadge status={activeCard.status} />
      </div>
    </>
  )
}

type QuickActionProps = {
  icon: LucideIcon
  label: string
  highlighted?: boolean
}

function QuickAction({
  icon: Icon,
  label,
  highlighted = false,
}: QuickActionProps) {
  return (
    <div
      {...stylex.props(
        cardsStyles.quickAction,
        highlighted && cardsStyles.quickActionHighlighted,
      )}
    >
      <span {...stylex.props(cardsStyles.quickActionIcon)}>
        <Icon aria-hidden="true" size={12} />
      </span>
      <span {...stylex.props(cardsStyles.quickActionLabel)}>{label}</span>
    </div>
  )
}

function FreezeConfirmation() {
  return (
    <DemoScreen>
      <DemoHeader title="Card Details" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.cardWrapFaded)}>
          <DemoCardView card={FREEZE_CARD} status={FREEZE_CARD.status} />
        </div>

        <div {...stylex.props(cardsStyles.confirmHero)}>
          <span {...stylex.props(cardsStyles.confirmTitle)}>
            Temporarily freeze card?
          </span>
          <span {...stylex.props(cardsStyles.confirmDescription)}>
            Freezing your card immediately blocks new in-store and online
            purchases, ATM withdrawals, and recurring digital charges.
          </span>
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(cardsStyles.bulletList)}>
            <Bullet
              icon={Lock}
              text="Instant block on all physical and contactless POS transactions"
              neutral
            />
            <Bullet
              icon={Shield}
              text="Pre-authorized subscriptions may be declined"
              neutral
            />
            <Bullet
              icon={Check}
              text="Recurring deposits and incoming transfers still arrive safely"
            />
            <Bullet
              icon={LockOpen}
              text="You can unfreeze and re-activate your card anytime"
            />
          </div>
        </div>

        <div {...stylex.props(cardsStyles.secureNote)}>
          <ShieldCheck
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary }}
          />
          <span>
            Digital wallet tokens stay secure and no replacement card is issued.
          </span>
        </div>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Freeze Card"
          icon={<Snowflake aria-hidden="true" size={14} />}
          pressAt={2.3}
        />
        <span {...stylex.props(cardsStyles.doneHint)}>
          Unfreeze at any time in seconds
        </span>
      </div>
      <DemoTapIndicator x={50} y={92} delay={2.2} />
    </DemoScreen>
  )
}

type BulletProps = {
  icon: LucideIcon
  text: string
  neutral?: boolean
}

function Bullet({ icon: Icon, text, neutral = false }: BulletProps) {
  return (
    <div {...stylex.props(cardsStyles.bulletRow)}>
      <span
        {...stylex.props(
          cardsStyles.bulletIcon,
          neutral && cardsStyles.bulletIconNeutral,
        )}
      >
        <Icon aria-hidden="true" size={9} />
      </span>
      <span {...stylex.props(cardsStyles.bulletText)}>{text}</span>
    </div>
  )
}

function FreezeProcessing() {
  return (
    <DemoProcessing
      headerTitle="Card Details"
      title="Freezing your card..."
      description="Contacting the payment network and pausing every card credential. This takes only a moment."
      amount={FREEZE_CARD.networkLabel}
      prefix=""
      amountLabel="Card"
      recipientLabel="Cardholder"
      recipientName={FREEZE_CARD.cardholder}
      recipientMeta={`Ending in ${FREEZE_CARD.lastFour}`}
      accountLabel="Freezing"
      badge="In progress"
      steps={[
        {
          label: 'Verifying cardholder',
          detail: 'Identity confirmed with Banquee ID',
          state: 'complete',
        },
        {
          label: 'Notifying payment network',
          detail: 'Visa acknowledged the freeze request',
          state: 'active',
        },
        {
          label: 'Updating card status',
          detail: 'Digital wallet tokens paused',
          state: 'pending',
        },
      ]}
      footer="Card controls apply instantly across every device"
    />
  )
}

function FrozenSuccess() {
  const status: DemoCardStatus = 'frozen'

  return (
    <DemoScreen>
      <DemoHeader title="Card Details" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.successHero)}>
          <DemoSuccessCheck />
          <span {...stylex.props(cardsStyles.successTitle)}>
            Card frozen securely
          </span>
          <span {...stylex.props(cardsStyles.successText)}>
            Your {FREEZE_CARD.networkLabel} ending in {FREEZE_CARD.lastFour} is
            protected against any new charges.
          </span>
        </div>

        <div {...stylex.props(cardsStyles.cardWrap)}>
          <DemoCardView card={FREEZE_CARD} status={status} />
        </div>

        <div {...stylex.props(demoStyles.card)}>
          <div {...stylex.props(demoStyles.rowBetween)}>
            <span {...stylex.props(demoStyles.sectionTitle)}>Card Status</span>
            <DemoCardStatusBadge status={status} />
          </div>
          <div {...stylex.props(cardsStyles.reviewRows)}>
            <DemoDetailRow
              label="Card Number"
              value={formatMaskedCardNumber(FREEZE_CARD.lastFour)}
              mono
            />
            <DemoDetailRow
              label="Status"
              value={getCardStatusLabel(status)}
              highlight
            />
            <DemoDetailRow label="Timestamp" value="Today, 14:40" />
            <DemoDetailRow label="Recurring Subscriptions" value="Paused" />
          </div>
        </div>

        <div {...stylex.props(cardsStyles.statusLockCard)}>
          <div {...stylex.props(cardsStyles.statusLockBody)}>
            <Snowflake
              aria-hidden="true"
              size={12}
              style={{ color: colors.primary }}
            />
            <span {...stylex.props(cardsStyles.statusLockLabel)}>
              Status Lock
            </span>
          </div>
          <span {...stylex.props(cardsStyles.statusLockValue)}>
            {getCardStatusLabel(status)}
          </span>
        </div>

        <span {...stylex.props(cardsStyles.secureNote)}>
          <ShieldCheck
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary }}
          />
          <span>
            No new transactions or ATM withdrawals can be processed until you
            unfreeze this card.
          </span>
        </span>

        <div {...stylex.props(demoStyles.grow)} />
        <DemoPrimaryButton
          label="Back to My Cards"
          icon={<CreditCard aria-hidden="true" size={14} />}
        />
        <span {...stylex.props(cardsStyles.doneHint)}>
          Unfreezing plays next
        </span>
      </div>
    </DemoScreen>
  )
}

function UnfreezeCard() {
  const hasReactivated = useDelayedFlag(2400)
  const status: DemoCardStatus = hasReactivated ? 'active' : 'frozen'

  return (
    <DemoScreen>
      <DemoHeader title="Card Details" />
      <div {...stylex.props(demoStyles.scrollBody)}>
        <div {...stylex.props(cardsStyles.cardWrap)}>
          <DemoCardView card={FREEZE_CARD} status={status} />
        </div>

        {hasReactivated ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div {...stylex.props(cardsStyles.successHero)}>
              <DemoSuccessCheck delay={0.1} />
              <span {...stylex.props(cardsStyles.successTitle)}>
                Your card is active again!
              </span>
              <span {...stylex.props(cardsStyles.successText)}>
                Online checkouts, contactless payments, and ATM withdrawals are
                instantly re-enabled.
              </span>
            </div>
            <div {...stylex.props(cardsStyles.statusLockCard)}>
              <span {...stylex.props(cardsStyles.statusLockLabel)}>
                Card Status
              </span>
              <DemoCardStatusBadge status={status} />
            </div>
          </motion.div>
        ) : (
          <div {...stylex.props(demoStyles.card)}>
            <div {...stylex.props(demoStyles.rowBetween)}>
              <span {...stylex.props(demoStyles.sectionTitle)}>
                Unfreeze your card?
              </span>
              <DemoCardStatusBadge status={status} />
            </div>
            <p
              {...stylex.props(
                cardsStyles.confirmDescription,
                cardsStyles.sheetText,
              )}
            >
              Unfreezing immediately re-enables online payments, tap-to-pay, ATM
              withdrawals, and recurring subscriptions.
            </p>
            <div {...stylex.props(cardsStyles.bulletList)}>
              <Bullet
                icon={Check}
                text="Instant activation upon confirmation"
              />
              <Bullet
                icon={ShieldCheck}
                text="Protected by Banquee SafePay Shield"
              />
            </div>
            <DemoPrimaryButton
              label="Unfreeze Card"
              icon={<LockOpen aria-hidden="true" size={14} />}
              pressAt={1.8}
            />
          </div>
        )}

        <div {...stylex.props(demoStyles.grow)} />
        <span {...stylex.props(cardsStyles.secureNote)}>
          <Lock
            aria-hidden="true"
            size={11}
            style={{ color: colors.primary }}
          />
          <span>256-bit bank-grade security encrypted</span>
        </span>
      </div>
      <DemoTapIndicator x={50} y={56} delay={1.1} />
    </DemoScreen>
  )
}
