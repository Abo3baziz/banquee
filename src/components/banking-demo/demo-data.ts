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

export type DemoActivity = {
  id: 'apple' | 'sarah' | 'amazon'
  name: string
  meta: string
  /** Signed amount: outgoing payments are negative, inflows positive. */
  amount: number
  status: string
  tone: 'neutral' | 'primary' | 'tertiary'
  icon: 'laptop' | 'received' | 'shopping'
}

export const DEMO_ACTIVITY: DemoActivity[] = [
  {
    id: 'apple',
    name: 'Apple Store',
    meta: 'Electronics',
    amount: -799,
    status: 'Completed',
    tone: 'neutral',
    icon: 'laptop',
  },
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    meta: 'P2P Received',
    amount: 250,
    status: 'Settled',
    tone: 'primary',
    icon: 'received',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    meta: 'Shopping',
    amount: -59,
    status: 'Card • 4289',
    tone: 'tertiary',
    icon: 'shopping',
  },
]
