'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'

const COPIED_FEEDBACK_MS = 2000

const FACEBOOK_PATH =
  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'

const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const X_PATH =
  'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'

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
  box: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 40rem)': spacing.xl,
    },
    borderRadius: radii.xl,
    gap: spacing.lg,
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 40rem)': 'center',
    },
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 40rem)': 'row',
    },
    justifyContent: 'space-between',
    marginBlockStart: spacing.xl,
  },
  heading: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: 1.375,
  },
  subtitle: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    marginBlockStart: spacing.xs,
  },
  actions: {
    gap: '0.625rem',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  copyButton: {
    borderRadius: radii.md,
    borderWidth: 0,
    gap: spacing.sm,
    paddingBlock: spacing.sm,
    paddingInline: '0.875rem',
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceContainerLowest,
      ':hover': colors.primaryTint,
    },
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
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
      default: colors.surfaceContainerLowest,
      ':hover': colors.primaryTint,
    },
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.primary,
    },
    display: 'flex',
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
    height: '2.5rem',
    width: '2.5rem',
  },
})

type ArticleShareProps = {
  title: string
}

const subscribeToLocation = () => () => {}
const getPageUrl = () => window.location.href
const getServerPageUrl = () => ''

/**
 * Share bar under the article body. The page URL is read through
 * `useSyncExternalStore` so the server and hydration renders stay identical.
 */
export function ArticleShare({ title }: ArticleShareProps) {
  const t = useTranslations('blog.articleDetail')
  const pageUrl = useSyncExternalStore(
    subscribeToLocation,
    getPageUrl,
    getServerPageUrl,
  )
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    if (!navigator.clipboard?.writeText) {
      return
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      return
    }

    setIsCopied(true)

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsCopied(false)
      timeoutRef.current = null
    }, COPIED_FEEDBACK_MS)
  }

  const encodedUrl = encodeURIComponent(pageUrl)

  return (
    <div {...stylex.props(styles.box)}>
      <div>
        <h3 {...stylex.props(styles.heading)}>{t('share.title')}</h3>
        <p {...stylex.props(styles.subtitle)}>{t('share.subtitle')}</p>
      </div>
      <div {...stylex.props(styles.actions)}>
        <button
          type="button"
          onClick={handleCopy}
          {...stylex.props(
            styles.copyButton,
            isCopied && styles.copyButtonCopied,
            styles.focusRing,
          )}
        >
          <Link2 aria-hidden="true" size={16} />
          <span aria-live="polite">
            {isCopied ? t('share.linkCopied') : t('share.copyLink')}
          </span>
        </button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('share.facebook')}
          {...stylex.props(styles.socialLink, styles.focusRing)}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={FACEBOOK_PATH} />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('share.linkedIn')}
          {...stylex.props(styles.socialLink, styles.focusRing)}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={LINKEDIN_PATH} />
          </svg>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
          )}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('share.x')}
          {...stylex.props(styles.socialLink, styles.focusRing)}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={X_PATH} />
          </svg>
        </a>
      </div>
    </div>
  )
}
