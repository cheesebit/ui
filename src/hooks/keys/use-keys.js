import { KeyboardEvent, useCallback, useRef } from 'react'
import {toArray} from '../../common/toolset'

/**
 * useKey<T>
 * @param {string | string[]} keys - key code or an arrry of key codes
 */
function useKey(keys) {
  const keysRef = useRef(toArray(keys))

  /**
   * handleKeyEventWith
   * @param {(...args: any[]) => void} 
   */
  const handleKeyEventWith = useCallback(function handleEvent(...args){
    /**
     * handleKeyEvent
     * @param {KeyboardEvent<T>} e
     */
    return function handleKeyEvent(e) {
      if (getKeys().includes(e.key)) {
        handleEvent()
      }
    }
  }, [])

  /**
   * getKeys
   * @returns {string[]}
   */
  function getKeys() {
    return keysRef.current
  }

  return handleKeyEventWith
}

export default useKey
