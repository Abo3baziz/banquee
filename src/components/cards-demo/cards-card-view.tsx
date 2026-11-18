import { BankCard, CardStatusBadge } from '../banking-card'
import type { BankCardSize, BankCardStatusProps } from '../banking-card'
import type { DemoCard, DemoCardStatus } from '../../data/cards-demo-data'
import { getCardStatusLabel } from './cards-utils'

type DemoCardViewProps = {
  card: DemoCard
  status: DemoCardStatus
  size?: BankCardSize
}

/**
 * Maps a demo card onto the shared banking-card visual. The frozen treatment
 * comes from the existing card component, so every screen shows the same card.
 */
export function DemoCardView({
  card,
  status,
  size = 'compact',
}: DemoCardViewProps) {
  const statusProps: BankCardStatusProps =
    status === 'frozen'
      ? {
          status: 'frozen',
          statusLabel: getCardStatusLabel(status),
          statusDetail: 'New purchases are paused',
        }
      : { status: 'active' }

  return (
    <BankCard
      tier={card.tier}
      type="physical"
      network={card.brand}
      size={size}
      lastFour={card.lastFour}
      cardholderName={card.cardholder}
      cardholderLabel="Card Holder"
      expiryDate={card.expiry}
      expiryLabel="Expires"
      label={card.kind}
      accessibleLabel={`${card.networkLabel} ending in ${card.lastFour}, ${getCardStatusLabel(status)}`}
      {...statusProps}
    />
  )
}

type DemoCardStatusBadgeProps = {
  status: DemoCardStatus
}

export function DemoCardStatusBadge({ status }: DemoCardStatusBadgeProps) {
  return <CardStatusBadge status={status} label={getCardStatusLabel(status)} />
}
