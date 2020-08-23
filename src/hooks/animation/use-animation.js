import React from 'react';
import clsx from 'clsx';

import { useAutomaton } from '../automaton';

const STATES = {
  out: {
    on: {
      enter: 'in',
    },
  },
  in: {
    on: {
      exit: 'out',
    },
  },
};

function useAnimation(phases, initialTarget) {
  const [timeoutID, setTimeoutID] = React.useState(null);
  const { transition, current } = useAutomaton(STATES, 'out');

  const handleMouseEnter = React.useCallback(() => {
    if (current === 'in') {
      clearTimeout(timeoutID);
      setTimeoutID(null);
    }

    const newTimeoutID = setTimeout(() => {
      transition('enter');
    }, 250);

    setTimeoutID(newTimeoutID);
  });

  const handleMouseLeave = React.useCallback(() => {
    setTimeoutID(null);
    clearTimeout(timeoutID);

    const newTimeoutID = setTimeout(() => {
      transition('exit');
    }, 500);

    setTimeoutID(newTimeoutID);
  });

  return {
    transition,
    current,
    onEnter: handleMouseEnter,
    onExit: handleMouseLeave,
    className: clsx({
      // [phases['entering']]: current === 'entering',
      [phases['in']]: current === 'in',
      // [phases['exiting']]: current === 'exiting',
      [phases['out']]: current === 'out',
    }),
  };
}

export default useAnimation;
