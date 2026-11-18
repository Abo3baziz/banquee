import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const styles = stylex.create({
  card: {
    padding: spacing.xl,
    borderRadius: radii.lg,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.05)',
      ':hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    transitionDuration: '200ms',
    transitionProperty: 'box-shadow',
  },
  icon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primaryContainer,
    display: 'flex',
    justifyContent: 'center',
    height: '3.5rem',
    marginBottom: spacing.lg,
    width: '3.5rem',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: spacing.sm,
  },
})

type SupportContactCardProps = {
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function SupportContactCard({
  title,
  icon: Icon,
  children,
}: SupportContactCardProps) {
  return (
    <div {...stylex.props(styles.card)}>
      <span aria-hidden="true" {...stylex.props(styles.icon)}>
        <Icon size={28} />
      </span>
      <h3 {...stylex.props(styles.title)}>{title}</h3>
      {children}
    </div>
  )
}
