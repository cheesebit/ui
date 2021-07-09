import React from 'react';

import { Icon } from 'atoms/icon';
import { List } from 'atoms/list';
import DropdownContext from './dropdown-context';

function DropdownItem( {
	id,
	icon,
	onClick,
	children,
	label,
	disabled,
	...others
} ) {
	return (
		<DropdownContext.Consumer>
			{ ( { toggle, collapsed } ) => (
				<List.Item
					key={ id }
					leading={ icon && <Icon name={ icon } /> }
					data-testid="item"
					// {/* we disable when collapsed so it becomes unfocusable */}
					disabled={ collapsed || disabled }
					{ ...others }
					{ ...( collapsed && { tabIndex: '-1' } ) }
					id={ id }
					borderless
					onClick={ ( ) => {
						toggle();

						onClick?.( { id } );
					} }
					as="button"
					type="button"
				>
					<span className="children">{ label || children }</span>
				</List.Item>
			) }
		</DropdownContext.Consumer>
	);
}

export default DropdownItem;
