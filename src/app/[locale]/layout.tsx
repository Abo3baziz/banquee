import type { Metadata } from 'next'
import { Cairo, DM_Sans, Inter, Tajawal } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import './globals.css'
import * as stylex from '@stylexjs/stylex'
import { SiteFooter } from '../../components/layout/site-footer'
import { SiteHeader } from '../../components/layout/site-header'
import { colors } from '../../styles/tokens.stylex'
import { routing } from '@/i18n/routing'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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

export const metadata: Metadata = {
  title: 'Banquee',
  description: 'Modern banking for digital living.',
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

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={[
        dmSans.variable,
        inter.variable,
        locale === 'ar' ? cairo.variable : '',
        locale === 'ar' ? tajawal.variable : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <body {...stylex.props(styles.body)}>
        <NextIntlClientProvider>
          <SiteHeader />
          <div {...stylex.props(styles.content)}>{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
