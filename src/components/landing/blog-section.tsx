import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'

const ARTICLES = [
  {
    key: 'startup',
    image: '/images/blog-startup.jpg',
  },
  {
    key: 'secrets',
    image: '/images/blog-secrets.jpg',
  },
  {
    key: 'savingHabits',
    image: '/images/blog-savings.jpg',
  },
] as const

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
})

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
  section: {
    marginInline: 'auto',
    overflow: 'hidden',
    paddingBlock: spacing.xl,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  header: {
    gap: spacing.md,
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 40rem)': 'flex-end',
    },
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 40rem)': 'row',
    },
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  badge: {
    borderRadius: radii.full,
    gap: spacing.xs,
    paddingBlock: '0.25rem',
    paddingInline: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'inline-flex',
    marginBottom: spacing.xs,
    width: 'fit-content',
  },
  badgeDot: {
    borderRadius: radii.full,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.primary,
    height: 8,
    width: 8,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 48rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginTop: spacing.xs,
  },
  titleDot: {
    color: colors.primaryContainer,
  },
  cta: {
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: spacing.xs,
    paddingBlock: '0.625rem',
    paddingInline: spacing.lg,
    alignItems: 'center',
    backgroundColor: {
      default: colors.surfaceLight,
      ':hover': colors.surfaceContainer,
    },
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    color: colors.onSurface,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transform: {
      default: null,
      ':active': 'scale(0.95)',
    },
    transitionDuration: '150ms',
    transitionProperty: 'background-color, transform',
    width: 'fit-content',
  },
  ctaIcon: {
    flexShrink: 0,
  },
  grid: {
    gap: spacing.lg,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 40rem)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 64rem)': 'repeat(3, minmax(0, 1fr))',
    },
  },
  card: {
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.lg,
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: colors.surfaceLight,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 12px 32px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    flexDirection: 'column',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionDuration: '250ms',
    transitionProperty: 'transform, box-shadow',
    height: '100%',
  },
  imageWrapper: {
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    backgroundColor: colors.surfaceContainer,
    position: 'relative',
    width: '100%',
  },
  image: {
    objectFit: 'cover',
    transform: {
      default: 'scale(1)',
      ':hover': 'scale(1.05)',
    },
    transitionDuration: '500ms',
    transitionProperty: 'transform',
  },
  body: {
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  tags: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  tagPrimary: {
    borderRadius: radii.full,
    paddingBlock: '0.125rem',
    paddingInline: '0.625rem',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
  tagSecondary: {
    borderRadius: radii.full,
    paddingBlock: '0.125rem',
    paddingInline: '0.625rem',
    backgroundColor: colors.surfaceContainer,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
  headingReset: {
    margin: 0,
  },
  cardTitle: {
    margin: 0,
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    display: 'block',
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    lineHeight: 1.375,
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
    marginBottom: spacing.xs,
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
})

export async function BlogSection() {
  const [t, tb, locale] = await Promise.all([
    getTranslations('landing'),
    getTranslations('blog'),
    getLocale(),
  ])

  const title = t('blogSection.title')
  const hasDot = title.endsWith('.')
  const titleText = hasDot ? title.slice(0, -1) : title
  const titleDot = hasDot ? title.slice(-1) : ''
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  return (
    <section id="blog" {...stylex.props(styles.section)}>
      <Reveal>
        <div {...stylex.props(styles.header)}>
          <div>
            <div {...stylex.props(styles.badge)}>
              <span aria-hidden="true" {...stylex.props(styles.badgeDot)} />
              <span {...stylex.props(styles.badgeText)}>
                {t('blogSection.eyebrow')}
              </span>
            </div>
            <h2 {...stylex.props(styles.title)}>
              {titleText}
              {titleDot ? (
                <span {...stylex.props(styles.titleDot)}>{titleDot}</span>
              ) : null}
            </h2>
          </div>
          <Link href="/blog" {...stylex.props(styles.cta, styles.focusRing)}>
            {t('blogSection.ctaAll')}
            <Arrow
              aria-hidden="true"
              size={18}
              {...stylex.props(styles.ctaIcon)}
            />
          </Link>
        </div>
      </Reveal>

      <div {...stylex.props(styles.grid)}>
        {ARTICLES.map((article, index) => {
          const articleTitle = tb(`articles.${article.key}.title`)

          return (
            <Reveal key={article.key} delay={index * 0.06}>
              <article {...stylex.props(styles.card)}>
                <div {...stylex.props(styles.imageWrapper)}>
                  <Image
                    src={article.image}
                    alt={articleTitle}
                    fill
                    sizes="(min-width: 64rem) 25rem, (min-width: 40rem) 50vw, 100vw"
                    {...stylex.props(styles.image)}
                  />
                </div>
                <div {...stylex.props(styles.body)}>
                  <div>
                    <div {...stylex.props(styles.tags)}>
                      <span {...stylex.props(styles.tagPrimary)}>
                        {tb('tags.product')}
                      </span>
                      <span {...stylex.props(styles.tagSecondary)}>
                        {tb('tags.technology')}
                      </span>
                    </div>
                    <h3 {...stylex.props(styles.headingReset)}>
                      <Link
                        href="/blog"
                        {...stylex.props(styles.cardTitle, styles.focusRing)}
                      >
                        {articleTitle}
                      </Link>
                    </h3>
                    <p {...stylex.props(styles.description)}>
                      {tb(`articles.${article.key}.description`)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
