import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import type { BlogArticle } from './blog-articles'
import { BlogArticleCard } from './blog-article-card'

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
      default: '3rem',
      '@media (min-width: 64rem)': '4rem',
    },
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
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
  eyebrow: {
    color: colors.primary,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 64rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  exploreLink: {
    gap: '0.375rem',
    alignItems: 'center',
    color: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    textDecorationLine: 'none',
  },
  grid: {
    gap: spacing.xl,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 48rem)': 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export async function RelatedArticles({
  articles,
}: {
  articles: BlogArticle[]
}) {
  if (articles.length === 0) {
    return null
  }

  const [t, locale] = await Promise.all([
    getTranslations('blog.articleDetail'),
    getLocale(),
  ])

  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.header)}>
        <div>
          <span {...stylex.props(styles.eyebrow)}>{t('related.eyebrow')}</span>
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
        {articles.map((article, index) => (
          <Reveal key={article.slug} delay={index * 0.06}>
            <BlogArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
