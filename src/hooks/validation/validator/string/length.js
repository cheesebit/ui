import { trim } from 'common/toolset';

/**
 * Validate if the given string has the minimum expected length.
 *
 * @param {string} text - String to be validated.
 * @param {number} minLength - Minimum length expected (inclusive).
 * @return {boolean} `true` if `text` has length greater than or equal to `minLength`.
 */
export function validateMinLength( text, minLength ) {
	const safeMinLength = Math.max( 0, minLength );

	const trimmedText = trim( text );
	return trimmedText.length >= safeMinLength;
}

/**
 * Validate if the given string has the maximum expected length.
 *
 * @param {string} text - String to be validated.
 * @param {number} maxLength - Maximum length expected (inclusive).
 * @return {boolean} `true` if `text` has length less than or equal to `minLength`.
 */
export function validateMaxLength( text, maxLength ) {
	const safeMaxLength = Math.min( Number.MAX_SAFE_INTEGER, maxLength );

	const trimmedText = trim( text ); // ?
	return trimmedText.length <= safeMaxLength; //?
}

/**
 * Validate if the given string has a length between the minimum and maximum expected length.
 *
 * @param {string} text - String to be validated.
 * @param {number} minLength - Minimum length expected (inclusive).
 * @param {number} maxLength - Maximum length expected (inclusive).
 * @return {boolean} `true` if `text` has length between the provided range, `false` otherwise.
 */
export function validateRangeLength( text, minLength, maxLength ) {
	return validateMinLength( text, minLength ) && validateMaxLength( text, maxLength );
}

/**
 * Validate if the given string has the exact expected length.
 *
 * @param {string} text - String to be validated.
 * @param {number} length - Length expected (inclusive).
 * @return {boolean} `true` if `text` has the exact expected length, `false` otherwise.
 */
export function validateLength( text, length ) {
	const safeLength = Math.min(
		Math.max( 0, length ),
		Number.MAX_SAFE_INTEGER,
	);

	const trimmedText = trim( text );
	return trimmedText.length == safeLength;
}
