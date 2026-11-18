import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { CompareCardsGrid } from '../../../components/compare/compare-cards-grid'
import { CompareCta } from '../../../components/compare/compare-cta'
import { CompareHero } from '../../../components/compare/compare-hero'
import { ComparisonTable } from '../../../components/compare/comparison-table'
import { colors } from '../../../styles/tokens.stylex'

const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('compareCards')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function ComparePage() {
  return (
    <main {...stylex.props(styles.main)}>
      <CompareHero />
      <CompareCardsGrid />
      <ComparisonTable />
      <CompareCta />
    </main>
  )
}
