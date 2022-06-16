import React from 'react';
import { classy } from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Box } from 'atoms/box';

/**
 *
 * @param {TabProps} props
 * @return {JSX.Element} Tab component.
 */
function Tab( props ) {
	const {
		active = false,
		disabled = false,
		label,
		className,
		...others
	} = props;

	return (
		<Box
			borderless
			{ ...others }
			role="tab"
			aria-disabled={ disabled }
			aria-selected={ active }
			as="a"
			className={ classy(
				'tab',
				{
					'is-active': active,
					'is-focused': active,
					'is-disabled': disabled,
				},
				className
			) }
			data-testid="tab"
		>
			{ label }
		</Box>
	);
}

// storybook use only
Tab.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.oneOfType( [ PropTypes.node, PropTypes.func ] ),
	disabled: PropTypes.bool,
	id: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	label: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	onClick: PropTypes.func,
};

export default Tab;

/**
 * @typedef {Object} CustomTabProps
 * @property {boolean} [active] - Indicates whether the tab is active.
 * @property {string} label - Tab readable label.
 * @property {boolean} [disabled] - Indicates whether the tab is disabled.
 */

/**
 * @typedef {import('atoms/box/box').BoxProps} BoxProps
 */

/**
 * @typedef {CustomTabProps & BoxProps} TabProps
 */
