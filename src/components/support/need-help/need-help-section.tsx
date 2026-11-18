import * as stylex from '@stylexjs/stylex'
import { Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { spacing } from '../../../styles/tokens.stylex'
import { Reveal } from '../../ui/reveal'
import { ContactSupportCard } from './contact-support-card'
import { FaqItem } from './faq-item'
import { NeedHelpHeader } from './need-help-header'
import type { SupportContact } from './support-contact-link'

const FAQ_KEYS = ['account', 'card', 'limits', 'premium', 'multiple'] as const

export type NeedHelpFaq = {
  question: string
  answer: string
}

export type NeedHelpSupport = {
  title: string
  description: string
  contacts: readonly SupportContact[]
  responseTime: string
  availability: string
  icon?: LucideIcon
}

export type NeedHelpSectionProps = {
  /** Section anchor. Defaults to the existing `faq-support` id. */
  id?: string
  /** Heading id used by `aria-labelledby`. Defaults to `need-help-title`. */
  titleId?: string
  eyebrow?: string
  title?: string
  faqs?: readonly NeedHelpFaq[]
  support?: NeedHelpSupport
}

const styles = stylex.create({
  section: {
    marginInline: 'auto',
    overflow: 'hidden',
    paddingBlock: spacing.xl,
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    maxWidth: '80rem',
    width: '100%',
  },
  grid: {
    gap: spacing.xl,
    alignItems: 'start',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': 'repeat(12, minmax(0, 1fr))',
    },
  },
  faqColumn: {
    gap: spacing.md,
    gridColumn: {
      '@media (min-width: 64rem)': 'span 7',
    },
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  supportColumn: {
    gridColumn: {
      '@media (min-width: 64rem)': 'span 5',
    },
    minWidth: 0,
  },
})

type ResolvedNeedHelpContent = {
  eyebrow: string
  title: string
  faqs: readonly NeedHelpFaq[]
  support: NeedHelpSupport
}

async function getDefaultContent(): Promise<ResolvedNeedHelpContent> {
  const t = await getTranslations('needHelp')

  return {
    eyebrow: t('eyebrow'),
    title: t('title'),
    faqs: FAQ_KEYS.map((key) => ({
      question: t(`items.${key}.question`),
      answer: t(`items.${key}.answer`),
    })),
    support: {
      title: t('support.title'),
      description: t('support.description'),
      contacts: [
        {
          key: 'hotline',
          label: t('support.hotlineLabel'),
          value: t('support.hotlineValue'),
          href: 'tel:+49176123456',
          icon: Phone,
        },
        {
          key: 'email',
          label: t('support.emailLabel'),
          value: t('support.emailValue'),
          href: 'mailto:help@banquee.com',
          icon: Mail,
        },
      ] satisfies readonly SupportContact[],
      responseTime: t('support.responseTime'),
      availability: t('support.availability'),
    },
  }
}

async function resolveContent({
  eyebrow,
  title,
  faqs,
  support,
}: NeedHelpSectionProps): Promise<ResolvedNeedHelpContent> {
  if (
    eyebrow !== undefined &&
    title !== undefined &&
    faqs !== undefined &&
    support !== undefined
  ) {
    return { eyebrow, title, faqs, support }
  }

  const defaults = await getDefaultContent()

  return {
    eyebrow: eyebrow ?? defaults.eyebrow,
    title: title ?? defaults.title,
    faqs: faqs ?? defaults.faqs,
    support: support ?? defaults.support,
  }
}

export async function NeedHelpSection({
  id = 'faq-support',
  titleId = 'need-help-title',
  ...contentProps
}: NeedHelpSectionProps = {}) {
  const content = await resolveContent(contentProps)

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      {...stylex.props(styles.section)}
    >
      <Reveal>
        <NeedHelpHeader
          titleId={titleId}
          eyebrow={content.eyebrow}
          title={content.title}
        />
      </Reveal>

      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.faqColumn)}>
          {content.faqs.map((faq, index) => (
            <Reveal key={`${faq.question}-${index}`} delay={index * 0.06}>
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            </Reveal>
          ))}
        </div>

        <div {...stylex.props(styles.supportColumn)}>
          <Reveal delay={0.1}>
            <ContactSupportCard
              title={content.support.title}
              description={content.support.description}
              contacts={content.support.contacts}
              responseTime={content.support.responseTime}
              availability={content.support.availability}
              icon={content.support.icon}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
