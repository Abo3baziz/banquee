import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { ArticleToc } from './article-toc'

// jsdom does not implement IntersectionObserver or matchMedia, which the
// component uses for scroll-spy highlighting and reduced-motion detection.
beforeAll(() => {
  class MockIntersectionObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn() }),
  )
})

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryHover: 'var(--primary-hover)',
    primaryTint: 'var(--primary-tint)',
    onPrimary: 'var(--on-primary)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
    secondary: 'var(--secondary)',
    divider: 'var(--divider)',
    surfaceContainer: 'var(--surface-container)',
    surfaceContainerLow: 'var(--surface-container-low)',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  radii: {
    md: '0.5rem',
    xl: '1.25rem',
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
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

vi.mock('../../../i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

const IDS = ['section-1', 'section-2']

function renderToc() {
  return render(
    <>
      <div id="section-1" />
      <div id="section-2" />
      <ArticleToc translationKey="startup" ids={IDS} />
    </>,
  )
}

describe('ArticleToc', () => {
  it('keeps the mobile list collapsed until the toggle is pressed', async () => {
    const user = userEvent.setup()
    renderToc()

    const toggle = screen.getByRole('button', {
      name: /blog\.articleDetail\.tocTitle/,
    })

    // Only the desktop sidebar nav is present while the mobile list is
    // collapsed.
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getAllByRole('navigation')).toHaveLength(1)

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getAllByRole('navigation')).toHaveLength(2)
  })

  it('scrolls to the section and collapses the mobile list on link click', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView

    renderToc()

    const toggle = screen.getByRole('button', {
      name: /blog\.articleDetail\.tocTitle/,
    })
    await user.click(toggle)

    // The section link renders in both the mobile list and the desktop aside.
    const [mobileLink] = screen.getAllByRole('link', {
      name: /toc\.section-1/,
    })

    await user.click(mobileLink)

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(window.location.hash).toBe('#section-1')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
