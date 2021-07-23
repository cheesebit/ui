
function validateNumber( number ) {
	if ( typeof number !== 'number' ) {
		return false;
	}

	return ! Number.isNaN( number );
}

/**
 * Validate if the given number is greater than or equal to `minValue`.
 *
 * @param {number} number - Number to be validated.
 * @param {number} minValue - Minimum value expected (inclusive).
 * @return {boolean} `true` if `number` is greater than or equal to `minValue`, `false` otherwise.
 */
export function validateMinValue( number, minValue ) {
	number = Number.parseFloat( number );

	if ( ! validateNumber( number ) ) {
		return false;
	}

	const safeMinValue = Math.max( Number.MIN_SAFE_INTEGER, minValue );

	return number >= safeMinValue;
}

/**
 * Validate if the given number is less than or equal to `maxValue`.
 *
 * @param {number} number - Number to be validated.
 * @param {number} maxValue - Maximum value expected (inclusive).
 * @return {boolean} `true` if `number` is less than or equal to `maxValue`, `false` otherwise.
 */
export function validateMaxValue( number, maxValue ) {
	number = Number.parseFloat( number );

	if ( ! validateNumber( number ) ) {
		return false;
	}

	const safeMaxValue = Math.min( Number.MAX_SAFE_INTEGER, maxValue );

	return number <= safeMaxValue;
}

/**
 * Validate if the given number is greater than or equal to `minValue` and less than or equal to `maxValue`.
 *
 * @param {number} number - Number to be validated.
 * @param {number} minValue - Minimum value expected (inclusive).
 * @param {number} maxValue - Maximum value expected (inclusive).
 * @return {boolean} `true` if `number` is between the provided range, `false` otherwise.
 */
export function validateRange( number, minValue, maxValue ) {
	return (
		validateMinValue( number, minValue ) && validateMaxValue( number, maxValue )
	);
}
