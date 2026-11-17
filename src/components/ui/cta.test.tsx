import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Cta } from './cta'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
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

describe('Cta', () => {
  it('renders a link when href is provided', () => {
    render(
      <Cta
        href="/open-account"
        variant="primary"
        size="lg"
        trailingIcon={<svg data-testid="trailing-icon" />}
      >
        Open account
      </Cta>,
    )

    const link = screen.getByRole('link', { name: 'Open account' })

    expect(link).toHaveAttribute('href', '/open-account')
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument()
  })

  it('renders a button by default and forwards click handlers', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Cta onClick={onClick}>Continue</Cta>)

    const button = screen.getByRole('button', { name: 'Continue' })

    expect(button).toHaveAttribute('type', 'button')

    await user.click(button)

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('keeps leading and trailing icons around the label', () => {
    render(
      <Cta
        leadingIcon={<svg data-testid="leading-icon" />}
        trailingIcon={<svg data-testid="trailing-icon" />}
      >
        Continue
      </Cta>,
    )

    const button = screen.getByRole('button', { name: 'Continue' })
    const leading = screen.getByTestId('leading-icon')
    const trailing = screen.getByTestId('trailing-icon')

    expect(button).toContainElement(leading)
    expect(button).toContainElement(trailing)
    expect(
      leading.compareDocumentPosition(trailing) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('does not call handlers when the button is disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Cta disabled onClick={onClick}>
        Continue
      </Cta>,
    )

    const button = screen.getByRole('button', { name: 'Continue' })

    expect(button).toBeDisabled()

    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('respects an explicit button type', () => {
    render(<Cta type="submit">Save</Cta>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'submit',
    )
  })
})
