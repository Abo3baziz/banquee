import * as stylex from '@stylexjs/stylex'
import { colors, fonts } from '../../styles/tokens.stylex'
import type { BankCardVariant } from './card-types'

const styles = stylex.create({
  badge: {
    borderRadius: '9999px',
    paddingBlock: '0.18em',
    paddingInline: '0.7em',
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.7em',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: 1.4,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  active: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  frozen: {
    backgroundColor: colors.tintBlue,
    color: colors.primary,
  },
  blocked: {
    backgroundColor: colors.errorContainer,
    color: colors.error,
  },
  expired: {
    backgroundColor: colors.surfaceContainerHigh,
    color: colors.onSurfaceVariant,
  },
})

const STATUS_STYLES = {
  active: styles.active,
  frozen: styles.frozen,
  blocked: styles.blocked,
  expired: styles.expired,
} as const

type CardStatusBadgeProps = {
  status: BankCardVariant
  label: string
}

export function CardStatusBadge({ status, label }: CardStatusBadgeProps) {
  return (
    <span {...stylex.props(styles.badge, STATUS_STYLES[status])}>{label}</span>
  )
}
