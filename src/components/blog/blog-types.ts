export type BlogTag = 'product' | 'technology'

export type BlogArticle = {
  /** Stable, readable URL segment used by /blog/[slug]. */
  slug: string
  /** Key into the `blog.articles` translation namespace. */
  translationKey: 'startup' | 'secrets' | 'savingHabits'
  /** Cover image path inside /public. */
  image: string
  /** Category tags shown as card badges and used for filtering. */
  tags: readonly BlogTag[]
  /** Exactly one article is featured. */
  featured: boolean
  /** Ordered section ids rendered by the article detail page ('sec1'...'secN'). */
  sectionIds: readonly string[]
}
