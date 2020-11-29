import React from 'react';
import clsx from 'clsx';

import { useAutomaton } from '@cheesebit/use-automaton';

const DEFAULT_STATES = {
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

const DEFAULT_CLASSES = {
  out: 'animate-out',
  in: 'animate-in',
};

function useAnimation(states, classes, currentProp = 'out') {
  const [timeoutID, setTimeoutID] = React.useState(null);
  const { transition, current } = useAutomaton(
    states || DEFAULT_STATES,
    currentProp,
  );
  const safeClasses = classes || DEFAULT_CLASSES;

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
      [safeClasses['entering']]: current == 'entering',
      [safeClasses['in']]: current == 'in',
      [safeClasses['exiting']]: current == 'exiting',
      [safeClasses['out']]: current == 'out',
    }),
  };
}

export default useAnimation;
