import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArticleBreadcrumbs } from '../../../../components/blog/article-breadcrumbs'
import { ArticleContent } from '../../../../components/blog/article-content'
import { ArticleHeader } from '../../../../components/blog/article-header'
import { ArticleShare } from '../../../../components/blog/article-share'
import { ArticleToc } from '../../../../components/blog/article-toc'
import {
  BLOG_ARTICLES,
  getBlogArticle,
} from '../../../../components/blog/blog-data'
import { RelatedArticles } from '../../../../components/blog/related-articles'
import { colors, spacing } from '../../../../styles/tokens.stylex'
import { openGraphLocales, pageMetadata, siteUrl } from '@/src/lib/site'

// Unknown slugs intentionally block so notFound() returns a real 404 instead of a streamed 200 shell.
export const unstable_paramMatching = { slug: 'blocking' }

const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
  container: {
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  layout: {
    gap: spacing.xl,
    alignItems: 'start',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': '8fr 4fr',
    },
  },
  content: {
    gridColumn: {
      '@media (min-width: 64rem)': '1',
    },
    gridRow: {
      '@media (min-width: 64rem)': '1',
    },
    minWidth: 0,
  },
})

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()])
  const article = getBlogArticle(slug)

  if (!article) {
    return {}
  }

  const t = await getTranslations('blog')
  const title = t(`articles.${article.translationKey}.title`)
  const description = t(`articles.${article.translationKey}.description`)
  const base = pageMetadata({
    locale,
    title,
    description,
    path: `/blog/${article.slug}`,
  })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      images: [{ url: article.image, alt: title }],
      locale: openGraphLocales[locale] ?? locale,
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    notFound()
  }

  const [t, locale] = await Promise.all([getTranslations('blog'), getLocale()])
  const title = t(`articles.${article.translationKey}.title`)
  const description = t(`articles.${article.translationKey}.description`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: `${siteUrl}${article.image}`,
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${locale}/blog/${slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('articleDetail.breadcrumbHome'),
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('articleDetail.breadcrumbBlog'),
        item: `${siteUrl}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteUrl}/${locale}/blog/${article.slug}`,
      },
    ],
  }

  return (
    <main {...stylex.props(styles.main)}>
      <article {...stylex.props(styles.container)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ArticleBreadcrumbs title={title} />
        <ArticleHeader
          article={article}
          title={title}
          description={description}
        />
        <div {...stylex.props(styles.layout)}>
          <ArticleToc
            translationKey={article.translationKey}
            ids={article.sectionIds}
          />
          <div {...stylex.props(styles.content)}>
            <ArticleContent article={article} />
            <ArticleShare title={title} />
          </div>
        </div>
        <RelatedArticles slug={slug} />
      </article>
    </main>
  )
}
