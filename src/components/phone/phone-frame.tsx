import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { colors, radii } from '../../styles/tokens.stylex'
import { PhoneDynamicIsland } from './phone-dynamic-island'
import { PhoneHomeIndicator } from './phone-home-indicator'
import { PhoneStatusBar } from './phone-status-bar'

export type PhoneFrameSize = 'sm' | 'md' | 'lg'

type PhoneFrameProps = {
  children: ReactNode
  className?: string
  size?: PhoneFrameSize
  showStatusBar?: boolean
  showDynamicIsland?: boolean
  showHomeIndicator?: boolean
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
  },
  sm: { maxWidth: '17.5rem' },
  md: { maxWidth: '20.9375rem' },
  lg: { maxWidth: '22.5rem' },
  glow: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(91, 181, 162, 0.2)',
    filter: 'blur(3rem)',
    pointerEvents: 'none',
    position: 'absolute',
    height: '72%',
    width: '72%',
  },
  device: {
    padding: '0.625rem',
    borderColor: '#36383e',
    borderRadius: '3.125rem',
    borderStyle: 'solid',
    borderWidth: 3,
    backgroundColor: '#23252a',
    boxShadow:
      '0 25px 60px -15px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
    position: 'relative',
    zIndex: 1,
    maxWidth: '100%',
    width: '100%',
  },
  sideButton: {
    borderRadius: '0.125rem',
    backgroundColor: '#3a3c42',
    position: 'absolute',
    width: 3,
  },
  volumeUp: { insetInlineStart: '-5px', height: '2rem', top: '5.75rem' },
  volumeDown: { insetInlineStart: '-5px', height: '2.75rem', top: '8.5rem' },
  mute: { insetInlineStart: '-5px', height: '2.75rem', top: '12.25rem' },
  power: { insetInlineEnd: '-5px', height: '3.5rem', top: '8rem' },
  screen: {
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: '2.5rem',
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    aspectRatio: '390 / 844',
    backgroundColor: colors.surfaceLight,
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },
  topChrome: {
    backgroundColor: colors.surfaceLight,
    flexShrink: 0,
    position: 'relative',
    zIndex: 2,
  },
  content: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
    minHeight: 0,
    width: '100%',
  },
})

export function PhoneFrame({
  children,
  className,
  size = 'md',
  showStatusBar = true,
  showDynamicIsland = true,
  showHomeIndicator = true,
}: PhoneFrameProps) {
  const { className: stylexClassName, style } = stylex.props(
    styles.root,
    styles[size],
  )

  return (
    <div
      className={[stylexClassName, className].filter(Boolean).join(' ')}
      style={style}
    >
      <div aria-hidden="true" {...stylex.props(styles.glow)} />
      <div {...stylex.props(styles.device)}>
        <span
          aria-hidden="true"
          {...stylex.props(styles.sideButton, styles.mute)}
        />
        <span
          aria-hidden="true"
          {...stylex.props(styles.sideButton, styles.volumeUp)}
        />
        <span
          aria-hidden="true"
          {...stylex.props(styles.sideButton, styles.volumeDown)}
        />
        <span
          aria-hidden="true"
          {...stylex.props(styles.sideButton, styles.power)}
        />

        <div {...stylex.props(styles.screen)}>
          <div {...stylex.props(styles.topChrome)}>
            {showStatusBar ? <PhoneStatusBar /> : null}
            {showDynamicIsland ? <PhoneDynamicIsland /> : null}
          </div>
          <div {...stylex.props(styles.content)}>{children}</div>
          {showHomeIndicator ? <PhoneHomeIndicator /> : null}
        </div>
      </div>
    </div>
  )
}
