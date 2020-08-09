import React from 'react';

import { DEFAULT } from '../../common/constants';
import { isNil } from '../../common/toolset';
import logger from '../../common/logger';

function getReducer(states) {
  return React.useCallback(function reducer(current, input) {
    const { on } = states[current] ?? DEFAULT.OBJECT;

    if (isNil(on)) {
      logger.error(`${current} does not have any transition for ${input}.`);
    }

    // we keep in the current as fallback
    const newCurrent = on?.[input] || current;

    logger.debug(
      '[use-automaton]',
      'transition',
      current,
      `→ (${input}) →`,
      'to',
      on?.[input],
    );

    return newCurrent;
  }, []);
}

function useAutomaton(states, initialCurrent) {
  const reducerRef = React.useRef(getReducer(states || DEFAULT.OBJECT));
  const [current, dispatch] = React.useReducer(
    reducerRef.current,
    initialCurrent,
  );

  return {
    current,
    transition: dispatch,
  };
}

export default useAutomaton;
