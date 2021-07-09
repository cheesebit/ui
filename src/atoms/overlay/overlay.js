import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import './overlay.scss';

import { equals } from '../../common/toolset';

export const Theme = {
	light: 'light',
	dark: 'dark',
};

const Overlay = ( { className, children, theme, ...others } ) => (
	<div
		className={ clsx(
			'cb-overlay',
			{
				'-light': equals( theme )( Theme.light ),
				'-dark': equals( theme )( Theme.dark ),
			},
			className,
		) }
		data-testid="cb-overlay"
		{ ...others }
	>
		{ children }
	</div>
);

Overlay.propTypes = {
	theme: PropTypes.oneOf( [ Theme.light, Theme.dark ] ),
};

Overlay.defaultProps = {
	theme: Theme.dark,
};

export default Overlay;
