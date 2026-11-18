import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, spacing } from '../../../styles/tokens.stylex'

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  header: {
    marginBottom: spacing.xl,
  },
  badge: {
    borderRadius: radii.full,
    gap: spacing.xs,
    paddingBlock: '0.25rem',
    paddingInline: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.xs,
    width: 'fit-content',
  },
  badgeDot: {
    borderRadius: radii.full,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.primary,
    height: 8,
    width: 8,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '2rem',
      '@media (min-width: 40rem)': '2.75rem',
      '@media (min-width: 64rem)': '3rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.12,
    textWrap: 'balance',
    marginTop: spacing.xs,
  },
  titleAccent: {
    color: colors.primaryContainer,
  },
})

type NeedHelpHeaderProps = {
  eyebrow: string
  title: string
  titleId: string
}

/**
 * Question marks differ between English and Arabic, so the trailing accent
 * character is detected instead of appending a hardcoded "?".
 */
function splitTitleAccent(title: string) {
  if (title.endsWith('?') || title.endsWith('؟')) {
    return { text: title.slice(0, -1), accent: title.slice(-1) }
  }

  return { text: title, accent: '' }
}

export function NeedHelpHeader({
  eyebrow,
  title,
  titleId,
}: NeedHelpHeaderProps) {
  const { text, accent } = splitTitleAccent(title)

  return (
    <div {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.badge)}>
        <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
        <span {...stylex.props(styles.badgeText)}>{eyebrow}</span>
      </div>
      <h2 id={titleId} {...stylex.props(styles.title)}>
        {text}
        {accent ? (
          <span {...stylex.props(styles.titleAccent)}>{accent}</span>
        ) : null}
      </h2>
    </div>
  )
}
