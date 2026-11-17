import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
  primary: '#006b5c',
  primaryHover: '#005145',
  primaryContainer: '#5bb5a2',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#004439',
  primaryTint: '#e8f2ee',
  surface: '#f9f9f9',
  surfaceLight: '#ffffff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainer: '#eeeeee',
  surfaceContainerHigh: '#e8e8e8',
  onSurface: '#1a1c1c',
  onSurfaceVariant: '#3e4946',
  outline: '#6e7a76',
  outlineVariant: '#bdc9c5',
  divider: '#d9d9d9',
  secondary: '#5f5d63',
  secondaryContainer: '#e2dee5',
  tertiary: '#924939',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  surfaceVariant: '#e2e2e2',
  tertiaryContainer: '#e78e7a',
  onSecondaryFixed: '#1c1b20',
  onSecondaryContainer: '#646268',
  primaryFixed: '#99f3de',
  tertiaryFixedDim: '#ffb4a4',
  tintBlue: '#dfebf1',
})

export const spacing = stylex.defineVars({
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  gutter: '1rem',
  margin: '1.5rem',
})

export const radii = stylex.defineVars({
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1.25rem',
  full: '9999px',
})

export const fonts = stylex.defineVars({
  heading: 'var(--font-heading-stack)',
  body: 'var(--font-body-stack)',
  latinHeading: 'var(--font-sora), "Sora", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
})
