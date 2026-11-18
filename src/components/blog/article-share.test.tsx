import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ArticleShare } from './article-share'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryTint: 'var(--primary-tint)',
    surfaceContainerLow: 'var(--surface-container-low)',
    surfaceContainerLowest: 'var(--surface-container-lowest)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
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
    lg: '1.5rem',
    xl: '2rem',
  },
}))

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

const TITLE = 'How To Start Using Banko For Your Startup'

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', {
    value,
    configurable: true,
    writable: true,
  })
}

describe('ArticleShare', () => {
  it('renders the copy button and three share links with accessible names', () => {
    render(<ArticleShare title={TITLE} />)

    expect(
      screen.getByRole('button', {
        name: /blog\.articleDetail\.share\.copyLink/,
      }),
    ).toBeDefined()
    expect(
      screen
        .getByRole('link', { name: 'blog.articleDetail.share.facebook' })
        .getAttribute('href'),
    ).toContain('https://www.facebook.com/sharer/sharer.php?u=')
    expect(
      screen
        .getByRole('link', { name: 'blog.articleDetail.share.linkedIn' })
        .getAttribute('href'),
    ).toContain('https://www.linkedin.com/sharing/share-offsite/?url=')
    expect(
      screen
        .getByRole('link', { name: 'blog.articleDetail.share.x' })
        .getAttribute('href'),
    ).toContain(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(TITLE)}&`,
    )
  })

  it('includes the page URL in the share targets once mounted', () => {
    render(<ArticleShare title={TITLE} />)

    const facebook = screen.getByRole('link', {
      name: 'blog.articleDetail.share.facebook',
    }) as HTMLAnchorElement

    expect(facebook.href).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    )
  })

  it('shows copied feedback only after a successful copy', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn(() => Promise.resolve())
    setClipboard({ writeText })

    render(<ArticleShare title={TITLE} />)

    await user.click(
      screen.getByRole('button', {
        name: /blog\.articleDetail\.share\.copyLink/,
      }),
    )

    expect(writeText).toHaveBeenCalledWith(window.location.href)
    expect(
      screen.getByRole('button', {
        name: 'blog.articleDetail.share.linkCopied',
      }),
    ).toBeDefined()
  })

  it('keeps the original label when the clipboard write fails', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn(() => Promise.reject(new Error('denied')))
    setClipboard({ writeText })

    render(<ArticleShare title={TITLE} />)

    await user.click(
      screen.getByRole('button', {
        name: /blog\.articleDetail\.share\.copyLink/,
      }),
    )

    expect(
      screen.getByRole('button', {
        name: /blog\.articleDetail\.share\.copyLink/,
      }),
    ).toBeDefined()
    expect(
      screen.queryByRole('button', {
        name: 'blog.articleDetail.share.linkCopied',
      }),
    ).toBeNull()
  })

  it('does nothing when the clipboard API is unavailable', async () => {
    const user = userEvent.setup()
    setClipboard(undefined)

    render(<ArticleShare title={TITLE} />)

    await user.click(
      screen.getByRole('button', {
        name: /blog\.articleDetail\.share\.copyLink/,
      }),
    )

    expect(
      screen.getByRole('button', {
        name: /blog\.articleDetail\.share\.copyLink/,
      }),
    ).toBeDefined()
  })
})
