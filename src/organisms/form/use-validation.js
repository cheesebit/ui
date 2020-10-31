import React from 'react';

import { DEFAULT } from '../../common/constants';
import { mandatory } from '../../common/toolset';
import { useAsyncReducer } from '../../hooks/async-reducer';
import { validate } from './validator';
import logger from '../../common/logger';

/**
 * useValidation hook
 * @param {object} schema - Validation schema
 * @returns {ValidationSetup}
 */
export default function useValidation(schema) {
  const safeSchema = schema || mandatory('Schema is required');

  const [status, dispatch] = useAsyncReducer(function reducer(state, action) {
    const { type, payload } = action;
    const safePayload = payload || DEFAULT.OBJECT;
    const { status } = safePayload;

    switch (type) {
      case 'validate':
      case 'field.validate': {
        return {
          ...state,
          ...status,
        };
      }

      default:
        return state;
    }
  }, {});

  const dispatcher = React.useRef(async function (type, payload) {
    const safePayload = payload || DEFAULT.OBJECT;
    const { id, values } = safePayload;

    dispatch(async innerDispatch => {
      switch (type) {
        case 'validate': {
          const newStatus = await validate(values, safeSchema);
          innerDispatch({
            type,
            payload: { status: newStatus },
          });

          break;
        }

        case 'field.validate': {
          const newStatus = await validate(values, { [id]: safeSchema[id] });
          innerDispatch({
            type,
            payload: { id, status: newStatus },
          });

          break;
        }
      }
    });
  });

  logger.debug('use-validation', status);
  return { status, dispatch: dispatcher.current };
}

/**
 * @callback DispatchValidation
 * @param {string} type - Operation type (accepts `validate`, `field.validate`) .
 * @param {Object} payload - Additional parameters to the desired operation.
 */

/**
 * @typedef {Object} ValidationSetup
 * @property {object} status - Object containing validation status.
 * @property {DispatchValidation} dispatch - Validation dispatcher.
 */
