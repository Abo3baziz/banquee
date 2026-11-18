'use client'

import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import { demoStyles } from './demo-styles'

type DemoHeaderProps = {
  title: string
  initials?: string
}

export function DemoHeader({ title, initials = 'JD' }: DemoHeaderProps) {
  return (
    <header {...stylex.props(demoStyles.header)}>
      <span aria-hidden="true" {...stylex.props(demoStyles.backButton)}>
        <ArrowLeft size={15} strokeWidth={2.4} />
      </span>
      <span {...stylex.props(demoStyles.headerTitle)}>{title}</span>
      <span aria-hidden="true" {...stylex.props(demoStyles.headerAvatar)}>
        {initials}
      </span>
    </header>
  )
}

type DemoScreenProps = {
  children: ReactNode
}

export function DemoScreen({ children }: DemoScreenProps) {
  return (
    <motion.div
      {...stylex.props(demoStyles.screen)}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.28, ease: [0.1, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

type DemoPrimaryButtonProps = {
  label: string
  icon?: ReactNode
  pressAt?: number
  disabled?: boolean
}

export function DemoPrimaryButton({
  label,
  icon,
  pressAt,
  disabled = false,
}: DemoPrimaryButtonProps) {
  return (
    <motion.div
      aria-disabled={disabled}
      {...stylex.props(demoStyles.primaryButton, disabled && styles.disabled)}
      animate={pressAt === undefined ? undefined : { scale: [1, 0.965, 1] }}
      transition={
        pressAt === undefined
          ? undefined
          : { delay: pressAt, duration: 0.45, times: [0, 0.35, 1] }
      }
    >
      <span>{label}</span>
      {icon}
    </motion.div>
  )
}

type DemoTone = 'primary' | 'blue' | 'purple' | 'neutral'

type DemoAvatarProps = {
  initials: string
  tone?: DemoTone
  size?: number
  ring?: boolean
}

export function DemoAvatar({
  initials,
  tone = 'primary',
  size = 26,
  ring = false,
}: DemoAvatarProps) {
  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        styles.avatar,
        tone === 'primary' && styles.avatarPrimary,
        tone === 'blue' && styles.avatarBlue,
        tone === 'purple' && styles.avatarPurple,
        tone === 'neutral' && styles.avatarNeutral,
        ring && styles.avatarRing,
      )}
      style={{
        fontSize: size * 0.32,
        height: size,
        width: size,
      }}
    >
      {initials}
    </span>
  )
}

type DemoSuccessCheckProps = {
  delay?: number
}

export function DemoSuccessCheck({ delay = 0.15 }: DemoSuccessCheckProps) {
  return (
    <motion.span
      aria-hidden="true"
      {...stylex.props(styles.checkWrap)}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.1, 0.8, 0.2, 1] }}
    >
      <svg viewBox="0 0 52 52" width="100%" height="100%">
        <circle cx="26" cy="26" r="25" fill={colors.primary} />
        <motion.path
          d="M15 27.5l7.5 7L37.5 19"
          fill="none"
          stroke={colors.onPrimary}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.25, duration: 0.4, ease: 'easeOut' }}
        />
      </svg>
    </motion.span>
  )
}

type DemoSpinnerProps = {
  size?: number
}

export function DemoSpinner({ size = 34 }: DemoSpinnerProps) {
  return (
    <motion.span
      aria-hidden="true"
      {...stylex.props(styles.spinner)}
      style={{ height: size, width: size }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    />
  )
}

type DemoChipProps = {
  children: ReactNode
  tone?: 'primary' | 'neutral'
}

export function DemoChip({ children, tone = 'primary' }: DemoChipProps) {
  return (
    <span
      {...stylex.props(
        demoStyles.chip,
        tone === 'neutral' && demoStyles.chipNeutral,
      )}
    >
      {children}
    </span>
  )
}

type DemoDetailRowProps = {
  label: string
  value: string
  highlight?: boolean
  mono?: boolean
}

export function DemoDetailRow({
  label,
  value,
  highlight = false,
  mono = false,
}: DemoDetailRowProps) {
  return (
    <div {...stylex.props(demoStyles.rowBetween)}>
      <span {...stylex.props(demoStyles.detailLabel)}>{label}</span>
      <span
        {...stylex.props(
          demoStyles.detailValue,
          highlight && demoStyles.detailValuePrimary,
          mono && demoStyles.mono,
        )}
      >
        {value}
      </span>
    </div>
  )
}

const QR_SIZE = 21

function isFinderCell(x: number, y: number, originX: number, originY: number) {
  if (x < originX || x >= originX + 7 || y < originY || y >= originY + 7) {
    return false
  }

  const localX = x - originX
  const localY = y - originY
  const onRing = localX === 0 || localX === 6 || localY === 0 || localY === 6
  const inCenter = localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4

  return onRing || inCenter
}

const QR_CELLS = Array.from({ length: QR_SIZE * QR_SIZE }, (_, index) => {
  const x = index % QR_SIZE
  const y = Math.floor(index / QR_SIZE)

  if (
    (x < 7 && y < 7) ||
    (x >= QR_SIZE - 7 && y < 7) ||
    (x < 7 && y >= QR_SIZE - 7)
  ) {
    return (
      isFinderCell(x, y, 0, 0) ||
      isFinderCell(x, y, QR_SIZE - 7, 0) ||
      isFinderCell(x, y, 0, QR_SIZE - 7)
    )
  }

  if (
    (x < 8 && y < 8) ||
    (x >= QR_SIZE - 8 && y < 8) ||
    (x < 8 && y >= QR_SIZE - 8)
  ) {
    return false
  }

  return (x * 5 + y * 11 + x * y * 3) % 7 < 3
})

export function DemoQrCode() {
  return (
    <div
      role="img"
      aria-label="Banquee receive money QR code"
      {...stylex.props(styles.qr)}
    >
      {QR_CELLS.map((filled, index) => (
        <span
          key={index}
          style={{
            backgroundColor: filled ? '#121514' : 'transparent',
          }}
          {...stylex.props(styles.qrCell)}
        />
      ))}
    </div>
  )
}

const styles = stylex.create({
  disabled: {
    opacity: 0.6,
  },
  avatar: {
    borderRadius: radii.full,
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    fontFamily: fonts.body,
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: 1,
  },
  avatarPrimary: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  avatarBlue: {
    backgroundColor: colors.tintBlue,
    color: '#1e5b74',
  },
  avatarPurple: {
    backgroundColor: '#dfe1f1',
    color: '#4f3f7a',
  },
  avatarNeutral: {
    backgroundColor: colors.surfaceContainerHigh,
    color: colors.onSurfaceVariant,
  },
  avatarRing: {
    boxShadow: `0 0 0 1.5px ${colors.primaryContainer}`,
  },
  checkWrap: {
    display: 'block',
    height: '3.25rem',
    width: '3.25rem',
  },
  spinner: {
    borderColor: colors.primaryTint,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: 2.5,
    display: 'block',
    borderTopColor: colors.primary,
  },
  qr: {
    padding: '0.25rem',
    borderRadius: '0.25rem',
    gap: 0,
    backgroundColor: colors.surfaceLight,
    display: 'grid',
    flexShrink: 0,
    gridTemplateColumns: `repeat(${QR_SIZE}, 1fr)`,
    gridTemplateRows: `repeat(${QR_SIZE}, 1fr)`,
    height: '5.75rem',
    width: '5.75rem',
  },
  qrCell: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
})
