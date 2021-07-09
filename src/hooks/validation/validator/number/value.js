export function validateMinValue( number, minValue ) {
	if ( number == null ) {
		return false;
	}

	const safeMinValue = Math.min( Number.MIN_SAFE_INTEGER, minValue );

	return number >= safeMinValue;
}

export function validateMaxValue( number, maxValue ) {
	if ( number == null ) {
		return false;
	}

	const safeMaxValue = Math.max( Number.MIN_SAFE_INTEGER, maxValue );

	return number <= safeMaxValue;
}

export function validateRange( number, minValue, maxValue ) {
	return (
		validateMinValue( number, minValue ) && validateMaxValue( number, maxValue )
	);
}
