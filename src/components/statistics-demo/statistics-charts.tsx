'use client'

import * as stylex from '@stylexjs/stylex'
import { motion, useReducedMotion } from 'motion/react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import { formatUsd } from '../banking-demo/demo-data'

type ProgressBarProps = {
  value: number
  color?: string
  delay?: number
  height?: number
}

export function ProgressBar({
  value,
  color = colors.primary,
  delay = 0,
  height = 5,
}: ProgressBarProps) {
  const shouldReduceMotion = useReducedMotion()
  const percentage = Math.min(100, Math.max(0, value))

  return (
    <div aria-hidden="true" {...stylex.props(styles.track)} style={{ height }}>
      <motion.div
        {...stylex.props(styles.fill)}
        style={{ backgroundColor: color }}
        initial={shouldReduceMotion ? false : { width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.55, delay, ease: [0.1, 0.8, 0.2, 1] }}
      />
    </div>
  )
}

type ComparisonBar = {
  label: string
  value: number
  color: string
}

type ComparisonBarsProps = {
  bars: [ComparisonBar, ComparisonBar]
  delay?: number
  height?: number
}

export function ComparisonBars({
  bars,
  delay = 0,
  height = 104,
}: ComparisonBarsProps) {
  const shouldReduceMotion = useReducedMotion()
  const max = Math.max(bars[0].value, bars[1].value, 0)

  return (
    <div aria-hidden="true" {...stylex.props(styles.pair)} style={{ height }}>
      {bars.map((bar, index) => {
        const percentage = max > 0 ? (bar.value / max) * 100 : 0

        return (
          <div key={bar.label} {...stylex.props(styles.column)}>
            <span {...stylex.props(styles.barValue)}>
              {formatUsd(bar.value)}
            </span>
            <div {...stylex.props(styles.barTrack)}>
              <motion.div
                {...stylex.props(styles.barFill)}
                style={{ backgroundColor: bar.color }}
                initial={shouldReduceMotion ? false : { height: 0 }}
                animate={{ height: `${percentage}%` }}
                transition={{
                  duration: 0.6,
                  delay: delay + index * 0.1,
                  ease: [0.1, 0.8, 0.2, 1],
                }}
              />
            </div>
            <span {...stylex.props(styles.barLabel)}>{bar.label}</span>
          </div>
        )
      })}
    </div>
  )
}

type IncomeExpenseChartProps = {
  income: number
  expenses: number
  delay?: number
}

export function IncomeExpenseChart({
  income,
  expenses,
  delay = 0,
}: IncomeExpenseChartProps) {
  return (
    <ComparisonBars
      delay={delay}
      bars={[
        {
          label: 'Income',
          value: income,
          color: colors.primaryContainer,
        },
        {
          label: 'Expenses',
          value: expenses,
          color: colors.tertiaryContainer,
        },
      ]}
    />
  )
}

export type DonutSlice = {
  id: string
  value: number
  color: string
}

type DonutChartProps = {
  slices: DonutSlice[]
  activeId?: string | null
  size?: number
  centerValue: string
  centerLabel: string
  delay?: number
}

const DONUT_VIEWBOX = 140
const DONUT_CENTER = DONUT_VIEWBOX / 2
const DONUT_RADIUS = 52
const DONUT_STROKE = 14
const DONUT_ACTIVE_STROKE = 18
const DONUT_GAP = 4
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS

type DonutSegment = DonutSlice & {
  length: number
  offset: number
}

export function buildDonutSegments(slices: DonutSlice[]): DonutSegment[] {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)

  return slices.reduce<{ offset: number; segments: DonutSegment[] }>(
    (accumulator, slice) => {
      if (slice.value <= 0 || total <= 0) {
        return accumulator
      }

      const share = slice.value / total
      const length = Math.max(0, share * DONUT_CIRCUMFERENCE - DONUT_GAP)

      return {
        offset: accumulator.offset + share,
        segments: [
          ...accumulator.segments,
          {
            ...slice,
            length,
            offset: -accumulator.offset * DONUT_CIRCUMFERENCE,
          },
        ],
      }
    },
    { offset: 0, segments: [] },
  ).segments
}

export function DonutChart({
  slices,
  activeId = null,
  size = 132,
  centerValue,
  centerLabel,
  delay = 0,
}: DonutChartProps) {
  const shouldReduceMotion = useReducedMotion()
  const segments = buildDonutSegments(slices)

  return (
    <div
      aria-hidden="true"
      {...stylex.props(styles.donutWrap)}
      style={{ height: size, width: size }}
    >
      <svg
        viewBox={`0 0 ${DONUT_VIEWBOX} ${DONUT_VIEWBOX}`}
        width={size}
        height={size}
      >
        <circle
          cx={DONUT_CENTER}
          cy={DONUT_CENTER}
          r={DONUT_RADIUS}
          fill="none"
          strokeWidth={DONUT_STROKE}
          style={{ stroke: colors.surfaceContainerLow }}
        />
        {segments.map((segment, index) => {
          const isActive = activeId === segment.id
          const isDimmed = activeId !== null && !isActive

          return (
            <motion.circle
              key={segment.id}
              cx={DONUT_CENTER}
              cy={DONUT_CENTER}
              r={DONUT_RADIUS}
              fill="none"
              transform={`rotate(-90 ${DONUT_CENTER} ${DONUT_CENTER})`}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      strokeDasharray: `0 ${DONUT_CIRCUMFERENCE}`,
                      strokeDashoffset: segment.offset,
                      opacity: 0,
                    }
              }
              animate={{
                strokeDasharray: `${segment.length} ${DONUT_CIRCUMFERENCE}`,
                strokeDashoffset: segment.offset,
                strokeWidth: isActive ? DONUT_ACTIVE_STROKE : DONUT_STROKE,
                opacity: isDimmed ? 0.4 : 1,
              }}
              transition={{
                duration: 0.65,
                delay: delay + index * 0.07,
                ease: [0.1, 0.8, 0.2, 1],
              }}
              style={{ stroke: segment.color }}
            />
          )
        })}
      </svg>
      <div {...stylex.props(styles.donutCenter)}>
        <span {...stylex.props(styles.donutValue)}>{centerValue}</span>
        <span {...stylex.props(styles.donutLabel)}>{centerLabel}</span>
      </div>
    </div>
  )
}

const styles = stylex.create({
  track: {
    borderRadius: radii.full,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerLow,
    width: '100%',
  },
  fill: {
    borderRadius: radii.full,
    height: '100%',
  },
  pair: {
    gap: '0.75rem',
    alignItems: 'stretch',
    display: 'flex',
    width: '100%',
  },
  column: {
    gap: '0.1875rem',
    alignItems: 'center',
    display: 'flex',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0,
  },
  barTrack: {
    borderRadius: '0.375rem',
    overflow: 'hidden',
    alignItems: 'flex-end',
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexGrow: 1,
    width: '64%',
  },
  barFill: {
    borderRadius: '0.375rem',
    width: '100%',
  },
  barValue: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    lineHeight: '0.6875rem',
  },
  barLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
  },
  donutWrap: {
    flexShrink: 0,
    position: 'relative',
  },
  donutCenter: {
    inset: 0,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
  },
  donutValue: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.8125rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: '1rem',
  },
  donutLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.5rem',
    fontWeight: 500,
    lineHeight: '0.6875rem',
  },
})
