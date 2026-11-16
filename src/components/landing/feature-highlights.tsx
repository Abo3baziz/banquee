import * as stylex from '@stylexjs/stylex'
import { Globe, PiggyBank, Smartphone, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

type Highlight = {
  titleKey:
    | 'hero.pills.instantTransfers'
    | 'hero.pills.savingAccounts'
    | 'hero.pills.worldwidePay'
    | 'hero.pills.mobileBanking'
  descriptionKey:
    | 'hero.pills.instantTransfersSub'
    | 'hero.pills.savingAccountsSub'
    | 'hero.pills.worldwidePaySub'
    | 'hero.pills.mobileBankingSub'
  icon: LucideIcon
}

const HIGHLIGHTS: Highlight[] = [
  {
    titleKey: 'hero.pills.instantTransfers',
    descriptionKey: 'hero.pills.instantTransfersSub',
    icon: Zap,
  },
  {
    titleKey: 'hero.pills.savingAccounts',
    descriptionKey: 'hero.pills.savingAccountsSub',
    icon: PiggyBank,
  },
  {
    titleKey: 'hero.pills.worldwidePay',
    descriptionKey: 'hero.pills.worldwidePaySub',
    icon: Globe,
  },
  {
    titleKey: 'hero.pills.mobileBanking',
    descriptionKey: 'hero.pills.mobileBankingSub',
    icon: Smartphone,
  },
]

const styles = stylex.create({
  section: {
    backgroundColor: colors.surfaceContainerLow,
    width: '100%',
  },
  container: {
    marginInline: 'auto',
    paddingBlock: spacing.xl,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  grid: {
    gap: spacing.md,
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 40rem)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 64rem)': 'repeat(4, minmax(0, 1fr))',
    },
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.03)',
      ':hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionDuration: '200ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  icon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '3rem',
    width: '3rem',
  },
  body: {
    minWidth: 0,
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
})

export async function FeatureHighlights() {
  const t = await getTranslations('landing')

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid)}>
          {HIGHLIGHTS.map((highlight, index) => {
            const Icon = highlight.icon

            return (
              <Reveal key={highlight.titleKey} delay={index * 0.08}>
                <article {...stylex.props(styles.card)}>
                  <span {...stylex.props(styles.icon)}>
                    <Icon aria-hidden="true" size={24} />
                  </span>
                  <div {...stylex.props(styles.body)}>
                    <h2 {...stylex.props(styles.title)}>
                      {t(highlight.titleKey)}
                    </h2>
                    <p {...stylex.props(styles.description)}>
                      {t(highlight.descriptionKey)}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
