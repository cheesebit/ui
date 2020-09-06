import React from 'react';

function useSlice(name, initialState, reducers) {
  function getTypeName(type) {
    return `${name}/${type}`;
  }

  function initializeActions() {
    let actions = {};

    for (let type in reducers) {
      actions[type] = function createAction(payload) {
        return {
          type: getTypeName(type),
          payload,
        };
      };
      actions[type].type = type;
    }

    return actions;
  }

  function initializeReducers() {
    let reducersByActionType = {};

    for (let type in reducers) {
      reducersByActionType[getTypeName(type)] = reducers[type];
    }

    return reducersByActionType;
  }

  function reducer(state, action) {
    const reducerByActionType = reducersByActionType.current[action.type];

    if (reducerByActionType != null) {
      return reducerByActionType(state, action);
    }

    return state;
  }

  const actions = React.useRef(initializeActions());
  const reducersByActionType = React.useRef(initializeReducers());

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return {
    actions: actions.current,
    dispatch,
    state,
  };
}

function useDate(initialDate) {
  const { state, actions, dispatch } = useSlice('date', initialDate, {
    incrementDay(state, action) {
      const { payload = 1 } = action;

      const newDate = new Date(state.year, state.month, state.day + payload);

      return {
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      };
    },
    incrementMonth(state, action) {
      const { payload = 1 } = action;

      const newDate = new Date(state.year, state.month + payload, state.day);

      return {
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      };
    },
    incrementYear(state, action) {
      const { payload = 1 } = action;

      const newDate = new Date(state.year + payload, state.month, state.day);

      return {
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      };
    },
    decrementDay(state, action) {
      const { payload = 1 } = action;

      const newDate = new Date(state.year, state.month, state.day - payload);

      return {
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      };
    },
    decrementMonth(state, action) {
      const { payload = 1 } = action;

      const newDate = new Date(state.year, state.month - payload, state.day);

      return {
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      };
    },
    decrementYear(state, action) {
      const { payload = 1 } = action;

      const newDate = new Date(state.year - payload, state.month, state.day);

      return {
        day: newDate.getDate(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      };
    },
  });

  console.log('use date', state, actions);

  return {
    date: state,
    actions,
    dispatch,
  };
}

export default useDate;
