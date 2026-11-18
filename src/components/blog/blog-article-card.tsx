import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import type { BlogArticle } from './blog-articles'

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
  card: {
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.xl,
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerLow,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 12px 32px rgba(0, 0, 0, 0.08)',
    },
    display: 'flex',
    flexDirection: 'column',
    transform: {
      default: 'none',
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
    padding: {
      default: spacing.lg,
      '@media (min-width: 48rem)': spacing.xl,
    },
    gap: spacing.md,
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
  headingReset: {
    margin: 0,
    fontFamily: fonts.heading,
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
  readLink: {
    gap: '0.375rem',
    alignItems: 'center',
    color: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 700,
    textDecorationLine: 'none',
    width: 'fit-content',
  },
})

export async function BlogArticleCard({ article }: { article: BlogArticle }) {
  const [t, locale] = await Promise.all([getTranslations('blog'), getLocale()])

  const title = t(`articles.${article.key}.title`)
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight
  const [primaryTag, ...secondaryTags] = article.tags

  return (
    <article {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.imageWrapper)}>
        <Image
          src={article.image}
          alt={title}
          fill
          sizes="(min-width: 48rem) 35rem, 100vw"
          {...stylex.props(styles.image)}
        />
      </div>
      <div {...stylex.props(styles.body)}>
        <div>
          {primaryTag ? (
            <div {...stylex.props(styles.tags)}>
              <span {...stylex.props(styles.tagPrimary)}>
                {t(`tags.${primaryTag}`)}
              </span>
              {secondaryTags.map((tag) => (
                <span key={tag} {...stylex.props(styles.tagSecondary)}>
                  {t(`tags.${tag}`)}
                </span>
              ))}
            </div>
          ) : null}
          <h3 {...stylex.props(styles.headingReset)}>
            <Link
              href={`/blog/${article.slug}`}
              {...stylex.props(styles.cardTitle, styles.focusRing)}
            >
              {title}
            </Link>
          </h3>
          <p {...stylex.props(styles.description)}>
            {t(`articles.${article.key}.description`)}
          </p>
        </div>
        <Link
          href={`/blog/${article.slug}`}
          {...stylex.props(styles.readLink, styles.focusRing)}
        >
          {t(`articles.${article.key}.readMore`)}
          <Arrow aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  )
}
