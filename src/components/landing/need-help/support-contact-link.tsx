import type { LucideIcon } from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, spacing } from '../../../styles/tokens.stylex'

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
  link: {
    padding: spacing.md,
    borderColor: 'rgba(217, 217, 217, 0.2)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceContainerLow,
      ':hover': 'rgba(232, 242, 238, 0.6)',
    },
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    display: 'flex',
    textDecorationLine: 'none',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, color',
  },
  icon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primaryContainer,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '3rem',
    width: '3rem',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  label: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: '0.875rem',
    textTransform: 'uppercase',
  },
  value: {
    color: 'inherit',
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    overflowWrap: 'anywhere',
    transitionDuration: '200ms',
    transitionProperty: 'color',
    unicodeBidi: 'isolate',
  },
})

export type SupportContact = {
  key: string
  label: string
  value: string
  href: string
  icon: LucideIcon
}

type SupportContactLinkProps = SupportContact

export function SupportContactLink({
  label,
  value,
  href,
  icon: Icon,
}: SupportContactLinkProps) {
  return (
    <a href={href} {...stylex.props(styles.link, styles.focusRing)}>
      <span aria-hidden="true" {...stylex.props(styles.icon)}>
        <Icon size={22} />
      </span>
      <span {...stylex.props(styles.text)}>
        <span {...stylex.props(styles.label)}>{label}</span>
        <span {...stylex.props(styles.value)}>
          <bdi dir="ltr">{value}</bdi>
        </span>
      </span>
    </a>
  )
}
