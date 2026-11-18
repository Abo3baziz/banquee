'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Link2 } from 'lucide-react'
import { colors, fonts, radii } from '../../styles/tokens.stylex'

const COPIED_RESET_MS = 2200

// The page URL only exists in the browser, so the store stays empty during SSR
// and hydration, then React re-reads the snapshot once the client takes over.
const subscribeToLocation = () => () => {}
const getPageUrl = () => window.location.href
const getServerPageUrl = () => ''

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
  row: {
    gap: '0.625rem',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  copyButton: {
    borderRadius: radii.md,
    borderWidth: 0,
    gap: '0.5rem',
    paddingBlock: '0.5rem',
    paddingInline: '0.875rem',
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceLight,
      ':hover': colors.primaryTint,
    },
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
  },
  copyButtonCopied: {
    backgroundColor: colors.primaryTint,
    color: colors.primary,
  },
  socialLink: {
    borderRadius: radii.md,
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceLight,
      ':hover': colors.primaryTint,
    },
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    display: 'inline-flex',
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
    height: '2.5rem',
    width: '2.5rem',
  },
})

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

type ShareButtonsProps = {
  articleTitle: string
  copyLabel: string
  copiedLabel: string
  labels: { facebook: string; linkedIn: string; x: string }
}

export function ShareButtons({
  articleTitle,
  copyLabel,
  copiedLabel,
  labels,
}: ShareButtonsProps) {
  const pageUrl = useSyncExternalStore(
    subscribeToLocation,
    getPageUrl,
    getServerPageUrl,
  )
  const [isCopied, setIsCopied] = useState(false)
  const resetTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimeout.current !== null) {
        window.clearTimeout(resetTimeout.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      return
    }

    setIsCopied(true)

    if (resetTimeout.current !== null) {
      window.clearTimeout(resetTimeout.current)
    }

    resetTimeout.current = window.setTimeout(() => {
      setIsCopied(false)
      resetTimeout.current = null
    }, COPIED_RESET_MS)
  }

  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(articleTitle)

  return (
    <div {...stylex.props(styles.row)}>
      <button
        type="button"
        onClick={handleCopy}
        {...stylex.props(
          styles.copyButton,
          isCopied && styles.copyButtonCopied,
          styles.focusRing,
        )}
      >
        <Link2 aria-hidden="true" size={18} />
        <span aria-live="polite">{isCopied ? copiedLabel : copyLabel}</span>
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.facebook}
        {...stylex.props(styles.socialLink, styles.focusRing)}
      >
        <FacebookIcon />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.linkedIn}
        {...stylex.props(styles.socialLink, styles.focusRing)}
      >
        <LinkedInIcon />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.x}
        {...stylex.props(styles.socialLink, styles.focusRing)}
      >
        <XIcon />
      </a>
    </div>
  )
}
