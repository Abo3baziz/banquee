'use client'

import * as stylex from '@stylexjs/stylex'
import { motion, useReducedMotion } from 'motion/react'
import { cardsStyles } from './cards-styles'

type CardProgressProps = {
  value: number
  delay?: number
  height?: number
}

export function CardProgress({
  value,
  delay = 0,
  height = 5,
}: CardProgressProps) {
  const shouldReduceMotion = useReducedMotion()
  const percentage = Math.min(100, Math.max(0, value))

  return (
    <div
      aria-hidden="true"
      {...stylex.props(cardsStyles.progressTrack)}
      style={{ height }}
    >
      <motion.div
        {...stylex.props(cardsStyles.progressFill)}
        initial={shouldReduceMotion ? false : { width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.55, delay, ease: [0.1, 0.8, 0.2, 1] }}
      />
    </div>
  )
}
