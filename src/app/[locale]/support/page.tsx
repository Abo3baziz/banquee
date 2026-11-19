import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/src/lib/site'
import {
  SupportContact,
  SupportFaqExplorer,
  SupportHero,
} from '../../../components/support'
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
  const t = await getTranslations({ locale, namespace: 'support' })

  return pageMetadata({
    locale,
    title: t('meta.title'),
    description: t('meta.description'),
    path: '/support',
  })
}

export default function SupportPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <SupportHero />
      <SupportFaqExplorer />
      <SupportContact />
    </main>
  )
}
