import * as stylex from '@stylexjs/stylex'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import { colors, fonts, spacing } from '../../styles/tokens.stylex'

type PhoneStatusBarProps = {
  time?: string
  tone?: 'light' | 'dark'
}

const styles = stylex.create({
  bar: {
    paddingInline: '1.25rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 3,
    height: '2rem',
  },
  time: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: '0.875rem',
    whiteSpace: 'nowrap',
    minWidth: '2.5rem',
  },
  icons: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.onSurface,
    display: 'flex',
    justifyContent: 'flex-end',
    minWidth: '2.5rem',
  },
  icon: {
    flexShrink: 0,
  },
  light: {
    color: colors.onPrimary,
  },
})

export function PhoneStatusBar({
  time = '9:41',
  tone = 'dark',
}: PhoneStatusBarProps) {
  return (
    <div {...stylex.props(styles.bar)}>
      <span {...stylex.props(styles.time, tone === 'light' && styles.light)}>
        {time}
      </span>
      <div
        aria-hidden="true"
        {...stylex.props(styles.icons, tone === 'light' && styles.light)}
      >
        <Signal size={11} strokeWidth={2.5} {...stylex.props(styles.icon)} />
        <Wifi size={12} strokeWidth={2.5} {...stylex.props(styles.icon)} />
        <BatteryFull
          size={14}
          strokeWidth={2.2}
          {...stylex.props(styles.icon)}
        />
      </div>
    </div>
  )
}
