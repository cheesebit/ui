import { RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * useClickOutside
 * @param {RefObject<HTMLElement>} ref
 * @param {() => void} callback
 */
function useClickOutside(ref, callback, disabled = false) {
  const [active, setActive] = useState(false);

  const handleEvent = useCallback(
    /**
     * Handle keyboard or mouse event, checking if it happened
     * outside the the given referenced element.
     * @param {Document} this
     * @param {MouseEvent | KeyboardEvent} e
     */
    function handleEvent(this, e) {
      function activate() {
        setActive(true);
      }

      function deactivate() {
        setActive(false);
      }

      if (!ref.current || disabled) {
        return;
      }

      if (ref.current.contains(e.target) && !active) {
        activate();
      } else if (!ref.current.contains(e.target) && active) {
        deactivate();

        callback();
      }
    },
    [active, callback, ref],
  );

  useEffect(() => {
    function subscribe() {
      document.addEventListener('mousedown', handleEvent, true);
      document.addEventListener('keyup', handleEvent, true);
    }

    function unsubscribe() {
      document.removeEventListener('mousedown', handleEvent, true);
      document.removeEventListener('keyup', handleEvent, true);
    }

    subscribe();

    return () => {
      unsubscribe();
    };
  }, [handleEvent]);
}

export default useClickOutside;
