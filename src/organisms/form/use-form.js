import React from 'react';
import { DEFAULT } from '../../common/constants';
import { validate } from './validator';
import { identity, set } from '../../common/toolset';
import logger from '../../common/logger';

/**
 * Custom React hook to manage form fields.
 * It allows one to define a validation schema based on custom or predefined validators.
 * @param {object} valuesProp - values to be managed by the form hook.
 * @param {object} schema - Validation schema for the given values.
 */
export function useForm(valuesProp, schema) {
  const dispatcher = React.useRef(identity);

  const [values, dispatch] = React.useReducer(function reducer(state, action) {
    const { type, payload } = action;
    const safePayload = payload || DEFAULT.OBJECT;

    switch (type) {
      case 'reset': {
        return {
          ...state,
          ...safePayload,
        };
      }
      case 'validate': {
        // (async () => {
        //   await validate(state, safeID, schema[safeID]);
        // })();

        // TODO: dispatch run validation for all fields

        return state;
      }
      case 'field.set': {
        const {
          id,
          name,
          value,
          validate: shouldValidate = false,
        } = safePayload;
        const safeID = name || id;

        logger.debug('field.set', safeID, ' = ', value);
        const newState = set(
          {
            ...state,
          },
          safeID,
          value,
        );

        if (shouldValidate) {
          logger.debug('field.set', 'validation started');

          // (async () => {
          //   await validate(newState, safeID, schema[safeID]);
          // })();

          // TODO: dispatch run validation for specific field

          logger.debug('field.set', 'validation finished');
        }

        logger.debug('field.set', 'returning');

        return newState;
      }
      default:
        return state;
    }
  }, valuesProp || {});

  React.useEffect(() => {
    dispatcher.current = function (type, payload) {
      dispatch({
        type,
        payload,
      });
    };
  }, []);

  return { values, dispatch: dispatcher.current };
}

export function useField(fieldName) {
  const { values, dispatch } = React.useContext(FormContext.Consumer);

  React.useEffect(function init() {
    dispatch.current = function createFieldDispatcher(type, payload) {
      if (['field.reset', 'field.set', 'field.validate'].includes(type)) {
        dispatchProp({
          type,
          payload,
        });
      }
    };
  }, []);

  return [values[fieldName], dispatch.current];
}
