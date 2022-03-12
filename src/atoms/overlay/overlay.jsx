import React from 'react';
import useClassy from '@cheesebit/classy';

import './overlay.scss';

/**
 *
 * @param {OverlayProps} props
 * @return {JSX.Element} Overlay component
 */
function Overlay(props) {
	const { as = 'div', theme = 'dark', className, children, ...others } = props;
	const { prop, classy } = useClassy({ theme });
	const Tag = as;

	return (
		<Tag
			className={classy(
				'cb-overlay',
				{
					'-light': prop({ theme: 'light' }),
					'-dark': prop({ theme: 'dark' }),
				},
				className
			)}
			data-testid="cb-overlay"
			{...others}
		>
			{children}
		</Tag>
	);
}

export default Overlay;

/**
 * @typedef {('light' | 'dark')} OverlayTheme
 */

/**
 * @typedef {Object} OverlayProps
 * @property {(keyof JSX.IntrinsicElements)} [as] - Overlay tag to render, defaults to 'div'.
 * @property {string} [className] - Additional class name.
 * @property {OverlayTheme} [theme] - Overlay theme, defaults to 'dark'.
 * @property {React.ReactNode} children - Overlay content.
 */
