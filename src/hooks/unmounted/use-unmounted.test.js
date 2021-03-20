import { renderHook, act } from '@testing-library/react-hooks'

import useUnmounted from './use-unmounted'

describe('useUnmounted', () => {
  it('starts with isUnmounted false', () => {
    const { result } = renderHook(() => useUnmounted())

    expect(result.current()).toBe(false)
  })

  it('sets isUnmounted to true when component is unmounted', () => {
    const { result, unmount } = renderHook(() => useUnmounted())

    expect(result.current()).toBe(false)
    unmount()
    expect(result.current()).toBe(true)
  })
})
