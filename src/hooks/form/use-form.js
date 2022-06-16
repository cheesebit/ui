import React from 'react';

import { DEFAULT } from 'common/constants';
import { isBlank, set } from 'common/toolset';
import { useValidation } from '../validation';
import logger from 'common/logger';

/**
 * Custom React hook to manage form fields.
 * It allows one to define a validation schema based on custom or predefined validators.
 *
 * @param {Object} valuesProp - values to be managed by the form hook.
 * @param {Object} schema - Validation schema for the given values.
 */
export function useForm( valuesProp, schema ) {
	const { status, dispatch: dispatchValidate } = useValidation( schema );

	/**
	 *
	 * @param {FormState} state
	 * @param {FormAction} action
	 * @return {FormState} new state
	 */
	function reducer( state, action ) {
		// TODO: investigate why it is not identifying the payload
		// @ts-ignore
		const { type, payload } = action;
		const safePayload = payload || DEFAULT.OBJECT;

		switch ( type ) {
			case 'reset':
				return state;
			case 'validate':
			case 'field.validate': {
				dispatchValidate( 'validate', {
					values: state,
				} );

				return state;
			}
			case 'field.set': {
				const { id, name, value, validate = false } = safePayload;
				const safeID = name || id;

				if ( isBlank( safeID ) ) {
					// TODO: throw error
					return state;
				}

				logger.debug( 'field.set', safeID, ' = ', value );
				const newState = set(
					{
						...state,
					},
					safeID,
					value
				);

				if ( validate ) {
					dispatchValidate( 'validate', {
						id: safeID,
						values: newState,
					} );
				}

				return newState;
			}
			default:
				return state;
		}
	}

	const [ values, dispatch ] = React.useReducer( reducer, valuesProp || {} );

	return { values, status, dispatch };
}

// export function useField( fieldName ) {
// 	const { values, dispatch } = React.useContext( FormContext.Consumer );

// 	React.useEffect( function init() {
// 		dispatch.current = function createFieldDispatcher( type, payload ) {
// 			if ( [ 'field.reset', 'field.set', 'field.validate' ].includes( type ) ) {
// 				dispatchProp( {
// 					type,
// 					payload,
// 				} );
// 			}
// 		};
// 	}, [] );

// 	return [ values[ fieldName ], dispatch.current ];
// }

/**
 * @typedef {Record<string, any>} FormState
 */

/**
 * @typedef {Object} SetFieldPayload
 * @property {string} [id] -
 * @property {string} [name] -
 * @property {any} value -
 * @property {boolean} validate -
 */

/**
 * @typedef {{ type: 'field.set'; payload: SetFieldPayload } | { type: 'reset'; payload: FormState } | { type: 'validate'; payload: never } | { type: 'field.validate'; payload: never}} FormAction
 */

/**
 * @typedef {React.Dispatch<FormAction>} FormDispatcher
 */
