import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useClassy } from '@cheesebit/classy';
import { useValue } from '@cheesebit/use-value';

import { isFunction, isNil, omit } from 'common/toolset';
import { useClickOutside } from 'hooks/click-outside/';
import { useID } from 'hooks/id';
import DropdownContext from './dropdown-context';
import DropdownItem from './dropdown-item';
import DropdownItems from './dropdown-items';
import DropdownTrigger from './dropdown-trigger';

import './dropdown.scss';

const OMITTED_PROPS = [ 'trigger', 'expanded', 'items', 'unroll', 'hoverable' ];

export function useTrigger( props ) {
	const expanded = useValue( Boolean( props.expanded ) );

	React.useEffect(
		function update() {
			expanded( Boolean( props.expanded ) );
		},
		[ props.expanded ],
	);

	const toggle = React.useCallback(
		function toggle() {
			expanded( ( isExpanded ) => ! isExpanded );
		},
		[ expanded ],
	);

	return { expanded, toggle };
}

export function useDropdown( props ) {
	const { expanded, toggle } = useTrigger( props );

	return { expanded, toggle };
}

export function GenericDropdown( props ) {
	const ref = useRef();
	const id = useID( props );
	const { prop, classy } = useClassy( props );

	const {
		children,
		className,
		disabled,
		items,
		onBlur,
		trigger,
		expanded,
		toggle,
		...others
	} = props;

	useClickOutside( ref, function handleClickOutside() {
		if ( ! expanded() ) {
			return;
		}

		toggle();
		onBlur?.();
	} );

	function renderTrigger() {
		if ( isFunction( trigger ) ) {
			return trigger( { disabled, expanded, toggle } );
		}

		return (
			<DropdownTrigger disabled={ disabled } expanded={ expanded() } onClick={ toggle }>
				{ trigger }
			</DropdownTrigger>
		);
	}

	function renderItems() {
		if ( ! isNil( children ) ) {
			return children;
		}

		return <DropdownItems items={ items } hoverable />;
	}

	return (
		<DropdownContext.Provider value={ { expanded, toggle } }>
			<div
				data-testid="cb-dropdown"
				{ ...omit( OMITTED_PROPS, others ) }
				ref={ ref }
				className={ classy(
					'cb-dropdown',
					{
						'-unroll-right': prop( { unroll: 'right' } ),
						'-unroll-left': prop( { unroll: 'left' } ),
						'-unroll-block': prop( { unroll: 'block' } ),
					},
					{
						'is-expanded': expanded(),
					},
					className,
				) }
				id={ id }
			>
				{ renderTrigger() }
				{ renderItems() }
			</div>
		</DropdownContext.Provider>
	);
}

GenericDropdown.Items = DropdownItems;
GenericDropdown.Item = DropdownItem;
GenericDropdown.Trigger = DropdownTrigger;

function Dropdown( props ) {
	const dropdownProps = useDropdown( props );

	return <GenericDropdown { ...props } { ...dropdownProps } />;
}

Dropdown.propTypes = {
	unroll: PropTypes.oneOf( [ 'right', 'left', 'block' ] ),
};

Dropdown.defaultProps = {
	unroll: 'right',
};

Dropdown.Items = DropdownItems;
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;

export default Dropdown;
