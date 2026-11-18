import { describe, expect, it } from 'vitest'
import {
  blogArticles,
  getBlogArticle,
  getRelatedBlogArticles,
} from './blog-articles'

describe('blogArticles', () => {
  it('has unique slugs', () => {
    const slugs = blogArticles.map((article) => article.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('resolves every registered slug', () => {
    for (const article of blogArticles) {
      expect(getBlogArticle(article.slug)).toEqual(article)
    }
  })

  it('does not resolve unknown slugs', () => {
    expect(getBlogArticle('not-an-article')).toBeUndefined()
  })

  it('exposes exactly one article with full body copy', () => {
    expect(blogArticles.filter((article) => article.hasDetail)).toHaveLength(1)
  })
})

describe('getRelatedBlogArticles', () => {
  it('excludes the given article and keeps registry order', () => {
    expect(
      getRelatedBlogArticles('startup-finances').map((a) => a.slug),
    ).toEqual(['banko-secrets', 'saving-habits'])
    expect(getRelatedBlogArticles('banko-secrets').map((a) => a.slug)).toEqual([
      'startup-finances',
      'saving-habits',
    ])
    expect(getRelatedBlogArticles('saving-habits').map((a) => a.slug)).toEqual([
      'startup-finances',
      'banko-secrets',
    ])
  })

  it('returns every article for an unknown slug', () => {
    expect(getRelatedBlogArticles('not-an-article')).toHaveLength(
      blogArticles.length,
    )
  })
})
