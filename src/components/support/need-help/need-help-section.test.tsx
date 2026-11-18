import { render, screen } from '@testing-library/react'
import { Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NeedHelpSection } from './need-help-section'

const { getTranslations } = vi.hoisted(() => ({
  getTranslations: vi.fn(),
}))

vi.mock('next-intl/server', () => ({ getTranslations }))

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  keyframes: (frames: unknown) => frames,
  props: () => ({}),
}))

vi.mock('../../../styles/tokens.stylex', () => ({
  colors: {
    primary: 'var(--primary)',
    primaryContainer: 'var(--primary-container)',
    primaryTint: 'var(--primary-tint)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
    surfaceContainerLowest: 'var(--surface-container-lowest)',
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
    xl: '2rem',
    margin: '4rem',
  },
}))

vi.mock('../../ui/reveal', async () => {
  const { createElement } = await import('react')

  return {
    Reveal: ({ children }: { children: ReactNode }) =>
      createElement('div', null, children),
  }
})

const messages: Record<string, string> = {
  eyebrow: 'Help & Support',
  title: 'Need help?',
  'items.account.question': 'How do I open a Banko account?',
  'items.account.answer': 'Account answer.',
  'items.card.question': 'How do I order a new card?',
  'items.card.answer': 'Card answer.',
  'items.limits.question': 'How to change my account limits?',
  'items.limits.answer': 'Limits answer.',
  'items.premium.question': 'How does Banko Premium work?',
  'items.premium.answer': 'Premium answer.',
  'items.multiple.question': 'Can I have two Banko accounts?',
  'items.multiple.answer': 'Multiple answer.',
  'support.title': 'Contact Support',
  'support.description': 'Contact description.',
  'support.hotlineLabel': 'Support Hotline',
  'support.hotlineValue': '+49 176 123 456',
  'support.emailLabel': 'Support Email',
  'support.emailValue': 'help@banquee.com',
  'support.responseTime': 'Average response time: < 5 mins',
  'support.availability': '24/7 Available',
}

beforeEach(() => {
  getTranslations.mockReset()
  getTranslations.mockImplementation(async (namespace: string) => {
    if (namespace !== 'needHelp') {
      throw new Error(`Unexpected translation namespace: ${namespace}`)
    }

    return (key: string) => messages[key] ?? key
  })
})

describe('NeedHelpSection', () => {
  it('renders supplied content without reading translations', async () => {
    const ui = await NeedHelpSection({
      eyebrow: 'Support',
      title: 'Custom help?',
      faqs: [{ question: 'Custom question?', answer: 'Custom answer.' }],
      support: {
        title: 'Custom support',
        description: 'Custom description.',
        contacts: [
          {
            key: 'phone',
            label: 'Phone',
            value: '+1 555 0100',
            href: 'tel:+15550100',
            icon: Phone,
          },
        ],
        responseTime: 'Within minutes',
        availability: 'Always online',
      },
    })

    render(ui)

    expect(getTranslations).not.toHaveBeenCalled()
    expect(screen.getByText('Custom question?')).toBeInTheDocument()
    expect(screen.getByText('Custom support')).toBeInTheDocument()
  })

  it('falls back to the needHelp namespace', async () => {
    const ui = await NeedHelpSection()

    render(ui)

    expect(getTranslations).toHaveBeenCalledWith('needHelp')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Need help?',
    )
    expect(
      screen.getByText('How do I open a Banko account?'),
    ).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('merges supplied copy with the defaults', async () => {
    const ui = await NeedHelpSection({ title: 'Features help?' })

    render(ui)

    expect(getTranslations).toHaveBeenCalledWith('needHelp')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Features help?',
    )
    expect(
      screen.getByText('How do I open a Banko account?'),
    ).toBeInTheDocument()
  })
})
