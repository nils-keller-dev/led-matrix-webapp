import { renderHook } from '@testing-library/preact'
import { afterEach, beforeAll, describe, expect, it, test, vi } from 'vitest'
import { usePreventBackNavigation } from '../../src/hooks/usePreventBackNavigation'

describe('usePreventBackNavigation', () => {
  beforeAll(() => {
    vi.spyOn(window, 'removeEventListener').mockImplementation(vi.fn())
    vi.spyOn(history, 'pushState').mockImplementation(vi.fn())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('pushes state to history on mount', () => {
    vi.spyOn(window, 'addEventListener').mockImplementationOnce(vi.fn())

    renderHook(() => usePreventBackNavigation(() => {}))
    expect(history.pushState).toHaveBeenCalledWith(
      null,
      '',
      window.location.href
    )
  })

  test('calls onBackPress when back navigation is attempted', () => {
    const onBackPress = vi.fn()
    renderHook(() => usePreventBackNavigation(onBackPress))

    window.dispatchEvent(new PopStateEvent('popstate'))

    expect(history.pushState).toHaveBeenCalledTimes(2)
    expect(onBackPress).toHaveBeenCalled()
  })

  test('cleans up the event listener on unmount', () => {
    vi.spyOn(window, 'addEventListener').mockImplementationOnce(vi.fn())

    const { unmount } = renderHook(() => usePreventBackNavigation(() => {}))
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    )
  })
})
