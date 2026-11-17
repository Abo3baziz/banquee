import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FaqItem } from './faq-item'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryTint: 'var(--primary-tint)',
    surfaceContainerLowest: 'var(--surface-container-lowest)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  radii: {
    lg: '0.75rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
}))

describe('FaqItem', () => {
  it('renders the question and answer', () => {
    render(
      <FaqItem
        question="How do I open a Banko account?"
        answer="Download the Banko app and follow the activation steps."
      />,
    )

    expect(
      screen.getByText('How do I open a Banko account?'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Download the Banko app and follow the activation steps.',
      ),
    ).toBeInTheDocument()
  })

  it('is collapsed by default', () => {
    const { container } = render(
      <FaqItem question="Question" answer="Answer" />,
    )

    expect(container.querySelector('details')).not.toHaveAttribute('open')
  })

  it('can start expanded', () => {
    const { container } = render(
      <FaqItem question="Question" answer="Answer" defaultOpen />,
    )

    expect(container.querySelector('details')).toHaveAttribute('open')
  })
})
