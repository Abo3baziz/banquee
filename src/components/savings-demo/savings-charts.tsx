'use client'

import { useId } from 'react'
import * as stylex from '@stylexjs/stylex'
import { motion, useReducedMotion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'

type ProgressRingProps = {
  value: number
  label: string
  caption?: string
  size?: number
  delay?: number
}

export function ProgressRing({
  value,
  label,
  caption,
  size = 96,
  delay = 0,
}: ProgressRingProps) {
  const shouldReduceMotion = useReducedMotion()
  const percentage = Math.min(100, Math.max(0, value))
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div
      aria-hidden="true"
      {...stylex.props(styles.ringWrap)}
      style={{ height: size, width: size }}
    >
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <circle
          cx={40}
          cy={40}
          r={radius}
          fill="none"
          strokeWidth={7}
          style={{ stroke: colors.surfaceContainerHigh }}
        />
        <motion.circle
          cx={40}
          cy={40}
          r={radius}
          fill="none"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          transform="rotate(-90 40 40)"
          initial={
            shouldReduceMotion ? false : { strokeDashoffset: circumference }
          }
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, delay, ease: [0.1, 0.8, 0.2, 1] }}
          style={{ stroke: colors.primaryContainer }}
        />
      </svg>
      <div {...stylex.props(styles.ringCenter)}>
        <span {...stylex.props(styles.ringValue)}>{label}</span>
        {caption ? (
          <span {...stylex.props(styles.ringCaption)}>{caption}</span>
        ) : null}
      </div>
    </div>
  )
}

export type ProgressMarker = {
  percent: number
  reached: boolean
}

type SavingsProgressBarProps = {
  value: number
  delay?: number
  height?: number
  markers?: ProgressMarker[]
}

export function SavingsProgressBar({
  value,
  delay = 0,
  height = 6,
  markers = [],
}: SavingsProgressBarProps) {
  const shouldReduceMotion = useReducedMotion()
  const percentage = Math.min(100, Math.max(0, value))

  return (
    <div aria-hidden="true" {...stylex.props(styles.track)} style={{ height }}>
      <motion.div
        {...stylex.props(styles.fill)}
        initial={shouldReduceMotion ? false : { width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.6, delay, ease: [0.1, 0.8, 0.2, 1] }}
      />
      {markers.map((marker) => (
        <span
          key={marker.percent}
          {...stylex.props(
            styles.marker,
            marker.reached && styles.markerReached,
          )}
          style={{ left: `${marker.percent}%` }}
        />
      ))}
    </div>
  )
}

type BalanceGrowthChartProps = {
  values: number[]
  labels: string[]
  delay?: number
  height?: number
}

const CHART_WIDTH = 100
const CHART_HEIGHT = 40

export function BalanceGrowthChart({
  values,
  labels,
  delay = 0,
  height = 92,
}: BalanceGrowthChartProps) {
  const shouldReduceMotion = useReducedMotion()
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const safeValues = values.length >= 2 ? values : [0, 0]
  const max = Math.max(...safeValues, 1)
  const points = safeValues.map((value, index) => ({
    x: (index / (safeValues.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - 4 - (value / max) * (CHART_HEIGHT - 8),
  }))
  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
  const areaPath = `${linePath} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`
  const lastPoint = points[points.length - 1]

  return (
    <div aria-hidden="true" {...stylex.props(styles.chartWrap)}>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={colors.primaryContainer}
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor={colors.primaryContainer}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        {[10, 20, 30].map((y) => (
          <line
            key={y}
            x1={0}
            x2={CHART_WIDTH}
            y1={y}
            y2={y}
            stroke={colors.surfaceContainerHigh}
            strokeWidth={0.4}
            strokeDasharray="2 2"
          />
        ))}
        <motion.path
          d={areaPath}
          fill={`url(#${gradientId})`}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + 0.15 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={colors.primary}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay, ease: 'easeOut' }}
          vectorEffect="non-scaling-stroke"
        />
        <motion.circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          fill={colors.primary}
          initial={shouldReduceMotion ? false : { r: 0, opacity: 0 }}
          animate={{ r: 2.4, opacity: 1 }}
          transition={{ duration: 0.35, delay: delay + 0.95 }}
        />
      </svg>
      <div {...stylex.props(styles.chartLabels)}>
        {labels.map((label, index) => (
          <span key={`${label}-${index}`} {...stylex.props(styles.chartLabel)}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export type MonthlyBar = {
  label: string
  amount: number
  partial?: boolean
}

type MonthlyBarsProps = {
  bars: MonthlyBar[]
  delay?: number
  height?: number
}

export function MonthlyBars({
  bars,
  delay = 0,
  height = 104,
}: MonthlyBarsProps) {
  const shouldReduceMotion = useReducedMotion()
  const max = Math.max(...bars.map((bar) => bar.amount), 1)

  return (
    <div aria-hidden="true" {...stylex.props(styles.bars)} style={{ height }}>
      {bars.map((bar, index) => {
        const percentage = (bar.amount / max) * 100

        return (
          <div key={bar.label} {...stylex.props(styles.barColumn)}>
            <span {...stylex.props(styles.barValue)}>
              {formatUsd(bar.amount)}
            </span>
            <div {...stylex.props(styles.barTrack)}>
              <motion.div
                {...stylex.props(
                  styles.barFill,
                  bar.partial && styles.barFillPartial,
                )}
                initial={shouldReduceMotion ? false : { height: 0 }}
                animate={{ height: `${percentage}%` }}
                transition={{
                  duration: 0.55,
                  delay: delay + index * 0.06,
                  ease: [0.1, 0.8, 0.2, 1],
                }}
              />
            </div>
            <span {...stylex.props(styles.barLabel)}>
              {bar.label}
              {bar.partial ? '*' : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export type MilestoneTrackItem = {
  percent: number
  label: string
  reached?: boolean
}

type MilestoneTrackProps = {
  items: MilestoneTrackItem[]
}

export function MilestoneTrack({ items }: MilestoneTrackProps) {
  return (
    <div aria-hidden="true" {...stylex.props(styles.milestoneRail)}>
      <span {...stylex.props(styles.milestoneLine)} />
      {items.map((item) => (
        <div
          key={`${item.percent}-${item.label}`}
          {...stylex.props(styles.milestoneNode)}
        >
          <span
            {...stylex.props(
              styles.milestoneDot,
              item.reached && styles.milestoneDotReached,
            )}
          />
          <span
            {...stylex.props(
              styles.milestonePercent,
              item.reached && styles.milestonePercentReached,
            )}
          >
            {item.percent}%
          </span>
          <span {...stylex.props(styles.milestoneLabel)}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

const styles = stylex.create({
  ringWrap: {
    flexShrink: 0,
    position: 'relative',
  },
  ringCenter: {
    inset: 0,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
  },
  ringValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.0625rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: '1.25rem',
  },
  ringCaption: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.4375rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    lineHeight: '0.625rem',
    textTransform: 'uppercase',
  },
  track: {
    borderRadius: radii.full,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
    position: 'relative',
    width: '100%',
  },
  fill: {
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    height: '100%',
  },
  marker: {
    borderRadius: radii.full,
    backgroundColor: colors.surfaceLight,
    boxShadow: `0 0 0 1px ${colors.outlineVariant}`,
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    height: 6,
    top: '50%',
    width: 6,
  },
  markerReached: {
    backgroundColor: colors.primary,
    boxShadow: `0 0 0 1px ${colors.primary}`,
  },
  chartWrap: {
    width: '100%',
  },
  chartLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.25rem',
  },
  chartLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.4375rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 500,
    lineHeight: '0.625rem',
  },
  bars: {
    gap: '0.3125rem',
    alignItems: 'stretch',
    display: 'flex',
    width: '100%',
  },
  barColumn: {
    gap: '0.1875rem',
    alignItems: 'center',
    display: 'flex',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0,
  },
  barValue: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.4375rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    lineHeight: '0.625rem',
  },
  barTrack: {
    borderRadius: '0.375rem',
    overflow: 'hidden',
    alignItems: 'flex-end',
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexGrow: 1,
    width: '72%',
  },
  barFill: {
    borderRadius: '0.375rem',
    backgroundColor: colors.primaryContainer,
    width: '100%',
  },
  barFillPartial: {
    backgroundColor: colors.primaryContainer,
    opacity: 0.65,
  },
  barLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.4375rem',
    fontWeight: 500,
    lineHeight: '0.625rem',
  },
  milestoneRail: {
    gap: 0,
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  milestoneLine: {
    backgroundColor: colors.surfaceContainerHigh,
    position: 'absolute',
    height: 2,
    left: '8%',
    right: '8%',
    top: '0.1875rem',
  },
  milestoneNode: {
    gap: '0.0625rem',
    alignItems: 'center',
    display: 'flex',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0,
  },
  milestoneDot: {
    borderRadius: radii.full,
    backgroundColor: colors.surfaceLight,
    boxShadow: `0 0 0 1.5px ${colors.outlineVariant}`,
    height: 8,
    width: 8,
  },
  milestoneDotReached: {
    backgroundColor: colors.primary,
    boxShadow: `0 0 0 1.5px ${colors.primary}`,
  },
  milestonePercent: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.4375rem',
    fontWeight: 700,
    lineHeight: '0.625rem',
  },
  milestonePercentReached: {
    color: colors.primary,
  },
  milestoneLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.375rem',
    fontWeight: 500,
    lineHeight: '0.5625rem',
    textAlign: 'center',
  },
})
