import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { DataManager } from 'common/data-manager/';
import { DEFAULT } from 'common/constants';
import { Dropdown } from '../dropdown';
import { equals, isFunction, omit, getID, isEmpty, keys, toArray } from 'common/toolset';
import { getUpdateID, toValue } from './select.helpers';
import { getValueFromEvent } from 'common/ui-toolset';
import { Icon } from 'atoms/icon';
import { Input } from 'atoms/input';
import { Mode } from 'common/attribute-manager';
import { useValue } from 'hooks/value';
import Option from './select-option';
import Selectors from './selectors';

const [ SELECTED, VISIBLE ] = [ 'selected', 'visible' ];
const OMITTED_PROPS = [ 'adapter', 'options', 'placeholder' ];

function Select( props ) {
	const adapter = React.useMemo( () => Selectors.getAdapter( props ), [] );
	const options = useValue( toArray( props.options ) );
	const manager = React.useMemo(
		() =>
			new DataManager( {
				adapter,
				attributes: {
					selected: props.multiple ? Mode.propagate : Mode.unique,
					visible: Mode.path,
				},
				data: options(),
			} ),
		[],
	);

	const query = useValue( props.query || '' );
	const value = useValue( Selectors.getValue( { adapter, value: props.value } ) );

	function getSelected() {
		const getNode = ( id ) => manager.getNode( id )?.node;

		const ids = keys( manager.getAttribute( SELECTED ) );
		const nodes = ids.map( getNode );

		return nodes;
	}

	function renderToggle( { disabled, collapsed, onClick } ) {
		return (
			<Input
				data-testid="toggle"
				disabled={ disabled }
				placeholder={ props.placeholder || 'Search or select' }
				value={ query() || '' }
				trailing={ <Icon className={ clsx( { 'cb-u-rotate-180': ! collapsed() } ) } name="expand-more" size={ 16 } /> }
				onFocus={ onClick }
				onChange={ function handleChange( e ) {
					const newValue = getValueFromEvent( e );

					query( newValue );
					const regex = new RegExp( newValue, 'i' );
					options( toArray( props.options ).filter( ( option ) => regex.test( adapter.getLabel( option ) ) ) );
				} }
				onBlur={ function handleBlur( ) {
					/**
					 * TODO: Know issue: If have a value selected, you clear the search input and
					 * tab to the first option, the value is reloaded to the input.
					 */
					query( toValue( getSelected(), adapter ) );
				} }
			/>
		);
	}

	function renderOptions() {
		return options().map( function renderOption( option ) {
			const id = adapter.getID( option );

			return (
				<Option
					key={ id }
					className={ clsx( {
						'is-highlighted': Boolean( manager.getAttributeByNodeID( SELECTED, id ) ),
					} ) }
					{ ...option }
					onClick={ function handleSelect( option ) {
						manager.set( SELECTED, option.value, true );

						query( toValue( getSelected(), adapter ) );
						value( getSelected() );
						options( toArray( props.options ) );
					} }
					value={ id }
				>
					{ adapter.getLabel( option ) }
				</Option>
			);
		} );
	}

	return (
		<Dropdown
			data-testid="cb-select"
			{ ...omit( OMITTED_PROPS, props ) }
			className={ clsx( 'cb-select', props.className ) }
			toggle={ renderToggle }
		>
			<Dropdown.Items hoverable data-testid="options">
				  { renderOptions() }
			</Dropdown.Items>
		</Dropdown>
	);
}

Select.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
			value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
		} ),
	).isRequired,
	placeholder: PropTypes.string,
};

Select.defaultProps = {
	id: getID(),
	value: null,
	placeholder: 'Select',
	unroll: 'block',
};

Select.Items = Dropdown.Items;
Select.Item = Dropdown.Item;
Select.Toggle = Dropdown.Toggle;

export default Select;
