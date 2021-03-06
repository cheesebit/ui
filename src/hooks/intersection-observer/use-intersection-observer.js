import React from 'react';

import { isFunction, mandatory } from '../../common/toolset';

/**
 * Applies thunk approach to default React's `useReducer`.
 * In a nutshell, you can dispatcher either action object or function, which receives
 * as argument the dispatch.
 * @param {React.MutableRefObject} imageRef - Image element to be observed.
 * @param {IntersectionHandler} onIntersect - Callback handler for when the image is intersecting the current viewport.
 * @returns {React.MutableRefObject} Reference to the IntersectionObserver.
 */
export default function useIntersectionObserver(
  imageRef = mandatory('imageRef is required'),
  onIntersect = mandatory('onIntersect is required'),
) {
  const observerRef = React.useRef();

  function handleIntersection(entries) {
    const found = entries.find(entry => {
      const { target } = entry;
      return target === this.image.current;
    });

    if (!found || !found.isIntersecting) {
      return;
    }

    onIntersect?.(observerRef.current);
  }

  React.useEffect(function initObserve() {
    observerRef.current = new IntersectionObserver(handleIntersection);

    observerRef.current.observe(imageRef.current);

    return function cleanObserver() {
      observerRef.current?.disconnect();
    };
  }, []);

  return observerRef;
}

/**
 * @callback IntersectionHandler
 * @param {IntersectionObserver} observer - IntersectionObserver object.
 */
