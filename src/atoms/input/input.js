import React from 'react';
import { useClassy } from '@cheesebit/classy';

import { Box } from 'atoms/box';
import { useFocusWithin } from 'hooks/focus-within';

import './input.scss';

/**
 *
 * @param {InputProps} props
 * @param {React.ForwardedRef<HTMLInputElement>} ref
 */
function Input(props, ref) {
	const {
		type = 'text',
		paddingless = 'vertical',
		borderless = false,
		className,
		variant,
		leading,
		trailing,
		...others
	} = props;
	const { prop, classy } = useClassy({ variant, leading, trailing });
	const { ref: containerRef, focused } = useFocusWithin();

	return (
		<Box
			aria-role="none"
			ref={containerRef}
			as="div"
			className={classy(
				'cb-input-wrapper',
				{
					'-danger': prop({ variant: 'danger' }),
					'-info': prop({ variant: 'info' }),
					'-success': prop({ variant: 'success' }),
					'-warn': prop({ variant: 'warn' }),
				},
				{ 'is-focused': focused }
			)}
			trailing={trailing}
			leading={leading}
			paddingless={paddingless}
			borderless={borderless}
			data-testid="cb-input-wrapper"
		>
			<input
				data-testid="cb-input"
				{...others}
				className={classy(
					'cb-input',

					className
				)}
				ref={ref}
				type={type}
			/>
		</Box>
	);
}

// storybook use only
// Input.propTypes = {
// 	...InputHTMLAttributes,
// 	borderless: BorderlessPropType,
// 	className: PropTypes.string,
// 	paddingless: PaddinglessPropType,
// 	type: PropTypes.oneOf( [
// 		'button',
// 		'color',
// 		'date',
// 		'datetime-local',
// 		'email',
// 		'file',
// 		'hidden',
// 		'image',
// 		'month',
// 		'number',
// 		'password',
// 		'range',
// 		'reset',
// 		'search',
// 		'submit',
// 		'tel',
// 		'text',
// 		'time',
// 		'url',
// 		'week',
// 	] ),
// 	variant: PropTypes.oneOf( [ 'danger', 'info', 'success', 'warn' ] ),
// };

// @ts-ignore
export default React.forwardRef(Input);

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('common/prop-types').StatusVariant} InputVariant
 */

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement>} DefaultInputProps
 */

/**
 * @typedef {Object} CustomInputProps
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {React.ReactNode} [leading] - Element to be rendered in the leading area of this button.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the leading area of this button.
 * @property {InputVariant} [variant] - Style variant to apply.
 */

/**
 * @typedef {DefaultInputProps & CustomInputProps} InputProps
 */
