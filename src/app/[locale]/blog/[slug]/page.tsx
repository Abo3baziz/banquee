import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { ArticleContent } from '../../../../components/blog/article-content'
import { ArticleCover } from '../../../../components/blog/article-cover'
import { ArticleHeader } from '../../../../components/blog/article-header'
import { ArticleShare } from '../../../../components/blog/article-share'
import {
  blogArticles,
  getBlogArticle,
  getRelatedBlogArticles,
} from '../../../../components/blog/blog-articles'
import { DesktopTableOfContents } from '../../../../components/blog/desktop-table-of-contents'
import { MobileTableOfContents } from '../../../../components/blog/mobile-table-of-contents'
import { RelatedArticles } from '../../../../components/blog/related-articles'
import { colors, spacing } from '../../../../styles/tokens.stylex'
import { routing } from '@/i18n/routing'

/** Fallback matches the dev port configured in package.json. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'

const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
  article: {
    gap: {
      default: '3rem',
      '@media (min-width: 64rem)': '3.5rem',
    },
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    display: 'flex',
    flexDirection: 'column',
    paddingBlockStart: {
      default: '2rem',
      '@media (min-width: 40rem)': '3.5rem',
    },
    maxWidth: '80rem',
    width: '100%',
  },
  grid: {
    alignItems: 'start',
    columnGap: {
      default: spacing.xl,
      '@media (min-width: 64rem)': '3.5rem',
    },
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
    paddingBlockEnd: {
      default: '3rem',
      '@media (min-width: 64rem)': '4rem',
    },
    rowGap: spacing.xl,
  },
  content: {
    gap: spacing.xl,
    gridColumn: {
      '@media (min-width: 64rem)': 'span 8',
    },
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
})

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata(
  props: PageProps<'/[locale]/blog/[slug]'>,
): Promise<Metadata> {
  const { locale, slug } = await props.params
  const article = getBlogArticle(slug)

  if (!article) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: 'blog' })
  const title = t(`articles.${article.key}.title`)
  const description = t(`articles.${article.key}.description`)

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}/blog/${article.slug}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `/${l}/blog/${article.slug}`]),
        ),
        'x-default': `/en/blog/${article.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale,
      images: [{ url: article.image, alt: title }],
    },
    twitter: { title, description, images: [article.image] },
  }
}

export default async function BlogArticlePage(
  props: PageProps<'/[locale]/blog/[slug]'>,
) {
  const { locale, slug } = await props.params
  const article = getBlogArticle(slug)

  if (!article) {
    notFound()
  }

  const [t, td] = await Promise.all([
    getTranslations({ locale, namespace: 'blog' }),
    getTranslations('blog.articleDetail'),
  ])

  const title = t(`articles.${article.key}.title`)
  const description = t(`articles.${article.key}.description`)

  const tocItems = article.hasDetail
    ? [1, 2, 3, 4, 5].map((index) => ({
        id: `section-${index}`,
        number: String(index).padStart(2, '0'),
        label: td(`toc.sec${index}`),
      }))
    : []

  const related = getRelatedBlogArticles(article.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: `${siteUrl}${article.image}`,
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${locale}/blog/${article.slug}`,
    },
  }

  return (
    <main {...stylex.props(styles.main)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article {...stylex.props(styles.article)}>
        <ArticleHeader article={article} />
        <ArticleCover article={article} />

        <div {...stylex.props(styles.grid)}>
          {tocItems.length > 0 ? (
            <MobileTableOfContents title={td('tocTitle')} items={tocItems} />
          ) : null}

          <div {...stylex.props(styles.content)}>
            <ArticleContent article={article} />
            <ArticleShare article={article} />
          </div>

          {tocItems.length > 0 ? (
            <DesktopTableOfContents
              title={td('tocTitle')}
              items={tocItems}
              cta={{
                title: td('sidebarCta.title'),
                description: td('sidebarCta.description'),
                buttonLabel: td('sidebarCta.button'),
              }}
            />
          ) : null}
        </div>

        <RelatedArticles articles={related} />
      </article>
    </main>
  )
}
