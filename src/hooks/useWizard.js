import React from 'react';

import { DEFAULT } from '../common/constants';
import { isNil, getID } from '../common/toolset';

function getReducer(flow) {
  return function reducer(state, action) {
    const { on } = flow?.[state.active] ?? DEFAULT.OBJECT;

    if (isNil(on)) {
      throw new Error(`${state.active} does not have transitions.`);
    }

    const newActive = on[action];

    return {
      // we keep in the current active as fallback
      active: newActive || state.active,
    };
  };
}

const useWizard = ({ current: active, id, flow }) => {
  const [contextValue, setContextValue] = React.useState({});
  const [state, dispatch] = React.useReducer(getReducer(flow || {}), {
    active,
  });

  React.useEffect(() => {
    setContextValue({
      id: getID(id),
      transition: dispatch,
    });
  }, [state]);

  return {
    transition: dispatch,
    states: flow?.[state.active]?.on,
    active: state.active,
    contextValue,
  };
};

export default useWizard;
