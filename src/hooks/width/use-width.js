import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getWidth } from '../../common/ui-toolset';
import { useUnmounted } from '../unmounted';
/**
 *
 * @param {Object} props - useWidth props.
 * @param {boolean} props.initial - Should measure width on mount.
 * @param {React.MutableRefObject} ref - Option ref to element whose width whould be monitored.
 * @param {Function} onChange - Callback function to run when element's or window's width changes.
 */
function useWidth({ initial = false, ref, onWidthChange }) {
  const isUnmounted = useUnmounted();
  const [width, setWidth] = useState(0);
  const measurableRef = useRef(ref.current || null);

  function getMeasurable() {
    return measurableRef.current;
  }

  const measure = useCallback(
    function measure() {
      const ref = getMeasurable();
      const newWidth = ref ? getWidth(ref) : window.innerWidth;

      if (width === newWidth || isUnmounted()) {
        return;
      }

      setWidth(newWidth);
    },
    [width, isUnmounted],
  );

  useEffect(function subscribeToResizeEvent() {
    window.addEventListener('resize', measure, false);

    if (initial) {
      measure();
    }

    return function unsubscribeToResizeEvent() {
      window.removeEventListener('resize', measure, false);
    };
  }, []);

  useEffect(
    function updateMeasurable() {
      measurableRef.current = ref?.current;
    },
    [ref?.current],
  );

  useEffect(
    function publishChanges() {
      onWidthChange?.({ width: width, ref: measurableRef });
    },
    [width, onWidthChange, measurableRef],
  );

  return { width };
}

export default useWidth;
