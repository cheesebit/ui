import React from 'react';

/**
 * Applies thunk approach to default React's `useReducer`.
 * In a nutshell, you can dispatcher either action object or function, which receives
 * as argument the dispatch.
 *
 * @template S, A
 * @param {React.Reducer<S, A>} reducer
 * @param {S} initializerArg
 * @param {(arg: any) => S} [initializer]
 * @return {[S, (action: A | ((dispatch: (value: A) => void) => void)) => void]}
 */
export default function useAsyncReducer(
	reducer,
	initializerArg,
	initializer
) {
	const [ state, dispatch ] = React.useReducer(
		reducer,
		initializerArg,
		initializer
	);

	/**
	 *
	 * @param {A | ((dispatch: (value: A) => void) => void)} action
	 * @returns
	 */
	function thunkenize( action ) {
		if ( action instanceof Function ) {
			action( dispatch );
			return;
		}

		dispatch( action );
	}

	return [ state, thunkenize ];
}
