import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from 'atoms/box';

function Tab( { active, className, disabled, label, ...others } ) {
	return (
		<Box
			borderless
			{ ...others }
			role="tab"
			aria-disabled={ disabled }
			aria-selected={ active }
			as="a"
			className={ clsx(
				'tab',
				{
					'is-active': active,
					'is-focused': active,
					'is-disabled': disabled,
				},
				className,
			) }
			data-testid="tab"
		>
			{ label }
		</Box>
	);
}

Tab.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.oneOfType( [ PropTypes.node, PropTypes.func ] ),
	disabled: PropTypes.bool,
	id: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	label: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	onClick: PropTypes.func,
};

Tab.defaultProps = {
	active: false,
	disabled: false,
	label: null,
};

export default Tab;
