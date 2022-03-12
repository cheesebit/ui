import React from 'react';
import useClassy from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Box } from '../box';
import ListContext from './list.context';

/**
 *
 * @param {ListItemProps} props
 * @return {JSX.Element} List item component.
 */
function ListItem(props) {
	const { as = 'div', disabled = false, className, children, ...others } = props;
	const { classy } = useClassy(props);
	const { bordered } = React.useContext(ListContext);

	return (
		<Box
			data-testid="list-item"
			as={as}
			// @ts-ignore
			role="listitem"
			{...others}
			borderless={bordered && ['horizontal', 'top']}
			paddingless="vertical"
			className={classy(
				'item',
				{
					'is-disabled': disabled,
				},
				className
			)}
			disabled={disabled}
		>
			{children}
		</Box>
	);
}

// storybook use only
ListItem.propTypes = {
	disabled: PropTypes.bool,
};

export default ListItem;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} ListItemProps
 * @property {keyof JSX.IntrinsicElements} [as] - Tag to render the list item, defaults to 'div'.
 * @property {boolean} [disabled] - Should the list item be disabled?
 * @property {string} [className] - Additional class name.
 * @property {React.ReactNode} [children] - Button content.
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 */
