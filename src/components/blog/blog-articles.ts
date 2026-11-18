/**
 * Single source of truth for blog article routes, shared by the landing blog
 * section and the blog article page. Article copy lives in the `blog`
 * translation namespace under `articles.<key>`.
 */

export type BlogArticleTag = 'product' | 'technology'

export type BlogArticleKey = 'startup' | 'secrets' | 'savingHabits'

export type BlogArticle = {
  /** Stable URL segment used by the /[locale]/blog/[slug] route. */
  slug: string
  /** Translation key under the `blog.articles` namespace. */
  key: BlogArticleKey
  /** Cover image path under /public. */
  image: string
  /** Category tags shown on cards and the article header, in display order. */
  tags: readonly BlogArticleTag[]
  /**
   * Whether full body copy exists under `blog.articleDetail`.
   * Only the startup article has body translations today.
   */
  hasDetail: boolean
}

export const blogArticles: readonly BlogArticle[] = [
  {
    slug: 'startup-finances',
    key: 'startup',
    image: '/images/blog-startup.jpg',
    tags: ['product', 'technology'],
    hasDetail: true,
  },
  {
    slug: 'banko-secrets',
    key: 'secrets',
    image: '/images/blog-secrets.jpg',
    tags: ['product', 'technology'],
    hasDetail: false,
  },
  {
    slug: 'saving-habits',
    key: 'savingHabits',
    image: '/images/blog-savings.jpg',
    tags: ['product', 'technology'],
    hasDetail: false,
  },
]

/** Resolves an article by its URL slug. */
export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug)
}

/** All articles except the given slug, in registry order. Used for related articles. */
export function getRelatedBlogArticles(slug: string): BlogArticle[] {
  return blogArticles.filter((article) => article.slug !== slug)
}
