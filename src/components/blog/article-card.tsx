import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import type { BlogArticle } from './blog-types'
import { BlogTagBadge } from './blog-tag'

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
    backgroundColor: colors.surfaceContainerLowest,
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
  link: {
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    textDecorationLine: 'none',
    height: '100%',
  },
  imageWrapper: {
    overflow: 'hidden',
    aspectRatio: '16 / 10',
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
    gap: spacing.sm,
    alignItems: 'flex-start',
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
  },
  title: {
    margin: 0,
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.375,
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1.625,
  },
  readMore: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    marginTop: spacing.sm,
  },
})

/**
 * Article card shared by the blog listing grid and the related-articles
 * section. Works in both server and client trees because it only uses the
 * non-async next-intl hooks.
 */
export function ArticleCard({ article }: { article: BlogArticle }) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  return (
    <article {...stylex.props(styles.card)}>
      <Link
        href={`/blog/${article.slug}`}
        {...stylex.props(styles.link, styles.focusRing)}
      >
        <div {...stylex.props(styles.imageWrapper)}>
          <Image
            src={article.image}
            alt={t(`articles.${article.translationKey}.title`)}
            fill
            sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw"
            {...stylex.props(styles.image)}
          />
        </div>
        <div {...stylex.props(styles.body)}>
          <div {...stylex.props(styles.tags)}>
            {article.tags.map((tag) => (
              <BlogTagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h3 {...stylex.props(styles.title)}>
            {t(`articles.${article.translationKey}.title`)}
          </h3>
          <p {...stylex.props(styles.description)}>
            {t(`articles.${article.translationKey}.description`)}
          </p>
          <span {...stylex.props(styles.readMore)}>
            {t(`articles.${article.translationKey}.readMore`)}
            <Arrow aria-hidden="true" size={16} />
          </span>
        </div>
      </Link>
    </article>
  )
}
