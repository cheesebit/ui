import React from 'react';
import useClassy from '@cheesebit/classy';

import { Box } from 'atoms/box';
import { Icon } from 'atoms/icon';
import { isEmpty, omit } from 'common/toolset';
import { resolveProp } from 'common/props-toolset';

import './form-field.scss';

const OMITTED_PROPS = [];

function Required() {
	return <span className="">*</span>;
}

/**
 * Field component, based on https://uxdesign.cc/ui-cheat-sheet-text-fields-2152112615f8
 *
 * @param {FieldProps} props
 * @return {JSX.Element} Field component.
 */
function Field( props ) {
	const {
		required = false,
		variant = 'neutral',
		feedback = {},
		children,
		className,
		label,
		prompt,
		trailing,
		...others
	} = props;
	const { when, classy } = useClassy( { variant, required } );

	function renderTrailing() {
		if ( isEmpty( feedback ) ) {
			return trailing;
		}

		const { icon } = feedback;

		return (
			Boolean( icon ) && (
				<Icon
					size={ 24 }
					variant={ variant }
					{ ...resolveProp( icon, 'name' ) }
				/>
			)
		);
	}

	function renderPrompt() {
		if ( isEmpty( feedback ) ) {
			return prompt;
		}

		const { message } = feedback;
		return message;
	}

	return (
		<div
			{ ...omit( OMITTED_PROPS, others ) }
			className={ classy(
				'cb-form-field',
				{
					'-neutral': when( { variant: 'neutral' } ),
					'-danger': when( { variant: 'danger' } ),
					'-info': when( { variant: 'info' } ),
					'-success': when( { variant: 'success' } ),
					'-warn': when( { variant: 'warn' } ),
				},
				{
					'is-required': when( { required: true } ),
				},
				className
			) }
			data-testid="cb-form-field"
		>
			<Box
				as="dt"
				borderless
				paddingless
				className="label"
				data-testid="field-label"
			>
				{ label }
			</Box>
			<Box
				as="dd"
				borderless
				paddingless
				className="content"
				data-testid="field-content"
				trailing={ renderTrailing() }
			>
				{ children }
			</Box>
			<span className="prompt" data-testid="field-prompt">
				{ renderPrompt() }
			</span>
		</div>
	);
}

export default Field;

/**
 * @typedef {import('common/prop-types').IconProp} IconProp
 * @typedef {import('common/prop-types').StatusVariant} FieldVariant
 */

/**
 * @typedef {React.HTMLAttributes<HTMLElement>} DefaultFieldProps
 */

/**
 * @typedef {Object} FieldFeedback
 * @property {string} [message] - feedback message
 * @property {IconProp} [icon] - feedback icon
 */

/**
 * @typedef {Object} CustomFieldProps
 * @property {React.ReactNode} label - Label to render.
 * @property {FieldVariant} [variant] - Style variant to apply.
 * @property {boolean} [required] - Label to render.
 * @property {string} [prompt] - Auxiliary prompt to helper user about the label.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the leading area of this button.
 * @property {FieldFeedback} [feedback] - Feedback for this label
 */

/**
 * @typedef {DefaultFieldProps & CustomFieldProps} FieldProps
 */
