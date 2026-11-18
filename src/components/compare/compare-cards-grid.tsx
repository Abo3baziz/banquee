import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { BankCard, CardStatusBadge } from '../banking-card'
import { formatUsd } from '../banking-demo/demo-data'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { COMPARE_CARDS } from './compare-data'

const styles = stylex.create({
  section: {
    paddingBlock: spacing.xl,
    width: '100%',
  },
  container: {
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  grid: {
    gap: spacing.lg,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 48rem)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  card: {
    padding: spacing.lg,
    borderColor: 'transparent',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 18px 44px rgba(0, 0, 0, 0.1)',
    },
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  cardPremium: {
    borderColor: colors.primaryContainer,
  },
  popularBadge: {
    borderRadius: radii.full,
    insetInline: 0,
    marginInline: 'auto',
    paddingBlock: '0.125rem',
    paddingInline: spacing.md,
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    position: 'absolute',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    zIndex: 5,
    top: '-0.75rem',
    width: 'fit-content',
  },
  visual: {
    marginInline: 'auto',
    marginBottom: spacing.lg,
    maxWidth: '26rem',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  nameRow: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  name: {
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
    lineHeight: 1.5,
    marginBottom: spacing.md,
  },
  facts: {
    margin: 0,
    gap: spacing.sm,
    display: 'flex',
    marginTop: 'auto',
  },
  fact: {
    borderRadius: radii.md,
    gap: '0.125rem',
    paddingBlock: spacing.sm,
    paddingInline: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0,
  },
  factLabel: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  factValue: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  visuallyHidden: {
    margin: -1,
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: 1,
    width: 1,
  },
})

export async function CompareCardsGrid() {
  const [t, tm] = await Promise.all([
    getTranslations('compareCards'),
    getTranslations('mockups'),
  ])

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <h2 {...stylex.props(styles.visuallyHidden)}>
          {t('grid.sectionTitle')}
        </h2>
        <div {...stylex.props(styles.grid)}>
          {COMPARE_CARDS.map((card, index) => {
            const premium = card.tier === 'premium'
            const description =
              card.kind === 'credit'
                ? t('grid.creditDescription')
                : t('grid.debitDescription')

            return (
              <Reveal key={card.id} delay={index * 0.08}>
                <article
                  {...stylex.props(styles.card, premium && styles.cardPremium)}
                >
                  {premium ? (
                    <span {...stylex.props(styles.popularBadge)}>
                      {t('grid.premiumBadge')}
                    </span>
                  ) : null}

                  <div {...stylex.props(styles.visual)}>
                    <BankCard
                      tier={card.tier}
                      type="physical"
                      network={card.brand}
                      lastFour={card.lastFour}
                      cardholderName={card.cardholder}
                      cardholderLabel={tm('cardsManagement.cardHolderLabel')}
                      expiryDate={card.expiry}
                      expiryLabel={tm('cardsManagement.expiresLabel')}
                      label={card.networkLabel}
                      accessibleLabel={`${card.networkLabel} ${card.lastFour}`}
                    />
                  </div>

                  <div {...stylex.props(styles.content)}>
                    <div {...stylex.props(styles.nameRow)}>
                      <h3 {...stylex.props(styles.name)}>
                        {card.networkLabel}
                      </h3>
                      <CardStatusBadge
                        status={card.status}
                        label={
                          card.status === 'frozen'
                            ? t('grid.frozen')
                            : t('grid.active')
                        }
                      />
                    </div>

                    <p {...stylex.props(styles.description)}>{description}</p>

                    <dl {...stylex.props(styles.facts)}>
                      <div {...stylex.props(styles.fact)}>
                        <dt {...stylex.props(styles.factLabel)}>
                          {t('grid.dailyLimit')}
                        </dt>
                        <dd {...stylex.props(styles.factValue)}>
                          <span dir="ltr">
                            {formatUsd(card.dailyLimit.limit)}
                          </span>
                        </dd>
                      </div>
                      <div {...stylex.props(styles.fact)}>
                        <dt {...stylex.props(styles.factLabel)}>
                          {t('grid.monthlyLimit')}
                        </dt>
                        <dd {...stylex.props(styles.factValue)}>
                          <span dir="ltr">
                            {formatUsd(card.monthlyLimit.limit)}
                          </span>
                        </dd>
                      </div>
                    </dl>
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
