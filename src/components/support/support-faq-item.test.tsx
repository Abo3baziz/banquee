import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SupportFaqItem } from './support-faq-item'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryTint: 'var(--primary-tint)',
    primaryContainer: 'var(--primary-container)',
    onSurface: 'var(--on-surface)',
    secondary: 'var(--secondary)',
    divider: 'var(--divider)',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  radii: {
    full: '9999px',
  },
  spacing: {
    md: '1rem',
    lg: '1.5rem',
  },
}))

const baseProps = {
  id: 'faq-answer',
  question: 'How do I freeze my card?',
  answer: 'Open the app and choose the Freeze Card option.',
  divider: true,
}

describe('SupportFaqItem', () => {
  it('starts collapsed without rendering the answer region', () => {
    render(<SupportFaqItem {...baseProps} isOpen={false} onToggle={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'How do I freeze my card?' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Open the app and choose the Freeze Card option.'),
    ).not.toBeInTheDocument()
  })

  it('expands when toggled by the parent', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    const { rerender } = render(
      <SupportFaqItem {...baseProps} isOpen={false} onToggle={onToggle} />,
    )

    await user.click(
      screen.getByRole('button', { name: 'How do I freeze my card?' }),
    )

    expect(onToggle).toHaveBeenCalledOnce()

    rerender(<SupportFaqItem {...baseProps} isOpen onToggle={onToggle} />)

    expect(
      screen.getByRole('button', { name: 'How do I freeze my card?' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText('Open the app and choose the Freeze Card option.'),
    ).toBeInTheDocument()
  })

  it('shows the answer when open', () => {
    render(<SupportFaqItem {...baseProps} isOpen onToggle={vi.fn()} />)

    const button = screen.getByRole('button', {
      name: 'How do I freeze my card?',
    })
    const region = screen.getByRole('region')

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveAttribute('aria-controls', 'faq-answer')
    expect(region).toHaveAttribute('id', 'faq-answer')
    expect(region).toHaveAttribute('aria-labelledby', 'faq-answer-trigger')
    expect(
      screen.getByText('Open the app and choose the Freeze Card option.'),
    ).toBeInTheDocument()
  })

  it('renders without a divider when divider is false', () => {
    const { container } = render(
      <SupportFaqItem
        {...baseProps}
        divider={false}
        isOpen={false}
        onToggle={vi.fn()}
      />,
    )

    expect(container.firstElementChild).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'How do I freeze my card?' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })
})
