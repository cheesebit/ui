import React from 'react';
import useClassy from '@cheesebit/classy';
import PropTypes from 'prop-types';

import './badge.scss';

/**
 * Badge component.
 *
 * @param {BadgeProps} props
 * @return {JSX.Element} Badge component.
 */
function Badge(props) {
	const { className, children, variant = 'neutral', ...others } = props;
	const { prop, classy } = useClassy({ variant });

	return (
		<span
			data-testid="cb-badge"
			className={classy(
				'cb-badge',
				{
					'-primary': prop({ variant: 'primary' }),
					'-secondary': prop({ variant: 'secondary' }),
					'-terciary': prop({ variant: 'terciary' }),
				},
				className
			)}
			{...others}
		>
			{children}
		</span>
	);
}

export default Badge;

// storybook use only
Badge.propTypes = {
	variant: PropTypes.oneOf(['neutral', 'primary', 'secondary', 'terciary']),
};

/**
 * @typedef {('neutral' | 'primary' | 'secondary' | 'terciary')} BadgeVariant
 */

/**
 * @typedef {React.HTMLAttributes<HTMLSpanElement>} DefaultSpanProps
 */

/**
 * @typedef {Object} CustomSpanProps
 * @property {React.ReactNode} children - Button content.
 * @property {BadgeVariant} [variant] - Badge variant.
 * @property {string} [className] - Additional class name.
 */

/**
 * @typedef {DefaultSpanProps & CustomSpanProps} BadgeProps
 */
