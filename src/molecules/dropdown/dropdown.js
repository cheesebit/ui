import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useClassy } from '@cheesebit/classy';

import { isFunction, isNil, omit } from 'common/toolset';
import { useClickOutside } from 'hooks/click-outside/';
import { useID } from 'hooks/id';
import { useValue } from 'hooks/value';
import DropdownContext from './dropdown-context';
import DropdownItem from './dropdown-item';
import DropdownItems from './dropdown-items';
import DropdownToggle from './dropdown-toggle';

import './dropdown.scss';

const OMITTED_PROPS = [ 'toggle', 'collapsed', 'items', 'unroll', 'hoverable' ];

function Dropdown( props ) {
	const { prop, classy } = useClassy( props );
	const ref = useRef();
	const id = useID( props );
	const collapsed = useValue( props.collapsed || true );

	const {
		className,
		children,
		items,
		disabled,
		toggle,
		...others
	} = props;

	function handleToggle() {
		collapsed( ( isCollapsed ) => ! isCollapsed );
	}

	useClickOutside( ref, function handleClickOutside() {
		if ( collapsed() ) {
			return;
		}

		handleToggle();
	} );

	function renderToggle() {
		if ( isFunction( toggle ) ) {
			return toggle( { disabled, onClick: handleToggle, collapsed } );
		}

		return (
			<DropdownToggle
				disabled={ disabled }
				collapsed={ collapsed() }
				onClick={ handleToggle }
			>
				{ toggle }
			</DropdownToggle>
		);
	}

	function renderItems() {
		if ( ! isNil( children ) ) {
			return children;
		}

		return <DropdownItems items={ items } collapsed={ collapsed() } hoverable />;
	}

	return (
		<DropdownContext.Provider value={ { collapsed: collapsed(), toggle: handleToggle } }>
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
						'is-collapsed': collapsed(),
					},
					className,
				) }
				id={ id }
			>
				{ renderToggle() }
				{ renderItems() }
			</div>
		</DropdownContext.Provider>
	);
}

Dropdown.propTypes = {
	unroll: PropTypes.oneOf( [ 'right', 'left', 'block' ] ),
};

Dropdown.defaultProps = {
	unroll: 'right',
};

Dropdown.Items = DropdownItems;
Dropdown.Item = DropdownItem;
Dropdown.Toggle = DropdownToggle;

export default Dropdown;
