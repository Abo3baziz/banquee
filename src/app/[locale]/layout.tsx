import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import './globals.css'
import * as stylex from '@stylexjs/stylex'
import { SiteHeader } from '../../components/layout/site-header'
import { routing } from '@/i18n/routing'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
      className={`${dmSans.variable} ${inter.variable}`}
    >
      <body {...stylex.props(styles.body)}>
        <NextIntlClientProvider>
          <SiteHeader />
          <div {...stylex.props(styles.content)}>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
