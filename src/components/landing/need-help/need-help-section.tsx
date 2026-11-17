import * as stylex from '@stylexjs/stylex'
import { Mail, Phone } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { spacing } from '../../../styles/tokens.stylex'
import { Reveal } from '../../ui/reveal'
import { ContactSupportCard } from './contact-support-card'
import { FaqItem } from './faq-item'
import { NeedHelpHeader } from './need-help-header'
import type { SupportContact } from './support-contact-link'

const FAQ_KEYS = ['account', 'card', 'limits', 'premium', 'multiple'] as const

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

export async function NeedHelpSection() {
  const t = await getTranslations('landing')

  const faqs = FAQ_KEYS.map((key) => ({
    key,
    question: t(`needHelp.items.${key}.question`),
    answer: t(`needHelp.items.${key}.answer`),
  }))

  const contacts = [
    {
      key: 'hotline',
      label: t('needHelp.support.hotlineLabel'),
      value: t('needHelp.support.hotlineValue'),
      href: 'tel:+49176123456',
      icon: Phone,
    },
    {
      key: 'email',
      label: t('needHelp.support.emailLabel'),
      value: t('needHelp.support.emailValue'),
      href: 'mailto:help@banquee.com',
      icon: Mail,
    },
  ] satisfies readonly SupportContact[]

  return (
    <section
      id="faq-support"
      aria-labelledby="need-help-title"
      {...stylex.props(styles.section)}
    >
      <Reveal>
        <NeedHelpHeader
          titleId="need-help-title"
          eyebrow={t('needHelp.eyebrow')}
          title={t('needHelp.title')}
        />
      </Reveal>

      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.faqColumn)}>
          {faqs.map((faq, index) => (
            <Reveal key={faq.key} delay={index * 0.06}>
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
              title={t('needHelp.support.title')}
              description={t('needHelp.support.description')}
              contacts={contacts}
              responseTime={t('needHelp.support.responseTime')}
              availability={t('needHelp.support.availability')}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
