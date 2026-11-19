import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/src/lib/site'
import { FeaturesHero } from '../../../components/features/hero'
import { FeaturesSections } from '../../../components/features/feature-sections'
import { AppCta } from '../../../components/landing/app-cta'
import { NeedHelpSection } from '../../../components/support/need-help'
import { Plans } from '../../../components/landing/plans'
import { colors } from '../../../styles/tokens.stylex'

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
  const t = await getTranslations({ locale, namespace: 'featuresPage' })

  return pageMetadata({
    locale,
    title: t('meta.title'),
    description: t('meta.description'),
    path: '/features',
  })
}

export default function FeaturesPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <FeaturesHero />
      <FeaturesSections />
      <Plans />
      <AppCta />
      <NeedHelpSection />
    </main>
  )
}
