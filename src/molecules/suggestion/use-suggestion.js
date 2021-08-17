import { useRef, useState } from 'react';

import { to, debounce } from 'common/toolset';
import { useUnmounted } from 'hooks/unmounted';
import { DEFAULT } from 'common/constants';

export const MIN_QUERY_LENGTH = 3;

export const QueryStatus = {
	IDLE: 'idle',
	QUERYING: 'querying',
	PARTIALLY_DONE: 'partially_done',
	DONE: 'done',
};

/**
 * getData
 *
 * @param {Function[]} datasources
 * @param {string} query
 */
async function* getData( datasources, query ) {
	for ( const ds of datasources ) {
		const [ error, data ] = await to( Promise.resolve( ds.fetch( { query } ) ) );

		if ( ! error ) {
			const items = ( data || [] ).map( ( item ) => ( {
				value: ds.adapter.getID( item ),
				label: ds.adapter.getLabel( item ),
			} ) );

			yield items;
		}
	}
}

/**
 * useSuggestion
 *
 * @param {number} delay - milliseconds to wait before triggering datasources' fetches.
 * @param {Function[]} datasources - array of datasources
 */
function useSuggestion( delay = 450, ...datasources ) {
	const isUnmounted = useUnmounted();
	const datasourcesRef = useRef( datasources.map( ( ds ) => ds() ) );

	const [ status, setStatus ] = useState( QueryStatus.IDLE );
	const [ options, setOptions ] = useState( [] );

	function getDatasources() {
		return datasourcesRef.current;
	}

	const clear = useRef( function clear( { options } = {} ) {
		setStatus( QueryStatus.IDLE );
		setOptions( options || DEFAULT.ARRAY );
	} );

	const fetch = useRef(
		debounce( async function fetch( { query } ) {
			if ( isUnmounted() || ( query || '' ).length < MIN_QUERY_LENGTH ) {
				return;
			}

			setStatus( QueryStatus.QUERYING );
			clear.current();

			for await ( const items of getData( getDatasources(), query ) ) {
				setStatus( QueryStatus.PARTIALLY_DONE );
				setOptions( ( options ) => [ ...options, ...( items || [] ) ] );
			}

			if ( isUnmounted() ) {
				return;
			}

			setStatus( QueryStatus.DONE );
		}, delay ),
	);

	return { clear: clear.current, fetch: fetch.current, options, status };
}

export default useSuggestion;

/**
 * @typedef {Object} SuggestionItemAdapter
 * @property {Function} getID - Get item ID
 * @property {Function} getLabel - Get item label
 */

/**
 * @typedef {Object} SuggestionDatasource<T>
 * @property {SuggestionItemAdapter} adapter - Item adapter for this datasource
 * @property {Function} fetch - Get item label
 */

/**
 * @typedef {Object} SuggestionOption
 * @property {string} label - Option label
 * @property {string | number} value - Option unique value
 */
