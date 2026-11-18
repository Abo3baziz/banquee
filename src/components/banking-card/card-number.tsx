import * as stylex from '@stylexjs/stylex'
import { fonts } from '../../styles/tokens.stylex'
import { bankCardVars } from './card-tokens.stylex'

const MASKED_GROUP = '••••'

const styles = stylex.create({
  number: {
    overflow: 'hidden',
    color: bankCardVars.foreground,
    fontFamily: fonts.mono,
    fontSize: '1em',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 600,
    letterSpacing: '0.16em',
    lineHeight: 1.2,
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
  },
  compact: {
    fontSize: '0.9em',
    letterSpacing: '0.12em',
  },
})

type CardNumberProps = {
  lastFour: string
  compact?: boolean
}

export function CardNumber({ lastFour, compact = false }: CardNumberProps) {
  return (
    <div
      aria-hidden="true"
      {...stylex.props(styles.number, compact && styles.compact)}
    >
      {`${MASKED_GROUP} ${MASKED_GROUP} ${MASKED_GROUP} ${lastFour}`}
    </div>
  )
}
