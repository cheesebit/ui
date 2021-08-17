import React from 'react';
import PropTypes from 'prop-types';
import { useValue } from '@cheesebit/use-value';
import { useClassy } from '@cheesebit/classy';

import { Button } from 'atoms/button';
import { GenericDropdown } from '../dropdown/dropdown';
import { getValueFromEvent } from 'common/ui-toolset';
import { Icon } from 'atoms/icon';
import { Input } from 'atoms/input';
import { Empty } from 'atoms/empty';
import { Spinner } from 'atoms/spinner';
import { isEmpty, omit, getID } from 'common/toolset';
import Option from './select-option';
import useSelect from './use-select';

const OMITTED_PROPS = [ 'adapter', 'options', 'placeholder' ];

/**
 * Select component.
 *
 * @param {Object} props
 * @param {SuggestionDatasource[]} props.datasources
 * @return {JSX.Element} Select element
 */
function Select( props ) {
	const { disabled } = props;
	const { classy } = useClassy( props );

	// useOptions();
	const {
		expanded,
		fetch,
		options,
		query,
		select,
		status,
		toggle,
	} = useSelect( props );

	function renderTrigger() {
		return (
			<Input
				data-testid="trigger"
				disabled={ disabled }
				placeholder={ props.placeholder }
				value={ query() }
				trailing={
					<>
						{ query() ? (
							<Button
								aria-hidden="true"
								size="small"
								emphasis="text"
								tabIndex="-1"
								onClick={ () => {} }
								busy={ status === 'querying' }
							>
								<Icon name="close" />
							</Button>
						) : (
							<Button
								aria-hidden="true"
								size="small"
								emphasis="text"
								tabIndex="-1"
								onClick={ () => {} }
								busy={ status === 'querying' }
							>
								<Icon className={ classy( { 'cb-u-rotate-180': expanded() } ) } name="expand-more" />
							</Button>
						) }
					</>
				}
				onChange={ function handleChange( e ) {
					const newValue = getValueFromEvent( e );

					query( newValue );
					fetch( { query: newValue } );
					// const regex = new RegExp( newValue, 'i' );
					// options( toArray( props.options ).filter( ( option ) => regex.test( adapter.getLabel( option ) ) ) );
				} }
				onClick={ () => {
					console.log( 'user clicked toggle' );
					expanded( true );
				} }
				onFocus={ () => {
					console.log( 'user focused toggle' );
					// if ( ! isEmpty( options ) ) {
					// expanded( false );
					// }
					// getInput().select();
					// e.target.select(); // ????
				} }
			/>
		);
	}

	function renderOptions() {
		if ( isEmpty( options ) ) {
			return <Empty>{ status !== 'querying' ? 'No options available.' : 'Searching...' }</Empty>;
		}

		return options.map( function renderOption( option ) {
			const { value, label } = option;

			return (
				<Option
					key={ value }
					className={ classy( {
						'is-highlighted': false,
					} ) }
					{ ...option }
					onClick={ function handleSelect() {
						select( option );
					} }
					value={ value }
				>
					{ label }
				</Option>
			);
		} );
	}

	return (
		<GenericDropdown
			data-testid="cb-select"
			{ ...omit( OMITTED_PROPS, props ) }
			className={ classy( 'cb-select', props.className ) }
			expanded={ expanded }
			toggle={ toggle }
			trigger={ renderTrigger }
		>
			<GenericDropdown.Items hoverable data-testid="options">
				<Spinner appear={ status === 'querying' } />
				{ renderOptions() }
			</GenericDropdown.Items>
		</GenericDropdown>
	);
}

Select.propTypes = {
	// options: PropTypes.arrayOf(
	// 	PropTypes.shape( {
	// 		label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
	// 		value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
	// 	} ),
	// ),
	// placeholder: PropTypes.string,
};

Select.defaultProps = {
	id: getID(),
	value: null,
	placeholder: 'Search or select',
	unroll: 'block',
};

export default Select;

/**
 * @typedef {import("./use-select").SuggestionDatasource} SuggestionDatasource
 */

//  function Select( props ) {
// 	const query = useValue( props.query || '' );
// 	const {} = useSelect( props );

// 	function renderToggle( { disabled, expanded } ) {
// 		return (
// 			<Input
// 				data-testid="toggle"
// 				disabled={ disabled }
// 				placeholder={ props.placeholder }
// 				value={ query() || '' }
// 				trailing={
// 					<>
// 						{ query() ? <Button size="small" emphasis="text" onClick={ ( ) => {
// 							manager.reset( SELECTED );

// 							query( '' );
// 							value( getSelected() );
// 						} }>
// 							<Icon name="close" />
// 						</Button>
// 							: <Button size="small" emphasis="text" tabIndex="-1" onClick={ ( ) => {
// 								expanded( ( c ) => ! c );
// 							} }>
// 								<Icon className={ clsx( { 'cb-u-rotate-180': ! expanded() } ) } name="expand-more" />
// 							</Button> }
// 					</> }
// 				onChange={ function handleChange( e ) {
// 					const newValue = getValueFromEvent( e );

// 					query( newValue );
// 					const regex = new RegExp( newValue, 'i' );
// 					options( toArray( props.options ).filter( ( option ) => regex.test( adapter.getLabel( option ) ) ) );
// 				} }
// 				onFocus={ () => {
// 					expanded( false );
// 					// getInput().select();
// 					// e.target.select(); // ????
// 				} }

// 			/>
// 		);
// 	}

// 	function renderOptions() {
// 		return options().map( function renderOption( option ) {
// 			const id = adapter.getID( option );

// 			return (
// 				<Option
// 					key={ id }
// 					className={ clsx( {
// 						'is-highlighted': Boolean( manager.getAttributeByNodeID( SELECTED, id ) ),
// 					} ) }
// 					{ ...option }
// 					onClick={ function handleSelect( option ) {
// 						manager.set( SELECTED, option.value, true );

// 						query( toValue( getSelected(), adapter ) );
// 						value( getSelected() );
// 						options( toArray( props.options ) ); // reset any filter that may have been set
// 					} }
// 					value={ id }
// 				>
// 					{ adapter.getLabel( option ) }
// 				</Option>
// 			);
// 		} );
// 	}

// 	return (
// 		<Dropdown
// 			data-testid="cb-select"
// 			{ ...omit( OMITTED_PROPS, props ) }
// 			className={ clsx( 'cb-select', props.className ) }
// 			toggle={ renderToggle }
// 			onBlur={ function handleBlur( ) {
// 				/**
// 				 * TODO: Know issue: If have a value selected, you clear the search input and
// 				 * tab to the first option, the value is reloaded to the input.
// 				 */
// 				query( toValue( getSelected(), adapter ) );
// 			} }
// 		>
// 			<Dropdown.Items hoverable data-testid="options">
// 				  { renderOptions() }
// 			</Dropdown.Items>
// 		</Dropdown>
// 	);
// }
