import * as stylex from '@stylexjs/stylex'
import { Cashflow } from '../../components/landing/cashflow'
import { FeatureHighlights } from '../../components/landing/feature-highlights'
import { Hero } from '../../components/landing/hero'
import { colors } from '../../styles/tokens.stylex'

const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
})

export default function Home() {
  return (
    <main {...stylex.props(styles.main)}>
      <Hero />
      <FeatureHighlights />
      <Cashflow />
    </main>
  )
}
