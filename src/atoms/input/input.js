import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { equals, omit, isNil } from 'common/toolset';
import { InputHTMLAttributes } from 'common/props-dom';
import { PaddinglessPropType, BorderlessPropType } from '../../common/prop-types';

import './input.scss';

const OMITTED_PROPS = [ 'variant', 'borderless', 'paddingless' ];

export const Variant = {
	danger: 'danger',
	info: 'info',
	success: 'success',
	warn: 'warn',
};

class Input extends React.PureComponent {
	get classes() {
		const { className, variant, leading, trailing } = this.props;

		return clsx(
			'cb-input',
			{
				'-danger': equals( variant, Variant.danger ),
				'-info': equals( variant, Variant.info ),
				'-success': equals( variant, Variant.success ),
				'-warn': equals( variant, Variant.warn ),
			},
			{
				'has-leading': ! isNil( leading ),
				'has-trailing': ! isNil( trailing ),
			},
			className,
		);
	}

	render() {
		const {
			forwardedRef,
			type,
			trailing,
			leading,
			...others
		} = this.props;

		return (
			<Box
				as="label"
				trailing={ trailing }
				leading={ leading }
				paddingless
				borderless
				className="cb-input-wrapper"
			>
				<input
					data-testid="cb-input"
					{ ...omit( OMITTED_PROPS, others ) }
					className={ this.classes }
					ref={ forwardedRef }
					type={ type }
				/>
			</Box>
		);
	}
}

Input.propTypes = {
	...InputHTMLAttributes,
	borderless: BorderlessPropType,
	className: PropTypes.string,
	paddingless: PaddinglessPropType,
	type: PropTypes.oneOf( [
		'button',
		'color',
		'date',
		'datetime-local',
		'email',
		'file',
		'hidden',
		'image',
		'month',
		'number',
		'password',
		'range',
		'reset',
		'search',
		'submit',
		'tel',
		'text',
		'time',
		'url',
		'week',
	] ),
};

Input.defaultProps = {
	borderless: false,
	className: null,
	paddingless: false,
	type: 'text',
};

export default Input;
