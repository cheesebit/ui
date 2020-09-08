import { useSlice } from '@cheesebit/use-slice';
import logger from '../../common/logger';

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

  logger.debug('use date', state, actions);

  return {
    date: state,
    actions,
    dispatch,
  };
}

export default useDate;
