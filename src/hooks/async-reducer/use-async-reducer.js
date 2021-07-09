import React from 'react';

import { isFunction } from '../../common/toolset';

/**
 * Applies thunk approach to default React's `useReducer`.
 * In a nutshell, you can dispatcher either action object or function, which receives
 * as argument the dispatch.
 *
 * @param {Function} reducer
 * @param {*} initializerArg
 * @param {Function} initializer
 */
export default function useAsyncReducer( reducer, initializerArg, initializer ) {
	const [ state, dispatch ] = React.useReducer(
		reducer,
		initializerArg,
		initializer,
	);

	function thunkenize( action ) {
		if ( isFunction( action ) ) {
			action( dispatch );
			return;
		}

		dispatch( action );
	}

	return [ state, thunkenize ];
}
