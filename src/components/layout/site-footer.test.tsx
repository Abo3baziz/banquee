import { render, screen } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SiteFooter } from './site-footer'

const { getTranslations } = vi.hoisted(() => ({
  getTranslations: vi.fn(),
}))

vi.mock('next-intl/server', () => ({ getTranslations }))

vi.mock('@stylexjs/stylex', () => ({
  create: (styles: unknown) => styles,
  keyframes: (frames: unknown) => frames,
  props: () => ({}),
}))

vi.mock('../../../i18n/navigation', async () => {
  const { createElement } = await import('react')

  return {
    Link: ({ children, ...props }: { children: ReactNode; href: string }) =>
      createElement('a', props, children),
  }
})

vi.mock('../../styles/tokens.stylex', () => ({
  colors: {
    surfaceContainerLow: 'var(--surface-container-low)',
    primary: 'var(--primary)',
    primaryContainer: 'var(--primary-container)',
    onSurface: 'var(--on-surface)',
    onSurfaceVariant: 'var(--on-surface-variant)',
  },
  fonts: {
    latinHeading: 'var(--font-latin-heading)',
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
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

const FIGMA_URL = 'https://www.figma.com/community/file/1151590403301615327'
const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/'

const messages: Record<string, Record<string, string>> = {
  common: {
    brandName: 'banquee.',
  },
  footer: {
    brandTagline: 'Modern banking architecture.',
    colAboutTitle: 'About',
    colBlogTitle: 'Blog',
    colWebflowTitle: 'Webflow',
    colSocialTitle: 'Social Media',
    'links.features': 'Features',
    'links.aboutUs': 'About Us',
    'links.security': 'Security',
    'links.careers': 'Careers',
    'links.editorial': 'Editorial',
    'links.fintechGuides': 'Fintech Guides',
    'links.productUpdates': 'Product Updates',
    'links.founderStories': 'Founder Stories',
    'links.styleGuide': 'Style Guide',
    'links.licensing': 'Licensing',
    'links.changelog': 'Changelog',
    'links.allTemplates': 'All Templates',
    'links.twitter': 'Twitter / X',
    'links.linkedIn': 'LinkedIn',
    'links.instagram': 'Instagram',
    'links.youTube': 'YouTube',
    copyright: '© {{year}} banquee. All rights reserved.',
    designCredit:
      'UI design adapted from the Banquee template by <figmaLink>Pawel Gola</figmaLink>, used under <licenseLink>CC BY 4.0</licenseLink> with modifications.',
    'legal.privacyPolicy': 'Privacy Policy',
    'legal.termsOfService': 'Terms of Service',
    'legal.securityCompliance': 'Security & Compliance',
  },
}

// Minimal stand-in for the next-intl translator: plain keys, t.raw for the
// copyright year, and t.rich support for the <figmaLink>/<licenseLink> tags.
function createTranslator(namespace: string) {
  const dictionary = messages[namespace] ?? {}

  const t = (key: string) => dictionary[key] ?? `${namespace}.${key}`
  t.raw = (key: string) => dictionary[key] ?? key
  t.rich = (
    key: string,
    tags: Record<string, (chunks: ReactNode[]) => ReactNode>,
  ) => {
    const source = dictionary[key] ?? key
    const parts = source.split(/(<\w+>.*?<\/\w+>)/g).filter(Boolean)

    return parts.map((part, index) => {
      const match = part.match(/^<(\w+)>(.*)<\/\1>$/)

      if (match && typeof tags[match[1]] === 'function') {
        return createElement('span', { key: index }, tags[match[1]]([match[2]]))
      }

      return createElement('span', { key: index }, part)
    })
  }

  return t
}

beforeEach(() => {
  getTranslations.mockReset()
  getTranslations.mockImplementation(async (namespace: string) => {
    if (!messages[namespace]) {
      throw new Error(`Unexpected translation namespace: ${namespace}`)
    }

    return createTranslator(namespace)
  })
})

describe('SiteFooter', () => {
  it('interpolates the current year into the copyright line', async () => {
    const ui = await SiteFooter()
    render(ui)

    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} banquee. All rights reserved.`),
    ).toBeInTheDocument()
  })

  it('credits the template designer with a link to the Figma file', async () => {
    const ui = await SiteFooter()
    render(ui)

    const figmaLink = screen.getByRole('link', { name: 'Pawel Gola' })
    expect(figmaLink).toHaveAttribute('href', FIGMA_URL)
    expect(figmaLink).toHaveAttribute('target', '_blank')
    expect(figmaLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('links the CC BY 4.0 license and indicates modifications', async () => {
    const ui = await SiteFooter()
    render(ui)

    const licenseLink = screen.getByRole('link', { name: 'CC BY 4.0' })
    expect(licenseLink).toHaveAttribute('href', LICENSE_URL)
    expect(licenseLink).toHaveAttribute('target', '_blank')

    // The full sentence lives in one paragraph next to the copyright line.
    expect(licenseLink.closest('p')).toHaveTextContent(
      'UI design adapted from the Banquee template by',
    )
    expect(licenseLink.closest('p')).toHaveTextContent('with modifications')
  })
})
