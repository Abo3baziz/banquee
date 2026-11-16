import { notFound } from 'next/navigation'

// Unknown paths intentionally block here to render the localized 404.
export const instant = false

export default function CatchAll() {
  notFound()
}
