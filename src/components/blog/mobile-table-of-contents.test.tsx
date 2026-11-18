import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  MobileTableOfContents,
  type TableOfContentsItem,
} from './mobile-table-of-contents'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    divider: 'var(--divider)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
    surfaceContainerLow: 'var(--surface-container-low)',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  radii: {
    sm: '0.25rem',
    xl: '1.25rem',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
  },
}))

vi.mock('motion/react', () => ({
  useReducedMotion: () => false,
}))

const ITEMS: TableOfContentsItem[] = [
  { id: 'section-1', number: '01', label: 'Separate Your Business Finances' },
  { id: 'section-2', number: '02', label: 'Keep Your Payments Organized' },
]

describe('MobileTableOfContents', () => {
  it('keeps the list collapsed until the toggle is pressed', async () => {
    const user = userEvent.setup()
    render(<MobileTableOfContents title="In This Article" items={ITEMS} />)

    const toggle = screen.getByRole('button', { name: /in this article/i })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('navigation')).toBeNull()

    await user.click(toggle)

    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(
      screen.getByRole('link', { name: /separate your business finances/i }),
    ).toBeDefined()
  })

  it('scrolls to the section and closes on link click', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView

    render(
      <>
        <div id="section-1" />
        <div id="section-2" />
        <MobileTableOfContents title="In This Article" items={ITEMS} />
      </>,
    )

    await user.click(screen.getByRole('button', { name: /in this article/i }))
    await user.click(
      screen.getByRole('link', { name: /keep your payments organized/i }),
    )

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(window.location.hash).toBe('#section-2')
    expect(
      screen
        .getByRole('button', { name: /in this article/i })
        .getAttribute('aria-expanded'),
    ).toBe('false')
  })
})
