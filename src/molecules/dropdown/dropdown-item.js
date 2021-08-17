import React from 'react';

import { Icon } from 'atoms/icon';
import { List } from 'atoms/list';
import DropdownContext from './dropdown-context';

function DropdownItem( { id, icon, onClick, children, label, disabled, ...others } ) {
	const { expanded, toggle } = React.useContext( DropdownContext );

	return (
		<List.Item
			key={ id }
			leading={ icon && <Icon name={ icon } /> }
			data-testid="item"
			// {/* we disable when not expanded so it becomes unfocusable */}
			disabled={ ! expanded() || disabled }
			{ ...others }
			{ ...( ! expanded() && { tabIndex: '-1' } ) }
			borderless
			id={ id }
			onClick={ () => {
				toggle();

				onClick?.( { id } );
			} }
			as="button"
			type="button"
		>
			<span className="children">{ label || children }</span>
		</List.Item>
	);
}

export default DropdownItem;
