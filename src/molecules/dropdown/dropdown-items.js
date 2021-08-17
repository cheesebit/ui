import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClassy } from '@cheesebit/classy';

import { DEFAULT } from 'common/constants';
import { FloatingList } from 'atoms/list';
import { isNil } from 'common/toolset';
import DropdownItem from './dropdown-item';

function DropdownItems( props ) {
	const { classy } = useClassy( props );
	const { items, className, children, ...others } = props;

	function renderItems() {
		if ( ! isNil( children ) ) {
			return children;
		}

		return ( items || DEFAULT.ARRAY ).map( ( item ) => (
			// TODO: use adapter here, instead of assuming the item has an ID
			<DropdownItem key={ item.id } { ...item } />
		) );
	}

	return (
		<FloatingList
			data-testid="items"
			className={ classy( 'menu', className ) }
			{ ...others }
		>
			{ renderItems() }
		</FloatingList>
	);
}

DropdownItems.propTypes = {
	hoverable: PropTypes.bool,
	items: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
			icon: PropTypes.string,
			leading: PropTypes.oneOfType( [
				PropTypes.node,
				PropTypes.element,
				PropTypes.func,
			] ),
			children: PropTypes.oneOfType( [
				PropTypes.node,
				PropTypes.element,
				PropTypes.func,
			] ),
			trailing: PropTypes.oneOfType( [
				PropTypes.node,
				PropTypes.element,
				PropTypes.func,
			] ),
			paddingless: PropTypes.oneOfType( [
				PropTypes.bool,
				PropTypes.arrayOf(
					PropTypes.oneOf( [
						'top',
						'right',
						'bottom',
						'left',
						'horizontal',
						'vertical',
					] ),
				),
			] ),
			onClick: PropTypes.func.isRequired,
		} ),
	),
};

DropdownItems.defaultProps = {
	hoverable: true,
};

export default DropdownItems;
