import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, spacing } from '../../styles/tokens.stylex'
import { ArticleCard } from './article-card'
import { getRelatedArticles } from './blog-data'

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
    paddingBlock: {
      default: '4rem',
      '@media (min-width: 64rem)': '5rem',
    },
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    marginBlockStart: '4rem',
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
    marginBlockEnd: '2.5rem',
  },
  eyebrow: {
    margin: 0,
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
      '@media (min-width: 40rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBlockStart: spacing.xs,
  },
  exploreLink: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
  },
  grid: {
    gap: spacing.xl,
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 40rem)': 'repeat(2, minmax(0, 1fr))',
    },
  },
})

type RelatedArticlesProps = {
  slug: string
}

/** Related reading block at the end of an article. */
export async function RelatedArticles({ slug }: RelatedArticlesProps) {
  const [t, locale] = await Promise.all([
    getTranslations('blog.articleDetail'),
    getLocale(),
  ])
  const articles = getRelatedArticles(slug)

  if (articles.length === 0) {
    return null
  }

  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.header)}>
        <div>
          <p {...stylex.props(styles.eyebrow)}>{t('related.eyebrow')}</p>
          <h2 {...stylex.props(styles.title)}>{t('related.title')}</h2>
        </div>
        <Link
          href="/blog"
          {...stylex.props(styles.exploreLink, styles.focusRing)}
        >
          {t('related.exploreAll')}
          <Arrow aria-hidden="true" size={16} />
        </Link>
      </div>
      <div {...stylex.props(styles.grid)}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
