export type BankCardTier = 'standard' | 'gold' | 'premium'

export type BankCardType = 'physical' | 'virtual'

export type BankCardNetwork = 'visa' | 'mastercard' | 'none'

export type BankCardVariant = 'active' | 'frozen' | 'blocked' | 'expired'

export type BankCardSize = 'default' | 'compact' | 'mini'

export type BankCardBackLabels = {
  cvvLabel: string
  signatureLabel: string
  finePrint: string
}

type BankCardActiveStatus = {
  status?: 'active'
}

export type BankCardInactiveStatus = {
  status: Exclude<BankCardVariant, 'active'>
  statusLabel: string
  statusDetail?: string
}

export type BankCardStatusProps = BankCardActiveStatus | BankCardInactiveStatus

export type BankCardBaseProps = {
  tier?: BankCardTier
  type?: BankCardType
  network?: BankCardNetwork
  size?: BankCardSize
  lastFour: string
  cardholderName?: string
  expiryDate?: string
  cvv?: string
  label?: string
  virtualLabel?: string
  cardholderLabel?: string
  expiryLabel?: string
  flipped?: boolean
  selected?: boolean
  flipLabel?: string
  flipHint?: string
  onFlip?: () => void
  backLabels?: BankCardBackLabels
  accessibleLabel?: string
}

export type BankCardProps = BankCardBaseProps & BankCardStatusProps

export function getInactiveStatus(
  props: BankCardProps,
): BankCardInactiveStatus | null {
  if (
    props.status === 'frozen' ||
    props.status === 'blocked' ||
    props.status === 'expired'
  ) {
    return props
  }

  return null
}
