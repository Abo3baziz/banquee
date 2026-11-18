import { useRef } from 'react'
import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useHasStarted } from './use-has-started'

type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: MockIntersectionObserver,
) => void

let observers: MockIntersectionObserver[] = []

class MockIntersectionObserver {
  elements: Element[] = []
  options?: IntersectionObserverInit
  disconnect = vi.fn()

  constructor(
    private callback: ObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.options = options
    observers.push(this)
  }

  observe(element: Element) {
    this.elements.push(element)
  }

  unobserve() {}

  takeRecords() {
    return []
  }

  emit(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this)
  }

  static latest() {
    return observers[observers.length - 1]
  }
}

const intersectionEntry = (isIntersecting: boolean) =>
  ({ isIntersecting }) as IntersectionObserverEntry

type ProbeProps = {
  onState: (hasStarted: boolean) => void
}

function Probe({ onState }: ProbeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasStarted = useHasStarted(ref)

  onState(hasStarted)

  return <div ref={ref} data-testid="probe" />
}

function renderProbe() {
  const states: boolean[] = []

  render(<Probe onState={(hasStarted) => states.push(hasStarted)} />)

  return {
    states,
    current: () => states[states.length - 1],
  }
}

describe('useHasStarted', () => {
  beforeEach(() => {
    observers = []
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('starts false and observes the element at the shared threshold', () => {
    const probe = renderProbe()
    const observer = MockIntersectionObserver.latest()

    expect(probe.current()).toBe(false)
    expect(observer.elements).toHaveLength(1)
    expect(observer.options).toEqual({ threshold: 0.2 })
  })

  it('flips to true when the element enters the viewport', () => {
    const probe = renderProbe()

    act(() => {
      MockIntersectionObserver.latest().emit([intersectionEntry(true)])
    })

    expect(probe.current()).toBe(true)
    expect(MockIntersectionObserver.latest().disconnect).toHaveBeenCalled()
  })

  it('stays true after the element leaves the viewport', () => {
    const probe = renderProbe()
    const observer = MockIntersectionObserver.latest()

    act(() => {
      observer.emit([intersectionEntry(true)])
    })
    act(() => {
      observer.emit([intersectionEntry(false)])
    })

    expect(probe.current()).toBe(true)
    expect(probe.states.filter((state) => !state)).toHaveLength(1)
  })

  it('ignores entries that are still out of view', () => {
    const probe = renderProbe()

    act(() => {
      MockIntersectionObserver.latest().emit([intersectionEntry(false)])
    })

    expect(probe.current()).toBe(false)
    expect(MockIntersectionObserver.latest().disconnect).not.toHaveBeenCalled()
  })

  it('mounts on the next task when IntersectionObserver is unavailable', () => {
    vi.useFakeTimers()
    vi.stubGlobal('IntersectionObserver', undefined)

    const probe = renderProbe()

    expect(probe.current()).toBe(false)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(probe.current()).toBe(true)
  })
})
