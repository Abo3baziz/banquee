import type { Metadata } from 'next'
import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/src/lib/site'
import { BlogArticles } from '../../../components/blog/blog-articles'
import { BlogHero } from '../../../components/blog/blog-hero'
import { FeaturedArticle } from '../../../components/blog/featured-article'
import { colors, spacing } from '../../../styles/tokens.stylex'

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
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  return pageMetadata({
    locale,
    title: t('meta.title'),
    description: t('meta.description'),
    path: '/blog',
  })
}

export default function BlogPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.container)}>
        <BlogHero />
        <FeaturedArticle />
        <BlogArticles />
      </div>
    </main>
  )
}
