import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { useReducedMotion } from 'motion/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DemoTapIndicator } from './demo-tap-indicator'
import { DemoPrimaryButton } from './demo-ui'

vi.mock('motion/react', async () => {
  const React = await import('react')
  const motionOnlyProps = new Set(['initial', 'animate', 'transition'])

  const createMockMotionComponent = (tag: 'div' | 'span') => {
    return function MockMotionComponent(props: Record<string, unknown>) {
      const domProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !motionOnlyProps.has(key)),
      ) as { children?: ReactNode }

      return React.createElement(tag, domProps)
    }
  }

  return {
    motion: {
      div: createMockMotionComponent('div'),
      span: createMockMotionComponent('span'),
    },
    useReducedMotion: vi.fn(),
  }
})

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {},
  fonts: {},
  radii: { full: '9999px' },
  spacing: {},
}))

beforeEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false)
})

describe('DemoTapIndicator', () => {
  it('renders nothing when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)

    const { container } = render(
      <DemoTapIndicator x={40} y={36} delay={1.02} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders a hand with the fingertip gesture by default', () => {
    const { container } = render(
      <DemoTapIndicator x={40} y={36} delay={1.02} />,
    )

    const gesture = screen.getByTestId('demo-finger-gesture')

    expect(gesture).toHaveAttribute('data-variant', 'tap')
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('anchors the gesture at the given percentage coordinates', () => {
    render(<DemoTapIndicator x={22} y={93} delay={2.35} />)

    expect(screen.getByTestId('demo-finger-gesture')).toHaveStyle({
      left: '22%',
      top: '93%',
    })
  })

  it('renders the swipe variant', () => {
    render(
      <DemoTapIndicator
        x={70}
        y={58}
        delay={0.4}
        variant="swipe"
        distance={35}
        swipeDuration={0.6}
      />,
    )

    expect(screen.getByTestId('demo-finger-gesture')).toHaveAttribute(
      'data-variant',
      'swipe',
    )
  })
})

describe('DemoPrimaryButton', () => {
  it('drives the gesture from pressAt', () => {
    const { rerender } = render(
      <DemoPrimaryButton label="Continue" pressAt={2.4} />,
    )

    expect(screen.getByTestId('demo-finger-gesture')).toBeInTheDocument()

    rerender(
      <DemoPrimaryButton label="Continue" pressAt={2.4} showGesture={false} />,
    )

    expect(screen.queryByTestId('demo-finger-gesture')).toBeNull()
  })
})
