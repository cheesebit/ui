import { useCallback, useEffect, useState } from 'react';

import { DEFAULT } from 'common/constants';
import { isEmpty } from 'common/toolset';

export const IS_MATCH_MEDIA_SUPPORTED = typeof window.matchMedia === 'function';

/**
 *
 * @param {Object} props - useMediaQuery props
 * @param {boolean} props.initial - Should run media queries on mount.
 * @param {Array} props.queries - Media queries to be executed.
 * @param {number} props.width - Current window width to be considered.
 * @param {Function} props.onQueryMatch - Callback function to run when a media query is matched.
 */
function useMediaQuery( { initial = false, queries, width = 0, onQueryMatch } ) {
	const [ currentQuery, setCurrentQuery ] = useState( null );

	function getQueries() {
		return queries || DEFAULT.ARRAY;
	}

	const executeQueries = useCallback( function executeQueries() {
		const queries = getQueries();

		if ( ! IS_MATCH_MEDIA_SUPPORTED || isEmpty( queries ) ) {
			return;
		}

		let newCurrentQuery = null;
		for ( let i = 0; i < queries.length && ! newCurrentQuery; i++ ) {
			const query = queries[ i ];

			if ( window.matchMedia( query ).matches ) {
				newCurrentQuery = query;
			}
		}

		if ( currentQuery !== newCurrentQuery ) {
			setCurrentQuery( newCurrentQuery );
		}
	}, [] );

	useEffect( function executeQueriesOnMount() {
		if ( ! initial ) {
			return;
		}

		executeQueries();
	}, [] );

	useEffect(
		function executeQueriesOnUpdate() {
			executeQueries();
		},
		[ width ],
	);

	useEffect(
		function publishChanges() {
			onQueryMatch?.( { query: currentQuery } );
		},
		[ currentQuery, onQueryMatch ],
	);

	return { currentQuery };
}

export default useMediaQuery;
