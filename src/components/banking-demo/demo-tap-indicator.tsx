'use client'

import * as stylex from '@stylexjs/stylex'
import { motion, useReducedMotion } from 'motion/react'
import { radii } from '../../styles/tokens.stylex'

type DemoTapIndicatorProps = {
  x: number
  y: number
  delay?: number
}

const styles = stylex.create({
  layer: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 20,
  },
  dot: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(26, 28, 28, 0.72)',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.9)',
    display: 'block',
    position: 'relative',
    height: '0.75rem',
    width: '0.75rem',
  },
  ripple: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(91, 181, 162, 0.4)',
    display: 'block',
    position: 'absolute',
    height: '1.5rem',
    left: '50%',
    marginLeft: '-0.75rem',
    marginTop: '-0.75rem',
    top: '50%',
    width: '1.5rem',
  },
})

export function DemoTapIndicator({ x, y, delay = 0 }: DemoTapIndicatorProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      {...stylex.props(styles.layer)}
      style={{
        left: `${x}%`,
        marginLeft: '-0.375rem',
        marginTop: '-0.375rem',
        top: `${y}%`,
      }}
      initial={{ opacity: 0, y: -16, scale: 0.7 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.7, 1, 1, 0.9],
        y: 0,
      }}
      transition={{
        delay,
        duration: 1.15,
        times: [0, 0.18, 0.72, 1],
      }}
    >
      <motion.span
        {...stylex.props(styles.ripple)}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.45, 0], scale: [0.4, 1.9, 2.3] }}
        transition={{
          delay: delay + 0.48,
          duration: 0.45,
          times: [0, 0.35, 1],
        }}
      />
      <span {...stylex.props(styles.dot)} />
    </motion.div>
  )
}
