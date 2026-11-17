import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

/**
 * Visual treatments shared across the existing pages. These mirror the styles
 * that previously lived in each page rather than introducing a new design.
 */
export type CtaVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'inverse'
  | 'solid'

/**
 * `sm` through `xl` cover page-level CTAs; `nav` and `panel` cover the two
 * header layouts.
 */
export type CtaSize = 'sm' | 'md' | 'lg' | 'xl' | 'nav' | 'panel'

type CtaBaseProps = {
  children: ReactNode
  variant?: CtaVariant
  size?: CtaSize
  fullWidth?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  /** Layout-only overrides for the consuming surface, such as visibility. */
  xstyle?: stylex.StyleXStyles
}

export type CtaLinkProps = CtaBaseProps &
  Omit<ComponentProps<typeof Link>, 'children'> & {
    href: ComponentProps<typeof Link>['href']
  }

export type CtaButtonProps = CtaBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined
  }

export type CtaProps = CtaLinkProps | CtaButtonProps

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
  base: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fonts.body,
    textDecorationLine: 'none',
  },
  icon: {
    alignItems: 'center',
    display: 'inline-flex',
    flexShrink: 0,
  },
  iconGap: {
    gap: spacing.xs,
  },
  fullWidth: {
    justifyContent: 'center',
    width: '100%',
  },
  activeMotion: {
    transform: {
      default: null,
      ':active': 'scale(0.95)',
    },
  },
  activeSmMotion: {
    transform: {
      default: null,
      ':active': 'scale(0.97)',
    },
  },
  liftMotion: {
    transform: {
      default: null,
      ':hover': 'translateY(-2px)',
      ':active': 'scale(0.95)',
    },
  },
  solidMotion: {
    transform: {
      default: null,
      ':hover': 'translateY(-2px)',
      ':active': 'none',
    },
  },
  strongShadow: {
    boxShadow: {
      default: '0 1px 4px rgba(0, 0, 0, 0.06)',
      ':hover': '0 1px 4px rgba(0, 0, 0, 0.06)',
    },
  },
  secondaryLg: {
    gap: spacing.xs,
    paddingInline: spacing.lg,
  },
  planTransition: {
    transitionProperty: 'background-color, color, transform',
  },
  primary: {
    backgroundColor: {
      default: colors.primaryContainer,
      ':hover': colors.primary,
    },
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.05)',
      ':hover': '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
    color: {
      default: colors.onPrimaryContainer,
      ':hover': colors.onPrimary,
    },
    transitionProperty: 'background-color, color, box-shadow, transform',
  },
  secondary: {
    backgroundColor: {
      default: colors.surfaceContainer,
      ':hover': colors.surfaceContainerHigh,
    },
    color: colors.onSurface,
    transitionProperty: 'background-color, transform',
  },
  tertiary: {
    backgroundColor: {
      default: colors.surfaceContainerLowest,
      ':hover': colors.surfaceContainer,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    color: colors.onSurface,
    transitionProperty: 'background-color, transform',
  },
  outline: {
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingInline: spacing.lg,
    backgroundColor: {
      default: colors.surfaceLight,
      ':hover': colors.surfaceContainer,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    color: colors.onSurface,
    transitionProperty: 'background-color, transform',
    width: 'fit-content',
  },
  ghost: {
    paddingInline: spacing.md,
    alignItems: 'normal',
    backgroundColor: 'transparent',
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.onSurface,
    },
    fontWeight: 500,
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  inverse: {
    backgroundColor: {
      default: colors.onSurface,
      ':hover': '#2f3131',
    },
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.05)',
      ':hover': '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
    color: colors.surfaceLight,
    transitionProperty: 'background-color, box-shadow, transform',
  },
  solid: {
    borderRadius: radii.lg,
    backgroundColor: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    color: colors.onPrimary,
    fontWeight: 500,
    justifyContent: 'center',
    transitionProperty: 'background-color, box-shadow, transform',
  },
  sm: {
    borderRadius: radii.md,
    paddingBlock: '0.625rem',
    paddingInline: spacing.md,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    transitionDuration: '150ms',
  },
  md: {
    borderRadius: radii.md,
    paddingBlock: '0.75rem',
    paddingInline: spacing.xl,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    transitionDuration: '200ms',
  },
  lg: {
    borderRadius: radii.md,
    paddingBlock: '0.75rem',
    paddingInline: spacing.xl,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: '1.5rem',
    transitionDuration: '200ms',
  },
  xl: {
    borderRadius: radii.lg,
    paddingBlock: '0.875rem',
    paddingInline: '1.75rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    transitionDuration: '200ms',
  },
  nav: {
    borderRadius: radii.md,
    paddingBlock: spacing.sm,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.lg,
    },
    fontSize: '0.875rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '1.25rem',
    transitionDuration: '150ms',
    whiteSpace: 'nowrap',
  },
  panel: {
    borderRadius: radii.md,
    paddingBlock: '0.75rem',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.lg,
    },
    fontSize: '0.9375rem',
    fontWeight: 500,
    justifyContent: 'center',
    lineHeight: '1.25rem',
    transitionDuration: '150ms',
    whiteSpace: 'nowrap',
  },
})

function getMotionStyle(variant: CtaVariant, size: CtaSize) {
  if (variant === 'ghost') {
    return null
  }

  if (variant === 'solid') {
    return styles.solidMotion
  }

  if (
    variant === 'primary' &&
    (size === 'md' || size === 'lg' || size === 'xl')
  ) {
    return styles.liftMotion
  }

  if (variant === 'outline') {
    return styles.activeMotion
  }

  return size === 'sm' ? styles.activeSmMotion : styles.activeMotion
}

function getPresentation({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  xstyle,
}: CtaBaseProps) {
  const useStrongShadow =
    variant === 'primary' &&
    (size === 'sm' || size === 'nav' || size === 'panel')

  const styleProps = stylex.props(
    styles.base,
    styles.focusRing,
    styles[size],
    styles[variant],
    variant === 'secondary' && size === 'lg' ? styles.secondaryLg : null,
    size === 'sm' && (variant === 'primary' || variant === 'secondary')
      ? styles.planTransition
      : null,
    useStrongShadow ? styles.strongShadow : null,
    getMotionStyle(variant, size),
    leadingIcon || trailingIcon ? styles.iconGap : null,
    fullWidth && styles.fullWidth,
    xstyle,
  )

  return {
    styleProps,
    content: (
      <>
        {leadingIcon ? (
          <span {...stylex.props(styles.icon)}>{leadingIcon}</span>
        ) : null}
        <span>{children}</span>
        {trailingIcon ? (
          <span {...stylex.props(styles.icon)}>{trailingIcon}</span>
        ) : null}
      </>
    ),
  }
}

function CtaLink({
  children,
  variant,
  size,
  fullWidth,
  leadingIcon,
  trailingIcon,
  xstyle,
  ...linkProps
}: CtaLinkProps) {
  const { styleProps, content } = getPresentation({
    children,
    variant,
    size,
    fullWidth,
    leadingIcon,
    trailingIcon,
    xstyle,
  })

  return (
    <Link {...linkProps} {...styleProps}>
      {content}
    </Link>
  )
}

function CtaButton({
  type = 'button',
  children,
  variant,
  size,
  fullWidth,
  leadingIcon,
  trailingIcon,
  xstyle,
  ...buttonProps
}: CtaButtonProps) {
  const { styleProps, content } = getPresentation({
    children,
    variant,
    size,
    fullWidth,
    leadingIcon,
    trailingIcon,
    xstyle,
  })

  return (
    <button type={type} {...buttonProps} {...styleProps}>
      {content}
    </button>
  )
}

function isCtaLinkProps(props: CtaProps): props is CtaLinkProps {
  return 'href' in props && props.href !== undefined
}

export function Cta(props: CtaProps) {
  return isCtaLinkProps(props) ? (
    <CtaLink {...props} />
  ) : (
    <CtaButton {...props} />
  )
}
