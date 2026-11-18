import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ShareButtons } from './share-buttons'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryTint: 'var(--primary-tint)',
    surfaceLight: 'var(--surface-light)',
    onSurface: 'var(--on-surface)',
  },
  fonts: {
    body: 'var(--font-body)',
  },
  radii: {
    md: '0.5rem',
  },
}))

const LABELS = {
  articleTitle: 'How To Start Using Banko For Your Startup',
  copyLabel: 'Copy Link',
  copiedLabel: 'Link copied to clipboard!',
  labels: { facebook: 'Facebook', linkedIn: 'LinkedIn', x: 'X' },
}

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', {
    value,
    configurable: true,
    writable: true,
  })
}

describe('ShareButtons', () => {
  it('renders the copy button and three share links with accessible names', () => {
    render(<ShareButtons {...LABELS} />)

    expect(screen.getByRole('button', { name: /copy link/i })).toBeDefined()
    expect(
      screen.getByRole('link', { name: 'Facebook' }).getAttribute('href'),
    ).toContain('https://www.facebook.com/sharer/sharer.php?u=')
    expect(
      screen.getByRole('link', { name: 'LinkedIn' }).getAttribute('href'),
    ).toContain('https://www.linkedin.com/sharing/share-offsite/?url=')
    expect(
      screen.getByRole('link', { name: 'X' }).getAttribute('href'),
    ).toContain('https://twitter.com/intent/tweet?')
  })

  it('includes the page URL in the share targets once mounted', () => {
    render(<ShareButtons {...LABELS} />)

    const facebook = screen.getByRole('link', {
      name: 'Facebook',
    }) as HTMLAnchorElement

    expect(facebook.href).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    )
  })

  it('shows copied feedback only after a successful copy', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn(() => Promise.resolve())
    setClipboard({ writeText })

    const { unmount } = render(<ShareButtons {...LABELS} />)

    await user.click(screen.getByRole('button', { name: /copy link/i }))

    expect(writeText).toHaveBeenCalledWith(window.location.href)
    expect(
      screen.getByRole('button', { name: LABELS.copiedLabel }),
    ).toBeDefined()

    unmount()
  })

  it('keeps the original label when the clipboard write fails', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn(() => Promise.reject(new Error('denied')))
    setClipboard({ writeText })

    render(<ShareButtons {...LABELS} />)

    await user.click(screen.getByRole('button', { name: /copy link/i }))

    expect(screen.getByRole('button', { name: LABELS.copyLabel })).toBeDefined()
    expect(
      screen.queryByRole('button', { name: LABELS.copiedLabel }),
    ).toBeNull()
  })

  it('does nothing when the clipboard API is unavailable', async () => {
    const user = userEvent.setup()
    setClipboard(undefined)

    render(<ShareButtons {...LABELS} />)

    await user.click(screen.getByRole('button', { name: /copy link/i }))

    expect(screen.getByRole('button', { name: LABELS.copyLabel })).toBeDefined()
  })
})
