'use client'

import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from '../../../i18n/navigation'
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
  button: {
    borderColor: colors.divider,
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: spacing.xs,
    paddingBlock: '0.75rem',
    paddingInline: spacing.xl,
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceLight,
      ':hover': colors.surfaceContainerLow,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    color: colors.onSurface,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '1.25rem',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, box-shadow',
  },
})

type BackButtonProps = {
  label: string
}

export function BackButton({ label }: BackButtonProps) {
  const router = useRouter()
  const locale = useLocale()
  const Icon = locale === 'ar' ? ArrowRight : ArrowLeft

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      {...stylex.props(styles.button, styles.focusRing)}
    >
      <Icon aria-hidden="true" size={18} />
      <span>{label}</span>
    </button>
  )
}
