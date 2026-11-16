'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { CreditCard, Lock, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Switch } from 'radix-ui'
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
  list: {
    gap: spacing.sm,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    gap: spacing.md,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    gap: spacing.sm,
    alignItems: 'center',
    color: colors.onSurface,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: '1.125rem',
  },
  icon: {
    color: colors.primary,
    flexShrink: 0,
  },
  switchRoot: {
    padding: 0,
    borderRadius: radii.full,
    borderWidth: 0,
    backgroundColor: {
      '[data-state="checked"]': colors.primaryContainer,
      default: colors.secondaryContainer,
    },
    cursor: 'pointer',
    flexShrink: 0,
    position: 'relative',
    transitionDuration: '150ms',
    transitionProperty: 'background-color',
    height: '1.5rem',
    width: '2.5rem',
  },
  switchThumb: {
    borderRadius: radii.full,
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    display: 'block',
    insetInlineStart: '0.125rem',
    position: 'absolute',
    transitionDuration: '150ms',
    transitionProperty: 'inset-inline-start',
    height: '1.25rem',
    top: '0.125rem',
    width: '1.25rem',
  },
  switchThumbChecked: {
    insetInlineStart: 'calc(100% - 1.375rem)',
  },
})

export function SecurityToggles() {
  const t = useTranslations('landing')
  const [cardFreeze, setCardFreeze] = useState(true)
  const [singleUse, setSingleUse] = useState(true)
  const [location, setLocation] = useState(false)

  const items = [
    {
      key: 'cardFreeze',
      label: t('plans.featureCards.security.toggleCardFreeze'),
      icon: Lock,
      checked: cardFreeze,
      onChange: setCardFreeze,
    },
    {
      key: 'singleUse',
      label: t('plans.featureCards.security.toggleSingleUse'),
      icon: CreditCard,
      checked: singleUse,
      onChange: setSingleUse,
    },
    {
      key: 'location',
      label: t('plans.featureCards.security.toggleLocation'),
      icon: MapPin,
      checked: location,
      onChange: setLocation,
    },
  ]

  return (
    <div {...stylex.props(styles.list)}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.key} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.label)}>
              <Icon
                aria-hidden="true"
                size={18}
                {...stylex.props(styles.icon)}
              />
              {item.label}
            </span>
            <Switch.Root
              checked={item.checked}
              onCheckedChange={item.onChange}
              aria-label={item.label}
              {...stylex.props(styles.switchRoot, styles.focusRing)}
            >
              <Switch.Thumb
                {...stylex.props(
                  styles.switchThumb,
                  item.checked && styles.switchThumbChecked,
                )}
              />
            </Switch.Root>
          </div>
        )
      })}
    </div>
  )
}
