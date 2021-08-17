import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { isBlank } from 'common/toolset';

import './spinner.scss';

export const Variant = {
	primary: 'primary',
	secondary: 'secondary',
	terciary: 'terciary',
};

const Spinner = ( { children, className, appear, ...others } ) => {
	const classes = clsx(
		'cb-spinner',

		className,
	);

	return (
		<div className={ classes } { ...others } data-testid="cb-spinner">
			{ appear && <div className="bar" /> }

			{ appear && ! isBlank( children ) && <span className="message">
				{ children }
			</span> }
		</div>
	);
};

Spinner.propTypes = {
	appear: PropTypes.bool,
};

Spinner.defaultProps = {
	appear: false,
};

export default React.memo( Spinner );

// const Spinner = ( { children, className, variant, size, ...others } ) => {
// 	const classes = clsx(
// 		'cb-spinner',
// 		{
// 			'-primary': equals( variant, Variant.primary ),
// 			'-secondary': equals( variant, Variant.secondary ),
// 			'-terciary': equals( variant, Variant.terciary ),
// 		},
// 		className,
// 	);

// 	return (
// 		<div className={ classes } { ...others } style={ { fontSize: size } } data-testid="cb-spinner">
// 			<span className="circle" />
// 			<span>
// 				{ children }
// 			</span>
// 		</div>
// 	);
// };
