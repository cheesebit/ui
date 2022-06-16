import { isBoolean } from 'common/toolset';

/**
 *
 * @param {*} status
 * @return {StatusVariant} Variant that represents the given status.
 */
export function toVariant( status ) {
	if ( Array.isArray( status ) ) {
		return 'danger';
	}
	if ( isBoolean( status ) && status ) {
		return 'success';
	}

	return 'neutral';
}

/**
 *
 * @param {*} status
 * @return {FieldFeedback} Feedback that represents the given status.
 */
export function toFeedback( status ) {
	const variant = toVariant( status );

	if ( variant === 'neutral' ) {
		return {};
	}

	/** @type {Record<StatusVariant, FieldFeedback>} */
	const map = {
		neutral: {},
		danger: {
			icon: { name: 'close', size: 16 },
		},
		info: {
			icon: { name: 'info', size: 16 },
		},
		success: {
			icon: { name: 'check', size: 16 },
			message: '',
		},
		warn: {
			icon: { name: 'info', size: 16 },
		},
	};

	return { message: String( status ), ...map[ variant ] };
}

export function getFieldProperties( status ) {
	return {
		variant: toVariant( status ),
		feedback: toFeedback( status ),
	};
}

/**
 * @typedef {import('common/prop-types').IconProp} IconProp
 * @typedef {import('common/prop-types').StatusVariant} StatusVariant
 */

/**
 * @typedef {import('./form-field').FieldFeedback} FieldFeedback
 */
