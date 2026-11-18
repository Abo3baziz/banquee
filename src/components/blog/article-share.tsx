import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import type { BlogArticle } from './blog-articles'
import { ShareButtons } from './share-buttons'

const styles = stylex.create({
  card: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 40rem)': spacing.xl,
    },
    borderRadius: radii.xl,
    gap: spacing.lg,
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 40rem)': 'center',
    },
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 40rem)': 'row',
    },
    justifyContent: 'space-between',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: '0.25rem',
  },
  subtitle: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
  },
})

export async function ArticleShare({ article }: { article: BlogArticle }) {
  const [t, tBlog] = await Promise.all([
    getTranslations('blog.articleDetail'),
    getTranslations('blog'),
  ])

  return (
    <Reveal>
      <div {...stylex.props(styles.card)}>
        <div>
          <h3 {...stylex.props(styles.title)}>{t('share.title')}</h3>
          <p {...stylex.props(styles.subtitle)}>{t('share.subtitle')}</p>
        </div>
        <ShareButtons
          articleTitle={tBlog(`articles.${article.key}.title`)}
          copyLabel={t('share.copyLink')}
          copiedLabel={t('share.linkCopied')}
          labels={{
            facebook: t('share.facebook'),
            linkedIn: t('share.linkedIn'),
            x: t('share.x'),
          }}
        />
      </div>
    </Reveal>
  )
}
