import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BankCard } from './bank-card'

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  props: () => ({}),
}))

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryContainer: 'var(--primary-container)',
    primaryTint: 'var(--primary-tint)',
    onPrimary: 'var(--on-primary)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
    error: 'var(--error)',
    errorContainer: 'var(--error-container)',
    surfaceLight: 'var(--surface-light)',
    surfaceContainerHigh: 'var(--surface-container-high)',
    tintBlue: 'var(--tint-blue)',
    onSecondaryFixed: 'var(--on-secondary-fixed)',
    onSecondaryContainer: 'var(--on-secondary-container)',
  },
  fonts: {
    body: 'var(--font-body)',
    heading: 'var(--font-heading)',
    latinHeading: 'var(--font-latin-heading)',
    mono: 'var(--font-mono)',
  },
}))

vi.mock('./card-tokens.stylex', () => ({
  bankCardVars: {
    background: 'var(--bank-card-bg)',
    border: 'var(--bank-card-border)',
    foreground: 'var(--bank-card-fg)',
    muted: 'var(--bank-card-muted)',
    accent: 'var(--bank-card-accent)',
    labelBackground: 'var(--bank-card-label-bg)',
    labelForeground: 'var(--bank-card-label-fg)',
    chip: 'var(--bank-card-chip)',
    chipLine: 'var(--bank-card-chip-line)',
    stripe: 'var(--bank-card-stripe)',
    signature: 'var(--bank-card-signature)',
    divider: 'var(--bank-card-divider)',
  },
  standardCardTheme: 'standard-theme',
  goldCardTheme: 'gold-theme',
  premiumCardTheme: 'premium-theme',
}))

describe('BankCard', () => {
  it('exposes a readable label and the masked number', () => {
    render(<BankCard label="Gold Privilege" lastFour="7712" />)

    expect(
      screen.getByRole('img', { name: 'Gold Privilege' }),
    ).toBeInTheDocument()
    expect(screen.getByText('•••• •••• •••• 7712')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders cardholder and expiry metadata when provided', () => {
    render(
      <BankCard
        lastFour="4289"
        cardholderName="John Doe"
        cardholderLabel="Card holder"
        expiryDate="09/28"
        expiryLabel="Expires"
      />,
    )

    expect(screen.getByText('Card holder')).toBeInTheDocument()
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0)
    expect(screen.getByText('Expires')).toBeInTheDocument()
    expect(screen.getByText('09/28')).toBeInTheDocument()
  })

  it('renders a flip button and reports the flipped state', async () => {
    const user = userEvent.setup()
    const onFlip = vi.fn()

    render(
      <BankCard
        lastFour="4289"
        cvv="842"
        onFlip={onFlip}
        flipLabel="Flip the Premium card to see the CVV"
        flipHint="Flip for CVV"
        backLabels={{
          cvvLabel: 'CVV / CVC',
          signatureLabel: 'John Doe',
          finePrint: 'Authorized signature',
        }}
      />,
    )

    const button = screen.getByRole('button', {
      name: 'Flip the Premium card to see the CVV',
    })

    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('842')).toBeInTheDocument()

    await user.click(button)

    expect(onFlip).toHaveBeenCalledOnce()
  })

  it('reflects a frozen status with its label and detail', () => {
    render(
      <BankCard
        lastFour="4289"
        status="frozen"
        statusLabel="Card is frozen"
        statusDetail="Taps are paused"
      />,
    )

    expect(screen.getAllByText('Card is frozen').length).toBeGreaterThan(0)
    expect(screen.getByText('Taps are paused')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Card is frozen' }),
    ).toBeInTheDocument()
  })

  it('drops the metadata row for the mini size', () => {
    render(
      <BankCard
        lastFour="4289"
        size="mini"
        cardholderName="John Doe"
        cardholderLabel="Card holder"
        expiryDate="09/28"
        expiryLabel="Expires"
      />,
    )

    expect(screen.getByText('•••• •••• •••• 4289')).toBeInTheDocument()
    expect(screen.queryByText('Card holder')).not.toBeInTheDocument()
    expect(screen.queryByText('Expires')).not.toBeInTheDocument()
  })

  it('marks virtual cards with a badge instead of a chip', () => {
    render(
      <BankCard lastFour="9042" type="virtual" virtualLabel="Virtual pass" />,
    )

    expect(screen.getByText('Virtual pass')).toBeInTheDocument()
  })

  it.each([
    ['blocked', 'Security hold'],
    ['expired', 'Expired'],
  ] as const)('renders the %s status', (status, statusLabel) => {
    render(
      <BankCard lastFour="4289" status={status} statusLabel={statusLabel} />,
    )

    expect(screen.getAllByText(statusLabel).length).toBeGreaterThan(0)
  })

  it('renders a selection indicator', () => {
    const { container, rerender } = render(
      <BankCard lastFour="4289" selected />,
    )

    const selectedMarkup = container.innerHTML

    rerender(<BankCard lastFour="4289" />)

    expect(container.innerHTML).not.toBe(selectedMarkup)
  })

  it('renders the card network mark', () => {
    const { rerender } = render(<BankCard lastFour="4289" network="visa" />)

    expect(screen.getAllByText('VISA')).toHaveLength(2)

    rerender(<BankCard lastFour="4289" network="none" />)

    expect(screen.queryByText('VISA')).not.toBeInTheDocument()
  })
})
