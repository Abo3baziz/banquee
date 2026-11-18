import { describe, expect, it } from 'vitest'
import type { BlogArticle } from './blog-types'
import {
  BLOG_ARTICLES,
  filterBlogArticles,
  getBlogArticle,
  getFeaturedArticle,
  getRelatedArticles,
} from './blog-data'

function getSlugs(articles: readonly BlogArticle[]): string[] {
  return articles.map((article) => article.slug)
}

describe('blog articles', () => {
  it('lists the three articles in display order', () => {
    expect(BLOG_ARTICLES).toHaveLength(3)
    expect(getSlugs(BLOG_ARTICLES)).toEqual([
      'startup-finances',
      'banko-secrets',
      'improve-saving-habits',
    ])
    expect(BLOG_ARTICLES.map((article) => article.tags)).toEqual([
      ['product', 'technology'],
      ['technology'],
      ['product'],
    ])
    expect(BLOG_ARTICLES.map((article) => article.featured)).toEqual([
      true,
      false,
      false,
    ])
  })

  it('marks exactly one article as featured', () => {
    expect(BLOG_ARTICLES.filter((article) => article.featured)).toHaveLength(1)
  })

  it('keeps slugs unique', () => {
    const slugs = getSlugs(BLOG_ARTICLES)

    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('getBlogArticle', () => {
  it('finds an article by slug', () => {
    expect(getBlogArticle('banko-secrets')?.translationKey).toBe('secrets')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getBlogArticle('missing-article')).toBeUndefined()
  })
})

describe('getFeaturedArticle', () => {
  it('returns the startup article', () => {
    expect(getFeaturedArticle().slug).toBe('startup-finances')
  })
})

describe('filterBlogArticles', () => {
  it('returns everything for the all tag', () => {
    expect(filterBlogArticles(BLOG_ARTICLES, 'all')).toEqual([...BLOG_ARTICLES])
  })

  it('filters by product', () => {
    expect(getSlugs(filterBlogArticles(BLOG_ARTICLES, 'product'))).toEqual([
      'startup-finances',
      'improve-saving-habits',
    ])
  })

  it('filters by technology', () => {
    expect(getSlugs(filterBlogArticles(BLOG_ARTICLES, 'technology'))).toEqual([
      'startup-finances',
      'banko-secrets',
    ])
  })

  it('returns an empty list for empty input', () => {
    expect(filterBlogArticles([], 'product')).toEqual([])
  })
})

describe('getRelatedArticles', () => {
  it('excludes the current article while preserving order', () => {
    expect(getSlugs(getRelatedArticles('startup-finances'))).toEqual([
      'banko-secrets',
      'improve-saving-habits',
    ])
  })

  it('limits the result to the requested count', () => {
    expect(getSlugs(getRelatedArticles('banko-secrets', 1))).toEqual([
      'startup-finances',
    ])
  })

  it('defaults to two related articles', () => {
    expect(getRelatedArticles('improve-saving-habits')).toHaveLength(2)
  })
})
