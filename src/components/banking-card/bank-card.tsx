import * as stylex from '@stylexjs/stylex'
import {
  CalendarX2,
  Check,
  Cpu,
  Lock,
  Nfc,
  RefreshCw,
  Snowflake,
  Smartphone,
} from 'lucide-react'
import { colors, fonts } from '../../styles/tokens.stylex'
import { CardChip } from './card-chip'
import { CardNetworkLogo } from './card-network-logo'
import { CardNumber } from './card-number'
import { CardStatusBadge } from './card-status-badge'
import {
  goldCardTheme,
  premiumCardTheme,
  standardCardTheme,
  bankCardVars,
} from './card-tokens.stylex'
import {
  getInactiveStatus,
  type BankCardProps,
  type BankCardSize,
  type BankCardVariant,
} from './card-types'

const ASPECT_RATIO = '85.6 / 53.98'

const styles = stylex.create({
  root: {
    aspectRatio: ASPECT_RATIO,
    containerType: 'inline-size',
    width: '100%',
  },
  frame: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    color: 'inherit',
    direction: 'ltr',
    display: 'block',
    fontFamily: 'inherit',
    fontSize: 'clamp(12px, 4.4cqw, 17px)',
    perspective: 1200,
    position: 'relative',
    textAlign: 'left',
    height: '100%',
    width: '100%',
  },
  interactive: {
    cursor: 'pointer',
    transform: {
      default: null,
      ':hover': 'translateY(-2px)',
    },
    transitionDuration: '220ms',
    transitionProperty: 'transform',
  },
  focusRing: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 3,
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
  inner: {
    display: 'block',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transitionDuration: {
      default: '600ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform',
    height: '100%',
    width: '100%',
  },
  innerFlipped: {
    transform: 'rotateY(180deg)',
  },
  face: {
    inset: 0,
    padding: 'clamp(14px,5.5cqw,26px)',
    borderColor: bankCardVars.border,
    borderRadius: 'clamp(12px, 4cqw, 20px)',
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    backgroundImage: bankCardVars.background,
    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.1)',
    color: bankCardVars.foreground,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  faceCompact: {
    padding: 'clamp(11px,4.4cqw,20px)',
  },
  faceMini: {
    padding: 'clamp(9px,4.6cqw,14px)',
  },
  faceBack: {
    padding: 0,
    justifyContent: 'flex-start',
    transform: 'rotateY(180deg)',
  },
  faceSelected: {
    boxShadow: `0 0 0 2px ${colors.primary}, 0 12px 30px rgba(0, 0, 0, 0.16)`,
  },
  header: {
    gap: '0.5em',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
    minWidth: 0,
  },
  brand: {
    color: bankCardVars.foreground,
    flexShrink: 0,
    fontFamily: fonts.latinHeading,
    fontSize: '1.15em',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
  },
  brandDot: {
    color: bankCardVars.accent,
  },
  headerEnd: {
    gap: '0.4em',
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  label: {
    borderRadius: '0.35em',
    overflow: 'hidden',
    paddingBlock: '0.15em',
    paddingInline: '0.55em',
    backgroundColor: bankCardVars.labelBackground,
    color: bankCardVars.labelForeground,
    flexShrink: 1,
    fontFamily: fonts.body,
    fontSize: '0.68em',
    fontWeight: 700,
    letterSpacing: '0.07em',
    lineHeight: 1.4,
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },
  virtualBadge: {
    borderRadius: '0.35em',
    gap: '0.3em',
    paddingBlock: '0.15em',
    paddingInline: '0.5em',
    alignItems: 'center',
    backgroundColor: bankCardVars.labelBackground,
    color: bankCardVars.labelForeground,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.68em',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1.4,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  smallIcon: {
    height: '1.1em',
    width: '1.1em',
  },
  flipHint: {
    borderRadius: '9999px',
    gap: '0.25em',
    paddingBlock: '0.15em',
    paddingInline: '0.5em',
    alignItems: 'center',
    backgroundColor: bankCardVars.labelBackground,
    color: bankCardVars.labelForeground,
    display: {
      default: 'inline-flex',
      '@container (max-width: 320px)': 'none',
    },
    fontFamily: fonts.body,
    fontSize: '0.62em',
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
  },
  contactless: {
    color: bankCardVars.muted,
    height: '1.3em',
    width: '1.3em',
  },
  body: {
    gap: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    minWidth: 0,
  },
  footer: {
    gap: '0.85em',
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
    minWidth: 0,
  },
  metaGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  metaLabel: {
    color: bankCardVars.muted,
    fontFamily: fonts.body,
    fontSize: '0.62em',
    fontWeight: 500,
    letterSpacing: '0.08em',
    lineHeight: 1.3,
    textTransform: 'uppercase',
  },
  metaValue: {
    overflow: 'hidden',
    color: bankCardVars.foreground,
    fontFamily: fonts.body,
    fontSize: '0.88em',
    fontWeight: 600,
    letterSpacing: '0.01em',
    lineHeight: 1.3,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  network: {
    marginInlineStart: 'auto',
  },
  check: {
    borderRadius: '50%',
    alignItems: 'center',
    backgroundColor: colors.primary,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
    color: colors.onPrimary,
    display: 'flex',
    insetBlockStart: '0.7em',
    insetInlineEnd: '0.7em',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 6,
    height: '1.6em',
    width: '1.6em',
  },
  overlay: {
    inset: 0,
    padding: '1em',
    gap: '0.35em',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    textAlign: 'center',
    zIndex: 5,
  },
  overlayFrozen: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
  },
  overlayBlocked: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(186, 26, 26, 0.14)',
  },
  overlayExpired: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(249, 249, 249, 0.6)',
  },
  statusIcon: {
    borderRadius: '50%',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    height: '2.4em',
    width: '2.4em',
  },
  statusIconSymbol: {
    height: '1.2em',
    width: '1.2em',
  },
  statusTitle: {
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '0.98em',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  statusDetail: {
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.72em',
    lineHeight: 1.3,
  },
  stripe: {
    backgroundColor: bankCardVars.stripe,
    marginBlockStart: '1.1em',
    height: '2em',
    width: '100%',
  },
  backContent: {
    gap: '0.6em',
    paddingInline: '1.15em',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlockStart: '0.7em',
  },
  backLeft: {
    gap: '0.6em',
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  signature: {
    borderRadius: 4,
    paddingInline: '0.5em',
    alignItems: 'center',
    backgroundColor: bankCardVars.signature,
    display: 'flex',
    justifyContent: 'flex-end',
    height: '1.6em',
    maxWidth: '55%',
    width: '9em',
  },
  signatureText: {
    overflow: 'hidden',
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.62em',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cvvGroup: {
    gap: '0.15em',
    display: 'flex',
    flexDirection: 'column',
  },
  cvvLabel: {
    color: bankCardVars.muted,
    fontFamily: fonts.body,
    fontSize: '0.55em',
    fontWeight: 500,
    letterSpacing: '0.06em',
    lineHeight: 1.3,
    textTransform: 'uppercase',
  },
  cvvValue: {
    borderColor: bankCardVars.border,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingBlock: '0.1em',
    paddingInline: '0.4em',
    backgroundColor: colors.surfaceLight,
    color: colors.onSurface,
    fontFamily: fonts.mono,
    fontSize: '0.68em',
    fontWeight: 700,
  },
  backToken: {
    borderColor: bankCardVars.border,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    color: bankCardVars.accent,
    display: 'flex',
    justifyContent: 'center',
    height: '1.4em',
    width: '2em',
  },
  backBottom: {
    paddingInline: '1.15em',
    marginBlockStart: 'auto',
    paddingBlockEnd: '0.9em',
  },
  finePrint: {
    margin: 0,
    overflow: 'hidden',
    color: bankCardVars.muted,
    fontFamily: fonts.body,
    fontSize: '0.55em',
    lineHeight: 1.25,
    marginBlockEnd: '0.4em',
  },
  backFooter: {
    gap: '0.5em',
    alignItems: 'center',
    borderBlockStartColor: bankCardVars.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlockStart: '0.35em',
  },
  backBrand: {
    color: bankCardVars.foreground,
    fontFamily: fonts.latinHeading,
    fontSize: '0.92em',
    fontWeight: 700,
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
  },
  backMeta: {
    overflow: 'hidden',
    color: bankCardVars.muted,
    fontFamily: fonts.mono,
    fontSize: '0.6em',
    letterSpacing: '0.04em',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
})

const TIER_THEME = {
  standard: standardCardTheme,
  gold: goldCardTheme,
  premium: premiumCardTheme,
}

const SIZE_FACE: Record<BankCardSize, stylex.StyleXStyles | null> = {
  default: null,
  compact: styles.faceCompact,
  mini: styles.faceMini,
}

const STATUS_OVERLAY: Record<
  Exclude<BankCardVariant, 'active'>,
  stylex.StyleXStyles
> = {
  frozen: styles.overlayFrozen,
  blocked: styles.overlayBlocked,
  expired: styles.overlayExpired,
}

function renderFaces(props: BankCardProps, flipped: boolean) {
  const {
    tier = 'standard',
    type = 'physical',
    network = 'none',
    size = 'default',
    lastFour,
    cardholderName,
    expiryDate,
    cvv,
    label,
    virtualLabel,
    cardholderLabel,
    expiryLabel,
    selected = false,
    onFlip,
    flipHint,
    backLabels,
  } = props

  const inactive = getInactiveStatus(props)
  const isMini = size === 'mini'

  return (
    <div
      aria-hidden="true"
      {...stylex.props(styles.inner, flipped && styles.innerFlipped)}
    >
      <div
        {...stylex.props(
          styles.face,
          TIER_THEME[tier],
          SIZE_FACE[size],
          selected && styles.faceSelected,
        )}
      >
        <div {...stylex.props(styles.header)}>
          <span {...stylex.props(styles.brand)}>
            banquee
            <span {...stylex.props(styles.brandDot)}>.</span>
          </span>
          <div {...stylex.props(styles.headerEnd)}>
            {type === 'virtual' && virtualLabel ? (
              <span {...stylex.props(styles.virtualBadge)}>
                <Smartphone
                  aria-hidden="true"
                  {...stylex.props(styles.smallIcon)}
                />
                {virtualLabel}
              </span>
            ) : null}
            {label && !isMini ? (
              <span {...stylex.props(styles.label)}>{label}</span>
            ) : null}
            {onFlip && flipHint ? (
              <span {...stylex.props(styles.flipHint)}>
                <RefreshCw
                  aria-hidden="true"
                  {...stylex.props(styles.smallIcon)}
                />
                {flipHint}
              </span>
            ) : null}
            {type === 'physical' ? (
              <Nfc aria-hidden="true" {...stylex.props(styles.contactless)} />
            ) : null}
          </div>
        </div>

        <div {...stylex.props(styles.body)}>
          {type === 'physical' && !isMini ? <CardChip /> : null}
          <CardNumber lastFour={lastFour} compact={isMini} />
        </div>

        {isMini ? null : (
          <div {...stylex.props(styles.footer)}>
            {cardholderName ? (
              <div {...stylex.props(styles.metaGroup)}>
                {cardholderLabel ? (
                  <span {...stylex.props(styles.metaLabel)}>
                    {cardholderLabel}
                  </span>
                ) : null}
                <span {...stylex.props(styles.metaValue)}>
                  {cardholderName}
                </span>
              </div>
            ) : null}
            {expiryDate ? (
              <div {...stylex.props(styles.metaGroup)}>
                {expiryLabel ? (
                  <span {...stylex.props(styles.metaLabel)}>{expiryLabel}</span>
                ) : null}
                <span {...stylex.props(styles.metaValue)}>{expiryDate}</span>
              </div>
            ) : null}
            <span {...stylex.props(styles.network)}>
              <CardNetworkLogo network={network} />
            </span>
          </div>
        )}

        {inactive ? (
          <div
            {...stylex.props(styles.overlay, STATUS_OVERLAY[inactive.status])}
          >
            <span {...stylex.props(styles.statusIcon)}>
              {inactive.status === 'frozen' ? (
                <Snowflake
                  aria-hidden="true"
                  {...stylex.props(styles.statusIconSymbol)}
                />
              ) : inactive.status === 'blocked' ? (
                <Lock
                  aria-hidden="true"
                  {...stylex.props(styles.statusIconSymbol)}
                />
              ) : (
                <CalendarX2
                  aria-hidden="true"
                  {...stylex.props(styles.statusIconSymbol)}
                />
              )}
            </span>
            <span {...stylex.props(styles.statusTitle)}>
              {inactive.statusLabel}
            </span>
            <CardStatusBadge
              status={inactive.status}
              label={inactive.statusLabel}
            />
            {inactive.statusDetail ? (
              <span {...stylex.props(styles.statusDetail)}>
                {inactive.statusDetail}
              </span>
            ) : null}
          </div>
        ) : null}

        {selected ? (
          <span {...stylex.props(styles.check)}>
            <Check aria-hidden="true" {...stylex.props(styles.smallIcon)} />
          </span>
        ) : null}
      </div>

      <div
        {...stylex.props(
          styles.face,
          styles.faceBack,
          TIER_THEME[tier],
          SIZE_FACE[size],
        )}
      >
        <div {...stylex.props(styles.stripe)} />
        <div {...stylex.props(styles.backContent)}>
          <div {...stylex.props(styles.backLeft)}>
            <span {...stylex.props(styles.signature)}>
              <span {...stylex.props(styles.signatureText)}>
                {backLabels?.signatureLabel ?? cardholderName}
              </span>
            </span>
            {cvv ? (
              <span {...stylex.props(styles.cvvGroup)}>
                {backLabels ? (
                  <span {...stylex.props(styles.cvvLabel)}>
                    {backLabels.cvvLabel}
                  </span>
                ) : null}
                <span {...stylex.props(styles.cvvValue)}>{cvv}</span>
              </span>
            ) : null}
          </div>
          <span {...stylex.props(styles.backToken)}>
            <Cpu aria-hidden="true" {...stylex.props(styles.smallIcon)} />
          </span>
        </div>
        <div {...stylex.props(styles.backBottom)}>
          {backLabels ? (
            <p {...stylex.props(styles.finePrint)}>{backLabels.finePrint}</p>
          ) : null}
          <div {...stylex.props(styles.backFooter)}>
            <span {...stylex.props(styles.backBrand)}>
              banquee
              <span {...stylex.props(styles.brandDot)}>.</span>
            </span>
            {label ? (
              <span {...stylex.props(styles.backMeta)}>{label}</span>
            ) : null}
            <CardNetworkLogo network={network} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function BankCard(props: BankCardProps) {
  const { flipped = false, onFlip, flipLabel, label, accessibleLabel } = props
  const inactive = getInactiveStatus(props)
  const computedLabel =
    accessibleLabel ??
    [label, inactive?.statusLabel]
      .filter((value): value is string => Boolean(value))
      .join(', ')

  return (
    <div {...stylex.props(styles.root)}>
      {onFlip ? (
        <button
          type="button"
          aria-label={flipLabel}
          aria-pressed={flipped}
          onClick={onFlip}
          {...stylex.props(styles.frame, styles.interactive, styles.focusRing)}
        >
          {renderFaces(props, flipped)}
        </button>
      ) : (
        <div
          role={computedLabel ? 'img' : undefined}
          aria-label={computedLabel || undefined}
          {...stylex.props(styles.frame)}
        >
          {renderFaces(props, flipped)}
        </div>
      )}
    </div>
  )
}

export type {
  BankCardNetwork,
  BankCardProps,
  BankCardSize,
  BankCardTier,
  BankCardType,
  BankCardVariant,
} from './card-types'
