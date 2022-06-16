import React from 'react';
import useClassy from '@cheesebit/classy';

import { omit } from 'common/toolset';
import { Box } from 'atoms/box';

import './label.scss';

const OMITTED_PROPS = [];

/**
 * Label
 *
 * @param {LabelProps} props
 * @return {JSX.Element} Label component.
 */
function Label( props ) {
	const { children, className, variant = 'neutral', ...others } = props;
	const { when, classy } = useClassy( { variant } );

	return (
		<Box
			as="label"
			{ ...omit( OMITTED_PROPS, others ) }
			borderless
			paddingless
			className={ classy(
				'cb-label',
				{
					'-neutral': when( { variant: 'neutral' } ),
					'-danger': when( { variant: 'danger' } ),
					'-info': when( { variant: 'info' } ),
					'-success': when( { variant: 'success' } ),
					'-warn': when( { variant: 'warn' } ),
				},
				className
			) }
			data-testid="cb-label"
		>
			{ children }
		</Box>
	);
}

export default Label;

/**
 * @typedef {import('common/prop-types').IconProp} IconProp
 * @typedef {import('common/prop-types').StatusVariant} LabelVariant
 */

/**
 * @typedef {React.LabelHTMLAttributes<HTMLLabelElement>} DefaultLabelProps
 */

/**
 * @typedef {Object} CustomLabelProps
 * @property {React.ReactNode} children - Label to render.
 * @property {LabelVariant} [variant] - Label variant.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the leading area of this button.
 */

/**
 * @typedef {DefaultLabelProps & CustomLabelProps} LabelProps
 */
