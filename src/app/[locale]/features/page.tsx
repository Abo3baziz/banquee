import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { FeaturesHero } from '../../../components/features/hero'
import { colors } from '../../../styles/tokens.stylex'

const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('featuresPage')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function FeaturesPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <FeaturesHero />
    </main>
  )
}
