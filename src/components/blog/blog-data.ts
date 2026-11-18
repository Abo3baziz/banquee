import type { BlogArticle, BlogTag } from './blog-types'

/*
 * Static demo data for the /blog pages. Slugs are stable URL segments and
 * translation keys point at `blog.articles`, so this module stays
 * presentation-free.
 */

/** Filter tabs in display order. */
export const BLOG_TAG_ORDER: readonly BlogTag[] = ['product', 'technology']

/** The three demo articles, in display order. */
export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    slug: 'startup-finances',
    translationKey: 'startup',
    image: '/images/blog-startup.jpg',
    tags: ['product', 'technology'],
    featured: true,
    sectionIds: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5'],
  },
  {
    slug: 'banko-secrets',
    translationKey: 'secrets',
    image: '/images/blog-secrets.jpg',
    tags: ['technology'],
    featured: false,
    sectionIds: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5'],
  },
  {
    slug: 'improve-saving-habits',
    translationKey: 'savingHabits',
    image: '/images/blog-savings.jpg',
    tags: ['product'],
    featured: false,
    sectionIds: ['sec1', 'sec2', 'sec3', 'sec4'],
  },
]

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug)
}

export function getFeaturedArticle(): BlogArticle {
  const article = BLOG_ARTICLES.find((item) => item.featured)

  if (!article) {
    throw new Error('Missing featured blog article')
  }

  return article
}

export function filterBlogArticles(
  articles: readonly BlogArticle[],
  tag: BlogTag | 'all',
): BlogArticle[] {
  if (tag === 'all') {
    return [...articles]
  }

  return articles.filter((article) => article.tags.includes(tag))
}

export function getRelatedArticles(slug: string, count = 2): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.slug !== slug).slice(
    0,
    count,
  )
}
