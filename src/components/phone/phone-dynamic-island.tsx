import * as stylex from '@stylexjs/stylex'
import { radii } from '../../styles/tokens.stylex'

const styles = stylex.create({
  island: {
    borderRadius: radii.full,
    gap: '0.75rem',
    paddingInline: '0.5rem',
    alignItems: 'center',
    backgroundColor: '#000000',
    boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.08)',
    display: 'flex',
    insetInlineStart: '50%',
    justifyContent: 'space-between',
    position: 'absolute',
    transform: 'translateX(-50%)',
    zIndex: 4,
    height: '1.625rem',
    top: '0.3125rem',
    width: '6.25rem',
  },
  camera: {
    borderRadius: radii.full,
    backgroundColor: '#15171c',
    boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.12)',
    height: '0.5rem',
    width: '0.5rem',
  },
  sensor: {
    borderRadius: radii.full,
    backgroundColor: '#0d2b26',
    boxShadow: 'inset 0 0 2px rgba(91, 181, 162, 0.6)',
    height: '0.375rem',
    width: '0.375rem',
  },
})

export function PhoneDynamicIsland() {
  return (
    <div aria-hidden="true" {...stylex.props(styles.island)}>
      <span {...stylex.props(styles.camera)} />
      <span {...stylex.props(styles.sensor)} />
    </div>
  )
}
