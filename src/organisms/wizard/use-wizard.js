import React from 'react';

import { getID } from '../../common/toolset';
import { useAutomaton } from '../../hooks/automaton';

const useWizard = ({ current: initialCurrent, id, flow }) => {
  const { current, transition } = useAutomaton(flow, initialCurrent);
  const [contextValue, setContextValue] = React.useState({});

  React.useEffect(() => {
    setContextValue({
      transition,
      id: getID(id),
    });
  }, [id, current]);

  return {
    transition,
    states: flow[current]?.on,
    current,
    contextValue,
  };
};

export default useWizard;
