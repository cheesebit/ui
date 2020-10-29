import { DEFAULT } from '../../common/constants';
import { useSlice } from '@cheesebit/use-slice';
import logger from '../../common/logger';
import {
  getComparable,
  getYear,
  getMonth,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from '../../common/date/date-utils';

// TODO change initialDate to be CheesebitDate and use its operation in the actions

/**
 * Hook to handle date operations
 * @param {Date} initialDate - Date object to be managed
 */
function useDate(initialDate) {
  const { state, actions, dispatch } = useSlice('date', initialDate, {
    add(state, action) {
      const { payload } = action;
      const [arg1, arg2] = payload ?? DEFAULT.ARRAY;
      let increment = Object.create(null);

      // TODO: improve this type check
      if (typeof arg1 == 'object') {
        // TODO: validate `time`
        increment = {
          ...arg1,
        };
      } else {
        const time = arg2;
        const amount = arg1;

        // TODO: validate `time`
        increment = {
          [time]: amount,
        };
      }

      // TODO: add object support to allow operation like add({days:7,months:1})
      const newDate = new Date(
        getYear(state) + (increment.years || increment.year || 0),
        getMonth(state) + (increment.months || increment.month || 0),
        getDay(state) + (increment.days || increment.day || 0),
      );

      return newDate;
    },
    subtract(state, action) {
      const { payload } = action;
      const [arg1, arg2] = payload ?? DEFAULT.ARRAY;
      let decrement = Object.create(null);

      // TODO: improve this type check
      if (typeof arg1 == 'object') {
        // TODO: validate `time`
        decrement = {
          ...arg1,
        };
      } else {
        const time = arg2;
        const amount = arg1;

        // TODO: validate `time`
        decrement = {
          [time]: amount,
        };
      }

      // TODO: add object support to allow operation like add({days:7,months:1})
      const newDate = new Date(
        getYear(state) - (decrement.years || decrement.year || 0),
        getMonth(state) - (decrement.months || decrement.month || 0),
        getDay(state) - (decrement.days || decrement.day || 0),
      );

      return newDate;
    },
    set(state, action) {
      const { payload } = action;
      const [params] = payload ?? DEFAULT.ARRAY;

      if (params instanceof Date) {
        return params;
      }

      // TODO: add object support to allow operation like add({days:7,months:1})
      const newDate = new Date(
        params.year || getYear(state),
        params.month || getMonth(state),
        params.day || getDay(state),
      );

      return newDate;
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
