import React from 'react';
import clsx from 'clsx';

import { debounce } from '../../common/toolset';
import logger from '../../common/logger';
import { useAutomaton } from '../automaton';
import { useTimeout } from '../timeout';

const STATES = {
  out: {
    on: {
      enter: 'entering',
    },
  },
  exiting: {
    on: {
      exited: 'out',
    },
  },
  in: {
    on: {
      exit: 'exiting',
    },
  },
  entering: {
    on: {
      entered: 'in',
      exit: 'exiting',
    },
  },
};

function useAnimation(phases, initialTarget) {
  const [timeoutID, setTimeoutID] = React.useState(null);
  const [target, setTarget] = React.useState(initialTarget);
  const { transition, current } = useAutomaton(STATES, 'out');

  const handleAnimationEnd = React.useCallback(() => {
    if (current === 'entering') {
      transition('entered');
    } else if (current === 'exiting') {
      transition('exited');
    }
  }, [current]);

  const handleMouseEnter = React.useCallback(() => {
    clearTimeout(timeoutID);

    const newTimeoutID = setTimeout(() => {
      transition('enter');
    }, 250);

    setTimeoutID(newTimeoutID);
  });

  const handleMouseLeave = React.useCallback(() => {
    clearTimeout(timeoutID);

    const newTimeoutID = setTimeout(() => {
      transition('exit');
    }, 150);

    setTimeoutID(newTimeoutID);
  });

  React.useEffect(() => {
    target?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      target?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [target, handleAnimationEnd]);

  return {
    setTarget,
    transition,
    current,
    onEnter: handleMouseEnter,
    onExit: handleMouseLeave,
    className: clsx({
      [phases['entering']]: current === 'entering',
      [phases['in']]: current === 'in',
      [phases['exiting']]: current === 'exiting',
      [phases['out']]: current === 'out',
    }),
  };
}

export default useAnimation;
