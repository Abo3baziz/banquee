import * as stylex from '@stylexjs/stylex'
import { radii } from '../../styles/tokens.stylex'

const styles = stylex.create({
  wrap: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    paddingBottom: '0.375rem',
    paddingTop: '0.375rem',
  },
  bar: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(26, 28, 28, 0.32)',
    height: '0.25rem',
    width: '5.5rem',
  },
})

export function PhoneHomeIndicator() {
  return (
    <div aria-hidden="true" {...stylex.props(styles.wrap)}>
      <span {...stylex.props(styles.bar)} />
    </div>
  )
}
