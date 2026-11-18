'use client'

import { useId } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Search, X } from 'lucide-react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'

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
  root: {
    marginInline: 'auto',
    position: 'relative',
    maxWidth: '36rem',
    width: '100%',
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
  input: {
    borderColor: {
      default: 'rgba(217, 217, 217, 0.6)',
      ':hover': colors.outlineVariant,
      ':focus': colors.primary,
    },
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBlock: '0.75rem',
    backgroundColor: colors.surfaceLight,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: '1.5rem',
    paddingInlineEnd: '2.75rem',
    paddingInlineStart: '2.75rem',
    width: '100%',
    '::placeholder': {
      color: colors.outline,
    },
  },
  searchIcon: {
    color: colors.secondary,
    insetInlineStart: '0.875rem',
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '50%',
  },
  clearButton: {
    padding: 0,
    borderRadius: radii.full,
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceContainerHigh,
    },
    color: {
      default: colors.secondary,
      ':hover': colors.onSurface,
    },
    cursor: 'pointer',
    display: 'flex',
    insetInlineEnd: '0.5rem',
    justifyContent: 'center',
    position: 'absolute',
    transform: 'translateY(-50%)',
    height: '2rem',
    top: '50%',
    width: '2rem',
  },
})

type SupportSearchProps = {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  label: string
  placeholder: string
  clearLabel: string
}

export function SupportSearch({
  value,
  onChange,
  onClear,
  label,
  placeholder,
  clearLabel,
}: SupportSearchProps) {
  const inputId = useId()

  return (
    <div {...stylex.props(styles.root)}>
      <label htmlFor={inputId} {...stylex.props(styles.visuallyHidden)}>
        {label}
      </label>
      <Search
        aria-hidden="true"
        size={18}
        {...stylex.props(styles.searchIcon)}
      />
      <input
        id={inputId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        {...stylex.props(styles.input, styles.focusRing)}
      />
      {value.trim().length > 0 ? (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={onClear}
          {...stylex.props(styles.clearButton, styles.focusRing)}
        >
          <X aria-hidden="true" size={16} />
        </button>
      ) : null}
    </div>
  )
}
