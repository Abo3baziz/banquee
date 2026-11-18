import * as stylex from '@stylexjs/stylex'
import { ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Cta } from '../ui/cta'

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
  banner: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 48rem)': spacing.xl,
    },
    borderRadius: radii.xl,
    gap: spacing.lg,
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 64rem)': 'center',
    },
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 64rem)': 'row',
    },
    justifyContent: 'space-between',
  },
  copy: {
    maxWidth: '42rem',
  },
  eyebrow: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
  },
  eyebrowIcon: {
    flexShrink: 0,
  },
  heading: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 48rem)': '1.875rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    textWrap: 'balance',
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.625,
  },
  actions: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    flexWrap: 'wrap',
  },
})

export async function CompareCta() {
  const t = await getTranslations('compareCards')

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.banner)}>
          <div {...stylex.props(styles.copy)}>
            <span {...stylex.props(styles.eyebrow)}>
              <ShieldCheck
                aria-hidden="true"
                size={16}
                {...stylex.props(styles.eyebrowIcon)}
              />
              {t('securityCta.eyebrow')}
            </span>
            <h2 {...stylex.props(styles.heading)}>
              {t('securityCta.heading')}
            </h2>
            <p {...stylex.props(styles.description)}>
              {t('securityCta.description')}
            </p>
          </div>

          <div {...stylex.props(styles.actions)}>
            <Cta href="/support" variant="secondary" size="lg">
              {t('securityCta.ctaFaq')}
            </Cta>
            <Cta href="/open-account" variant="primary" size="lg">
              {t('securityCta.ctaOpen')}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
