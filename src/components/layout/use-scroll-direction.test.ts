import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollDirection } from './use-scroll-direction'

let frames: FrameRequestCallback[] = []
const cancelAnimationFrame = vi.fn()

const scrollTo = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
  })

  act(() => {
    window.dispatchEvent(new Event('scroll'))
    frames.splice(0).forEach((callback) => callback(0))
  })
}

describe('useScrollDirection', () => {
  beforeEach(() => {
    frames = []
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    })
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.push(callback)
      return frames.length
    })
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrame)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    cancelAnimationFrame.mockClear()
  })

  it('starts visible', () => {
    const { result } = renderHook(() => useScrollDirection())

    expect(result.current.hidden).toBe(false)
  })

  it('hides after scrolling down past the header height', () => {
    const { result } = renderHook(() => useScrollDirection())

    scrollTo(200)

    expect(result.current.hidden).toBe(true)
  })

  it('shows again when scrolling up', () => {
    const { result } = renderHook(() => useScrollDirection())

    scrollTo(600)
    expect(result.current.hidden).toBe(true)

    scrollTo(400)

    expect(result.current.hidden).toBe(false)
  })

  it('stays visible near the top of the page', () => {
    const { result } = renderHook(() => useScrollDirection())

    scrollTo(600)
    scrollTo(4)

    expect(result.current.hidden).toBe(false)
  })

  it('ignores jitter below the direction thresholds', () => {
    const { result } = renderHook(() => useScrollDirection())

    scrollTo(60)
    scrollTo(67)
    scrollTo(62)
    scrollTo(68)
    expect(result.current.hidden).toBe(false)

    scrollTo(600)
    scrollTo(400)
    scrollTo(407)
    scrollTo(404)
    scrollTo(409)

    expect(result.current.hidden).toBe(false)
  })

  it('notifies the consumer when it hides', () => {
    const onHide = vi.fn()
    renderHook(() => useScrollDirection({ onHide }))

    scrollTo(600)
    expect(onHide).toHaveBeenCalledTimes(1)

    scrollTo(700)
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('cleans up the scroll listener and pending frame on unmount', () => {
    const removeListener = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollDirection())

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    unmount()

    expect(removeListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(cancelAnimationFrame).toHaveBeenCalled()

    removeListener.mockRestore()
  })
})
