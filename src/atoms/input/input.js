import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { equals, omit } from 'common/toolset';
import { evaluateBorderless, evaluatePaddingless } from 'common/props-toolset';
import { InputHTMLAttributes } from 'common/props-dom';

import './input.scss';

const OMITTED_PROPS = [ 'paddingless', 'borderless', 'variant' ];

export const Variant = {
	danger: 'danger',
	info: 'info',
	success: 'success',
	warn: 'warn',
};

/**
 * This component represents a button element.
 */
class Input extends React.PureComponent {
	get classes() {
		const { borderless, className, paddingless, variant } = this.props;

		return clsx(
			'cb-input',
			{
				'-danger': equals( variant, Variant.danger ),
				'-info': equals( variant, Variant.info ),
				'-success': equals( variant, Variant.success ),
				'-warn': equals( variant, Variant.warn ),
			},
			evaluateBorderless( borderless ),
			evaluatePaddingless( paddingless ),
			className,
		);
	}

	render() {
		const {
			forwardedRef,
			type,
			...others
		} = this.props;

		return (
			<input
				{ ...omit( OMITTED_PROPS, others ) }
				ref={ forwardedRef }
				className={ this.classes }
				type={ type }
				data-testid="cb-input"
			/>
		);
	}
}

Input.propTypes = {
	...InputHTMLAttributes,
	borderless: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.oneOf( [
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		] ),
		PropTypes.arrayOf(
			PropTypes.oneOf( [
				'top',
				'right',
				'bottom',
				'left',
				'horizontal',
				'vertical',
			] ),
		),
	] ),
	className: PropTypes.string,
	paddingless: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.oneOf( [
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		] ),
		PropTypes.arrayOf(
			PropTypes.oneOf( [
				'top',
				'right',
				'bottom',
				'left',
				'horizontal',
				'vertical',
			] ),
		),
	] ),
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
