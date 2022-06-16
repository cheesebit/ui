import React from 'react';
import useClassy from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { isNil } from 'common/toolset';

import './spinner.scss';

/**
 *
 * @param {SpinnerProps} props
 * @return {JSX.Element} Spinner component.
 */
function Spinner( props ) {
	const { children, className, appear = false, ...others } = props;
	const { classy } = useClassy( props );

	return (
		<div
			className={ classy( 'cb-spinner', className ) }
			{ ...others }
			data-testid="cb-spinner"
		>
			{ appear && <div className="bar" /> }

			{ appear && ! isNil( children ) && (
				<span className="message">{ children }</span>
			) }
		</div>
	);
}

/**
 *
 * @param {SpinnerProps} props
 * @return {JSX.Element} Spinner component.
 */
export function CircularSpinner( props ) {
	const { children, className, variant = 'neutral', size, ...others } = props;
	const { when, classy } = useClassy( { variant } );
	const classes = classy(
		'cb-circular-spinner',
		{
			'-primary': when( { variant: 'primary' } ),
			'-secondary': when( { variant: 'secondary' } ),
			'-terciary': when( { variant: 'terciary' } ),
		},
		className
	);

	return (
		<div
			className={ classes }
			{ ...others }
			style={ { fontSize: size } }
			data-testid="cb-circular-spinner"
		>
			<span className="circle" />
			<span>{ children }</span>
		</div>
	);
}

// storybook use only
Spinner.propTypes = {
	appear: PropTypes.bool,
};

export default React.memo( Spinner );

/**
 * @typedef {('neutral' | 'primary' | 'secondary' | 'terciary')} SpinnerVariant
 */

/**
 * @typedef {Object} SpinnerProps
 * @property {React.ReactNode} [children] - Spinner content.
 * @property {string} [className] - Additional class name.
 * @property {boolean} [appear] - Should show spinner content.
 * @property {SpinnerVariant} [variant] - Spiner variant, valid for circular spinner, default to 'neutral'.
 * @property {number | string} [size] - Size of spinner, valid for circular spinner, default to '1em'.
 */
