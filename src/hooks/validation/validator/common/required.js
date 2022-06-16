import { isNil, isBlank, isString } from 'common/toolset';

/**
 * Validate if the given value:
 * - Is not blank (empty trimmed string), if string;
 * - Is not NaN;
 * - Is not `undefined` or `undefined`, otherwise.
 *
 * @param {any} value - Value to be checked.
 * @return {boolean} `true` if `value` is a non-blank string, or else if it is neither `null` nor `undefined`, `false` otherwise.
 */
export function validateRequired( value ) {
	if ( isString( value ) ) {
		return ! isBlank( value );
	}

	if ( Number.isNaN( value ) ) {
		return false;
	}

	return ! isNil( value );
}
