'use client'

import { useId } from 'react'
import * as stylex from '@stylexjs/stylex'
import { motion, useReducedMotion } from 'motion/react'
import { radii } from '../../styles/tokens.stylex'

/** Seconds the fingertip takes to travel from its entry offset to the target. */
const ENTER_DURATION = 0.45
/** Seconds the fingertip stays pressed on the target after a tap. */
const HOLD_DURATION = 0.3
/** Seconds the fingertip takes to lift away after contact. */
const RELEASE_DURATION = 0.3
/** Default horizontal travel for `variant="swipe"`, in percent of screen width. */
const DEFAULT_SWIPE_DISTANCE = 40
/** Default horizontal travel time for `variant="swipe"`, in seconds. */
const DEFAULT_SWIPE_DURATION = 0.5
/** Default drag easing for `variant="swipe"`. */
const DEFAULT_SWIPE_EASE: GestureEase = [0.33, 0, 0.25, 1]

// Hand artwork units. The index fingertip sits at (HAND_WIDTH / 2, HAND_TIP_Y),
// which lets the caller anchor the gesture at the contact point.
const HAND_WIDTH = 64
const HAND_HEIGHT = 104
const HAND_TIP_Y = 4.8
const HAND_TIP_RATIO = HAND_TIP_Y / HAND_HEIGHT
const DEFAULT_HAND_SIZE = 52
/** Entry angle used by the standalone indicators: a right thumb reaching up. */
const DEFAULT_TAP_ANGLE = -22
/** Entry angle used over a bottom-edge button: a finger reaching from the side. */
const BUTTON_GESTURE_ANGLE = -64

const INK = '#161a19'

export type GestureEase = 'linear' | readonly [number, number, number, number]

/**
 * Stylized back-of-hand illustration used by the simulated gestures.
 * The index fingertip is drawn at the top centre of the view box.
 */
function DemoFingerGraphic() {
  const gradientId = `demo-finger-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${HAND_WIDTH} ${HAND_HEIGHT}`}
      {...stylex.props(styles.finger)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1={HAND_WIDTH / 2}
          y1={HAND_TIP_Y}
          x2={HAND_WIDTH / 2}
          y2={HAND_HEIGHT}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={INK} stopOpacity="0.8" />
          <stop offset="0.6" stopColor={INK} stopOpacity="0.76" />
          <stop offset="0.82" stopColor={INK} stopOpacity="0.6" />
          <stop offset="0.94" stopColor={INK} stopOpacity="0.22" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M32 4.8C35.5 4.8 37.6 7 37.6 10.3L37.6 45.6C42.4 46.8 47.2 49.4 50 53.4C52.8 57.4 54 62 53.4 66C53.2 68.6 52.2 70.8 50.4 72.6C52.6 75.4 53.4 79 52 82.4C50.8 85.4 48.2 87.4 45 88.2C46.6 93 47.4 98.6 47.4 104L23.6 104C23.4 98.6 22.4 93 21.2 88C19.8 82.4 19.2 77 19.6 72.4C19.8 70 18.6 67.4 16.8 64.4C14.8 61 12.6 57.4 11.4 53.8C10.2 50.2 10.4 47 12.6 45.4C14.8 43.8 17.4 44.2 19.4 46.4C21.2 48.6 22.8 52.8 24 56.8C24.8 54.6 25.6 52.4 26.4 50.4L26.4 10.3C26.4 7 28.5 4.8 32 4.8Z"
        fill={`url(#${gradientId})`}
      />

      <path
        d="M38 46.8C41.6 48.2 44.6 50.2 46.8 52.8"
        fill="none"
        stroke="rgba(255, 255, 255, 0.22)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M48 55.4C50.4 58.4 51.6 61.8 52 65.4"
        fill="none"
        stroke="rgba(255, 255, 255, 0.16)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M27.7 14L27.7 40"
        fill="none"
        stroke="rgba(255, 255, 255, 0.14)"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}

type DemoFingerGestureProps = {
  /** Contact point as a percentage of the gesture layer's width. */
  x: number
  /** Contact point as a percentage of the gesture layer's height. */
  y: number
  /** Seconds after mount when the fingertip touches the contact point. */
  contactAt: number
  /** `tap` presses in place, `swipe` drags horizontally after contact. */
  variant?: 'tap' | 'swipe'
  /** Swipe travel in percent of the gesture layer width. */
  distance?: number
  /** Swipe travel duration in seconds. */
  swipeDuration?: number
  /**
   * Easing curve of the drag phase. Match it to the UI the finger is dragging
   * so the two move together instead of one outrunning the other.
   * @default [0.33, 0, 0.25, 1]
   */
  swipeEase?: GestureEase
  /** Width of the hand in pixels. */
  size?: number
  /** Rotation of the hand at contact, in degrees. */
  angle?: number
  /** Entry offset in pixels, toward the inline end. */
  entryX?: number
  /** Entry offset in pixels, downward. */
  entryY?: number
}

/**
 * Finger gesture primitive shared by the standalone indicators and the
 * primary button. Positions itself with `left`/`top` percentages, so the
 * contact point scales with the phone screen or button it is mounted in.
 */
export function DemoFingerGesture({
  x,
  y,
  contactAt,
  variant = 'tap',
  distance = DEFAULT_SWIPE_DISTANCE,
  swipeDuration = DEFAULT_SWIPE_DURATION,
  swipeEase = DEFAULT_SWIPE_EASE,
  size = DEFAULT_HAND_SIZE,
  angle = DEFAULT_TAP_ANGLE,
  entryX = 26,
  entryY = 14,
}: DemoFingerGestureProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return null
  }

  const isSwipe = variant === 'swipe'
  // Very early contacts get a shorter approach instead of a late contact, so
  // the fingertip and the UI still react on the same frame.
  const enterDuration =
    contactAt >= ENTER_DURATION ? ENTER_DURATION : Math.max(0.15, contactAt)
  const startAt = Math.max(0, contactAt - enterDuration)
  const travelDuration = isSwipe ? swipeDuration : HOLD_DURATION
  const totalDuration = enterDuration + travelDuration + RELEASE_DURATION

  // Keyframes are aligned to one timeline so contact, dwell and release can
  // never drift apart: approach -> contact -> press -> hold -> release.
  const contactTime = enterDuration / totalDuration
  const pressTime = (enterDuration + 0.08) / totalDuration
  const releaseTime = (enterDuration + travelDuration) / totalDuration
  const approachTime = (enterDuration * 0.67) / totalDuration

  const times = isSwipe
    ? [0, approachTime, contactTime, releaseTime, 1]
    : [0, approachTime, contactTime, pressTime, releaseTime, 1]

  const handKeyframes = isSwipe
    ? {
        opacity: [0, 1, 1, 1, 0],
        x: [entryX, entryX * 0.18, 0, 0, 3],
        y: [entryY, entryY * 0.2, 0, 0, -7],
        scale: [0.97, 1, 0.986, 0.986, 0.99],
        rotate: [angle - 7, angle - 2, angle, angle, angle],
      }
    : {
        opacity: [0, 1, 1, 1, 1, 0],
        x: [entryX, entryX * 0.18, 0, 0, 0, 2],
        y: [entryY, entryY * 0.2, 0, 0, 0, -8],
        scale: [0.97, 1, 1, 0.962, 0.962, 0.99],
        rotate: [angle - 7, angle - 2, angle, angle, angle, angle],
      }

  const handEase: GestureEase[] = isSwipe
    ? [[0.16, 0.84, 0.32, 1], [0.33, 1, 0.68, 1], 'linear', [0.4, 0, 0.2, 1]]
    : [
        [0.16, 0.84, 0.32, 1],
        [0.33, 1, 0.68, 1],
        [0.4, 0, 0.2, 1],
        'linear',
        [0.4, 0, 0.2, 1],
      ]

  const resolvedContactAt = startAt + enterDuration
  const swipeTravelTime = enterDuration + swipeDuration
  const rippleDuration = 0.5
  const shadowDuration = isSwipe ? 0.3 + swipeDuration : 0.6
  const shadowPressTime = isSwipe ? 0.12 : 0.14

  return (
    <motion.div
      aria-hidden="true"
      data-testid="demo-finger-gesture"
      data-variant={variant}
      {...stylex.props(styles.gesture)}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        marginLeft: -size / 2,
        marginTop: -(size * HAND_TIP_Y) / HAND_WIDTH,
        width: size,
        height: (size * HAND_HEIGHT) / HAND_WIDTH,
      }}
      animate={
        isSwipe ? { left: [`${x}%`, `${x}%`, `${x + distance}%`] } : undefined
      }
      transition={
        isSwipe
          ? {
              delay: startAt,
              duration: swipeTravelTime,
              times: [0, enterDuration / swipeTravelTime, 1],
              ease: ['linear', swipeEase],
            }
          : undefined
      }
    >
      <motion.span
        {...stylex.props(styles.contactShadow)}
        style={{
          left: '50%',
          top: `${HAND_TIP_RATIO * 100}%`,
          marginLeft: -9,
          marginTop: -2,
        }}
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{
          opacity: [0, 0.32, 0.24, 0],
          scale: isSwipe ? [1.3, 1, 0.95, 0.9] : [1.3, 1, 0.78, 0.72],
        }}
        transition={{
          delay: resolvedContactAt,
          duration: shadowDuration,
          times: [0, shadowPressTime, isSwipe ? 0.92 : 0.5, 1],
          ease: 'easeOut',
        }}
      />

      <motion.span
        {...stylex.props(styles.ripple)}
        style={{
          left: '50%',
          top: `${HAND_TIP_RATIO * 100}%`,
          marginLeft: -13,
          marginTop: -13,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.52, 0], scale: [0.5, 1, 1.7] }}
        transition={{
          delay: resolvedContactAt,
          duration: rippleDuration,
          times: [0, 0.18, 1],
          ease: 'easeOut',
        }}
      />

      <motion.div
        {...stylex.props(styles.hand)}
        initial={{
          opacity: 0,
          x: entryX,
          y: entryY,
          scale: 0.97,
          rotate: angle - 7,
        }}
        animate={handKeyframes}
        transition={{
          delay: startAt,
          duration: totalDuration,
          times,
          ease: handEase,
        }}
      >
        <DemoFingerGraphic />
      </motion.div>
    </motion.div>
  )
}

type DemoTapIndicatorProps = {
  /** Contact point as a percentage of the phone screen width. */
  x: number
  /** Contact point as a percentage of the phone screen height. */
  y: number
  /**
   * Seconds after the stage starts when the hand begins to move.
   * @default 0
   */
  delay?: number
  /**
   * Seconds after the stage starts when the fingertip touches `x` / `y`.
   * Defaults to `delay + 0.45` (the entry duration). When provided, the
   * gesture is scheduled so contact lands on this value, or on `0.15` if the
   * value is earlier: the approach is shortened to a `0.15` minimum instead of
   * delaying the contact.
   */
  contactDelay?: number
  /**
   * `tap` presses in place, `swipe` drags from `x` toward the inline end.
   * @default 'tap'
   */
  variant?: 'tap' | 'swipe'
  /**
   * Swipe travel distance as a percentage of the screen width.
   * @default 40
   */
  distance?: number
  /**
   * Swipe travel duration in seconds.
   * @default 0.5
   */
  swipeDuration?: number
  /**
   * Easing curve of the swipe drag phase. Match it to the element the finger
   * is dragging so both move together.
   * @default [0.33, 0, 0.25, 1]
   */
  swipeEase?: GestureEase
}

/**
 * Simulated fingertip used inside the product demos. `x` / `y` address the
 * phone screen, not the page: they are percentages of the screen width and
 * height. Returns nothing when the user prefers reduced motion.
 */
export function DemoTapIndicator({
  x,
  y,
  delay = 0,
  contactDelay,
  variant = 'tap',
  distance = DEFAULT_SWIPE_DISTANCE,
  swipeDuration = DEFAULT_SWIPE_DURATION,
  swipeEase = DEFAULT_SWIPE_EASE,
}: DemoTapIndicatorProps) {
  return (
    <DemoFingerGesture
      x={x}
      y={y}
      contactAt={contactDelay ?? delay + ENTER_DURATION}
      variant={variant}
      distance={distance}
      swipeDuration={swipeDuration}
      swipeEase={swipeEase}
    />
  )
}

/**
 * Placement for the gesture rendered inside a full-width primary button.
 * Enters from the inline-end side so a button at the bottom of the screen
 * cannot be clipped by the demo body's overflow.
 */
export const demoButtonFinger = {
  angle: BUTTON_GESTURE_ANGLE,
  size: 46,
  entryX: 26,
  entryY: 10,
} as const

const styles = stylex.create({
  gesture: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 20,
  },
  hand: {
    inset: 0,
    display: 'block',
    position: 'absolute',
    transformOrigin: `50% ${HAND_TIP_RATIO * 100}%`,
    willChange: 'transform, opacity',
  },
  finger: {
    display: 'block',
    filter: 'drop-shadow(0 5px 8px rgba(12, 16, 15, 0.22))',
    height: '100%',
    width: '100%',
  },
  ripple: {
    borderColor: 'rgba(91, 181, 162, 0.65)',
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: 1.5,
    backgroundColor: 'rgba(91, 181, 162, 0.14)',
    display: 'block',
    position: 'absolute',
    height: 26,
    width: 26,
  },
  contactShadow: {
    borderRadius: radii.full,
    backgroundColor: 'rgba(16, 20, 19, 0.38)',
    display: 'block',
    filter: 'blur(1.5px)',
    position: 'absolute',
    height: 7,
    width: 18,
  },
})
