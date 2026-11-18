import * as stylex from '@stylexjs/stylex'
import { Headset } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { colors, fonts, radii, spacing } from '../../../styles/tokens.stylex'
import { SupportContactLink, type SupportContact } from './support-contact-link'

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  card: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 48rem)': spacing.xl,
    },
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: '1rem',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.surfaceContainerLowest,
    boxShadow:
      '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    height: '3rem',
    marginBottom: spacing.md,
    width: '3rem',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: 1.35,
    marginBottom: spacing.xs,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.625,
    marginBottom: spacing.xl,
  },
  contacts: {
    gap: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: spacing.lg,
  },
  footer: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopColor: 'rgba(217, 217, 217, 0.2)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: spacing.md,
  },
  responseTime: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  availability: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 700,
    lineHeight: '0.875rem',
  },
  statusDot: {
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
})

type ContactSupportCardProps = {
  title: string
  description: string
  contacts: readonly SupportContact[]
  responseTime: string
  availability: string
  icon?: LucideIcon
}

export function ContactSupportCard({
  title,
  description,
  contacts,
  responseTime,
  availability,
  icon: Icon = Headset,
}: ContactSupportCardProps) {
  return (
    <div {...stylex.props(styles.card)}>
      <span aria-hidden="true" {...stylex.props(styles.icon)}>
        <Icon size={26} />
      </span>
      <h3 {...stylex.props(styles.title)}>{title}</h3>
      <p {...stylex.props(styles.description)}>{description}</p>
      <div {...stylex.props(styles.contacts)}>
        {contacts.map(({ key, ...contact }) => (
          <SupportContactLink key={key} {...contact} />
        ))}
      </div>
      <div {...stylex.props(styles.footer)}>
        <span {...stylex.props(styles.responseTime)}>{responseTime}</span>
        <span {...stylex.props(styles.availability)}>
          <span aria-hidden="true" {...stylex.props(styles.statusDot)} />
          {availability}
        </span>
      </div>
    </div>
  )
}
