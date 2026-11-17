export type DemoRecipient = {
  id: string
  name: string
  initials: string
  meta: string
  bank: string
  tone: 'primary' | 'blue' | 'purple' | 'neutral'
}

export const DEMO_RECIPIENTS: DemoRecipient[] = [
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    initials: 'SJ',
    meta: 'sarah.j@email.com',
    bank: 'Chase •• 8821',
    tone: 'primary',
  },
  {
    id: 'alex',
    name: 'Alex Rivera',
    initials: 'AR',
    meta: 'alex.rivera@design.co',
    bank: 'Revolut •• 3144',
    tone: 'blue',
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    initials: 'MC',
    meta: 'm.chen@design.org',
    bank: 'Wells Fargo •• 9012',
    tone: 'purple',
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    initials: 'ER',
    meta: 'elena@tech.io',
    bank: 'Banquee Instant •• 5521',
    tone: 'neutral',
  },
]

export const DEMO_ACCOUNT = {
  name: 'Banquee Main Checking',
  last4: '4289',
  balance: 24580,
}

export const DEMO_SEND = {
  amount: '450.00',
  recipient: DEMO_RECIPIENTS[0],
  note: 'Dinner & concert tickets 🎵',
  reference: '#BQ-884920194',
  delivery: 'Instant (within seconds)',
}

export const DEMO_RECEIVE = {
  amount: '850.00',
  sender: DEMO_RECIPIENTS[0],
  reference: '#BQ-REC-99412',
  memo: 'Freelance Project Milestone #2 🚀',
  accountHolder: 'Pawel Gola',
  accountNumber: '8492 0192 4819',
  iban: 'US64 BQEE 0210 0000 2184 9201 92',
}

export const DEMO_ACTIVITY = [
  {
    id: 'apple',
    name: 'Apple Store',
    meta: 'Electronics',
    amount: '-$799.00',
    status: 'Completed',
    tone: 'neutral' as const,
    icon: 'laptop' as const,
  },
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    meta: 'P2P Received',
    amount: '+$250.00',
    status: 'Settled',
    tone: 'primary' as const,
    icon: 'received' as const,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    meta: 'Shopping',
    amount: '-$59.00',
    status: 'Card • 4289',
    tone: 'tertiary' as const,
    icon: 'shopping' as const,
  },
]

export function formatUsd(value: number) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
