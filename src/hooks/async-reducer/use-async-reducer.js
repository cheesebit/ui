import React from 'react';

import { isFunction } from '../../common/toolset';

/**
 * Applies thunk approach to default React's `useReducer`.
 * In a nutshell, you can dispatcher either action object or function, which receives
 * as argument the dispatch.
 * @param {function} reducer
 * @param {*} initializerArg
 * @param {function} initializer
 */
export default function useAsyncReducer(reducer, initializerArg, initializer) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initializerArg,
    initializer,
  );

  const dispatcher = React.useRef(function thunkenize(action) {
    if (isFunction(action)) {
      return action(dispatch);
    }

    return dispatch(action);
  });

  return [state, dispatcher.current];
}
