import * as stylex from '@stylexjs/stylex'
import { ArrowLeftRight, Shield, Vault } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { PlanCard } from './plan-card'
import { SecurityToggles } from './security-toggles'

type Vault = {
  titleKey: 'savings.goalJapan' | 'savings.goalMacBook'
  amountKey: 'savings.goalJapanAmount' | 'savings.goalMacBookAmount'
  targetKey: 'savings.goalJapanTarget' | 'savings.goalMacBookTarget'
  progress: number
}

const VAULTS: Vault[] = [
  {
    titleKey: 'savings.goalJapan',
    amountKey: 'savings.goalJapanAmount',
    targetKey: 'savings.goalJapanTarget',
    progress: 90,
  },
  {
    titleKey: 'savings.goalMacBook',
    amountKey: 'savings.goalMacBookAmount',
    targetKey: 'savings.goalMacBookTarget',
    progress: 88,
  },
]

const RATES = [
  { symbol: '€', pair: 'EUR / USD', value: '1.0842' },
  { symbol: '£', pair: 'GBP / USD', value: '1.2670' },
  { symbol: '¥', pair: 'USD / JPY', value: '155.30' },
] as const

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
  header: {
    marginInline: 'auto',
    textAlign: 'center',
    marginBottom: spacing.xl,
    maxWidth: '36rem',
  },
  eyebrow: {
    color: colors.primary,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 48rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    textWrap: 'balance',
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  subtitle: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  tierGrid: {
    gap: spacing.lg,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  capabilities: {
    gap: spacing.lg,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(3, minmax(0, 1fr))',
    },
    marginTop: spacing.xl,
  },
  capabilityCard: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 48rem)': spacing.xl,
    },
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 12px 32px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    flexDirection: 'column',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  capabilityIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    height: '2.5rem',
    marginBottom: spacing.md,
    width: '2.5rem',
  },
  capabilityTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    marginBottom: spacing.xs,
  },
  capabilityDescription: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
    marginBottom: spacing.lg,
  },
  preview: {
    padding: spacing.md,
    borderRadius: radii.md,
    gap: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
  },
  vault: {
    gap: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
  },
  vaultTop: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  vaultName: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
  vaultPercent: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  vaultTrack: {
    borderRadius: radii.full,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
    height: '0.5rem',
    width: '100%',
  },
  vaultFill: {
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    height: '100%',
  },
  vaultFillStrong: {
    backgroundColor: colors.primary,
  },
  vaultMeta: {
    gap: spacing.sm,
    color: colors.onSurfaceVariant,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    justifyContent: 'space-between',
    lineHeight: '0.875rem',
  },
  vaultDivider: {
    borderTopColor: 'rgba(217, 217, 217, 0.4)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  rateRow: {
    borderRadius: radii.sm,
    gap: spacing.sm,
    paddingBlock: '0.25rem',
    paddingInline: '0.25rem',
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceContainer,
    },
    display: 'flex',
    justifyContent: 'space-between',
    transitionDuration: '150ms',
    transitionProperty: 'background-color',
  },
  rateLeft: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
  },
  rateSymbol: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.surfaceVariant,
    color: colors.onSurface,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    justifyContent: 'center',
    height: '1.5rem',
    width: '1.5rem',
  },
  ratePair: {
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 600,
    lineHeight: '1.125rem',
  },
  rateValue: {
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    fontWeight: 700,
    lineHeight: '1.125rem',
  },
})

export async function Plans() {
  const [t, tm] = await Promise.all([
    getTranslations('landing'),
    getTranslations('mockups'),
  ])

  return (
    <section id="cards" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <div {...stylex.props(styles.header)}>
            <span {...stylex.props(styles.eyebrow)}>{t('plans.eyebrow')}</span>
            <h2 {...stylex.props(styles.title)}>{t('plans.title')}</h2>
            <p {...stylex.props(styles.subtitle)}>{t('plans.subtitle')}</p>
          </div>
        </Reveal>

        <div {...stylex.props(styles.tierGrid)}>
          <Reveal delay={0}>
            <PlanCard tier="standard" />
          </Reveal>
          <Reveal delay={0.08}>
            <PlanCard tier="gold" popular />
          </Reveal>
          <Reveal delay={0.16}>
            <PlanCard tier="premium" />
          </Reveal>
        </div>

        <div {...stylex.props(styles.capabilities)}>
          <Reveal delay={0}>
            <article {...stylex.props(styles.capabilityCard)}>
              <span {...stylex.props(styles.capabilityIcon)}>
                <Vault aria-hidden="true" size={22} />
              </span>
              <h3 {...stylex.props(styles.capabilityTitle)}>
                {t('plans.featureCards.smartVaults.title')}
              </h3>
              <p {...stylex.props(styles.capabilityDescription)}>
                {t('plans.featureCards.smartVaults.description')}
              </p>
              <div {...stylex.props(styles.preview)}>
                {VAULTS.map((vault, index) => (
                  <div
                    key={vault.titleKey}
                    {...stylex.props(
                      styles.vault,
                      index > 0 && styles.vaultDivider,
                    )}
                  >
                    <div {...stylex.props(styles.vaultTop)}>
                      <span {...stylex.props(styles.vaultName)}>
                        {tm(vault.titleKey)}
                      </span>
                      <span {...stylex.props(styles.vaultPercent)}>
                        {vault.progress}%
                      </span>
                    </div>
                    <div {...stylex.props(styles.vaultTrack)}>
                      <div
                        style={{ width: `${vault.progress}%` }}
                        {...stylex.props(
                          styles.vaultFill,
                          index === 1 && styles.vaultFillStrong,
                        )}
                      />
                    </div>
                    <div {...stylex.props(styles.vaultMeta)}>
                      <span>{tm(vault.amountKey)}</span>
                      <span>{tm(vault.targetKey)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article {...stylex.props(styles.capabilityCard)}>
              <span {...stylex.props(styles.capabilityIcon)}>
                <Shield aria-hidden="true" size={22} />
              </span>
              <h3 {...stylex.props(styles.capabilityTitle)}>
                {t('plans.featureCards.security.title')}
              </h3>
              <p {...stylex.props(styles.capabilityDescription)}>
                {t('plans.featureCards.security.description')}
              </p>
              <div {...stylex.props(styles.preview)}>
                <SecurityToggles />
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article {...stylex.props(styles.capabilityCard)}>
              <span {...stylex.props(styles.capabilityIcon)}>
                <ArrowLeftRight aria-hidden="true" size={22} />
              </span>
              <h3 {...stylex.props(styles.capabilityTitle)}>
                {t('plans.featureCards.globalExchange.title')}
              </h3>
              <p {...stylex.props(styles.capabilityDescription)}>
                {t('plans.featureCards.globalExchange.description')}
              </p>
              <div {...stylex.props(styles.preview)}>
                {RATES.map((rate) => (
                  <div key={rate.pair} {...stylex.props(styles.rateRow)}>
                    <div {...stylex.props(styles.rateLeft)}>
                      <span
                        aria-hidden="true"
                        {...stylex.props(styles.rateSymbol)}
                      >
                        {rate.symbol}
                      </span>
                      <span dir="ltr" {...stylex.props(styles.ratePair)}>
                        {rate.pair}
                      </span>
                    </div>
                    <span dir="ltr" {...stylex.props(styles.rateValue)}>
                      {rate.value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
