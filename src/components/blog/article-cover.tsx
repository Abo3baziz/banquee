import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { colors, radii } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import type { BlogArticle } from './blog-articles'

const styles = stylex.create({
  wrapper: {
    borderRadius: radii.xl,
    marginInline: 'auto',
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    backgroundColor: colors.surfaceContainer,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    position: 'relative',
    maxHeight: '40rem',
    maxWidth: '80rem',
    width: '100%',
  },
  image: {
    objectFit: 'cover',
  },
})

export async function ArticleCover({ article }: { article: BlogArticle }) {
  const t = await getTranslations('blog')
  const title = t(`articles.${article.key}.title`)

  return (
    <Reveal>
      <div {...stylex.props(styles.wrapper)}>
        <Image
          src={article.image}
          alt={title}
          fill
          priority
          sizes="(min-width: 83rem) 80rem, 100vw"
          {...stylex.props(styles.image)}
        />
      </div>
    </Reveal>
  )
}
