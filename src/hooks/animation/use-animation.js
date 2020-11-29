import React from 'react';
import clsx from 'clsx';

import { useAutomaton } from '@cheesebit/use-automaton';
import { DEFAULT } from '../../common/constants';

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

function useAnimation(phases) {
  const [timeoutID, setTimeoutID] = React.useState(null);
  const { transition, current } = useAutomaton(STATES, 'out');
  const safePhases = phases || DEFAULT.OBJECT;

  // TODO: Clear timeout when mouse reenters during exit timeout
  // TODO: Create a more generic way to manage animation

  const handleMouseEnter = React.useCallback(() => {
    if (current === 'in') {
      clearTimeout(timeoutID);
      return;
    }

    const newTimeoutID = setTimeout(() => {
      transition('enter');
    }, 250);

    setTimeoutID(newTimeoutID);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    clearTimeout(timeoutID);

    const newTimeoutID = setTimeout(() => {
      transition('exit');
    }, 1000);

    setTimeoutID(newTimeoutID);
  }, []);

  return {
    transition,
    current,
    onEnter: handleMouseEnter,
    onExit: handleMouseLeave,
    className: clsx({
      [safePhases['entering']]: current == 'entering',
      [safePhases['in']]: current == 'in',
      [safePhases['exiting']]: current == 'exiting',
      [safePhases['out']]: current == 'out',
    }),
  };
}

export default useAnimation;
