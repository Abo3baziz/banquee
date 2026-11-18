import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import type { BlogArticle } from './blog-types'
import { BlogTagBadge } from './blog-tag'

const styles = stylex.create({
  header: {
    marginInline: 'auto',
    paddingBlockEnd: '2rem',
    paddingBlockStart: {
      default: '2rem',
      '@media (min-width: 64rem)': '3.5rem',
    },
    maxWidth: '56rem',
  },
  tags: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    marginBlockEnd: spacing.md,
  },
  title: {
    marginBlock: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '2rem',
      '@media (min-width: 40rem)': '2.75rem',
      '@media (min-width: 64rem)': '3.25rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.15,
    marginBlockEnd: spacing.lg,
    textWrap: 'balance',
  },
  lede: {
    marginBlock: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.625,
    maxWidth: '48rem',
  },
  cover: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    backgroundColor: colors.surfaceContainer,
    marginBlockEnd: {
      default: '3rem',
      '@media (min-width: 64rem)': '4rem',
    },
    position: 'relative',
    maxHeight: '40rem',
    width: '100%',
  },
  coverImage: {
    objectFit: 'cover',
  },
})

type ArticleHeaderProps = {
  article: BlogArticle
  title: string
  description: string
}

/**
 * Article masthead: category pills, title, lede, and the cover image that
 * separates the header from the body.
 */
export function ArticleHeader({
  article,
  title,
  description,
}: ArticleHeaderProps) {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.tags)}>
          {article.tags.map((tag) => (
            <BlogTagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        <p {...stylex.props(styles.lede)}>{description}</p>
      </header>
      <div {...stylex.props(styles.cover)}>
        <Image
          src={article.image}
          alt={title}
          fill
          loading="eager"
          sizes="(min-width: 80rem) 80rem, 100vw"
          {...stylex.props(styles.coverImage)}
        />
      </div>
    </>
  )
}
