import React from 'react';

import { DEFAULT } from 'common/constants';
import { useAsyncReducer } from 'hooks/async-reducer';
import { validate } from './validator';
import logger from 'common/logger';
import { debounce } from 'common/toolset';

/**
 * useValidation hook
 *
 * @param {Object} schema - Validation schema
 * @return {ValidationSetup} Object with validation status and validation dispatcher.
 */
function useValidation( schema ) {
	const safeSchema = schema || DEFAULT.OBJECT;

	const [ status, dispatch ] = useAsyncReducer( function reducer( state, action ) {
		const { type, payload } = action;

		const safePayload = payload || DEFAULT.OBJECT;

		switch ( type ) {
			case 'validate':
			case 'field.validate': {
				const { status } = safePayload;

				return {
					...state,
					...status,
				};
			}

			default:
				return state;
		}
	}, {} );

	const dispatcher = React.useCallback( async function( type, payload ) {
		const safePayload = payload || DEFAULT.OBJECT;
		const { id, values } = safePayload;

		dispatch( async ( innerDispatch ) => {
			switch ( type ) {
				case 'validate': {
					const newStatus = await validate( values, safeSchema );
					innerDispatch( {
						type,
						payload: { status: newStatus },
					} );

					break;
				}

				case 'field.validate': {
					const newStatus = await validate( values, { [ id ]: safeSchema[ id ] } );
					innerDispatch( {
						type,
						payload: { id, status: newStatus },
					} );

					break;
				}
			}
		} );
	}, [ dispatch ] );

	logger.debug( 'use-validation', status );
	return { status, dispatch: dispatcher };
}

export default useValidation;

/**
 * @callback DispatchValidation
 * @param {string} type - Operation type (accepts `validate`, `field.validate`) .
 * @param {Object} payload - Additional parameters to the desired operation.
 */

/**
 * @typedef {Object} ValidationSetup
 * @property {Object} status - Object containing validation status.
 * @property {DispatchValidation} dispatch - Validation dispatcher.
 */
