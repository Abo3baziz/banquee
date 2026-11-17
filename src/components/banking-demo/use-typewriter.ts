import { useEffect, useState } from 'react'

export function useTypewriter(
  value: string,
  { startDelay = 0, charDelay = 120, enabled = true } = {},
) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!enabled) {
      const timer = window.setTimeout(() => setText(value), 0)
      return () => window.clearTimeout(timer)
    }

    let index = 0
    let interval: number | undefined
    const startTimer = window.setTimeout(() => {
      index = 1
      setText(value.slice(0, index))

      interval = window.setInterval(() => {
        index += 1
        setText(value.slice(0, index))

        if (index >= value.length && interval !== undefined) {
          window.clearInterval(interval)
        }
      }, charDelay)
    }, startDelay)

    return () => {
      window.clearTimeout(startTimer)
      if (interval !== undefined) {
        window.clearInterval(interval)
      }
    }
  }, [charDelay, enabled, startDelay, value])

  return { text, complete: text.length >= value.length }
}
