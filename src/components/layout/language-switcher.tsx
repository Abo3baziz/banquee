'use client'

import { useState, useTransition } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { hasLocale, useLocale } from 'next-intl'
import { DropdownMenu } from 'radix-ui'
import { usePathname, useRouter } from '../../../i18n/navigation'
import { routing } from '../../../i18n/routing'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const LOCALES = [
  { code: 'en', label: 'English', short: 'EN', rtl: false },
  { code: 'de', label: 'Deutsch', short: 'DE', rtl: false },
  { code: 'es', label: 'Español', short: 'ES', rtl: false },
  { code: 'ar', label: 'العربية', short: 'AR', rtl: true },
] as const

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
  trigger: {
    borderRadius: radii.md,
    borderWidth: 0,
    gap: '0.375rem',
    paddingBlock: '0.375rem',
    paddingInline: '0.75rem',
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': 'rgba(238, 238, 238, 0.6)',
    },
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color',
  },
  triggerOpen: {
    backgroundColor: 'rgba(238, 238, 238, 0.6)',
    color: colors.onSurface,
  },
  languageIcon: {
    color: colors.primary,
  },
  code: {
    fontWeight: 500,
  },
  chevron: {
    color: colors.onSurfaceVariant,
    transitionDuration: '200ms',
    transitionProperty: 'transform',
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBlock: spacing.xs,
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
    zIndex: 60,
    width: '11rem',
  },
  label: {
    paddingBlock: '0.25rem',
    paddingInline: '0.75rem',
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    lineHeight: '0.875rem',
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  item: {
    borderRadius: radii.md,
    gap: spacing.sm,
    marginInline: spacing.xs,
    paddingBlock: spacing.sm,
    paddingInline: '0.75rem',
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':focus-visible': colors.surfaceContainerLow,
      ':hover': colors.surfaceContainerLow,
    },
    color: {
      default: colors.onSurface,
      ':focus-visible': colors.primary,
      ':hover': colors.primary,
    },
    cursor: 'pointer',
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    justifyContent: 'space-between',
    lineHeight: '1.125rem',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color',
    userSelect: 'none',
  },
  itemActive: {
    backgroundColor: {
      default: 'rgba(232, 242, 238, 0.6)',
      ':hover': colors.primaryTint,
    },
    color: colors.primary,
    fontWeight: 600,
  },
  itemLeft: {
    gap: '0.5rem',
    alignItems: 'center',
    display: 'flex',
  },
  itemCode: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.mono,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
    opacity: 0.7,
  },
  rtlBadge: {
    borderRadius: radii.sm,
    paddingBlock: '0.125rem',
    paddingInline: '0.25rem',
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.625rem',
    fontWeight: 500,
    lineHeight: '0.875rem',
  },
  check: {
    color: colors.primary,
  },
})

type LanguageSwitcherProps = {
  label: string
}

export function LanguageSwitcher({ label }: LanguageSwitcherProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [, startTransition] = useTransition()

  const changeLocale = (nextLocale: string) => {
    if (!hasLocale(routing.locales, nextLocale) || nextLocale === locale) {
      return
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          {...stylex.props(
            styles.trigger,
            open && styles.triggerOpen,
            styles.focusRing,
          )}
        >
          <Languages
            aria-hidden="true"
            size={18}
            {...stylex.props(styles.languageIcon)}
          />
          <span {...stylex.props(styles.code)}>{locale.toUpperCase()}</span>
          <ChevronDown
            aria-hidden="true"
            size={16}
            {...stylex.props(styles.chevron, open && styles.chevronOpen)}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          {...stylex.props(styles.content)}
        >
          <DropdownMenu.Label {...stylex.props(styles.label)}>
            {label}
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={locale} onValueChange={changeLocale}>
            {LOCALES.map((item) => {
              const isActive = item.code === locale

              return (
                <DropdownMenu.RadioItem
                  key={item.code}
                  value={item.code}
                  {...stylex.props(
                    styles.item,
                    isActive && styles.itemActive,
                    styles.focusRing,
                  )}
                >
                  <span {...stylex.props(styles.itemLeft)}>
                    <span>{item.label}</span>
                    <span {...stylex.props(styles.itemCode)}>{item.short}</span>
                    {item.rtl ? (
                      <span {...stylex.props(styles.rtlBadge)}>RTL</span>
                    ) : null}
                  </span>
                  <DropdownMenu.ItemIndicator>
                    <Check
                      aria-hidden="true"
                      size={16}
                      {...stylex.props(styles.check)}
                    />
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.RadioItem>
              )
            })}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
