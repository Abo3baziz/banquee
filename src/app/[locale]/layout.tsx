import type { Metadata } from 'next'
import { Cairo, Inter, Sora, Tajawal } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import './globals.css'
import * as stylex from '@stylexjs/stylex'
import { SiteFooter } from '../../components/layout/site-footer'
import { SiteHeader } from '../../components/layout/site-header'
import { BackToTop } from '../../components/ui/back-to-top'
import { colors } from '../../styles/tokens.stylex'
import { routing } from '@/i18n/routing'
import { siteName, siteUrl } from '@/src/lib/site'

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: 'variable',
  display: 'swap',
  preload: false,
})

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false,
})

export async function generateMetadata({
  params,
}: {
  params: LayoutProps<'/[locale]'>['params']
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing' })

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('meta.title'),
      template: `%s - ${siteName}`,
    },
    description: t('meta.description'),
    applicationName: siteName,
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const styles = stylex.create({
  body: {
    backgroundColor: colors.surface,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: '5rem',
  },
})

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations('common')

  const jsonLd = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: `${siteUrl}/${locale}`,
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: `${siteUrl}/${locale}`,
      inLanguage: locale,
    },
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={[
        sora.variable,
        inter.variable,
        cairo.variable,
        tajawal.variable,
      ].join(' ')}
    >
      <body {...stylex.props(styles.body)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.website),
          }}
        />
        <NextIntlClientProvider>
          <SiteHeader />
          <div {...stylex.props(styles.content)}>{children}</div>
          <SiteFooter />
          <BackToTop label={t('backToTop')} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
