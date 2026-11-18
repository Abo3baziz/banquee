import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDemoSequence } from './use-demo-sequence'

const STAGES = [
  { id: 'overview', duration: 1000 },
  { id: 'recipients', duration: 2000 },
  { id: 'amount', duration: 1500 },
] as const

describe('useDemoSequence', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('advances through the stages in order', () => {
    const { result } = renderHook(() => useDemoSequence(STAGES))

    expect(result.current.stage).toBe('overview')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.stage).toBe('recipients')

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.stage).toBe('amount')
  })

  it('loops back to the first stage and increments the cycle', () => {
    const { result } = renderHook(() => useDemoSequence(STAGES))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(result.current.stage).toBe('overview')
    expect(result.current.cycle).toBe(1)
  })

  it('does not advance when disabled', () => {
    const { result } = renderHook(() =>
      useDemoSequence(STAGES, { disabled: true }),
    )

    act(() => {
      vi.advanceTimersByTime(10_000)
    })

    expect(result.current.stage).toBe('overview')
    expect(result.current.cycle).toBe(0)
  })
})
