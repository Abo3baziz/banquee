'use client'

import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { ArticleCard } from './article-card'
import { BLOG_ARTICLES, BLOG_TAG_ORDER, filterBlogArticles } from './blog-data'
import type { BlogTag } from './blog-types'

type FilterValue = BlogTag | 'all'

const FILTERS: readonly FilterValue[] = ['all', ...BLOG_TAG_ORDER]

const HEADING_ID = 'blog-all-articles-heading'

const styles = stylex.create({
  section: {
    marginBlockEnd: {
      default: '4rem',
      '@media (min-width: 64rem)': '6rem',
    },
    width: '100%',
  },
  header: {
    gap: spacing.md,
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 40rem)': 'center',
    },
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 40rem)': 'row',
    },
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
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
  },
  filters: {
    padding: '0.25rem',
    borderRadius: radii.xl,
    gap: '0.25rem',
    backgroundColor: colors.surfaceContainerHigh,
    display: 'inline-flex',
  },
  filter: {
    borderRadius: radii.md,
    borderWidth: 0,
    paddingBlock: '0.5rem',
    paddingInline: '1rem',
    backgroundColor: 'transparent',
    color: {
      default: colors.secondary,
      ':hover': colors.onSurface,
    },
    cursor: 'pointer',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 600,
    lineHeight: '1.125rem',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color, box-shadow',
    whiteSpace: 'nowrap',
  },
  filterActive: {
    backgroundColor: colors.primaryContainer,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
    color: colors.onSurface,
  },
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
  grid: {
    gap: spacing.xl,
    alignItems: 'stretch',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 40rem)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 64rem)': 'repeat(3, minmax(0, 1fr))',
    },
  },
})

export function BlogArticles() {
  const t = useTranslations('blog')
  const [activeTag, setActiveTag] = useState<FilterValue>('all')
  const articles = filterBlogArticles(BLOG_ARTICLES, activeTag)

  return (
    <section aria-labelledby={HEADING_ID} {...stylex.props(styles.section)}>
      <Reveal>
        <div {...stylex.props(styles.header)}>
          <h2 id={HEADING_ID} {...stylex.props(styles.title)}>
            {t('filters.allArticles')}
          </h2>
          <div {...stylex.props(styles.filters)}>
            {FILTERS.map((filter) => {
              const isActive = filter === activeTag

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTag(filter)}
                  {...stylex.props(
                    styles.filter,
                    isActive && styles.filterActive,
                    styles.focusRing,
                  )}
                >
                  {filter === 'all'
                    ? t('filters.allArticles')
                    : t(`filters.${filter}`)}
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>
      <div key={activeTag} {...stylex.props(styles.grid)}>
        {articles.map((article, index) => (
          <Reveal key={article.slug} delay={index * 0.06}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
