import * as stylex from '@stylexjs/stylex'
import { Home } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { BackButton } from '../../components/ui/back-button'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const styles = stylex.create({
  focusRing: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 2,
    },
    outlineStyle: {
      default: 'none',
      ':focus-visible': 'solid',
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 2,
    },
  },
  main: {
    paddingBlock: spacing.xl,
    paddingInline: spacing.margin,
    alignItems: 'center',
    backgroundColor: colors.surface,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  inner: {
    marginInline: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '36rem',
    width: '100%',
  },
  numberWrap: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none',
    marginBottom: spacing.sm,
  },
  number: {
    color: colors.primary,
    fontFamily: fonts.heading,
    fontSize: {
      default: '6.5rem',
      '@media (min-width: 40rem)': '9rem',
    },
    fontWeight: 800,
    letterSpacing: '-0.025em',
    lineHeight: 1,
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.75rem',
      '@media (min-width: 40rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: {
      default: '2.125rem',
      '@media (min-width: 40rem)': '2.5rem',
    },
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    textAlign: 'center',
    textWrap: 'balance',
    marginBottom: spacing.xl,
    maxWidth: '28rem',
  },
  actions: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    borderRadius: radii.lg,
    gap: spacing.xs,
    paddingBlock: '0.75rem',
    paddingInline: spacing.xl,
    alignItems: 'center',
    backgroundColor: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    color: colors.onPrimary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transform: {
      default: null,
      ':hover': 'translateY(-2px)',
    },
    transitionDuration: '200ms',
    transitionProperty: 'background-color, box-shadow, transform',
  },
})

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <main {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.numberWrap)}>
          <span aria-hidden="true" {...stylex.props(styles.number)}>
            404
          </span>
        </div>
        <h1 {...stylex.props(styles.title)}>{t('title')}</h1>
        <p {...stylex.props(styles.description)}>{t('description')}</p>
        <div {...stylex.props(styles.actions)}>
          <Link
            href="/"
            {...stylex.props(styles.primaryButton, styles.focusRing)}
          >
            <span>{t('backHome')}</span>
            <Home aria-hidden="true" size={18} />
          </Link>
          <BackButton label={t('back')} />
        </div>
      </div>
    </main>
  )
}
