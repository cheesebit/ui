import React from 'react';
import { useValue } from '@cheesebit/use-value';

import { Button } from 'atoms/button';
import { DataManager } from 'common/data-manager/';
import { DEFAULT } from 'common/constants';
import { useDropdown } from '../dropdown/dropdown';
import { equals, isFunction, omit, getID, isEmpty, keys, toArray, to, debounce } from 'common/toolset';
import { getUpdateID, toValue } from './select.helpers';
import { getValueFromEvent } from 'common/ui-toolset';
import { Icon } from 'atoms/icon';
import { Input } from 'atoms/input';
import { Mode } from 'common/attribute-manager';
import { useUnmounted } from 'hooks/unmounted';
import Option from './select-option';
import Selectors from './selectors';
import adapter from './adapter';

export const [ SELECTED, VISIBLE ] = [ 'selected', 'visible' ];
export const MIN_QUERY_LENGTH = 3;

/**
 * getData
 *
 * @param {SuggestionDatasource[]} datasources
 * @param {string} query
 */
async function* getData( datasources, query ) {
	const regex = new RegExp( query, 'i' );

	console.log( 'wms', 'datasources', datasources );
	for ( const ds of datasources ) {
		const [ error, data ] = await to( Promise.resolve( ds.fetch( { query, regex } ) ) );

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
 * @constant
 * @type {QueryStatus}
 */
const INITIAL_QUERY_STATUS = 'idle';

/**
 * useSelect
 *
 * @param {Object} props
 * @param {number} props.delay - milliseconds to wait before triggering datasources' fetches.
 * @param {SuggestionDatasource[]} props.datasources - array of datasources
 */
function useSelect( props ) {
	const { delay = 450 } = props;
	const { expanded, toggle } = useDropdown( props );

	const datasources = React.useRef( props.datasources.map( ( ds ) => ds() ) );
	const manager = React.useMemo(
		() =>
			new DataManager( {
				adapter,
				attributes: {
					selected: Selectors.getMode( props ),
					visible: Mode.path,
				},
				data: [],
			} ),
		[],
	);

	const query = useValue( props.query || '' );
	const status = useValue( INITIAL_QUERY_STATUS );
	const options = useValue( [] );
	const value = useValue( [] );

	function getDatasources() {
		return datasources.current;
	}

	function getSelected() {
		const getNode = ( id ) => manager.getNode( id )?.node;

		const ids = keys( manager.getAttribute( SELECTED ) );
		const nodes = ids.map( getNode );

		return nodes;
	}

	function select( option ) {
		manager.set( SELECTED, option.value, true );

		const selected = getSelected();
		query( toValue( selected, adapter ) );
		value( selected );
		// options( toArray( props.options ) );
	}

	function clear( ) {
		status( 'idle' );
		options( DEFAULT.ARRAY );
	}

	const fetch = React.useRef(
		debounce( async function fetch( { query } ) {
			if ( query.length < MIN_QUERY_LENGTH ) {
				return;
			}

			clear();
			status( 'querying' );
			expanded( true );

			for await ( const items of getData( getDatasources(), query ) ) {
				options( ( currentOptions ) => [ ...currentOptions, ...( items || [] ) ] );
			}

			status( 'idle' );
		}, delay ),
	);

	return {
		expanded,
		toggle,
		fetch: fetch.current,
		query,
		value,
		select,
		options: options(),
		/** @type {QueryStatus} */
		status: status(),
	};
}

export default useSelect;

/**
 * @typedef {import('./adapter').SelectAdapter} SelectAdapter
 */

/**
 * @typedef {('idle' | 'querying')} QueryStatus
 */

/**
 * @typedef {Object} SuggestionDatasource
 * @property {SelectAdapter} adapter - Item adapter for this datasource
 * @property {Function} fetch - Get item label
 */

/**
 * @typedef {Object} SuggestionOption
 * @property {string} label - Option label
 * @property {string | number} value - Option unique value
 */
