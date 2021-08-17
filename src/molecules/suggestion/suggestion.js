import React, { useCallback, useState, ChangeEvent } from 'react';
import clsx from 'clsx';

import { isBlank } from 'common/toolset';
import { Input } from 'atoms/input';
import { Select } from '../select';

import useSuggestion from './use-suggestion';

import './suggestion.scss';

function Suggestion( { className, delay = 450, datasources = [] } ) {
	const { clear, fetch, options, status } = useSuggestion(
		delay,
		...datasources,
	);

	const [ , setCollapsed ] = useState( false );
	const [ query, setQuery ] = useState( '' );

	/**
	 * @function handleChange
	 * @param {ChangeEvent<HTMLInputElement>} e - event
	 */
	const handleChange = useCallback(
		function handleChange( e ) {
			const {
				target: { value },
			} = e;

			setQuery( value );

			if ( isBlank( value ) ) {
				setCollapsed( true );
			} else {
				clear();
				setCollapsed( false );
				fetch( { query: value } );
			}
		},
		[ clear, fetch ],
	);

	return (
		<div className={ clsx( 'cb-suggestion', className ) }>
			<Input value={ query } onChange={ handleChange } />
			<Select options={ options } expanded={ status !== 'done' } />
			{ JSON.stringify( options ) }
		</div>
	);
}

export default Suggestion;
