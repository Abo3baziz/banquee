import * as stylex from '@stylexjs/stylex'
import { bankCardVars } from './card-tokens.stylex'

const styles = stylex.create({
  chip: {
    borderRadius: '1.2cqw',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundImage: bankCardVars.chip,
    boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.45)',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    position: 'relative',
    height: '7.9cqw',
    width: '10.4cqw',
  },
  grooveHorizontal: {
    insetInline: 0,
    backgroundColor: bankCardVars.chipLine,
    position: 'absolute',
    height: 1,
  },
  grooveTop: {
    top: '32%',
  },
  grooveBottom: {
    bottom: '32%',
  },
  grooveVertical: {
    insetBlock: 0,
    backgroundColor: bankCardVars.chipLine,
    position: 'absolute',
    width: 1,
  },
  grooveStart: {
    insetInlineStart: '30%',
  },
  grooveEnd: {
    insetInlineEnd: '30%',
  },
  core: {
    borderColor: bankCardVars.chipLine,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    height: '3.4cqw',
    width: '3.4cqw',
  },
})

export function CardChip() {
  return (
    <span aria-hidden="true" {...stylex.props(styles.chip)}>
      <span {...stylex.props(styles.grooveHorizontal, styles.grooveTop)} />
      <span {...stylex.props(styles.grooveHorizontal, styles.grooveBottom)} />
      <span {...stylex.props(styles.grooveVertical, styles.grooveStart)} />
      <span {...stylex.props(styles.grooveVertical, styles.grooveEnd)} />
      <span {...stylex.props(styles.core)} />
    </span>
  )
}
