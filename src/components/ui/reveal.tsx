'use client'

import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealDirection = 'up' | 'left' | 'right'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  style?: CSSProperties
}

const ENTER_OFFSETS: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 24 },
  left: { x: -48 },
  right: { x: 48 },
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  style,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...ENTER_OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.1, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
