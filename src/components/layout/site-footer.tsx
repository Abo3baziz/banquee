import * as stylex from '@stylexjs/stylex'
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, spacing } from '../../styles/tokens.stylex'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

// CC BY 4.0 requires crediting the creator, linking the license, and
// indicating modifications — the credit line in the footer covers all three.
const FIGMA_TEMPLATE_URL =
  'https://www.figma.com/community/file/1151590403301615327'
const CC_BY_LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/'

async function getCurrentYear() {
  'use cache'
  return new Date().getFullYear()
}

const styles = stylex.create({
  focusRing: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 2,
    },
    outlineStyle: {
      default: 'none',
      ':focus-visible': 'solid',
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 2,
    },
  },
  footer: {
    backgroundColor: colors.surfaceContainerLow,
    marginTop: spacing.xl,
    width: '100%',
  },
  container: {
    marginInline: 'auto',
    paddingInline: spacing.margin,
    maxWidth: '80rem',
    paddingBottom: spacing.lg,
    paddingTop: spacing.xl,
    width: '100%',
  },
  grid: {
    gap: spacing.xl,
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 48rem)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 64rem)': 'repeat(5, minmax(0, 1fr))',
    },
    marginBottom: spacing.xl,
  },
  brand: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'flex',
    fontFamily: fonts.latinHeading,
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: '1.6875rem',
    textDecorationLine: 'none',
    marginBottom: spacing.md,
    width: 'fit-content',
  },
  brandDot: {
    color: colors.primaryContainer,
  },
  tagline: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    maxWidth: '20rem',
  },
  column: {
    minWidth: 0,
  },
  columnTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginBottom: spacing.xs,
  },
  linkList: {
    margin: 0,
    padding: 0,
    gap: spacing.sm,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  bottom: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 48rem)': 'row',
    },
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  creditBlock: {
    gap: spacing.xs,
    display: 'flex',
    flexDirection: 'column',
    textAlign: {
      default: 'center',
      '@media (min-width: 48rem)': 'start',
    },
  },
  copyright: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
  },
  credit: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
  },
  creditLink: {
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    textDecorationColor: {
      default: colors.primaryContainer,
      ':hover': colors.primary,
    },
    textDecorationLine: 'underline',
    textUnderlineOffset: 3,
    transitionDuration: '150ms',
    transitionProperty: 'color, text-decoration-color',
  },
  creditLinkIcon: {
    display: 'inline-block',
    marginInlineStart: '0.125rem',
    transform: 'translateY(-1px)',
    verticalAlign: 'baseline',
  },
  legal: {
    alignItems: 'center',
    columnGap: spacing.lg,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: spacing.xs,
  },
  legalLink: {
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
})

export async function SiteFooter() {
  const [t, tCommon] = await Promise.all([
    getTranslations('footer'),
    getTranslations('common'),
  ])
  const year = await getCurrentYear()

  const brand = tCommon('brandName')
  const hasSuffix = brand.endsWith('.')
  const wordmark = hasSuffix ? brand.slice(0, -1) : brand
  const suffix = hasSuffix ? brand.slice(-1) : ''

  // The dictionaries use {{variable}} placeholders, so interpolate the raw string.
  const copyright = String(t.raw('copyright')).replace('{{year}}', String(year))

  // Mirror the arrow in RTL so it still points away from the link text.
  const locale = await getLocale()
  const CreditArrow = locale === 'ar' ? ArrowUpLeft : ArrowUpRight

  const credit = t.rich('designCredit', {
    figmaLink: (chunks) => (
      <a
        href={FIGMA_TEMPLATE_URL}
        target="_blank"
        rel="noreferrer"
        {...stylex.props(styles.creditLink, styles.focusRing)}
      >
        {chunks}
        <CreditArrow
          aria-hidden="true"
          size={10}
          strokeWidth={2.5}
          {...stylex.props(styles.creditLinkIcon)}
        />
      </a>
    ),
    licenseLink: (chunks) => (
      <a
        href={CC_BY_LICENSE_URL}
        target="_blank"
        rel="noreferrer"
        {...stylex.props(styles.creditLink, styles.focusRing)}
      >
        {chunks}
        <CreditArrow
          aria-hidden="true"
          size={10}
          strokeWidth={2.5}
          {...stylex.props(styles.creditLinkIcon)}
        />
      </a>
    ),
  })

  const columns: Array<{ title: string; links: FooterLink[] }> = [
    {
      title: t('colAboutTitle'),
      links: [
        { label: t('links.features'), href: '/features' },
        { label: t('links.aboutUs'), href: '/about' },
        { label: t('links.security'), href: '/security' },
        { label: t('links.careers'), href: '/careers' },
      ],
    },
    {
      title: t('colBlogTitle'),
      links: [
        { label: t('links.editorial'), href: '/blog/editorial' },
        { label: t('links.fintechGuides'), href: '/blog/fintech-guides' },
        { label: t('links.productUpdates'), href: '/blog/product-updates' },
        { label: t('links.founderStories'), href: '/blog/founder-stories' },
      ],
    },
    {
      title: t('colWebflowTitle'),
      links: [
        { label: t('links.styleGuide'), href: '/style-guide' },
        { label: t('links.licensing'), href: '/licensing' },
        { label: t('links.changelog'), href: '/changelog' },
        { label: t('links.allTemplates'), href: '/templates' },
      ],
    },
    {
      title: t('colSocialTitle'),
      links: [
        {
          label: t('links.twitter'),
          href: 'https://x.com',
          external: true,
        },
        {
          label: t('links.linkedIn'),
          href: 'https://www.linkedin.com',
          external: true,
        },
        {
          label: t('links.instagram'),
          href: 'https://www.instagram.com',
          external: true,
        },
        {
          label: t('links.youTube'),
          href: 'https://www.youtube.com',
          external: true,
        },
      ],
    },
  ]

  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid)}>
          <div>
            <Link
              href="/"
              dir="ltr"
              {...stylex.props(styles.brand, styles.focusRing)}
            >
              <span>{wordmark}</span>
              {suffix ? (
                <span {...stylex.props(styles.brandDot)}>{suffix}</span>
              ) : null}
            </Link>
            <p {...stylex.props(styles.tagline)}>{t('brandTagline')}</p>
          </div>
          {columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              {...stylex.props(styles.column)}
            >
              <h2 {...stylex.props(styles.columnTitle)}>{column.title}</h2>
              <ul {...stylex.props(styles.linkList)}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        {...stylex.props(styles.link, styles.focusRing)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        {...stylex.props(styles.link, styles.focusRing)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div {...stylex.props(styles.bottom)}>
          <div {...stylex.props(styles.creditBlock)}>
            <span {...stylex.props(styles.copyright)}>{copyright}</span>
            <p {...stylex.props(styles.credit)}>{credit}</p>
          </div>
          <div {...stylex.props(styles.legal)}>
            <Link
              href="/privacy-policy"
              {...stylex.props(styles.legalLink, styles.focusRing)}
            >
              {t('legal.privacyPolicy')}
            </Link>
            <Link
              href="/terms-of-service"
              {...stylex.props(styles.legalLink, styles.focusRing)}
            >
              {t('legal.termsOfService')}
            </Link>
            <Link
              href="/security-compliance"
              {...stylex.props(styles.legalLink, styles.focusRing)}
            >
              {t('legal.securityCompliance')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
