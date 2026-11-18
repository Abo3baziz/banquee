import * as stylex from '@stylexjs/stylex'

export const bankCardVars = stylex.defineVars({
  background: 'linear-gradient(155deg, #ffffff 0%, #f1f3f3 100%)',
  border: 'rgba(217, 217, 217, 0.55)',
  foreground: '#1a1c1c',
  muted: '#3e4946',
  accent: '#5bb5a2',
  labelBackground: 'rgba(26, 28, 28, 0.06)',
  labelForeground: '#3e4946',
  chip: 'linear-gradient(135deg, #e6e8e9 0%, #fafbfb 45%, #ccd1d3 100%)',
  chipLine: 'rgba(26, 28, 28, 0.3)',
  stripe: 'rgba(0, 0, 0, 0.85)',
  signature: 'rgba(232, 232, 232, 0.9)',
  divider: 'rgba(217, 217, 217, 0.7)',
})

export const standardCardTheme = stylex.createTheme(bankCardVars, {
  background: 'linear-gradient(155deg, #ffffff 0%, #f1f3f3 100%)',
  border: 'rgba(217, 217, 217, 0.55)',
  foreground: '#1a1c1c',
  muted: '#3e4946',
  accent: '#5bb5a2',
  labelBackground: 'rgba(26, 28, 28, 0.06)',
  labelForeground: '#3e4946',
  chip: 'linear-gradient(135deg, #e6e8e9 0%, #fafbfb 45%, #ccd1d3 100%)',
  chipLine: 'rgba(26, 28, 28, 0.3)',
  stripe: 'rgba(0, 0, 0, 0.85)',
  signature: 'rgba(232, 232, 232, 0.9)',
  divider: 'rgba(217, 217, 217, 0.7)',
})

export const goldCardTheme = stylex.createTheme(bankCardVars, {
  background: 'linear-gradient(135deg, #deb368 0%, #f2d79e 45%, #cd9e4b 100%)',
  border: 'rgba(222, 179, 104, 0.7)',
  foreground: '#1c1b20',
  muted: 'rgba(28, 27, 32, 0.72)',
  accent: '#646268',
  labelBackground: 'rgba(255, 255, 255, 0.35)',
  labelForeground: '#1c1b20',
  chip: 'linear-gradient(135deg, #e7c276 0%, #fce4b8 45%, #bf9446 100%)',
  chipLine: 'rgba(38, 31, 14, 0.35)',
  stripe: 'rgba(20, 16, 6, 0.85)',
  signature: 'rgba(255, 249, 236, 0.92)',
  divider: 'rgba(28, 27, 32, 0.2)',
})

export const premiumCardTheme = stylex.createTheme(bankCardVars, {
  background: 'linear-gradient(135deg, #22262a 0%, #141618 55%, #08090a 100%)',
  border: 'rgba(255, 255, 255, 0.14)',
  foreground: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.68)',
  accent: '#5bb5a2',
  labelBackground: 'rgba(255, 255, 255, 0.12)',
  labelForeground: 'rgba(255, 255, 255, 0.92)',
  chip: 'linear-gradient(135deg, #e7c276 0%, #c9a45c 50%, #9c7329 100%)',
  chipLine: 'rgba(20, 16, 6, 0.4)',
  stripe: 'rgba(0, 0, 0, 0.9)',
  signature: 'rgba(232, 232, 232, 0.9)',
  divider: 'rgba(255, 255, 255, 0.14)',
})
