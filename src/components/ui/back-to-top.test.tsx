import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useReducedMotion } from 'motion/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BackToTop } from './back-to-top'

vi.mock('motion/react', () => ({
  useReducedMotion: vi.fn(),
}))

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    onPrimary: 'var(--color-on-primary)',
  },
  radii: { full: '9999px' },
  spacing: { md: '1rem', lg: '1.5rem' },
}))

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
  })
  window.dispatchEvent(new Event('scroll'))
}

describe('BackToTop', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    })
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    })
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('stays hidden near the top of the page', () => {
    render(<BackToTop label="Back to top" />)

    const button = screen.getByLabelText('Back to top')

    expect(button).toHaveAttribute('aria-hidden', 'true')
    expect(button).toHaveAttribute('tabindex', '-1')
  })

  it('appears after scrolling past the threshold', async () => {
    render(<BackToTop label="Back to top" />)

    setScrollY(600)

    const button = screen.getByLabelText('Back to top')

    await waitFor(() => {
      expect(button).not.toHaveAttribute('aria-hidden')
      expect(button).toHaveAttribute('tabindex', '0')
    })
  })

  it('scrolls smoothly back to the top when clicked', () => {
    render(<BackToTop label="Back to top" />)

    setScrollY(600)
    fireEvent.click(screen.getByLabelText('Back to top'))

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('uses instant scrolling when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)
    render(<BackToTop label="Back to top" />)

    setScrollY(600)
    fireEvent.click(screen.getByLabelText('Back to top'))

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    })
  })
})
