import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { createElement } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ChatButton } from './chat-button'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  keyframes: (frames: unknown) => frames,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryContainer: 'var(--primary-container)',
    primaryHover: 'var(--primary-hover)',
    onPrimary: 'var(--on-primary)',
    onPrimaryContainer: 'var(--on-primary-container)',
    surfaceContainer: 'var(--surface-container)',
    surfaceContainerHigh: 'var(--surface-container-high)',
    surfaceContainerLowest: 'var(--surface-container-lowest)',
    surfaceLight: 'var(--surface-light)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
  },
  fonts: {
    body: 'var(--font-body)',
  },
  radii: {
    md: '0.5rem',
    lg: '0.75rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
}))

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}))

vi.mock('../../../i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: ReactNode
  } & AnchorHTMLAttributes<HTMLAnchorElement>) =>
    createElement('a', { href, ...props }, children),
}))

describe('ChatButton', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('cycles from idle to connecting to connected and back to idle', () => {
    vi.useFakeTimers()

    render(<ChatButton />)

    const button = screen.getByRole('button')

    expect(button).toBeEnabled()
    expect(button).toHaveTextContent('contact.chatButton')

    fireEvent.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('contact.chatConnecting')

    act(() => {
      vi.advanceTimersByTime(900)
    })

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('contact.chatConnected')

    act(() => {
      vi.advanceTimersByTime(2500)
    })

    expect(button).toBeEnabled()
    expect(button).toHaveTextContent('contact.chatButton')
  })

  it('ignores clicks while connecting', () => {
    vi.useFakeTimers()

    render(<ChatButton />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(button).toHaveTextContent('contact.chatConnecting')

    act(() => {
      vi.advanceTimersByTime(900)
    })

    expect(button).toHaveTextContent('contact.chatConnected')
  })
})
