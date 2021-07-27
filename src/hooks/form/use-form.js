import React from 'react';

import { DEFAULT } from 'common/constants';
import { set } from 'common/toolset';
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

	const [ values, dispatch ] = React.useReducer( function reducer( state, action ) {
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

				logger.debug( 'field.set', safeID, ' = ', value );
				const newState = set(
					{
						...state,
					},
					safeID,
					value,
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
	}, valuesProp || {} );

	const dispatcher = React.useRef( function( type, payload ) {
		dispatch( {
			type,
			payload,
		} );
	} );

	return { values, status, dispatch: dispatcher.current };
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
