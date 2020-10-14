import React from 'react';
import { DEFAULT } from '../../common/constants';
import { validate } from './validator';

/**
 *
 * @param {object} values - values to be managed by the form hook.
 * @param {object} schema - Validation schema for the given values.
 */
export function useForm(valuesProp, schema) {
  const [values, dispatch] = React.useReducer(function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
      case 'reset':
        {
          return {
            ...state,
            ...(payload || DEFAULT.OBJECT),
          };
        }
        break;
      // case 'validate':
      //   {
      //   }
      //   break;
      // case 'submit':
      //   {
      //   }
      //   break;
      // case 'field.validate':
      //   {
      //   }
      //   break;
      case 'field.set':
        {
          const { id, name, value } = payload || DEFAULT.OBJECT;
          const safeID = name || id;
          const newState = {
            ...state,
            [safeID]: value,
          };

          (async () => {
            await validate(newState, safeID, schema[safeID]);
          })();

          return newState;
        }
        break;
      default:
        return state;
    }
  }, valuesProp || {});

  return [values, dispatch];
}

export function useField(fieldName) {
  const { values = {}, dispatch: dispatchProp = a => a } =
    React.useContext(FormContext.Consumer) || {};
  const dispatch = React.useRef();

  React.useEffect(function init() {
    dispatch.current = function batata(type, payload) {
      if (!['field.reset', 'field.set', 'field.validate'].includes(type)) {
        dispatchProp({
          type,
          payload,
        });
      }
    };
  }, []);

  return [values[fieldName], dispatch.current];
}
