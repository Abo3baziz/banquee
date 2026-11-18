import * as stylex from '@stylexjs/stylex'
import { fonts } from '../../styles/tokens.stylex'
import { bankCardVars } from './card-tokens.stylex'
import type { BankCardNetwork } from './card-types'

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end',
  },
  visa: {
    color: bankCardVars.foreground,
    fontFamily: fonts.heading,
    fontSize: '1.15em',
    fontStyle: 'italic',
    fontWeight: 900,
    letterSpacing: '-0.05em',
    lineHeight: 1,
  },
  mastercard: {
    borderRadius: '50%',
    backgroundColor: '#eb001b',
    display: 'block',
    height: '1.45em',
    width: '1.45em',
  },
  mastercardOverlap: {
    backgroundColor: 'rgba(247, 158, 27, 0.9)',
    marginInlineStart: '-0.5em',
  },
})

type CardNetworkLogoProps = {
  network: BankCardNetwork
}

export function CardNetworkLogo({ network }: CardNetworkLogoProps) {
  if (network === 'none') {
    return null
  }

  return (
    <span aria-hidden="true" {...stylex.props(styles.root)}>
      {network === 'visa' ? (
        <span {...stylex.props(styles.visa)}>VISA</span>
      ) : (
        <>
          <span {...stylex.props(styles.mastercard)} />
          <span
            {...stylex.props(styles.mastercard, styles.mastercardOverlap)}
          />
        </>
      )}
    </span>
  )
}
