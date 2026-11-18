import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('support')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
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
