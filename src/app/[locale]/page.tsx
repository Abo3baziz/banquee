import * as stylex from '@stylexjs/stylex'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AppCta } from '../../components/landing/app-cta'
import { BlogSection } from '../../components/landing/blog-section'
import { Cashflow } from '../../components/landing/cashflow'
import { FeatureHighlights } from '../../components/landing/feature-highlights'
import { Hero } from '../../components/landing/hero'
import { Manifesto } from '../../components/landing/manifesto'
import { NeedHelpSection } from '../../components/support/need-help'
import { Plans } from '../../components/landing/plans'
import { SendReceive } from '../../components/landing/send-receive'
import { Testimonials } from '../../components/landing/testimonials'
import { Tools } from '../../components/landing/tools'
import { colors } from '../../styles/tokens.stylex'
import { pageMetadata, siteName } from '@/src/lib/site'

const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing' })

  return pageMetadata({
    locale,
    title: `${siteName} - ${t('meta.title')}`,
    description: t('meta.description'),
    path: '',
  })
}

export default function Home() {
  return (
    <main {...stylex.props(styles.main)}>
      <Hero />
      <FeatureHighlights />
      <Cashflow />
      <Plans />
      <SendReceive />
      <Tools />
      <Manifesto />
      <Testimonials />
      <AppCta />
      <BlogSection />
      <NeedHelpSection />
    </main>
  )
}
